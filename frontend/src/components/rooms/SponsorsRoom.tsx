import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, CheckCircle2, Mail, Megaphone, Star, Users, Mic, Zap, Coffee, Moon, Crown, Plus, FileDown } from "lucide-react";
import { useSpatial } from "@/components/spatial/SpatialProvider";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;

const tiers = [
  {
    name: "Community",
    price: "$3,500",
    availability: "Unlimited",
    highlight: "Believable entry point with real visibility",
    perks: [
      "VIP Team Passes",
      "Branded Entryway Placement",
      "Digital Listing",
      "10 Email Marketing Mentions",
      "Lightning Talk (5 min)",
      "Opt-In Lead Access",
      "Award Presentation Slot",
      "Initial Social Shoutout",
      "1 Mobile Push Alert",
      "Post-Show Video Logo Credit",
      "Standard Logo Tiering",
      "Discord Sponsor Role",
      "10 VIP After Party Invites",
    ],
    badge: "",
    accent: "bg-gray-800 text-white dark:bg-muted dark:text-muted-foreground",
    icon: Users,
  },
  {
    name: "Gold",
    price: "$10,000",
    availability: "10 Spots",
    highlight: "Strong mid-tier with keynote access and branded space",
    perks: [
      "VIP Team Passes",
      "Branded Co-working Space",
      "Featured Digital Listing",
      "30 Email Marketing Mentions",
      "Keynote Presentation (15 min)",
      "Opt-In Lead Access",
      "Award Presentation Slot",
      "Dedicated Social Post",
      "3 Mobile Push Alerts",
      "Post-Show Video Logo Credit",
      "Featured Logo Tiering",
      "Branded Discord Channel",
      "Standard Project Showcase Listing",
      "15 VIP After Party Invites",
    ],
    badge: "Most Balanced Tier",
    accent: "bg-amber-600 text-white dark:bg-yellow-500/20 dark:text-yellow-400",
    icon: Megaphone,
  },
  {
    name: "Headliner",
    price: "$35,000",
    availability: "1 Exclusive",
    highlight: "Total exclusivity — title sponsor of the entire event",
    perks: [
      "VIP Team Passes",
      "Title Sponsor Placement",
      "Primary Digital Listing",
      "Lead Email Placement",
      "Keynote Presentation (15 min)",
      "CRM-Ready Lead Access",
      "Custom Named Award",
      "Full Social Media Campaign",
      "5 Mobile Push Alerts",
      "15s Post-Show Bumper Ad",
      "Primary Banner Logo",
      "Discord Partner Category",
      "Priority Project Showcase Spotlight",
      "25+ VIP After Party Invites",
    ],
    badge: "One Exclusive Placement",
    accent: "bg-gradient-to-r from-primary to-secondary text-white",
    icon: Star,
  },
];

const addOns = [
  { name: "Credits & License Drop", price: "$2,500", desc: "Distribute API credits, licenses, or memberships directly to 500+ attendees.", icon: Zap },
  { name: "Inbox Authority Campaign", price: "$3,500", desc: "Dedicated sponsor messaging across pre-show, live event, and post-show communications.", icon: Mail },
  { name: "MasterClass+ Branding", price: "$5,000", desc: "Sponsor an expert session with MC recognition and dedicated session-level branding.", icon: Mic },
  { name: "API Bounty Hunter", price: "$6,000", desc: "Power a 48-hour build challenge around your stack with closing ceremony recognition.", icon: Crown },
  { name: "Localhost Coffee Bar", price: "$8,500", desc: "Brand the highest-traffic caffeine stop at the event with a sponsor-led coffee experience.", icon: Coffee },
  { name: "The Night Shift Mixer", price: "$10,000", desc: "Title sponsor the late-night builder session with integrated signage and energy branding.", icon: Moon },
];

export default function SponsorsRoom() {
  const { navigateToRoom } = useSpatial();
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 text-white bg-amber-600 border-amber-600 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30 px-3 py-1 rounded-full text-sm">
            <Handshake className="w-3.5 h-3.5 mr-2 inline" /> Sponsorships
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Sponsor Vibe Code Expo</h2>
          <p className="text-xl text-muted-foreground font-light mb-6">
            Put your brand in front of 500+ builders, developers, and founders. Inaugural rates for partners who commit early.
          </p>
          <Button
            variant="outline"
            onClick={() => window.open(`${BASE}VibeCode101_Sponsorship_Proposal.pdf`, "_blank")}
            className="rounded-full holo-border relative border-border dark:border-white/30 text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10"
          >
            <FileDown className="w-4 h-4 mr-2" />
            <span className="relative z-[2]">Download Sponsorship Proposal (PDF)</span>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {tiers.map((tier, i) => (
            <div key={i} className={cn("holo-card holo-glow group flex flex-col transition-all hover:-translate-y-1", tier.name === "Headliner" && "holo-specular")}>
              <div className="relative z-[2] p-8 flex-1 flex flex-col">
                {tier.badge && (
                  <div className="absolute -top-3 right-6">
                    <Badge className="bg-primary text-white border-none px-3 py-1 shadow-lg text-xs font-semibold">{tier.badge}</Badge>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-bold ${tier.accent}`}>
                    {tier.name}
                  </div>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <p className="text-xs text-muted-foreground mt-1">{tier.availability}</p>
                </div>
                <p className="text-muted-foreground font-light text-sm mb-6">{tier.highlight}</p>
                <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                  {tier.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-muted-foreground font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => window.location.href = `mailto:founders@vibecode-101.com?subject=${tier.name}%20Sponsorship%20-%20Vibe%20Code%20Expo%202026`}
                  className={cn(
                    "w-full rounded-full",
                    tier.name === "Headliner"
                      ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(235,90,30,0.3)]"
                      : "holo-border relative border-border dark:border-white/30 text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10"
                  )}
                  variant={tier.name === "Headliner" ? "default" : "outline"}
                >
                  <span className="relative z-[2]">Inquire Now</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-3">Elite Add-Ons</h3>
            <p className="text-lg text-muted-foreground font-light">
              Optional activations to deepen exposure and create memorable sponsor moments.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, i) => (
              <div key={i} className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <addon.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-bold text-foreground">{addon.price}</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">{addon.name}</h4>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{addon.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="holo-card holo-glow holo-specular group">
          <div className="relative z-[2] p-10 md:p-14 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">Let's Build Something Worth Showing Up For</h3>
            <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Partner with Vibe Code Expo and put your brand in front of builders, founders, and technical teams shaping what gets adopted next.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={() => window.location.href = "mailto:founders@vibecode-101.com?subject=Sponsorship%20Inquiry%20-%20Vibe%20Code%20Expo%202026"} className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-[0_0_20px_rgba(235,90,30,0.3)]">
                <Mail className="w-5 h-5 mr-2" /> founders@vibecode-101.com
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open(`${BASE}VibeCode101_Sponsorship_Proposal.pdf`, "_blank")} className="rounded-full holo-border relative border-border dark:border-white/30 text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10">
                <FileDown className="w-5 h-5 mr-2" />
                <span className="relative z-[2]">Download Proposal</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
