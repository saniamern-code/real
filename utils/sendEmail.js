import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // ✅ Use Gmail service if host/port not provided
  service: process.env.EMAIL_HOST ? undefined : "gmail",

  host: process.env.EMAIL_HOST || undefined,
  port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : undefined,
  secure: false,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Verify transporter at startup (very important)
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter error:", error);
  } else {
    console.log("✅ Email transporter ready");
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Real Estate Website" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📧 Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};
