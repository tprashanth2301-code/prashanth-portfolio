import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: ENV.gmailUser,
        pass: ENV.gmailAppPassword,
      },
    });
  }
  return transporter;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const transporter = getTransporter();
    const result = await transporter.sendMail({
      from: ENV.gmailUser,
      to: options.to,
      subject: options.subject,
      text: options.text || options.html,
      html: options.html,
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #00d9ff;">New Portfolio Contact Form Submission</h2>
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      
      <div style="margin: 20px 0;">
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      </div>
      
      <div style="margin: 20px 0; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(data.message)}</p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form.</p>
    </div>
  `;

  return sendEmail({
    to: ENV.gmailUser,
    subject: `New Contact: ${data.name}`,
    html,
    text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  });
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
