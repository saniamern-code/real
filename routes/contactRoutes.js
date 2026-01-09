import express from "express";
import { submitContact } from "../controllers/contactController.js";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "contact-api" });
});

router.post("/", submitContact);

export default router;
