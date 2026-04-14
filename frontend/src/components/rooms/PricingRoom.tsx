import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge, CheckCircle2, Users, Clock, Loader2, Radio, Building2, Tag, Sparkles } from "lucide-react";
import { useState } from "react";

const isEarlyBird = import.meta.env.VITE_PRICING_PHASE !== "regular";

const tiers = [
  {
    slug: "vip",
    name: "VIP",
    description: "Full access to the June 5–7 inaugural event — and every future VibeCODE event after it. One purchase, ongoing access.",
    earlyBird: 49,
    regular: 79,
    perks: [
      "AiAssist.net Pro Membership — Lifetime ($19/mo value)",
      { text: "Browse With Me — AI browser study companion. Understand, analyze & interact with any webpage in real time. Privacy-first, BYOK (11+ LLM providers). Lifetime Access.", url: "https://chromewebstore.google.com/detail/browse-with-me/nkagfgeicapojbajghpilgpckignfhpe" },
      { text: "SaaS Signal — Lead intelligence & social network radar. Scan, track, and surface high-intent prospects in real time. Lifetime Access.", url: "https://saas-signal.com" },
      "June 5–7 Inaugural Broadcast — All Sessions",
      "VibeCODE Expo Platform Account",
      "AI Matchmaking",
      "Discord Community (330+ Members)",
      "9-Module Beginner Track Pathway",
      "Demo Day Access + Community Voting",
      "Session Recordings (Post-Event)",
    ],
    cta: "Get VIP Access",
    accent: "primary" as const,
    featured: false,
    badge: null,
    roleNote: null,
  },
  {
    slug: "builder_pro",
    name: "Builder Pro",
    description: "Full platform access — everything you need to network, ship, and get seen.",
    earlyBird: 149,
    regular: 249,
    perks: [
      "Everything in VIP",
      "Full VibeCODE Expo Platform — All Rooms & Networking",
      "BYOK AI Concierge",
      "Priority Q&A in All Masterclasses",
      "Pro Showcase Listing",
      "Sponsor Perks — Licenses, Credits & API Tokens",
    ],
    cta: "Get Builder Pro",
    accent: "secondary" as const,
    featured: true,
    badge: "Most Popular",
    roleNote: null,
  },
  {
    slug: "mentor",
    name: "Mentor",
    description: "Lead the cohort. Host study groups, run office hours, and guide builders through the 9-module pathway.",
    earlyBird: 99,
    regular: 149,
    perks: [
      "Everything in VIP",
      "Host Study Groups & Office Hours on VibeCODE Expo",
      "Guide Beginner Track Cohort Builders",
      "Mentor Badge on VibeCODE Expo Profile",
    ],
    cta: "Become a Mentor",
    accent: "primary" as const,
    featured: false,
    badge: null,
    roleNote: "Role tier — for guides, educators & community leaders",
  },
  {
    slug: "sponsor",
    name: "Sponsor",
    description: "Virtual exhibitor presence — booth, logo placement, session slot opportunity, and attendee lead access.",
    earlyBird: 299,
    regular: 499,
    perks: [
      "Everything in Builder Pro",
      "Virtual Exhibitor Booth on VibeCODE Expo",
      "Logo Placement — VibeCODE 101 + VibeCODE Expo Sponsor Section",
      "Sponsored Session Slot Opportunity",
      "Exhibitor Badge + Attendee Lead Access",
    ],
    cta: "Become a Sponsor",
    accent: "primary" as const,
    featured: false,
    badge: null,
    roleNote: null,
  },
];

const pricingFaqs = [
  {
    q: "What is a Lifetime Deal?",
    a: "A Lifetime Deal (LTD) means you pay once and your tier is locked in for every future VibeCODE event — no renewals, no annual fees. Buy VIP once and you're VIP at every VibeCODE event, forever.",
  },
  {
    q: "Is this a virtual event or in-person?",
    a: "Virtual-first. The inaugural event is June 5–7, 2026 — a live 3-day broadcast where every session, masterclass, and demo day streams simultaneously to attendees worldwide. This is a recurring platform: monthly organized events run ongoing after the inaugural weekend. Sponsors and exhibitors own their space across all events, not just one. We also have an in-person hub launching in Orlando, FL (International Drive). Hub badges are a separate add-on.",
  },
  {
    q: "What do all badges include?",
    a: "All badge tiers include: a lifetime AiAssist.net Pro membership ($19/mo value — $228/year), the June 5–7 inaugural broadcast, your VibeCODE Expo platform account, AI matchmaking, Discord community access (330+ members), the complete 9-module Beginner Track pathway, Demo Day access and community voting, and post-event session recordings — plus access to all future VibeCODE events.",
  },
  {
    q: "What is the Mentor tier?",
    a: "The Mentor tier is a role-based badge, not a content upgrade. It's for guides, educators, and community leaders who want to host study groups, run office hours, and guide builders through the 9-module pathway on VibeCODE Expo. Mentors get everything in VIP plus the ability to lead cohorts.",
  },
  {
    q: "Can I upgrade my badge after purchase?",
    a: "Yes. You can upgrade from VIP to Builder Pro, Mentor, or Sponsor at any time. Just pay the difference between your current tier and the new one.",
  },
  {
    q: "Are refunds available?",
    a: "Full refunds are available up to 14 days before the event. After that, badges are transferable to another attendee.",
  },
  {
    q: "Do group discounts apply to early bird pricing?",
    a: "Yes. Group discounts stack on top of the current badge price. If early bird pricing is active, your group discount applies on top of that.",
  },
  {
    q: "What do I need to participate?",
    a: "A laptop and a solid internet connection. The entire event runs in your browser — no special software required. Everything is accessible through the VibeCODE Expo platform.",
  },
  {
    q: "Will sessions be recorded?",
    a: "Yes. All keynotes and masterclasses are recorded and made available post-event through the platform for all badge holders.",
  },
  {
    q: "What about the in-person hub?",
    a: "The inaugural in-person hub is in Orlando, FL on International Drive. Hub attendees watch the live broadcast together, with workspace, food, drinks, and the local community experience. Hub badges are a separate add-on. More cities are coming — email founders@vibecode-101.com to bring a hub to your city.",
  },
];

function PriceDisplay({ earlyBird, regular }: { earlyBird: number; regular: number }) {
  if (isEarlyBird) {
    return (
      <div className="mb-8">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-6xl font-bold text-foreground dark:text-white">${earlyBird}</span>
          <span className="text-2xl text-muted-foreground dark:text-white/40 line-through">${regular}</span>
        </div>
        <span className="text-muted-foreground dark:text-white/60 text-sm font-mono uppercase tracking-widest">Lifetime Deal</span>
      </div>
    );
  }
  return (
    <div className="mb-8">
      <span className="text-6xl font-bold text-foreground dark:text-white">${regular}</span>
      <span className="text-muted-foreground dark:text-white/60 text-sm font-mono uppercase tracking-widest ml-2">Lifetime Deal</span>
    </div>
  );
}

function TierCard({ tier }: { tier: typeof tiers[0] }) {
  const checkColor = tier.accent === "secondary" ? "text-secondary" : "text-primary";
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const BASE = import.meta.env.BASE_URL;
      const res = await fetch(`${BASE}api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tier.slug, quantity: 1 }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Could not connect to checkout. Please try again.");
      setLoading(false);
    }
  };

  if (tier.featured) {
    return (
      <div className="relative flex flex-col">
        <div className="absolute -inset-0.5 bg-gradient-to-b from-primary to-secondary rounded-[2rem] blur-sm opacity-50"></div>
        <div className="relative z-10 h-full flex flex-col">
          <div className="absolute top-0 right-8 transform -translate-y-1/2 z-[20]">
            <Badge className="bg-primary text-white border-none px-4 py-1.5 shadow-lg text-base font-semibold">{tier.badge}</Badge>
          </div>
          <div className="holo-card holo-specular h-full p-10 flex flex-col shadow-[0_0_40px_rgba(235,90,30,0.15)]" style={{ borderColor: "hsl(var(--primary) / 0.3)" }}>
            <div className="relative z-[2] flex-1 flex flex-col">
              <h3 className="text-3xl font-bold mb-3 text-foreground dark:text-white">{tier.name}</h3>
              <p className="text-muted-foreground dark:text-white/70 text-base font-light mb-6">{tier.description}</p>
              <PriceDisplay earlyBird={tier.earlyBird} regular={tier.regular} />
              <ul className="flex flex-col gap-5 mb-10 flex-1">
                {tier.perks.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-base text-foreground dark:text-white/90">
                    <CheckCircle2 className={`w-6 h-6 ${checkColor} shrink-0`} />
                    {typeof item === "string" ? item : (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">{item.text}</a>
                    )}
                  </li>
                ))}
              </ul>
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full h-14 rounded-full bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(235,90,30,0.3)] text-base font-semibold disabled:opacity-50"
              >
                {loading ? <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Processing...</> : tier.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="holo-card holo-glow group p-10 flex flex-col">
      <div className="relative z-[2] flex-1 flex flex-col">
        <h3 className="text-3xl font-bold mb-2 text-foreground dark:text-white">{tier.name}</h3>
        {tier.roleNote && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary/80 bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {tier.roleNote}
            </span>
          </div>
        )}
        <p className="text-muted-foreground dark:text-white/70 text-base font-light mb-6">{tier.description}</p>
        <PriceDisplay earlyBird={tier.earlyBird} regular={tier.regular} />
        <ul className="flex flex-col gap-5 mb-10 flex-1">
          {tier.perks.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-base text-foreground dark:text-white/90">
              <CheckCircle2 className={`w-6 h-6 ${checkColor} shrink-0`} />
              {typeof item === "string" ? item : (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary transition-colors">{item.text}</a>
              )}
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          onClick={handleCheckout}
          disabled={loading}
          className="w-full h-14 rounded-full border-border dark:border-white/30 text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10 holo-border relative text-base disabled:opacity-50"
        >
          <span className="relative z-[2]">{loading ? <><Loader2 className="w-5 h-5 animate-spin mr-2 inline" /> Processing...</> : tier.cta}</span>
        </Button>
      </div>
    </div>
  );
}

export default function PricingRoom() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 text-white bg-primary border-primary px-4 py-1.5 rounded-full text-base">
            <Badge className="w-4 h-4 mr-2 inline" /> Lifetime Deal
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Join the Experience</h2>
          <p className="text-2xl text-muted-foreground font-light">
            Buy once. Attend every future VibeCODE event. Pick the tier that fits your role.
          </p>
          {isEarlyBird && (
            <div className="mt-6 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-5 py-2.5 rounded-full text-base font-medium">
              <Clock className="w-4 h-4" />
              Early Bird Pricing — Limited Time
            </div>
          )}
        </div>

        <div className="mb-8 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <div className="relative z-[2] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-mono uppercase tracking-widest text-primary mb-1">Included with every badge</p>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  AiAssist.net Pro Membership — Lifetime
                </h3>
                <p className="text-sm text-muted-foreground font-light">
                  Every badge includes a lifetime AiAssist.net Pro membership. That's <strong className="text-foreground">$19/mo</strong> — <strong className="text-foreground">$228/year</strong> — yours forever. At VIP pricing, the membership alone covers your badge cost 4x over in year one.
                </p>
              </div>
              <div className="shrink-0 text-center">
                <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest mb-1">Value / year</p>
                <p className="text-4xl font-bold text-primary">$228</p>
                <p className="text-xs text-muted-foreground">AiAssist.net Pro alone</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10 max-w-6xl mx-auto">
          <div className="holo-card holo-glow group">
            <div className="relative z-[2] p-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="flex gap-6 items-center shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Radio className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">Virtual</span>
                </div>
                <div className="text-xl text-muted-foreground font-light">+</div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">In-Person</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground mb-1">Hybrid Event — Virtual-First</h3>
                <p className="text-sm text-muted-foreground font-light">
                  All badges include full access to the live-broadcast virtual event. An in-person hub add-on is available for the <strong className="text-foreground">Orlando, FL</strong> inaugural location — watch the live broadcast together with your local community.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 pt-5">
          {tiers.map((tier) => (
            <TierCard key={tier.slug} tier={tier} />
          ))}
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="holo-card holo-glow group">
            <div className="relative z-[2] p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">Group Discounts</h3>
                <p className="text-base text-muted-foreground font-light">
                  Bringing 5+ people? Get 15% off all badges. Teams of 10+ get 25% off. Email <span className="text-primary font-medium">founders@vibecode-101.com</span> for custom packages.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Badge FAQ</h3>
          <Accordion type="single" collapsible className="w-full">
            {pricingFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-xl hover:text-primary transition-colors py-6 font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6 text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
