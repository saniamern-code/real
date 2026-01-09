import Lead from "../models/Lead.js";
import sendEmail from "../utils/sendEmail.js";



export const submitContact = async (req, res) => {
  try {
    const { fullName, phone, email, date, time, message } = req.body;

    if (!fullName || !phone || !email || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const lead = await Lead.create({
      fullName,
      phone,
      email,
      date,
      time,
      message,
    });

    const emailHTML = `
      <h2>📞 New Callback Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Message:</strong> ${message || "N/A"}</p>
    `;

    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "📞 New Callback Request",
      html: emailHTML,
    });

    res.status(200).json({
      success: true,
      message: "Callback request submitted successfully",
      data: lead,
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
