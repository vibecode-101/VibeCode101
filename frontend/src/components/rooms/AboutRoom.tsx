import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Rocket, Globe, Terminal, MapPin, Users, BookOpen, Lightbulb, Radio, Building2 } from "lucide-react";
import { useSpatial } from "@/components/spatial/SpatialProvider";

const BASE = import.meta.env.BASE_URL;

export default function AboutRoom() {
  const { navigateToRoom } = useSpatial();
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto mb-16">
          <Badge variant="outline" className="mb-6 text-white bg-amber-600 border-amber-600 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30 px-3 py-1 rounded-full text-sm">
            <Flame className="w-3.5 h-3.5 mr-2 inline" /> About the Event
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Code the vibe.<br />
            <span className="text-muted-foreground">Live. Everywhere.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Vibe coding isn't about perfectly architected monoliths or memorizing syntax. It's about flow state. It's about having an idea at 10 PM and a working prototype by 2 AM using AI. And now it's a live event you can join from anywhere on the planet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-2xl"></div>
            <div className="holo-card holo-glow holo-specular group">
              <div className="relative z-[2] p-2 bg-card rounded-2xl">
                <img
                  src={`${BASE}about-hero.png`}
                  alt="Vibe Code 101 — The Shipping Cycle Has Begun"
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 z-20 holo-card holo-glow p-4 flex items-center gap-4">
              <div className="relative z-[2] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase">Format</p>
                  <p className="font-bold text-foreground text-sm">Live Broadcast · June 5–7, 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-light">
              Vibe Code 101 kicks off June 5–7, 2026 — a live, globally-broadcast inaugural weekend built for anyone with a laptop and an internet connection. Whether you're in your home office, a coffee shop, or one of our in-person hubs, you get the same front-row experience.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light">
              This isn't a one-time event. Sessions, masterclasses, and demo days stream live and repeat on a monthly cadence after the inaugural weekend. Sponsors own their space across every event. Builders always have somewhere to build.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2 text-foreground">Attend Anywhere</h4>
                  <p className="text-sm text-muted-foreground font-light">Join live from your browser. No flight required — just your laptop and a big idea.</p>
                </div>
              </div>
              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2]">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-bold mb-2 text-foreground">Ship Globally</h4>
                  <p className="text-sm text-muted-foreground font-light">Push to production during the event. Your project gets seen by the whole community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Inaugural Event", value: "Jun 5–7", suffix: "2026", icon: Flame, desc: "Kicks off June 5 — monthly events ongoing" },
            { label: "500+ Builders", value: "500+", suffix: "Builders", icon: Users, desc: "Joining from cities worldwide" },
            { label: "20+ Masterclasses", value: "20+", suffix: "Masterclasses", icon: Lightbulb, desc: "Industry pros guiding your build" },
            { label: "9 Modules", value: "9", suffix: "Modules", icon: BookOpen, desc: "Complete beginner pathway" },
          ].map((stat, i) => (
            <div key={i} className="holo-card holo-glow group p-6 text-center transition-all hover:-translate-y-0.5">
              <div className="relative z-[2]">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-foreground mb-1">{stat.suffix}</p>
                <p className="text-xs text-muted-foreground font-light">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="holo-card holo-glow group">
            <div className="relative z-[2] p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Radio className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-foreground mb-2">Virtual — Live Broadcast</h3>
                <p className="text-muted-foreground font-light text-sm">
                  The main event experience. Join from anywhere in the world via the VibeCODE Expo platform. All sessions, masterclasses, networking, and demo day — streamed live simultaneously.
                </p>
              </div>
            </div>
          </div>

          <div className="holo-card holo-glow group">
            <div className="relative z-[2] p-8 md:p-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 text-secondary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-foreground mb-2">In-Person Hubs</h3>
                <p className="text-muted-foreground font-light text-sm">
                  The inaugural event features a physical hub in <span className="font-medium text-foreground">Orlando, FL — International Drive</span>, with more cities coming soon. Watch the live broadcast together with your local builder community.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="holo-card holo-glow group">
          <div className="relative z-[2] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">Inaugural Hub — Orlando, FL · International Drive</h3>
              <p className="text-muted-foreground font-light">
                The first Vibe Code 101 in-person hub launches in the heart of Orlando's entertainment corridor. Easy access from MCO airport. More cities being added — is your city next?
              </p>
            </div>
            <Button onClick={() => navigateToRoom("pricing")} className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shrink-0">
              Get Your Badge
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
