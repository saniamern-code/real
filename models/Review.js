import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
      index: true, // 🔥 important for fast approved reviews query
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
    versionKey: false, // 🔥 removes __v (clean API responses)
  }
);

// 🔒 Prevent duplicate model error in dev / hot reload
const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
