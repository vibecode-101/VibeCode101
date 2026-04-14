import { Router, type Request, type Response } from "express";
import Stripe from "stripe";

const router = Router();

const TIERS: Record<string, { name: string; description: string; earlyBird: number; regular: number }> = {
  vip: {
    name: "VibeCODE — VIP (Lifetime)",
    description: "Includes lifetime AiAssist.net Pro membership ($19/mo value), lifetime Browse With Me (AI browser study companion, BYOK, 11+ LLM providers), lifetime SaaS Signal (lead intelligence & social network radar), June 5–7 inaugural broadcast + every future VibeCODE event, VibeCODE Expo platform account, AI matchmaking, Discord community, 9-module pathway, Demo Day, and session recordings — locked in for life.",
    earlyBird: 4900,
    regular: 7900,
  },
  builder_pro: {
    name: "VibeCODE — Builder Pro (Lifetime)",
    description: "Everything in VIP plus full VibeCODE Expo platform access, BYOK AI Concierge, priority Q&A, Pro Showcase listing, and sponsor perks — locked in for every future VibeCODE event.",
    earlyBird: 14900,
    regular: 24900,
  },
  mentor: {
    name: "VibeCODE — Mentor (Lifetime)",
    description: "Everything in VIP plus the ability to host study groups, run office hours, guide Beginner Track builders, and carry a Mentor badge on VibeCODE Expo — for every future VibeCODE event.",
    earlyBird: 9900,
    regular: 14900,
  },
  sponsor: {
    name: "VibeCODE — Sponsor / Exhibitor (Lifetime)",
    description: "Everything in Builder Pro plus a virtual exhibitor booth, logo placement on VibeCODE 101 and VibeCODE Expo, a sponsored session slot opportunity, and attendee lead access — for every future VibeCODE event.",
    earlyBird: 29900,
    regular: 49900,
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
