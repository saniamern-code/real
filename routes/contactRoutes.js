import express from "express";
import { submitContact } from "../controllers/contactController.js";

const router = express.Router();

// ✅ Health check (very important for testing)
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "contact-api" });
});

// ✅ Submit contact / callback form
router.post("/", submitContact);

export default router;
