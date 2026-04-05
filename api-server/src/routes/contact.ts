import { Router, type Request, type Response } from "express";
import { createTransport } from "nodemailer";
import { existsSync, appendFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const router = Router();
const CSV_PATH = join(process.cwd(), "data", "contact_submissions.csv");

const transporter = createTransport({
  host: "box.electronero.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

function ensureFile() {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  if (!existsSync(CSV_PATH)) {
    writeFileSync(CSV_PATH, "name,email,subject,message,submitted_at\n", "utf-8");
  }
}

function escapeCsv(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

router.post("/contact", async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message are required" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  const subjectLine = subject || "General Inquiry";

  ensureFile();
  const timestamp = new Date().toISOString();
  const row = [name, email, subjectLine, message, timestamp]
    .map((v) => escapeCsv(v.trim()))
    .join(",");
  appendFileSync(CSV_PATH, row + "\n", "utf-8");

  res.json({ success: true, message: "Message received! We'll get back to you within 24 hours." });

  transporter.sendMail({
    from: `"Vibe Code 101 Contact" <founders@vibecode-101.com>`,
    to: "founders@vibecode-101.com",
    replyTo: email.trim(),
    subject: `[Contact Form] ${subjectLine} — from ${name.trim()}`,
    text: [
      `New contact form submission`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Subject: ${subjectLine}`,
      ``,
      `Message:`,
      message.trim(),
      ``,
      `---`,
      `Submitted: ${timestamp}`,
    ].join("\n"),
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #F05537 0%, #f97316 100%); padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h2 style="margin: 0; color: white; font-size: 20px;">New Contact Form Submission</h2>
        </div>
        <div style="background: #1a1a2e; padding: 32px; border-radius: 0 0 12px 12px; color: #e0e0e0;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #999; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: white; font-weight: 600;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email.trim()}" style="color: #F05537;">${email.trim()}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Subject</td>
              <td style="padding: 8px 0; color: white;">${subjectLine}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
          <div style="color: #e0e0e0; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</div>
          <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px; margin: 0;">Submitted ${timestamp}</p>
        </div>
      </div>
    `,
  }).catch((err: any) => console.error("SMTP send failed:", err));
});

export default router;
