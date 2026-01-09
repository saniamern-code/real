import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

import connectDB from "./config/db.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, ".env") });

// 🔎 ENV sanity check (keep this during development)
console.log("ENV CHECK:");
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("EMAIL_PASS exists =", !!process.env.EMAIL_PASS);

if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing");
  process.exit(1);
}

const app = express();
app.use(express.json());

// ✅ API ROUTES
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);


// ✅ Health check
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

const PORT = process.env.PORT || 5001;

// ✅ START FLOW: CONNECT DB → START SERVER (ONLY ONCE)
const startServer = async () => {
  try {
    await connectDB(); // 🔥 called only once

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
