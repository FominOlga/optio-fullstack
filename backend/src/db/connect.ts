import mongoose from "mongoose";

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const encodedPassword = encodeURIComponent(password as string);
const cluster = process.env.DB_HOST;
const appName = process.env.DB_APP_NAME;
const uri =
  `mongodb+srv://${username}:${encodedPassword}@${cluster}/?appName=${appName}`

export const connectDB = async () => {
  try {
    await mongoose.connect(uri as string);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    console.error('uri: ',uri)
        process.exit(1);
  }
};