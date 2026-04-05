import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Ticket, CheckCircle2, Users, Clock, Loader2 } from "lucide-react";
import { useState } from "react";

const isEarlyBird = import.meta.env.VITE_PRICING_PHASE !== "regular";

const tiers = [
  {
    slug: "general",
    name: "General",
    description: "Masterclass access, WiFi, swag, and community voting.",
    earlyBird: 49,
    regular: 79,
    perks: ["Masterclass Access", "WiFi & Workspace", "Event Swag", "Community Voting", "Discord Access"],
    cta: "Get General",
    accent: "primary" as const,
    featured: false,
  },
  {
    slug: "builder_pro",
    name: "Builder Pro",
    description: "Everything you need to ship your best work.",
    earlyBird: 149,
    regular: 249,
    perks: ["Everything in General & Beginner", "Sponsor Perks (licenses, credits)", "1-on-1 Mentor Sessions", "Live & Post-Event Livestreams", "Priority Seating", "Pro Showcase & Web Feature"],
    cta: "Get Builder Pro",
    accent: "secondary" as const,
    featured: true,
  },
  {
    slug: "beginner",
    name: "Beginner Track",
    description: "Guided pathway from zero to shipped project.",
    earlyBird: 89,
    regular: 129,
    perks: ["Everything in General", "9-Module Guided Pathway", "Project Reviews from Mentors", "Beginner Swag Pack", "Beginner Showcase Slot"],
    cta: "Get Beginner",
    accent: "primary" as const,
    featured: false,
  },
];

const pricingFaqs = [
  { q: "Can I upgrade my ticket later?", a: "Yes! You can upgrade from General to Builder Pro or Beginner Track at any time before the event. Just pay the difference." },
  { q: "Are refunds available?", a: "Full refunds are available up to 14 days before the event. After that, tickets are transferable to another attendee." },
  { q: "Do group discounts stack with early bird pricing?", a: "Group discounts apply to the current ticket price. If early bird pricing is active, your group discount applies on top of that." },
  { q: "What's included in the ticket price?", a: "All tickets include access to masterclasses, WiFi, event swag, and sponsor perks like memberships, software licenses, and API credits/tokens. Builder Pro and Beginner Track add additional perks as listed." },
  { q: "What do I need to bring?", a: "A laptop is welcome but not required. If you're selected or qualified to present, you can use our hardware on stage. Just bring yourself and your ideas — we've got the rest covered." },
  { q: "Is this beginner-friendly?", a: "Absolutely. The Beginner Track is designed for people with zero coding experience. You'll follow a guided 9-module pathway with mentor project reviews along the way." },
  { q: "Where is the event held?", a: "The event takes place in Orlando, FL on International Drive. Exact venue details will be shared with ticket holders closer to the event." },
  { q: "Can I attend virtually?", a: "This is an in-person event, but Builder Pro ticket holders get access to live and post-event livestreams of select sessions — so you can rewatch or catch anything you missed." },
];

function PriceDisplay({ earlyBird, regular }: { earlyBird: number; regular: number }) {
  if (isEarlyBird) {
    return (
      <div className="mb-8">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-6xl font-bold text-foreground dark:text-white">${earlyBird}</span>
          <span className="text-2xl text-muted-foreground dark:text-white/40 line-through">${regular}</span>
        </div>
        <span className="text-muted-foreground dark:text-white/60 text-lg">/weekend</span>
      </div>
    );
  }
  return (
    <div className="mb-8">
      <span className="text-6xl font-bold text-foreground dark:text-white">${regular}</span>
      <span className="text-muted-foreground dark:text-white/60 text-lg ml-1">/weekend</span>
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
            <Badge className="bg-primary text-white border-none px-4 py-1.5 shadow-lg text-base font-semibold">Most Popular</Badge>
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
                    {item}
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
        <h3 className="text-3xl font-bold mb-3 text-foreground dark:text-white">{tier.name}</h3>
        <p className="text-muted-foreground dark:text-white/70 text-base font-light mb-6">{tier.description}</p>
        <PriceDisplay earlyBird={tier.earlyBird} regular={tier.regular} />
        <ul className="flex flex-col gap-5 mb-10 flex-1">
          {tier.perks.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-base text-foreground dark:text-white/90">
              <CheckCircle2 className={`w-6 h-6 ${checkColor} shrink-0`} />
              {item}
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
            <Ticket className="w-4 h-4 mr-2 inline" /> Tickets
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Join the Experience</h2>
          <p className="text-2xl text-muted-foreground font-light">
            Choose the tier that fits your goals. Space is limited for workshops and masterclasses.
          </p>
          {isEarlyBird && (
            <div className="mt-6 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-5 py-2.5 rounded-full text-base font-medium">
              <Clock className="w-4 h-4" />
              Early Bird Pricing — Limited Time
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12 pt-5">
          {tiers.map((tier) => (
            <TierCard key={tier.name} tier={tier} />
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
                  Bringing 5+ people? Get 15% off all tickets. Teams of 10+ get 25% off. Email <span className="text-primary font-medium">founders@vibecode-101.com</span> for custom packages.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Ticket FAQ</h3>
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
