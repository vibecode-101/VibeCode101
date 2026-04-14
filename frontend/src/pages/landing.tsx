import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, MapPin, Sun, Moon, Send, Sparkles, Loader2, Flame, GraduationCap, Presentation, Layers, CalendarDays, Badge, MessageCircleQuestion, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpatialProvider, RoomData } from "@/components/spatial/SpatialProvider";
import { SpatialViewport } from "@/components/spatial/SpatialViewport";
import { DoorCard } from "@/components/spatial/DoorCard";
import { useSpatial } from "@/components/spatial/SpatialProvider";
import { AIConcierge } from "@/components/AIConcierge";
import { ChatProvider, useChatContext } from "@/components/ChatProvider";
import AboutRoom from "@/components/rooms/AboutRoom";
import SyllabusRoom from "@/components/rooms/SyllabusRoom";
import MasterClassesRoom from "@/components/rooms/MasterClassesRoom";
import ProjectsRoom from "@/components/rooms/ProjectsRoom";
import ScheduleRoom from "@/components/rooms/ScheduleRoom";
import PricingRoom from "@/components/rooms/PricingRoom";
import FAQRoom from "@/components/rooms/FAQRoom";
import SponsorsRoom from "@/components/rooms/SponsorsRoom";
import PromoBriefing from "@/components/PromoBriefing";
import { NewsFeedSimulation } from "@/components/NewsFeedSimulation";
import { VirtualMeetingSimulation } from "@/components/VirtualMeetingSimulation";

const BASE = import.meta.env.BASE_URL;

const rooms: RoomData[] = [
  { slug: "about", title: "About the Event", icon: Flame, description: "Virtual-first, live globally. The philosophy, format, key stats, and in-person hub details.", category: "Overview", component: AboutRoom },
  { slug: "syllabus", title: "Full Syllabus", icon: GraduationCap, description: "9 modules from setup to demo day. The complete live beginner-to-builder pathway.", category: "Learning", component: SyllabusRoom },
  { slug: "masterclasses", title: "Master Classes", icon: Presentation, description: "Live deep dives with industry veterans. Broadcast simultaneously to every attendee.", category: "Learning", component: MasterClassesRoom },
  { slug: "projects", title: "Projects Spotlight", icon: Layers, description: "Gallery of vibe-coded projects. The global community votes. The best builds win.", category: "Community", component: ProjectsRoom },
  { slug: "schedule", title: "Event Schedule", icon: CalendarDays, description: "June 5–7 inaugural schedule — keynotes, masterclasses, demo day. Monthly events ongoing after that.", category: "Logistics", component: ScheduleRoom },
  { slug: "pricing", title: "Pricing & Badges", icon: Badge, description: "Lifetime Deal — VIP $49, Builder Pro $149, Mentor $99, Sponsor $299. Early bird pricing active.", category: "Badges", component: PricingRoom },
  { slug: "faq", title: "FAQ", icon: MessageCircleQuestion, description: "Everything you need to know — virtual format, badges, content, and in-person hubs.", category: "Help", component: FAQRoom },
  { slug: "sponsors", title: "Become a Sponsor", icon: Handshake, description: "Sponsorship packages available. Put your brand in front of a global builder audience.", category: "Partners", component: SponsorsRoom },
];

const useCountdown = (targetDate: Date) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [countDownDate]);

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return [days, hours, minutes, seconds];
};

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

const SpotlightBackground = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(235, 90, 30, 0.15), transparent 40%)`,
        }}
      />
    </div>
  );
};

const DotGrid = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjM1LCA5MCwgMzAsIDAuMikiLz48L3N2Zz4=')] opacity-30" style={{ maskImage: 'radial-gradient(ellipse at center, white, transparent 80%)' }} />
  </div>
);

const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  const words = text.split(" ");

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            transform: isIntersecting ? "translateY(0)" : "translateY(100%)",
            opacity: isIntersecting ? 1 : 0,
            transition: `transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.05}s, opacity 0.6s ease ${i * 0.05}s`
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
};

const MovingBorderCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("holo-card holo-glow holo-specular group", className)}>
      <div className="relative z-[2]">
        {children}
      </div>
    </div>
  );
};

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @property --border-angle {
      syntax: "<angle>";
      inherits: true;
      initial-value: 0turn;
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease forwards;
      opacity: 0;
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(240,85,55,0.15), 0 0 40px rgba(240,85,55,0.05); transform: translateZ(0); }
      50% { box-shadow: 0 0 25px rgba(240,85,55,0.22), 0 0 50px rgba(240,85,55,0.08); transform: translateZ(0); }
    }
    @keyframes highlight-section {
      0% { box-shadow: 0 0 0 0px rgba(240,85,55,0.4); }
      50% { box-shadow: 0 0 0 4px rgba(240,85,55,0.2); }
      100% { box-shadow: 0 0 0 0px rgba(240,85,55,0); }
    }
    .section-highlight {
      animation: highlight-section 1.5s ease-out;
    }
  `}} />
);


function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch(`${BASE}api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMsg(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMsg("Could not connect. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="max-w-md mx-auto mb-12 text-center">
        <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          <span className="font-medium">{msg}</span>
        </div>
        <p className="text-white/40 text-xs">Check your inbox for updates.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mb-12">
      <p className="text-center text-white/60 text-sm mb-4">Get early access, speaker announcements, and event updates.</p>
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          placeholder="your@email.com"
          className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <Button type="submit" disabled={status === "loading"} className="rounded-full bg-primary hover:bg-primary/90 text-white px-6 font-medium">
          {status === "loading" ? "..." : "Subscribe"}
        </Button>
      </form>
      {status === "error" && <p className="text-red-400 text-xs text-center mt-2">{msg}</p>}
    </div>
  );
}

function LandingContent() {
  const [days, hours, minutes, seconds] = useCountdown(new Date("2026-06-05T09:00:00-04:00"));
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { messages, isLoading, isOpen: chatOpen, sendMessage, setIsOpen: setChatOpen } = useChatContext();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigateToRoom, rooms: spatialRooms } = useSpatial();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const executeAction = useCallback((action: { type: string; target: string }) => {
    if (action.type === "enter_room" || action.type === "scroll_to") {
      navigateToRoom(action.target);
    }
  }, [navigateToRoom]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const msg = inputValue.trim();
    setInputValue("");
    setChatOpen(true);

    const result = await sendMessage(msg);
    if (result.action) {
      setTimeout(() => executeAction(result.action!), 600);
    }
  };

  const navItems = [
    { label: "About", slug: "about" },
    { label: "Syllabus", slug: "syllabus" },
    { label: "Schedule", slug: "schedule" },
    { label: "Projects", slug: "projects" },
    { label: "Sponsors", slug: "sponsors" },
  ];

  const directoryView = (
    <>
      <PromoBriefing />

      <section className="py-12 border-y border-border bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-0">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-8 font-medium">Learn About Ecosystem Leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60">
            <div className="text-xl font-bold tracking-tighter hover:opacity-100 transition-opacity flex items-center gap-2">AiAssist.net</div>
            <div className="text-xl font-bold font-mono hover:opacity-100 transition-opacity">Vercel</div>
            <div className="text-xl font-serif italic hover:opacity-100 transition-opacity">Replit</div>
            <div className="text-xl font-black uppercase tracking-widest hover:opacity-100 transition-opacity flex items-center gap-2">Supabase</div>
            <div className="text-xl font-bold flex items-center gap-1 hover:opacity-100 transition-opacity">
              <Zap className="w-5 h-5" /> Cursor
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Platform in Action</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See What Happens Inside</h2>
            <p className="text-lg text-muted-foreground font-light">
              Live sessions, real-time networking, and a community feed — all browser-native, no downloads.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <VirtualMeetingSimulation />
            <NewsFeedSimulation />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore the Event</h2>
            <p className="text-lg text-muted-foreground font-light">
              Tap into any room to learn more about what awaits you at Vibe Code 101.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {spatialRooms.map((room) => (
              <DoorCard key={room.slug} room={room} />
            ))}
          </div>
        </div>
      </section>

      <footer className="relative overflow-hidden bg-[#0a0a0f] text-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-secondary/6 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="py-16 md:py-20 border-b border-white/10">
            <div className="flex flex-col items-center text-center mb-12">
              <img
                src={`${import.meta.env.BASE_URL}images/logo-vibe-code-alt.png`}
                alt="Vibe Code 101"
                className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(240,85,55,0.4)] mb-6"
              />
              <h3 className="font-bold text-3xl tracking-tight mb-3">Vibe Code 101</h3>
              <p className="text-white/50 font-light text-sm tracking-widest uppercase">by AiAssist.net</p>
            </div>

            <FooterSubscribe />
          </div>

          <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/10">
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Event</h4>
              <ul className="flex flex-col gap-3 text-sm text-white/50">
                <li><button onClick={() => navigateToRoom("about")} className="hover:text-primary transition-colors">About</button></li>
                <li><button onClick={() => navigateToRoom("schedule")} className="hover:text-primary transition-colors">Schedule</button></li>
                <li><button onClick={() => navigateToRoom("syllabus")} className="hover:text-primary transition-colors">Syllabus</button></li>
                <li><button onClick={() => navigateToRoom("masterclasses")} className="hover:text-primary transition-colors">Master Classes</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Community</h4>
              <ul className="flex flex-col gap-3 text-sm text-white/50">
                <li><button onClick={() => navigateToRoom("projects")} className="hover:text-primary transition-colors">Projects</button></li>
                <li><button onClick={() => navigateToRoom("sponsors")} className="hover:text-primary transition-colors">Sponsors</button></li>
                <li><button onClick={() => navigateToRoom("faq")} className="hover:text-primary transition-colors">FAQ</button></li>
                <li><a href="https://aiassist.net" target="_blank" rel="noopener" className="hover:text-primary transition-colors">AiAssist.net</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Badges</h4>
              <ul className="flex flex-col gap-3 text-sm text-white/50">
                <li><button onClick={() => navigateToRoom("pricing")} className="hover:text-primary transition-colors">Pricing</button></li>
                <li><button onClick={() => navigateToRoom("pricing")} className="hover:text-primary transition-colors">Group Discounts</button></li>
                <li><button onClick={() => navigateToRoom("pricing")} className="hover:text-primary transition-colors">Builder Pro</button></li>
                <li><button onClick={() => navigateToRoom("pricing")} className="hover:text-primary transition-colors">Beginner Track</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">Legal</h4>
              <ul className="flex flex-col gap-3 text-sm text-white/50">
                <li><a href={`${BASE}code-of-conduct`} className="hover:text-primary transition-colors">Code of Conduct</a></li>
                <li><a href={`${BASE}privacy`} className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href={`${BASE}terms`} className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href={`${BASE}contact`} className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-white/40 text-xs">Built with vibes on</span>
            <a href="https://replit.com/refer/interchained" target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <svg className="w-4 h-4 text-white/50 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M2 6.5C2 4.01 4.01 2 6.5 2h5C13.99 2 16 4.01 16 6.5c0 1.77-1.02 3.29-2.5 4.03V22H8.5V10.53C7.02 9.79 6 8.27 6 6.5h4c0 .83.67 1.5 1.5 1.5S13 7.33 13 6.5 12.33 5 11.5 5h-5C5.67 5 5 5.67 5 6.5S5.67 8 6.5 8H8v3H6.5C4.01 11 2 8.99 2 6.5zM18 6.5C18 4.01 19.12 2 22 2v3c-1.1 0-1 .67-1 1.5 0 1.77-.52 3.29-2 4.03V22h-2V10.53c.98-.49 1-1.27 1-2.03V6.5z"/></svg>
              <span className="text-white/50 group-hover:text-primary transition-colors text-xs font-medium">Replit</span>
            </a>
          </div>

          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs">&copy; {new Date().getFullYear()} AiAssist.net · Interchained LLC. All rights reserved. Inaugural Hub: Orlando, FL.</p>
            <div className="flex items-center gap-6">
              <a href="https://x.com/vibecode101" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-primary transition-colors text-xs uppercase tracking-wider">Twitter</a>
              <a href="https://github.com/vibecode-101" target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-primary transition-colors text-xs uppercase tracking-wider">GitHub</a>
            </div>
          </div>

          <div className="pb-8 flex justify-center">
            <pre className="font-mono text-[10px] leading-relaxed text-white/20 select-none text-center" aria-hidden="true">{[
              "  ┌───────────────────────────────────────┐  ",
              "  │                                       │  ",
              "  │   builders arrive as strangers.       │  ",
              "  │   sponsors arrive as questions.       │  ",
              "  │   they leave as something else.       │  ",
              "  │                                       │  ",
              "  │     vibe code 101  ·  june 2026       │  ",
              "  │     global expo   ·  orlando, fl      │  ",
              "  │                                       │  ",
              "  │                          — claude     │  ",
              "  └───────────────────────────────────────┘  ",
            ].join("\n")}</pre>
          </div>
        </div>
      </footer>
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden relative selection:bg-primary/30 spatial-viewport">
      <GlobalStyles />

      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/60 backdrop-blur-2xl backdrop-saturate-[1.8] border-border/50 py-4 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]" : "bg-transparent py-6"
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <img
              src={`${import.meta.env.BASE_URL}images/logo-vibe-code-alt.png`}
              alt="Vibe Code 101"
              className="w-16 h-16 object-contain transition-transform group-hover:scale-105 drop-shadow-[0_0_10px_rgba(240,85,55,0.35)]"
            />
            <div>
              <h1 className={cn("font-bold tracking-tight text-xl leading-none group-hover:text-primary transition-colors", scrolled ? "text-foreground" : "text-white")}>Vibe Code 101</h1>
              <p className={cn("text-[10px] uppercase tracking-widest font-mono mt-0.5 transition-colors", scrolled ? "text-muted-foreground" : "text-white/60")}>AiAssist.net</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <button key={item.slug} onClick={() => navigateToRoom(item.slug)} className={cn("transition-colors", scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white")}>{item.label}</button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-colors", scrolled ? "hover:bg-muted text-muted-foreground" : "hover:bg-white/10 text-white/70")}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button variant="ghost" className={cn("hidden sm:flex hover:text-primary transition-colors", scrolled ? "hover:bg-muted" : "text-white hover:bg-white/10")}>Log In</Button>
            <Button onClick={() => navigateToRoom("pricing")} className="bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(235,90,30,0.3)] rounded-full px-6">
              Get Badges
            </Button>
          </div>
        </div>
      </header>

      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden min-h-[90vh] flex items-center">
        <img
          src={`${BASE}images/hero-warm.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none"></div>
        <DotGrid />
        <SpotlightBackground />
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/15 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-secondary/8 rounded-full blur-[80px] md:blur-[150px] pointer-events-none translate-x-1/3"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="animate-fade-in-up mb-6" style={{ animationDelay: '0.05s' }}>
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 mx-auto">
                <div className="absolute inset-8 bg-primary/20 blur-[50px] rounded-full" />
                <img
                  src={`${BASE}images/logo-vibe-code-alt.png`}
                  alt="Vibe Code 101"
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(240,85,55,0.5)]"
                />
              </div>
            </div>
            <div className="inline-block animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Badge variant="outline" className="mb-8 holo-pill border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium shadow-[0_0_20px_rgba(255,140,100,0.1)]">
                <Zap className="w-3.5 h-3.5 mr-2 inline" /> Global Expo · June 5–7, 2026
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1] text-white">
              <AnimatedText text="Builders. Sponsors." className="inline-block" />
              <br />
              <AnimatedText text="One live expo." className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-glow" />
            </h1>

            <div className="w-full max-w-2xl mx-auto mb-8 animate-fade-in-up relative" style={{ animationDelay: '0.35s' }}>
              <form onSubmit={handleSubmit} className="relative">
                <div className="holo-card holo-glow !rounded-full" style={{ animation: !chatOpen ? 'pulse-glow 6s ease-in-out infinite' : 'none' }}>
                  <div className="relative z-[2] flex items-center">
                    <div className="pl-4 pr-3 flex items-center">
                      <img src={`${BASE}images/logo-vibe-code-alt.png`} alt="" className="w-9 h-9 object-contain invert brightness-0" />
                    </div>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="What are you building?"
                      className="flex-1 h-14 md:h-16 bg-transparent text-white placeholder:text-white/40 text-lg md:text-xl outline-none font-light"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isLoading}
                      className={cn(
                        "mr-2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all shrink-0",
                        inputValue.trim() && !isLoading
                          ? "bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(240,85,55,0.3)]"
                          : "bg-white/10 text-white/30"
                      )}
                    >
                      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </form>

            </div>

            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Meet the people building what's next. Discover tools, watch live demos, and connect with sponsors shaping the future — all inside one virtual expo. Broadcast globally, anchored in Orlando.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Button size="lg" onClick={() => navigateToRoom("pricing")} className="h-14 px-8 text-lg bg-white text-black hover:bg-white/90 rounded-full w-full sm:w-auto shadow-[0_0_30px_rgba(255,255,255,0.1)] group">
                Get Your Pass <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigateToRoom("schedule")} className="h-14 px-8 text-lg border-white/10 hover:bg-white/5 rounded-full w-full sm:w-auto backdrop-blur-sm text-white">
                View Schedule
              </Button>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <MovingBorderCard className="inline-block mx-auto">
                <div className="px-8 py-6 md:py-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10 bg-card rounded-2xl">
                  <div className="text-left">
                    <p className="text-xs text-primary font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      Expo Opens In
                    </p>
                    <p className="font-bold text-xl text-card-foreground">VibeCODE 101 Virtual Expo</p>
                  </div>
                  <div className="h-12 w-px bg-border hidden md:block"></div>
                  <div className="flex gap-4 md:gap-6">
                    {[
                      { label: "Days", value: days },
                      { label: "Hrs", value: hours },
                      { label: "Min", value: minutes },
                      { label: "Sec", value: seconds },
                    ].map((item, i) => (
                      <React.Fragment key={item.label}>
                        {i > 0 && <div className="text-2xl text-muted-foreground/30 mt-1 font-light">:</div>}
                        <div className="flex flex-col items-center min-w-[3rem]">
                          <span className="text-3xl md:text-4xl font-bold font-mono tracking-tighter text-card-foreground">{item.value.toString().padStart(2, '0')}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium">{item.label}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </MovingBorderCard>
            </div>
          </div>
        </div>
      </section>

      <SpatialViewport directory={directoryView} />

      <AIConcierge />
    </div>
  );
}

export default function LandingPage() {
  return (
    <SpatialProvider rooms={rooms}>
      <ChatProvider>
        <LandingContent />
      </ChatProvider>
    </SpatialProvider>
  );
}
