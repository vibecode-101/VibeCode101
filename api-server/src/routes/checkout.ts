import { Router, type Request, type Response } from "express";
import Stripe from "stripe";

const router = Router();

const TIERS: Record<string, { name: string; description: string; earlyBird: number; regular: number }> = {
  general: {
    name: "Vibe Code 101 — General",
    description: "Masterclass Access, WiFi & Workspace, Event Swag, Community Voting, Discord Access",
    earlyBird: 4900,
    regular: 7900,
  },
  builder_pro: {
    name: "Vibe Code 101 — Builder Pro",
    description: "Everything in General & Beginner + Sponsor Perks, 1-on-1 Mentor Sessions, Livestreams, Priority Seating, Pro Showcase",
    earlyBird: 14900,
    regular: 24900,
  },
  beginner: {
    name: "Vibe Code 101 — Beginner Track",
    description: "Everything in General + 9-Module Guided Pathway, Project Reviews, Beginner Swag Pack, Showcase Slot",
    earlyBird: 8900,
    regular: 12900,
  },
};

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not configured");
  return new Stripe(key);
}

router.post("/checkout", async (req: Request, res: Response) => {
  try {
    const { tier, quantity } = req.body;

    if (!tier || !TIERS[tier]) {
      res.status(400).json({ error: `Invalid tier. Choose: ${Object.keys(TIERS).join(", ")}` });
      return;
    }

    const qty = Math.min(Math.max(parseInt(quantity) || 1, 1), 20);
    const tierData = TIERS[tier];
    const pricingPhase = process.env.VITE_PRICING_PHASE || "early_bird";
    const unitAmount = pricingPhase === "regular" ? tierData.regular : tierData.earlyBird;

    const stripe = getStripe();

    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, "") || "https://vibecode-101.com";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: tierData.name,
              description: tierData.description,
            },
            unit_amount: unitAmount,
          },
          quantity: qty,
        },
      ],
      mode: "payment",
      success_url: `${origin}?checkout=success&tier=${tier}`,
      cancel_url: `${origin}?checkout=cancelled`,
      metadata: {
        tier,
        quantity: String(qty),
        pricing_phase: pricingPhase,
      },
      allow_promotion_codes: true,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    res.status(500).json({ error: "Failed to create checkout session. Please try again." });
  }
});

export default router;
