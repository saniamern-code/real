const Lead = require("../models/Lead");
const sendEmail = require("../utils/sendEmail");

exports.submitContact = async (req, res) => {
  try {
    const { fullName, phone, email, date, time, message } = req.body;

    // Basic validation
    if (!fullName || !phone || !email || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // Save lead to MongoDB
    const lead = await Lead.create({
      fullName,
      phone,
      email,
      date,
      time,
      message
    });

    // Send email notification
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "📞 New Callback Request",
      text: `
New lead received:

Name: ${fullName}
Phone: ${phone}
Email: ${email}
Date: ${date}
Time: ${time}
Message: ${message || "N/A"}
      `
    });

    return res.status(200).json({
      success: true,
      message: "Callback request submitted successfully",
      data: lead
    });

  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting contact"
    });
  }
};
