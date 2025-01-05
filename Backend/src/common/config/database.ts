import mongoose from "mongoose";
import { ENVIRONMENT } from "./environment";

export const connectDb = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(String(ENVIRONMENT.DB.URL));
    console.log("MongoDB Connected: " + conn.connection.host);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: " + error.message);
    } else {
      console.log("An unknown error occurred.");
    }
    process.exit(1);
  }
};
