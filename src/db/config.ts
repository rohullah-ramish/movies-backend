import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGOOSE_DB_URL || "";

// TODO: Convert to async-await
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
