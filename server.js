import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import connectDB from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"; // ✅ REQUIRED

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("ENV CHECK:");
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists =", !!process.env.EMAIL_PASS);

const app = express();
app.use(express.json());

// ✅ ROUTES
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);

// ✅ Health
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ Server start failed", err);
    process.exit(1);
  }
};

startServer();
