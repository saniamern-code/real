import Review from "../models/Review.js";

/**
 * CREATE REVIEW
 * POST /api/reviews
 */
export const createReview = async (req, res) => {
  try {
    const { name, rating, message } = req.body;

    // Validate required fields
    if (!name || !rating || !message) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Simple moderation logic: auto-pending if rating ≤2 or message contains "fake"
    const isBad = Number(rating) <= 2 || message.toLowerCase().includes("fake");

    // Save review in DB
    const review = await Review.create({
      name,
      rating,
      message,
      status: isBad ? "pending" : "approved",
    });

    // Optional: trigger alert for pending review
    if (isBad) {
      console.log("⚠️ Agent alert needed for review:", review._id);
      // TODO: Send email or dashboard alert here if needed
    }

    res.status(201).json({
      success: true,
      message: isBad
        ? "Review submitted for verification"
        : "Review published successfully",
      review, // Return the saved review
    });
  } catch (error) {
    console.error("Create review error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET ONLY APPROVED REVIEWS
 * GET /api/reviews/approved
 */
export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: "approved" }).sort({
      createdAt: -1,
    });

    res.json(reviews);
  } catch (error) {
    console.error("Fetch reviews error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
