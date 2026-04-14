import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Mic, GraduationCap, Presentation, Users, Trophy, Coffee, Music, Wrench, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type ScheduleEvent = {
  time: string;
  title: string;
  location: string;
  icon: LucideIcon;
  type: string;
  instructor?: string;
};

type TimeSlot = {
  time: string;
  utc: string;
  events: ScheduleEvent[];
};

// All times EDT (UTC-4). UTC values match seed.ts startsAt — source of truth for Zoom meeting creation.
const schedule: Record<string, { label: string; theme: string; slots: TimeSlot[] }> = {
  "Day 1": {
    label: "Friday, June 5",
    theme: "Foundations & Flow — Live Globally",
    slots: [
      { time: "1:00 PM EDT", utc: "17:00 UTC", events: [
        { time: "1:00 PM", title: "Opening Keynote: The Model Showdown — GPT vs Claude vs Gemini vs Grok vs Kimi", location: "Main Stage · Live Broadcast", icon: Mic, type: "keynote", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "2:30 PM EDT", utc: "18:30 UTC", events: [
        { time: "2:30 PM", title: "Training Your AI: Directives, Constraints, Persona & Tone", location: "Main Stage · Live Broadcast", icon: Presentation, type: "stage", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "4:00 PM EDT", utc: "20:00 UTC", events: [
        { time: "4:00 PM", title: "Afternoon Break", location: "Virtual Networking Lounge", icon: Coffee, type: "break" },
      ]},
      { time: "4:30 PM EDT", utc: "20:30 UTC", events: [
        { time: "4:30 PM", title: "Vibe Coding UI/UX: The Pain Points Nobody Warns You About", location: "Virtual Track A · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "5:30 PM EDT", utc: "21:30 UTC", events: [
        { time: "5:30 PM", title: "Vibe Coding Mistakes: The Hall of Shame (And How to Avoid Them)", location: "Virtual Track A · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "6:30 PM EDT", utc: "22:30 UTC", events: [
        { time: "6:30 PM", title: "Vibe Backend: Databases, Python & Node.js — Both Runtimes, One Brain", location: "Main Stage · Live Broadcast", icon: Presentation, type: "stage", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "8:00 PM EDT", utc: "00:00 UTC+1", events: [
        { time: "8:00 PM", title: "Dinner Break", location: "Virtual Networking Lounge", icon: Coffee, type: "break" },
      ]},
      { time: "8:30 PM EDT", utc: "00:30 UTC+1", events: [
        { time: "8:30 PM", title: "Ship It Live: From Vibe Code to Production in One Session", location: "Virtual Track B · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "9:00 PM EDT", utc: "01:00 UTC+1", events: [
        { time: "9:00 PM", title: "Vibe Coding with Replit Agent: From Idea to Deployed App", location: "Virtual Track A · Live", icon: Presentation, type: "stage", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "10:00 PM EDT", utc: "02:00 UTC+1", events: [
        { time: "10:00 PM", title: "Networking Mixer & Team Formation", location: "Virtual Networking Lounge", icon: Music, type: "social" },
      ]},
    ],
  },
  "Day 2": {
    label: "Saturday, June 6",
    theme: "Provider Deep Dives — Live Globally",
    slots: [
      { time: "1:00 PM EDT", utc: "17:00 UTC", events: [
        { time: "1:00 PM", title: "Vibe Coding with Cursor: The Power-User Workflow", location: "Virtual Track A · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "2:30 PM EDT", utc: "18:30 UTC", events: [
        { time: "2:30 PM", title: "Vibe Coding with GitHub Copilot: Beyond Autocomplete", location: "Virtual Track B · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "4:00 PM EDT", utc: "20:00 UTC", events: [
        { time: "4:00 PM", title: "Afternoon Break", location: "Virtual Networking Lounge", icon: Coffee, type: "break" },
      ]},
      { time: "4:30 PM EDT", utc: "20:30 UTC", events: [
        { time: "4:30 PM", title: "Vibe Coding with ChatGPT / OpenAI: The Swiss Army Knife", location: "Virtual Track A · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "5:30 PM EDT", utc: "21:30 UTC", events: [
        { time: "5:30 PM", title: "Vibe Coding with Claude: Long Context & Artifacts Mastery", location: "Main Stage · Live Broadcast", icon: Presentation, type: "stage", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "7:00 PM EDT", utc: "23:00 UTC", events: [
        { time: "7:00 PM", title: "Dinner Break", location: "Virtual Networking Lounge", icon: Coffee, type: "break" },
      ]},
      { time: "7:30 PM EDT", utc: "23:30 UTC", events: [
        { time: "7:30 PM", title: "Vibe Coding with Gemini: Multimodal Building & Google Integration", location: "Virtual Track A · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "8:30 PM EDT", utc: "00:30 UTC+1", events: [
        { time: "8:30 PM", title: "Vibe Coding with v0 by Vercel: UI Generation That Ships", location: "Virtual Track B · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "10:00 PM EDT", utc: "02:00 UTC+1", events: [
        { time: "10:00 PM", title: "Lightning Talks: Community Showcase", location: "Main Stage · Live Broadcast", icon: Mic, type: "keynote" },
      ]},
    ],
  },
  "Day 3": {
    label: "Sunday, June 7",
    theme: "Ship & Celebrate — Live Globally",
    slots: [
      { time: "1:00 PM EDT", utc: "17:00 UTC", events: [
        { time: "1:00 PM", title: "Vibe Coding with Perplexity: Research-Driven Development", location: "Virtual Track A · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "2:30 PM EDT", utc: "18:30 UTC", events: [
        { time: "2:30 PM", title: "Vibe Coding with xAI Grok: Real-Time Data & Unfiltered Answers", location: "Virtual Track B · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "4:00 PM EDT", utc: "20:00 UTC", events: [
        { time: "4:00 PM", title: "Afternoon Break", location: "Virtual Networking Lounge", icon: Coffee, type: "break" },
      ]},
      { time: "4:30 PM EDT", utc: "20:30 UTC", events: [
        { time: "4:30 PM", title: "Vibe Coding with Groq: Speed-First AI for Real-Time Apps", location: "Virtual Track A · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "5:30 PM EDT", utc: "21:30 UTC", events: [
        { time: "5:30 PM", title: "Vibe Coding with Kimi K2: The Open-Source Contender", location: "Virtual Track B · Live", icon: Presentation, type: "open", instructor: "Open Speaker Slot" },
      ]},
      { time: "6:30 PM EDT", utc: "22:30 UTC", events: [
        { time: "6:30 PM", title: "Dinner Break", location: "Virtual Networking Lounge", icon: Coffee, type: "break" },
      ]},
      { time: "7:00 PM EDT", utc: "23:00 UTC", events: [
        { time: "7:00 PM", title: "AI Agents for Founders: Contact Enrichment & Lead Generation", location: "Main Stage · Live Broadcast", icon: Presentation, type: "stage", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "8:30 PM EDT", utc: "00:30 UTC+1", events: [
        { time: "8:30 PM", title: "Building Your AI Stack: Which Model for What Task", location: "Main Stage · Live Broadcast", icon: Presentation, type: "stage", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "9:30 PM EDT", utc: "01:30 UTC+1", events: [
        { time: "9:30 PM", title: "Pre-Demo Break", location: "Virtual Networking Lounge", icon: Coffee, type: "break" },
      ]},
      { time: "10:00 PM EDT", utc: "02:00 UTC+1", events: [
        { time: "10:00 PM", title: "Demo Day Prep: Present Your Build Like a Pro", location: "Main Stage · Live Broadcast", icon: Presentation, type: "stage", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "10:30 PM EDT", utc: "02:30 UTC+1", events: [
        { time: "10:30 PM", title: "Demo Day: Project Presentations — Live", location: "Main Stage · Live Broadcast", icon: Trophy, type: "keynote" },
      ]},
    ],
  },
};

const typeColors: Record<string, string> = {
  keynote:  "bg-primary text-white",
  stage:    "bg-violet-600 text-white dark:bg-violet-500/20 dark:text-violet-300",
  open:     "bg-orange-500 text-white dark:bg-orange-500/20 dark:text-orange-300",
  module:   "bg-blue-600 text-white dark:bg-blue-500/20 dark:text-blue-400",
  build:    "bg-green-600 text-white dark:bg-green-500/20 dark:text-green-400",
  social:   "bg-purple-600 text-white dark:bg-purple-500/20 dark:text-purple-400",
  break:    "bg-muted text-muted-foreground",
};

const typeLabels: Record<string, string> = {
  keynote:  "Keynote",
  stage:    "Stage",
  open:     "Open Slot",
  module:   "Beginner Track",
  build:    "Build Time",
  social:   "Social",
  break:    "Break",
};

function EventCard({ event }: { event: ScheduleEvent }) {
  const isOpen  = event.type === "open";
  const isBreak = event.type === "break";
  return (
    <div className={cn(
      "group flex-1 p-4 transition-all",
      isBreak ? "opacity-60" : "hover:-translate-y-0.5",
      isOpen
        ? "rounded-xl border border-dashed border-orange-500/50 bg-orange-500/5 hover:border-orange-500/80 hover:bg-orange-500/10"
        : "holo-card holo-glow"
    )}>
      <div className="relative z-[2] flex flex-col sm:flex-row sm:items-center gap-3">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", typeColors[event.type])}>
          <event.icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={cn("font-bold text-sm leading-snug", isOpen ? "text-orange-300/90" : "text-foreground")}>{event.title}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" /> {event.location}
            </span>
            <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 rounded-full border-none", typeColors[event.type])}>
              {typeLabels[event.type]}
            </Badge>
            {event.instructor && (
              <span className={cn("text-[11px]", isOpen ? "text-orange-400/70" : "text-muted-foreground")}>
                <Users className="w-3 h-3 inline mr-0.5" />{event.instructor}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleRoom() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 text-white bg-primary border-primary px-3 py-1 rounded-full text-sm">
            <CalendarDays className="w-3.5 h-3.5 mr-2 inline" /> June 5–7, 2026 — Inaugural Event
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Event Schedule</h2>
          <p className="text-xl text-muted-foreground font-light">
            Three days of live-broadcast sessions, building, and celebrating. All times Eastern (EDT).
          </p>
        </div>

        <Tabs defaultValue="Day 1" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/10 p-1 rounded-full">
              {Object.entries(schedule).map(([day, data]) => (
                <TabsTrigger key={day} value={day} className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white">
                  {day} <span className="hidden sm:inline ml-1.5 opacity-60">({data.label})</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(schedule).map(([day, data]) => (
            <TabsContent key={day} value={day} className="mt-0">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bold text-foreground">{data.label}</h3>
                  <p className="text-muted-foreground font-light">{data.theme}</p>
                </div>

                <div className="relative">
                  <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-border to-border hidden sm:block" />
                  <div className="flex flex-col gap-5">
                    {data.slots.map((slot, i) => (
                      <div key={i} className="flex items-start gap-4 sm:gap-6">
                        <div className="shrink-0 w-[5.5rem] text-right pt-2">
                          <p className="text-xs font-mono font-semibold text-foreground whitespace-nowrap">{slot.time}</p>
                          <p className="text-[10px] font-mono text-muted-foreground/50 whitespace-nowrap mt-0.5">{slot.utc}</p>
                        </div>
                        <div className="hidden sm:flex shrink-0 w-4 h-4 mt-4 rounded-full border-2 border-primary/40 bg-background z-10" />
                        {slot.events.length === 1 ? (
                          <EventCard event={slot.events[0]} />
                        ) : (
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            {slot.events.map((event, j) => (
                              <EventCard key={j} event={event} />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
