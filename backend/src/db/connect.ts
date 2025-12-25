import mongoose from "mongoose";
import config from "../config";

const { host, port, dbName, user, password } = config.db;

let MONGO_URI: string;

if (process.env.NODE_ENV === "production") {
  console.log("NODE_ENV is production! Connecting to MongoDB Atlas...");
  const encodedPassword = encodeURIComponent(password as string);

  // MongoDB Atlas URI
  MONGO_URI = `mongodb+srv://${user}:${encodedPassword}@${host}/?appName=${dbName}`;
} else {
  // Local dev/test
  console.log("NODE_ENV is dev or test! Connecting to local MongoDB..."); 
  MONGO_URI = `mongodb://${host}:${port}/${dbName}`;
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("✅ Connected to MongoDB database");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.error('uri: ',MONGO_URI)
    process.exit(1);
  }
};