import mongoose, { Schema } from "mongoose";
// Schema
const schema = new Schema({
  title: { type: String, required: true },
  publish_year: { type: Number, required: true },
  poster: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  createdAt: { type: Date, default: Date.now() },
  isDeleted: { type: Boolean, default: true },
});

// `MovieModel`
export const Movie = mongoose.model("Movie", schema);
