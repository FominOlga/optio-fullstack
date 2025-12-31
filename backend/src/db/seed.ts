import mongoose from "mongoose";

// Dev database config (adjust if you already have config.ts)
const MONGO_URI = "mongodb://127.0.0.1:27017/polly_dev";

// Example Mongoose schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to local dev MongoDB");

    // Clear existing users (optional)
    await User.deleteMany({});

    // Insert sample users
    const users = [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
    ];

    await User.insertMany(users);
    console.log("✅ Sample data inserted");

    mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Seed error:", err);
  }
};

seed();
