import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { RegisterInput, LoginInput } from "../schemas/auth.schema";
import { signAccessToken } from "../utils/jwt";

const SALT_ROUNDS = 10;

/* This service handles the business logic for user registration and login:
    Interact with the database
    Hash passwords
    Create JWTs
    Return safe user objects
*/

export const register = async (data: RegisterInput) => {
  const { name, email, password } = data;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // Hash password:
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user:
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Create JWT:
  const accessToken = signAccessToken({
    userId: user._id.toString(),
  });

  // Return safe user object:
  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
};

export const login = async (data: LoginInput) => {
  const { email, password } = data;

  // Find user (include password)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Create JWT
  const accessToken = signAccessToken({
    userId: user._id.toString(),
  });

  // Return safe user object
  return {
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
};
