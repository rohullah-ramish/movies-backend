import mongoose, { Schema } from "mongoose";
// Schema
const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: false },
  version: { type: Number, default: 1 },
});

// `UserModel`
export const User = mongoose.model("User", schema);
