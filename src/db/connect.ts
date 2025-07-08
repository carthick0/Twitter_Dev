
import mongoose from "mongoose";
import { MONGO_URL } from "../config/server-config";

export const connectDB = async () => {
  try {
    if (!MONGO_URL) throw new Error("MONGO_URL is not defined");
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
};
