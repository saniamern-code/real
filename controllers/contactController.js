import Lead from "../models/Lead.js";
import sendEmail from "../utils/sendEmail.js";

export const submitContact = async (req, res) => {
  try {
    const { fullName, phone, email, date, time, message } = req.body;

    // Basic validation
    if (!fullName || !phone || !email || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Save lead to MongoDB
    const lead = await Lead.create({
      fullName,
      phone,
      email,
      date,
      time,
      message,
    });

    // ✅ Prepare email HTML (FIXED)
    const emailHTML = `
      <h2>📞 New Callback Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;

    // ✅ Send email notification (NON-BLOCKING SAFE)
    try {
      await sendEmail({
        to: process.env.EMAIL_USER,
        subject: "📞 New Callback Request",
        html: emailHTML,
      });
    } catch (mailError) {
      console.error("EMAIL SEND FAILED:", mailError);
      // Do NOT fail the request if email fails
    }

    return res.status(200).json({
      success: true,
      message: "Callback request submitted successfully",
      data: lead,
    });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting contact",
    });
  }
};
