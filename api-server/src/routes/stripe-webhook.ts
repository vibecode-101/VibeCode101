import { Router, type Request, type Response } from "express";
import Stripe from "stripe";
import { createTransport } from "nodemailer";

const router = Router();

const TIER_DETAILS: Record<string, { name: string; emoji: string; perks: string[] }> = {
  general: {
    name: "General",
    emoji: "🎟️",
    perks: ["Masterclass Access", "WiFi & Workspace", "Event Swag", "Community Voting", "Discord Access"],
  },
  builder_pro: {
    name: "Builder Pro",
    emoji: "🚀",
    perks: [
      "Everything in General & Beginner",
      "Sponsor Perks (licenses, credits)",
      "1-on-1 Mentor Sessions",
      "Live & Post-Event Livestreams",
      "Priority Seating",
      "Pro Showcase & Web Feature",
    ],
  },
  beginner: {
    name: "Beginner Track",
    emoji: "🌱",
    perks: [
      "Everything in General",
      "9-Module Guided Pathway",
      "Project Reviews from Mentors",
      "Beginner Swag Pack",
      "Beginner Showcase Slot",
    ],
  },
};

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

function getTransporter() {
  return createTransport({
    host: "box.electronero.org",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
}

function buildConfirmationEmail(
  customerName: string,
  customerEmail: string,
  tier: string,
  quantity: number,
  amountPaid: string,
  confirmationId: string
): { subject: string; text: string; html: string } {
  const tierInfo = TIER_DETAILS[tier] || TIER_DETAILS.general;
  const subject = `${tierInfo.emoji} You're in! Vibe Code Expo — ${tierInfo.name} Ticket Confirmed`;

  const perksText = tierInfo.perks.map((p) => `  ✓ ${p}`).join("\n");
  const text = `Hey ${customerName}!

You're officially registered for Vibe Code Expo!

TICKET DETAILS
Tier: ${tierInfo.name}
Quantity: ${quantity}
Amount Paid: ${amountPaid}
Confirmation: ${confirmationId}

EVENT DETAILS
Date: June 5-7, 2026 (Friday–Sunday)
Location: International Drive, Orlando, FL
(Exact venue details will be shared closer to the event)

YOUR PERKS:
${perksText}

WHAT TO BRING:
A laptop is welcome but not required. If you're presenting, event hardware is available.

WHAT'S NEXT:
1. Join the Discord community (link coming soon)
2. Mark your calendar for June 5-7, 2026
3. Keep an eye on your inbox for venue details and schedule updates

Questions? Reply to this email or reach us at founders@vibecode-101.com

See you in Orlando! 🌴
— The Vibe Code Expo Team`;

  const perksHtml = tierInfo.perks
    .map(
      (p) =>
        `<tr><td style="padding: 8px 0; color: #e0e0e0; font-size: 15px;">
          <span style="color: #F05537; margin-right: 8px;">✓</span> ${p}
        </td></tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #0a0a1a; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">

    <!-- Header with gradient -->
    <div style="background: linear-gradient(135deg, #F05537 0%, #f97316 50%, #F05537 100%); border-radius: 16px 16px 0 0; padding: 40px 32px; text-align: center;">
      <div style="margin-bottom: 16px;">
        <span style="font-size: 48px;">${tierInfo.emoji}</span>
      </div>
      <h1 style="margin: 0 0 8px 0; color: white; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">You're In!</h1>
      <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300;">Welcome to Vibe Code Expo, ${customerName}</p>
    </div>

    <!-- Ticket Card -->
    <div style="background: linear-gradient(180deg, #12122a 0%, #1a1a35 100%); padding: 0; border-left: 1px solid rgba(240,85,55,0.2); border-right: 1px solid rgba(240,85,55,0.2);">

      <!-- Confirmation Details -->
      <div style="padding: 32px; border-bottom: 1px dashed rgba(255,255,255,0.1);">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0;">
              <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Ticket Tier</span><br/>
              <span style="color: white; font-size: 20px; font-weight: 700;">${tierInfo.name}</span>
            </td>
            <td style="padding: 12px 0; text-align: right;">
              <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Amount Paid</span><br/>
              <span style="color: #F05537; font-size: 20px; font-weight: 700;">${amountPaid}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0;">
              <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Quantity</span><br/>
              <span style="color: white; font-size: 16px; font-weight: 600;">${quantity} ticket${quantity > 1 ? "s" : ""}</span>
            </td>
            <td style="padding: 12px 0; text-align: right;">
              <span style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Confirmation</span><br/>
              <span style="color: white; font-size: 14px; font-weight: 600; font-family: monospace;">${confirmationId}</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Event Details -->
      <div style="padding: 32px; border-bottom: 1px dashed rgba(255,255,255,0.1);">
        <h2 style="margin: 0 0 20px 0; color: white; font-size: 18px; font-weight: 700;">
          <span style="color: #F05537;">📅</span> Event Details
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #888; width: 100px; font-size: 14px;">Date</td>
            <td style="padding: 8px 0; color: white; font-size: 14px; font-weight: 600;">June 5–7, 2026 (Fri–Sun)</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 14px;">Location</td>
            <td style="padding: 8px 0; color: white; font-size: 14px; font-weight: 600;">International Drive, Orlando, FL</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 14px;">Bring</td>
            <td style="padding: 8px 0; color: white; font-size: 14px;">Laptop welcome, not required</td>
          </tr>
        </table>
      </div>

      <!-- Perks -->
      <div style="padding: 32px; border-bottom: 1px dashed rgba(255,255,255,0.1);">
        <h2 style="margin: 0 0 20px 0; color: white; font-size: 18px; font-weight: 700;">
          <span style="color: #F05537;">🎁</span> What's Included
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          ${perksHtml}
        </table>
      </div>

      <!-- 3-Day Schedule Preview -->
      <div style="padding: 32px; border-bottom: 1px dashed rgba(255,255,255,0.1);">
        <h2 style="margin: 0 0 20px 0; color: white; font-size: 18px; font-weight: 700;">
          <span style="color: #F05537;">🗓️</span> 3-Day Schedule Preview
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; vertical-align: top;">
              <span style="display: inline-block; background: #F05537; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 99px; margin-bottom: 6px;">DAY 1 — FRI</span><br/>
              <span style="color: #ccc; font-size: 13px; line-height: 1.6;">Opening Keynote → Modules 1-3 (Setup, UI, Logic) → Networking Mixer</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;">
              <span style="display: inline-block; background: #f97316; color: white; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 99px; margin-bottom: 6px;">DAY 2 — SAT</span><br/>
              <span style="color: #ccc; font-size: 13px; line-height: 1.6;">Modules 4-6 (Backend, AI, AI Agents) → Masterclasses → Project Work Time</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; vertical-align: top;">
              <span style="display: inline-block; background: #eab308; color: #1a1a1a; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 99px; margin-bottom: 6px;">DAY 3 — SUN</span><br/>
              <span style="color: #ccc; font-size: 13px; line-height: 1.6;">Modules 7-9 (Polish, Ship, Pitch) → Project Submissions → Demo Day → Awards 🏆</span>
            </td>
          </tr>
        </table>
      </div>

      <!-- What's Next -->
      <div style="padding: 32px;">
        <h2 style="margin: 0 0 20px 0; color: white; font-size: 18px; font-weight: 700;">
          <span style="color: #F05537;">⚡</span> What's Next
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #e0e0e0; font-size: 14px;">
              <span style="display: inline-block; background: rgba(240,85,55,0.15); color: #F05537; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; font-weight: 700; font-size: 12px; margin-right: 10px;">1</span>
              Join the Discord community (link coming soon!)
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #e0e0e0; font-size: 14px;">
              <span style="display: inline-block; background: rgba(240,85,55,0.15); color: #F05537; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; font-weight: 700; font-size: 12px; margin-right: 10px;">2</span>
              Mark your calendar — June 5–7, 2026
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #e0e0e0; font-size: 14px;">
              <span style="display: inline-block; background: rgba(240,85,55,0.15); color: #F05537; width: 24px; height: 24px; line-height: 24px; text-align: center; border-radius: 50%; font-weight: 700; font-size: 12px; margin-right: 10px;">3</span>
              Watch your inbox for venue details & schedule updates
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- Footer -->
    <div style="background: #08081a; border-radius: 0 0 16px 16px; padding: 24px 32px; text-align: center; border-left: 1px solid rgba(240,85,55,0.1); border-right: 1px solid rgba(240,85,55,0.1); border-bottom: 1px solid rgba(240,85,55,0.1);">
      <p style="margin: 0 0 8px 0; color: #888; font-size: 13px;">
        Questions? Email <a href="mailto:founders@vibecode-101.com" style="color: #F05537; text-decoration: none;">founders@vibecode-101.com</a>
      </p>
      <p style="margin: 0; color: #555; font-size: 11px;">
        Vibe Code Expo by AiAssist.net · Orlando, FL · vibecode-expo.com
      </p>
    </div>

    <!-- See you there -->
    <div style="text-align: center; padding: 32px 0;">
      <p style="color: #666; font-size: 14px; margin: 0;">See you in Orlando! 🌴</p>
    </div>
  </div>
</body>
</html>`;

  return { subject, text, html };
}

router.post("/", async (req: Request, res: Response) => {
  const stripe = getStripe();
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    res.status(400).json({ error: "Missing stripe-signature header" });
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    res.status(500).json({ error: "Webhook not configured" });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    res.status(400).json({ error: "Invalid signature" });
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Attendee";
    const tier = session.metadata?.tier || "general";
    const quantity = parseInt(session.metadata?.quantity || "1");
    const amountPaid = `$${((session.amount_total || 0) / 100).toFixed(2)}`;
    const confirmationId = `VC-${session.id.slice(-8).toUpperCase()}`;

    console.log(`Ticket purchased: ${tier} x${quantity} by ${customerEmail} — ${amountPaid}`);

    if (customerEmail) {
      try {
        const transporter = getTransporter();
        const email = buildConfirmationEmail(customerName, customerEmail, tier, quantity, amountPaid, confirmationId);

        await transporter.sendMail({
          from: `"Vibe Code Expo" <founders@vibecode-101.com>`,
          to: customerEmail,
          replyTo: "founders@vibecode-101.com",
          subject: email.subject,
          text: email.text,
          html: email.html,
        });

        await transporter.sendMail({
          from: `"Vibe Code Expo" <founders@vibecode-101.com>`,
          to: "founders@vibecode-101.com",
          subject: `🎟️ New Ticket Sale: ${TIER_DETAILS[tier]?.name || tier} x${quantity} — ${amountPaid}`,
          text: `New ticket purchase!\n\nName: ${customerName}\nEmail: ${customerEmail}\nTier: ${TIER_DETAILS[tier]?.name || tier}\nQuantity: ${quantity}\nAmount: ${amountPaid}\nConfirmation: ${confirmationId}\nStripe Session: ${session.id}`,
        });

        console.log(`Confirmation email sent to ${customerEmail}`);
      } catch (err) {
        console.error("Failed to send confirmation email:", err);
      }
    }
  }

  res.json({ received: true });
});

export default router;
