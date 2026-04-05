import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Rocket, Globe, Terminal, MapPin, Users, BookOpen, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
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
            <span className="text-muted-foreground">Share the work.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Vibe coding isn't about perfectly architected monoliths or memorizing syntax. It's about flow state. It's about having an idea at 10 PM and a working prototype by 2 AM using AI.
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
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-mono uppercase">Status</p>
                  <p className="font-bold text-foreground text-sm">The Shipping Cycle Has Begun</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed font-light">
              We believe your first build belongs on stage too. Whether you're a founder prototyping an MVP, a designer exploring interactions, or a student shipping your first app — this is your arena.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-light">
              Vibe Code 101 is the creative, community-driven builder experience where beginners, creators, and founders come together to learn vibe coding, submit projects, and earn recognition.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2]">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Rocket className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2 text-foreground">Learn Fast</h4>
                  <p className="text-sm text-muted-foreground font-light">Stop watching tutorials. Start building with context-aware AI tools.</p>
                </div>
              </div>
              <div className="holo-card holo-glow group p-6 transition-all hover:-translate-y-0.5">
                <div className="relative z-[2]">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 text-secondary" />
                  </div>
                  <h4 className="font-bold mb-2 text-foreground">Ship Faster</h4>
                  <p className="text-sm text-muted-foreground font-light">Push to production immediately. No fear, just momentum.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: "3-Day Event", value: "3", suffix: "Days", icon: Flame, desc: "Of non-stop building and learning" },
            { label: "500+ Builders", value: "500+", suffix: "Builders", icon: Users, desc: "From beginners to seasoned devs" },
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

        <div className="holo-card holo-glow group">
          <div className="relative z-[2] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">Orlando, FL — International Drive</h3>
              <p className="text-muted-foreground font-light">
                In the heart of Orlando's entertainment corridor. Easy access from MCO airport, surrounded by hotels, restaurants, and everything you need for a weekend of building.
              </p>
            </div>
            <Button onClick={() => window.open("https://maps.google.com/?q=International+Drive+Orlando+FL", "_blank")} className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shrink-0">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
