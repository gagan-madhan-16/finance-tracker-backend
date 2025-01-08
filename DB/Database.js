// Database.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

export const connectDB = async () => {
  try {
    const db = process.env.MONGO_URL;
    if (!db) throw new Error("MONGO_URL is not defined");

    const { connection } = await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log(`MongoDB Connected to ${connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
