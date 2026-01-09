const express = require("express");
const router = express.Router();
const { submitContact } = require("../controllers/contactController");

// ✅ Health check (very important for testing)
router.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", service: "contact-api" });
});

// ✅ Submit contact / callback form
router.post("/", submitContact);

module.exports = router;
