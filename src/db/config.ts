import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();
const MONGODB_URL = process.env.MONGOOSE_DB_URL || "";

export const initDB = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("Connected to %s", MONGODB_URL);
    })
    .catch((err) => {
      console.error("App starting error:", err.message);
      process.exit(1);
    });
};
