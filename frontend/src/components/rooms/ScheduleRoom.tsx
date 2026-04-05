import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, MapPin, Mic, GraduationCap, Presentation, Users, Trophy, Coffee, Music, Wrench, Upload } from "lucide-react";
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
  events: ScheduleEvent[];
};

const schedule: Record<string, { label: string; theme: string; slots: TimeSlot[] }> = {
  "Day 1": {
    label: "Friday, June 5",
    theme: "Foundations & Flow",
    slots: [
      { time: "8:00 AM", events: [
        { time: "8:00 AM", title: "Doors Open & Registration", location: "Main Lobby", icon: Coffee, type: "logistics" },
      ]},
      { time: "9:00 AM", events: [
        { time: "9:00 AM", title: "Opening Keynote: The Model Showdown — GPT vs Claude vs Gemini vs Grok vs Kimi", location: "Main Stage", icon: Mic, type: "keynote", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "10:30 AM", events: [
        { time: "10:30 AM", title: "Training Your AI: Directives, Constraints, Persona & Tone", location: "Main Stage", icon: Presentation, type: "masterclass", instructor: "Mark Allen Evans Jr" },
        { time: "10:30 AM", title: "Module 1: The Setup", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "12:00 PM", events: [
        { time: "12:00 PM", title: "Vibe Coding UI/UX: The Pain Points Nobody Warns You About", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Elena Rodriguez" },
        { time: "12:00 PM", title: "Module 2: The UI Vibe", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "1:00 PM", events: [
        { time: "1:00 PM", title: "Lunch Break", location: "Dining Hall", icon: Coffee, type: "logistics" },
      ]},
      { time: "2:00 PM", events: [
        { time: "2:00 PM", title: "Vibe Backend: Databases, Python & Node.js — Both Runtimes, One Brain", location: "Main Stage", icon: Presentation, type: "masterclass", instructor: "Mark Allen Evans Jr" },
        { time: "2:00 PM", title: "Module 3: The Logic", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "3:30 PM", events: [
        { time: "3:30 PM", title: "Vibe Coding Mistakes: The Hall of Shame", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Marcus Thorne" },
      ]},
      { time: "4:00 PM", events: [
        { time: "4:00 PM", title: "Ship It Live: From Vibe Code to Production", location: "Room B", icon: Presentation, type: "masterclass", instructor: "Jade Monroe" },
      ]},
      { time: "5:00 PM", events: [
        { time: "5:00 PM", title: "Vibe Coding with Replit Agent: From Idea to Deployed App", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Mark Allen Evans Jr" },
        { time: "5:00 PM", title: "Open Build Time", location: "Build Floor", icon: Wrench, type: "build" },
      ]},
      { time: "7:00 PM", events: [
        { time: "7:00 PM", title: "Networking Mixer & Team Formation", location: "Rooftop Lounge", icon: Music, type: "social" },
      ]},
    ],
  },
  "Day 2": {
    label: "Saturday, June 6",
    theme: "Provider Deep Dives",
    slots: [
      { time: "8:00 AM", events: [
        { time: "8:00 AM", title: "Doors Open & Breakfast", location: "Main Lobby", icon: Coffee, type: "logistics" },
      ]},
      { time: "9:00 AM", events: [
        { time: "9:00 AM", title: "Vibe Coding with Cursor: The Power-User Workflow", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Alex Chen" },
        { time: "9:00 AM", title: "Module 4: The Backend", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "10:30 AM", events: [
        { time: "10:30 AM", title: "Vibe Coding with GitHub Copilot: Beyond Autocomplete", location: "Room B", icon: Presentation, type: "masterclass", instructor: "Samira Osei" },
        { time: "10:30 AM", title: "Module 5: AI Integration", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "12:00 PM", events: [
        { time: "12:00 PM", title: "Vibe Coding with ChatGPT / OpenAI: The Swiss Army Knife", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Priya Patel" },
      ]},
      { time: "1:00 PM", events: [
        { time: "1:00 PM", title: "Lunch Break", location: "Dining Hall", icon: Coffee, type: "logistics" },
      ]},
      { time: "1:30 PM", events: [
        { time: "1:30 PM", title: "Vibe Coding with Claude: Long Context & Artifacts Mastery", location: "Main Stage", icon: Presentation, type: "masterclass", instructor: "Mark Allen Evans Jr" },
        { time: "1:30 PM", title: "Module 6: AI Agents for Founders", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "3:00 PM", events: [
        { time: "3:00 PM", title: "Vibe Coding with Gemini: Multimodal Building & Google Integration", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Kai Nakamura" },
      ]},
      { time: "4:30 PM", events: [
        { time: "4:30 PM", title: "Vibe Coding with v0 by Vercel: UI Generation That Ships", location: "Room B", icon: Presentation, type: "masterclass", instructor: "Maya Lin" },
        { time: "4:30 PM", title: "Project Work Time + Office Hours", location: "Build Floor", icon: Users, type: "build" },
      ]},
      { time: "6:00 PM", events: [
        { time: "6:00 PM", title: "Lightning Talks: Community Showcase", location: "Main Stage", icon: Mic, type: "keynote" },
      ]},
      { time: "8:00 PM", events: [
        { time: "8:00 PM", title: "Late Night Build Session", location: "Build Floor", icon: Wrench, type: "build" },
      ]},
    ],
  },
  "Day 3": {
    label: "Sunday, June 7",
    theme: "Ship & Celebrate",
    slots: [
      { time: "8:00 AM", events: [
        { time: "8:00 AM", title: "Doors Open & Breakfast", location: "Main Lobby", icon: Coffee, type: "logistics" },
      ]},
      { time: "9:00 AM", events: [
        { time: "9:00 AM", title: "Vibe Coding with Perplexity: Research-Driven Development", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Tara Singh" },
        { time: "9:00 AM", title: "Module 7: The Polish", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "10:30 AM", events: [
        { time: "10:30 AM", title: "Vibe Coding with xAI Grok: Real-Time Data & Unfiltered Answers", location: "Room B", icon: Presentation, type: "masterclass", instructor: "Omar Farouk" },
        { time: "10:30 AM", title: "Module 8: The Ship", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "12:00 PM", events: [
        { time: "12:00 PM", title: "Vibe Coding with Groq: Speed-First AI for Real-Time Apps", location: "Room A", icon: Presentation, type: "masterclass", instructor: "Rafael Mendes" },
        { time: "12:00 PM", title: "Module 9: The Pitch", location: "Beginner Hall", icon: GraduationCap, type: "module" },
      ]},
      { time: "1:00 PM", events: [
        { time: "1:00 PM", title: "Lunch & Final Build Time", location: "Dining Hall + Build Floor", icon: Coffee, type: "logistics" },
      ]},
      { time: "1:30 PM", events: [
        { time: "1:30 PM", title: "Vibe Coding with Kimi K2: The Open-Source Contender", location: "Room B", icon: Presentation, type: "masterclass", instructor: "Nina Voss" },
      ]},
      { time: "2:00 PM", events: [
        { time: "2:00 PM", title: "Project Submissions Close", location: "Online Portal", icon: Upload, type: "build" },
      ]},
      { time: "3:00 PM", events: [
        { time: "3:00 PM", title: "AI Agents for Founders: Contact Enrichment & Lead Generation", location: "Main Stage", icon: Presentation, type: "masterclass", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "4:30 PM", events: [
        { time: "4:30 PM", title: "Building Your AI Stack: Which Model for What Task", location: "Main Stage", icon: Presentation, type: "masterclass", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "5:30 PM", events: [
        { time: "5:30 PM", title: "Demo Day Prep: Present Your Build Like a Pro", location: "Main Stage", icon: Presentation, type: "masterclass", instructor: "Mark Allen Evans Jr" },
      ]},
      { time: "6:30 PM", events: [
        { time: "6:30 PM", title: "Demo Day: Project Presentations", location: "Main Stage", icon: Mic, type: "keynote" },
      ]},
      { time: "8:00 PM", events: [
        { time: "8:00 PM", title: "Awards Ceremony & Closing", location: "Main Stage", icon: Trophy, type: "keynote" },
      ]},
    ],
  },
};

const typeColors: Record<string, string> = {
  keynote: "bg-primary text-white",
  masterclass: "bg-amber-600 text-white dark:bg-secondary/20 dark:text-secondary",
  module: "bg-blue-600 text-white dark:bg-blue-500/20 dark:text-blue-400",
  build: "bg-green-600 text-white dark:bg-green-500/20 dark:text-green-400",
  social: "bg-purple-600 text-white dark:bg-purple-500/20 dark:text-purple-400",
  logistics: "bg-gray-700 text-white dark:bg-muted dark:text-muted-foreground",
};

const typeLabels: Record<string, string> = {
  keynote: "Keynote",
  masterclass: "Masterclass",
  module: "Beginner Track",
  build: "Build Time",
  social: "Social",
  logistics: "Logistics",
};

function EventCard({ event }: { event: ScheduleEvent }) {
  return (
    <div className={cn("holo-card holo-glow group flex-1 p-4 transition-all hover:-translate-y-0.5", event.type === "logistics" && "opacity-70")}>
      <div className="relative z-[2] flex flex-col sm:flex-row sm:items-center gap-3">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", typeColors[event.type])}>
          <event.icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground text-sm leading-snug">{event.title}</h4>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" /> {event.location}
            </span>
            <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 rounded-full border-none", typeColors[event.type])}>
              {typeLabels[event.type]}
            </Badge>
            {event.instructor && (
              <span className="text-[11px] text-muted-foreground">
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
            <CalendarDays className="w-3.5 h-3.5 mr-2 inline" /> 3-Day Event
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Event Schedule</h2>
          <p className="text-xl text-muted-foreground font-light">
            Three days of learning, building, and celebrating. Here's what to expect.
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
                        <div className="shrink-0 w-[4.5rem] text-right pt-3">
                          <p className="text-sm font-mono text-muted-foreground whitespace-nowrap">{slot.time}</p>
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
