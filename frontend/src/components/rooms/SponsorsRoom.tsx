import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Handshake, CheckCircle2, Mail, Megaphone, Star, Users, Mic, Zap, Crown, FileDown, Sparkles } from "lucide-react";
import { useSpatial } from "@/components/spatial/SpatialProvider";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;

const tiers = [
  {
    name: "Community",
    price: "$3,500",
    availability: "Unlimited spots",
    highlight: "Verified placement inside a live builder platform — not just a logo on a PDF",
    perks: [
      "AI Matchmaking for your team",
      "Digital Booth in Sponsor Row (live views + click tracking)",
      "Banner ad slot — full-width strip on Schedule & Discover pages",
      "Strip ad slot — one-liner placement inside room listings",
      "Logo in scrolling Sponsor Marquee (landing + lobby)",
      "1 Floor Ticker message — seen by every attendee on the conference floor",
      "AI Concierge brand mention",
      "Sponsor Dashboard access (impressions, clicks, CTR, booth occupancy)",
      "1 Mobile Push Notification to all registered attendees",
      "Discord Sponsor Role",
      "Lightning Talk slot (5 min)",
      "Post-event session recording credit",
    ],
    badge: "",
    accent: "bg-gray-800 text-white dark:bg-muted dark:text-muted-foreground",
    icon: Users,
  },
  {
    name: "Gold",
    price: "$10,000",
    availability: "10 spots available",
    highlight: "Priority placement across every major surface in the app with real analytics",
    perks: [
      "Priority Matchmaking for your team",
      "Featured Digital Booth — priority placement in Sponsor Row",
      "Banner + Sidebar + Inline Card ad slots (all three in-app formats)",
      "Full-format SponsorAdCard (16:9 and 1:1 creatives in room grid rotation)",
      "Double-weight logo in Sponsor Marquee",
      "3 Floor Ticker message slots with custom copy",
      "Lobby Feature Card — visible to every attendee on login",
      "AI Concierge spotlight (brand surfaced in relevant responses)",
      "Sponsor Dashboard with enhanced click-path analytics",
      "Keynote Presentation (15 min) + Live Q&A slot",
      "3 Mobile Push Notifications",
      "Dedicated social post",
      "Branded Discord channel",
      "Project Showcase listing",
      "Post-event recording with sponsor intro bumper",
    ],
    badge: "Most Balanced Tier",
    accent: "bg-amber-600 text-white dark:bg-yellow-500/20 dark:text-yellow-400",
    icon: Megaphone,
  },
  {
    name: "Headliner",
    price: "$35,000",
    availability: "1 exclusive spot",
    highlight: "Every placement, every format, every screen — you are the event",
    perks: [
      "Guaranteed Matchmaking for your team",
      "Primary Digital Booth — top slot, custom room branding",
      "All 4 ad slot formats: Banner, Sidebar, Inline Card, Strip",
      "All SponsorAdCard formats: 16:9, 1:1, 4:5, 9:16 creatives",
      "Headliner badge (HL) in Sponsor Marquee — exclusive tier highlight",
      "5 Floor Ticker message slots — opening day priority placement",
      "Exclusive Lobby Hero Banner — first thing every attendee sees",
      "AI Concierge Title Sponsor Badge across all attendee sessions",
      "Sponsor Lightbox auto-featured for first-time attendees",
      "Opening Ceremony feature + Keynote (30 min) + Workshop slot",
      "CRM-ready lead export (name, role, opt-in confirmation)",
      "Lead placement in all pre-show, live, and post-show emails",
      "Full analytics dashboard (views, clicks, CTR, dwell time, occupancy)",
      "5 Mobile Push Notifications",
      "15s post-event bumper ad on all session recordings",
      "Full social media campaign (pre + live + post)",
      "Custom Named Award",
      "Discord Partner Category",
      "Priority Project Showcase Spotlight",
    ],
    badge: "One Exclusive Placement",
    accent: "bg-gradient-to-r from-primary to-secondary text-white",
    icon: Star,
  },
];

const addOns = [
  { name: "Credits & License Drop",   price: "$2,500", desc: "Distribute API credits, licenses, or tool memberships directly to 500+ verified builder attendees.", icon: Zap },
  { name: "Inbox Authority Campaign", price: "$3,500", desc: "Dedicated sponsor messaging across pre-show, live, and post-show email communications to all registrants.", icon: Mail },
  { name: "MasterClass+ Branding",    price: "$5,000", desc: "Sponsor a headline expert session with MC recognition, in-room banner placement, and recording credit.", icon: Mic },
  { name: "API Bounty Hunter",        price: "$6,000", desc: "Power a 48-hour build challenge around your API or stack — with closing ceremony recognition and winner prizes.", icon: Crown },
  { name: "AI Concierge Takeover",    price: "$7,500", desc: "Your brand is featured inside the AI Concierge for the full event — product suggestions, sponsored answers, and logo placement.", icon: Sparkles },
  { name: "Lobby Hero Banner",        price: "$9,000", desc: "Exclusive full-width banner on the main lobby screen — the first thing every attendee sees when they log in.", icon: Megaphone },
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
