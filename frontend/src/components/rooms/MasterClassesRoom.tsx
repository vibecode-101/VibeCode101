import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Presentation, Calendar, Clock, Users, ArrowRight, ChevronLeft, ChevronRight, MonitorPlay } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSpatial } from "@/components/spatial/SpatialProvider";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;

const sessions = [
  {
    title: "The Model Showdown: GPT vs Claude vs Gemini vs Grok vs Kimi — Live",
    track: "Keynote",
    level: "All Levels",
    day: "Day 1",
    time: "9:00 AM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "The headliner. We give identical coding tasks to GPT-5.4, Claude Sonnet 4.6, Gemini 3.1 Pro, Grok 4.20, and Kimi K2 — then compare outputs live on stage. Which writes better React? Which reasons through complex logic? Which follows multi-step instructions? Real benchmarks, real edge cases, and the model-switching strategies top builders actually use.",
    featured: true,
  },
  {
    title: "Training Your AI: Directives, Constraints, Persona & Tone",
    track: "Vibe Foundations",
    level: "All Levels",
    day: "Day 1",
    time: "10:30 AM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "The secret to consistent AI output isn't better prompts — it's better system directives. Learn how to set constraints, define personas, control tone, enforce coding standards, and build reusable directive templates that make every model behave like your senior engineer.",
  },
  {
    title: "Vibe Coding UI/UX: The Pain Points Nobody Warns You About",
    track: "Vibe Foundations",
    level: "All Levels",
    day: "Day 1",
    time: "12:00 PM",
    instructor: "Elena Rodriguez",
    initials: "ER",
    description: "AI-generated UIs look 'fine' until you ship them. We'll expose the real pain points — inconsistent spacing, inaccessible color combos, broken mobile layouts, phantom components, and the 'it looks like every other AI app' problem. Plus: which models to use for design vs logic vs layout.",
  },
  {
    title: "Vibe Backend: Databases, Python & Node.js — Both Runtimes, One Brain",
    track: "Vibe Foundations",
    level: "Intermediate",
    day: "Day 1",
    time: "2:00 PM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "Your AI can't save you if you don't understand your database. We'll switch between Python and Node.js live — showing how easy it is to use either runtime for the same tasks. ORM patterns, migration workflows, FastAPI vs Express, Drizzle vs SQLAlchemy, and a special deep dive into Redis namespace architecture — the technique Mark uses to structure caching, sessions, and real-time data across services. The stuff we learned the hard way. Attend to find out.",
  },
  {
    title: "Vibe Coding Mistakes: The Hall of Shame (And How to Avoid Them)",
    track: "Vibe Foundations",
    level: "Beginner",
    day: "Day 1",
    time: "3:30 PM",
    instructor: "Marcus Thorne",
    initials: "MT",
    description: "Hallucinated imports, phantom dependencies, circular logic, security holes AI won't warn you about, and the classic 'it works in the prompt but breaks in production.' We've made every mistake so you don't have to. Real examples, real fixes, real talk.",
  },
  {
    title: "Vibe Coding with Replit Agent: From Idea to Deployed App",
    track: "Provider Deep Dive",
    level: "Beginner",
    day: "Day 1",
    time: "5:00 PM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "Replit Agent turns natural language into full-stack apps. We'll go from a one-sentence idea to a live, deployed application — databases, auth, and all. Learn the prompting patterns that make Agent shine and the gotchas that trip up new builders.",
  },
  {
    title: "Vibe Coding with Cursor: The Power-User Workflow",
    track: "Provider Deep Dive",
    level: "Intermediate",
    day: "Day 2",
    time: "9:00 AM",
    instructor: "Alex Chen",
    initials: "AC",
    description: "Cursor is the IDE that vibe coders swear by. We'll cover Composer mode, multi-file edits, codebase-aware chat, .cursorrules files, and the keyboard shortcuts that make you 10x faster. This is how the pros actually use it — not the YouTube tutorial version.",
  },
  {
    title: "Vibe Coding with GitHub Copilot: Beyond Autocomplete",
    track: "Provider Deep Dive",
    level: "Intermediate",
    day: "Day 2",
    time: "10:30 AM",
    instructor: "Samira Osei",
    initials: "SO",
    description: "Copilot is more than tab-complete. We'll dig into Copilot Chat, workspace agents, slash commands, inline suggestions, and how to pair it with other tools. Plus: GitHub Copilot Workspace for planning entire features from issues.",
  },
  {
    title: "Vibe Coding with ChatGPT / OpenAI: The Swiss Army Knife",
    track: "Provider Deep Dive",
    level: "All Levels",
    day: "Day 2",
    time: "12:00 PM",
    instructor: "Priya Patel",
    initials: "PP",
    description: "ChatGPT is most people's first AI tool — but most people barely scratch the surface. We'll cover GPTs, custom instructions, Code Interpreter for data work, canvas mode for iteration, and the API patterns that let you build ChatGPT into your own apps.",
  },
  {
    title: "Vibe Coding with Claude: Long Context & Artifacts Mastery",
    track: "Provider Deep Dive",
    level: "All Levels",
    day: "Day 2",
    time: "1:30 PM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "Claude's 200K context window and Artifacts feature make it the best model for large codebases and interactive prototypes. We'll explore project knowledge, system prompts that actually work, and how to use Claude for architecture decisions, not just code generation.",
  },
  {
    title: "Vibe Coding with Gemini: Multimodal Building & Google Integration",
    track: "Provider Deep Dive",
    level: "All Levels",
    day: "Day 2",
    time: "3:00 PM",
    instructor: "Kai Nakamura",
    initials: "KN",
    description: "Gemini sees images, understands video, and lives inside Google's ecosystem. We'll build apps using screenshot-to-code, design-from-mockup workflows, and Gemini's integration with Firebase, Vertex AI, and Google Workspace. The multimodal future is here.",
  },
  {
    title: "Vibe Coding with v0 by Vercel: UI Generation That Ships",
    track: "Provider Deep Dive",
    level: "Beginner",
    day: "Day 2",
    time: "4:30 PM",
    instructor: "Maya Lin",
    initials: "ML",
    description: "v0 generates production-ready React components from text and images. We'll go from rough sketches to polished UI, learn how to iterate with follow-up prompts, export to your codebase, and combine v0 with shadcn/ui for a complete design system.",
  },
  {
    title: "Vibe Coding with Perplexity: Research-Driven Development",
    track: "Provider Deep Dive",
    level: "All Levels",
    day: "Day 3",
    time: "9:00 AM",
    instructor: "Tara Singh",
    initials: "TS",
    description: "Perplexity isn't just search — it's your research co-pilot. We'll use it to evaluate libraries, find API documentation, compare architecture patterns, and make informed technical decisions before writing a single line of code. Research first, vibe code second.",
  },
  {
    title: "Vibe Coding with xAI Grok: Real-Time Data & Unfiltered Answers",
    track: "Provider Deep Dive",
    level: "Intermediate",
    day: "Day 3",
    time: "10:30 AM",
    instructor: "Omar Farouk",
    initials: "OF",
    description: "Grok has real-time X/Twitter data access and a no-guardrails approach to problem-solving. We'll explore its strengths for trend analysis, real-time data apps, and the coding tasks where its unfiltered reasoning outperforms more cautious models.",
  },
  {
    title: "Vibe Coding with Groq: Speed-First AI for Real-Time Apps",
    track: "Provider Deep Dive",
    level: "Intermediate",
    day: "Day 3",
    time: "12:00 PM",
    instructor: "Rafael Mendes",
    initials: "RM",
    description: "Groq's LPU chips deliver inference at insane speeds. We'll build real-time AI features — live transcription, instant chat, streaming code generation — where latency matters. Learn when speed beats intelligence and how to architect for Groq's strengths.",
  },
  {
    title: "Vibe Coding with Kimi K2: The Open-Source Contender",
    track: "Provider Deep Dive",
    level: "Intermediate",
    day: "Day 3",
    time: "1:30 PM",
    instructor: "Nina Voss",
    initials: "NV",
    description: "Kimi K2 from Moonshot AI is turning heads with its coding ability. We'll benchmark it against the big names, explore its agentic capabilities, and show you how to self-host and fine-tune an open-weight model for your specific workflows.",
  },
  {
    title: "AI Agents for Founders: Contact Enrichment & Lead Generation",
    track: "Founder Track",
    level: "Intermediate",
    day: "Day 3",
    time: "3:00 PM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "Build AI agents that find investors, enrich contacts, and automate outreach. We'll cover data scraping ethics, CRM integration, enrichment pipelines, and the exact agent workflows we use at AiAssist.net. This is the founder's secret weapon.",
  },
  {
    title: "Ship It Live: From Vibe Code to Production in One Session",
    track: "Vibe Foundations",
    level: "Beginner",
    day: "Day 1",
    time: "4:00 PM",
    instructor: "Jade Monroe",
    initials: "JM",
    description: "Your first deploy shouldn't be scary. We'll take a vibe-coded app from 'it works on my machine' to live on the internet — custom domain, SSL, database, the works. Vercel, Replit Deployments, and the launch checklist every builder needs.",
  },
  {
    title: "Building Your AI Stack: Which Model for What Task",
    track: "Vibe Foundations",
    level: "All Levels",
    day: "Day 3",
    time: "4:30 PM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "No single model does everything best. We'll map out which AI to use for UI generation, backend logic, debugging, writing tests, documentation, and creative work. Leave with a personal AI stack that plays to each model's strengths.",
  },
  {
    title: "Demo Day Prep: Present Your Build Like a Pro",
    track: "Founder Track",
    level: "All Levels",
    day: "Day 3",
    time: "5:30 PM",
    instructor: "Mark Allen Evans Jr",
    initials: "ME",
    description: "You built something amazing — now sell it. Storytelling for builders, demo flow, handling live bugs gracefully, and the presentation framework that makes judges and investors pay attention. Your last session before you hit the stage.",
  },
];

const levelColors: Record<string, string> = {
  "Beginner": "bg-green-600 text-white dark:bg-green-500/20 dark:text-green-400",
  "Intermediate": "bg-blue-600 text-white dark:bg-blue-500/20 dark:text-blue-400",
  "Expert": "bg-purple-600 text-white dark:bg-purple-500/20 dark:text-purple-400",
  "All Levels": "bg-primary text-white dark:bg-primary/20 dark:text-primary",
};

export default function MasterClassesRoom() {
  const { navigateToRoom } = useSpatial();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const active = sessions[activeIndex];

  const nextSlide = useCallback(() => {
    setActiveIndex((i) => (i + 1) % sessions.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((i) => (i - 1 + sessions.length) % sessions.length);
  }, []);

  const goToSlide = useCallback((i: number) => {
    setActiveIndex(i);
    setIsAutoPlaying(false);
    if (slideRef.current) {
      slideRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = setInterval(nextSlide, 5000);
    return () => clearInterval(timerRef.current);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-12">
          <Badge variant="outline" className="mb-6 text-white bg-amber-600 border-amber-600 dark:bg-secondary/20 dark:text-secondary dark:border-secondary/30 px-3 py-1 rounded-full text-sm">
            <Presentation className="w-3.5 h-3.5 mr-2 inline" /> {sessions.length} Expert Sessions
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Master Classes</h2>
          <p className="text-xl text-muted-foreground font-light">
            No fluff, no theory slides. Live, hands-on sessions where we build, break, and fix things together. Click any session below to preview it.
          </p>
        </div>

        <div ref={slideRef} className="mb-16">
          <div className="holo-card holo-glow holo-specular group">
            <div className="relative z-[2] bg-card rounded-2xl overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge className={cn("border-none text-xs", levelColors[active.level] || levelColors["All Levels"])}>{active.level}</Badge>
                        <Badge className="bg-gray-100 dark:bg-white/10 text-foreground border-gray-300 dark:border-white/20 text-xs">{active.track}</Badge>
                        {active.featured && <Badge className="bg-primary text-white border-none text-xs">Opening Keynote</Badge>}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">{active.title}</h3>
                      <p className="text-muted-foreground font-light leading-relaxed mb-6">{active.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5 text-muted-foreground"><Calendar className="w-3.5 h-3.5 text-primary" /> {active.day}</span>
                        <span className="flex items-center gap-1.5 text-muted-foreground"><Clock className="w-3.5 h-3.5 text-primary" /> {active.time}</span>
                        <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="w-3.5 h-3.5 text-primary" /> {active.instructor}</span>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                        {active.initials}
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-foreground text-sm">{active.instructor}</p>
                      </div>
                      <Button size="sm" onClick={() => navigateToRoom("pricing")} className="rounded-full bg-primary text-white hover:bg-primary/90 mt-2">
                        Reserve Seat
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="px-8 md:px-10 pb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => { prevSlide(); setIsAutoPlaying(false); }} className="w-9 h-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors">
                      <ChevronLeft className="w-4 h-4 text-foreground" />
                    </button>
                    <button onClick={() => { nextSlide(); setIsAutoPlaying(false); }} className="w-9 h-9 rounded-full border border-border hover:bg-muted flex items-center justify-center transition-colors">
                      <ChevronRight className="w-4 h-4 text-foreground" />
                    </button>
                    <span className="text-xs text-muted-foreground ml-3 font-mono">{activeIndex + 1} / {sessions.length}</span>
                  </div>
                  <div className="flex gap-1">
                    {sessions.map((_, i) => (
                      <button key={i} onClick={() => goToSlide(i)} className={cn("w-2 h-2 rounded-full transition-all", i === activeIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">All Sessions</h3>
          <p className="text-muted-foreground font-light">Click any session to preview it above.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
          {sessions.map((cls, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={cn(
                "holo-card group p-5 text-left transition-all hover:-translate-y-1 cursor-pointer",
                i === activeIndex && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
            >
              <div className="relative z-[2]">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={cn("border-none text-[10px] px-2 py-0.5", levelColors[cls.level] || levelColors["All Levels"])}>{cls.level}</Badge>
                  {cls.featured && <Badge className="bg-primary text-white border-none text-[10px] px-2 py-0.5">Keynote</Badge>}
                </div>
                <h4 className={cn("font-bold text-sm mb-2 leading-snug transition-colors", i === activeIndex ? "text-primary" : "text-foreground group-hover:text-primary")}>{cls.title}</h4>
                <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-wider mb-2">{cls.track}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{cls.day} · {cls.time}</span>
                  <span className="text-foreground/60">{cls.initials}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-light mb-4">
            All sessions included with any ticket. Builder Pro gets priority seating.
          </p>
          <Button onClick={() => navigateToRoom("pricing")} className="bg-primary hover:bg-primary/90 text-white rounded-full px-8">
            Get Your Ticket <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
