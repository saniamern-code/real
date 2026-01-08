import express from "express";
import { createReview, getApprovedReviews } from "../controllers/reviewController.js";

const router = express.Router();

/**
 * @route   POST /api/reviews
 * @desc    Create a new review (auto-approve or pending)
 */
router.post("/", createReview);

/**
 * @route   GET /api/reviews/approved
 * @desc    Get only approved reviews (public)
 */
router.get("/approved", getApprovedReviews);

export default router;
