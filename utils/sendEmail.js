import nodemailer from "nodemailer";

// ✅ Create transporter (Gmail OR custom SMTP)
const transporter = nodemailer.createTransport({
  // Use Gmail if EMAIL_HOST is not provided
  service: process.env.EMAIL_HOST ? undefined : "gmail",

  host: process.env.EMAIL_HOST || undefined,
  port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined,
  secure: false, // Gmail uses STARTTLS, not SSL

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Verify transporter at startup (IMPORTANT for Render logs)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:");
    console.error(error.message);
  } else {
    console.log("✅ Email transporter ready");
  }
});

// ✅ Email sender utility
const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Real Estate Website" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent successfully:", info.messageId);
    return info;

  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error(error.message);
    throw error; // important so controller can catch it
  }
};

export default sendEmail;
