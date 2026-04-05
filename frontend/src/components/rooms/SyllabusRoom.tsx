import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Terminal, Paintbrush, Zap, Code2, Brain, Bot, Sparkles, Rocket, Presentation, CheckCircle2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpatial } from "@/components/spatial/SpatialProvider";

const modules = [
  {
    step: "01",
    title: "The Setup",
    desc: "Environment configuration, mental models for AI-assisted development, and setting up your first project.",
    outcomes: ["Configure your dev environment", "Understand AI-assisted workflow", "Create and scaffold a project from scratch"],
    tools: ["Cursor", "Replit", "GitHub Copilot"],
    icon: Terminal,
  },
  {
    step: "02",
    title: "The UI Vibe",
    desc: "Crafting beautiful interfaces with Tailwind CSS, shadcn/ui, and component libraries. Building responsive layouts that look professional from day one.",
    outcomes: ["Build responsive layouts with Tailwind", "Use component libraries effectively", "Create polished UI from design references"],
    tools: ["Tailwind", "shadcn/ui", "Figma"],
    icon: Paintbrush,
  },
  {
    step: "03",
    title: "The Logic",
    desc: "State management, React hooks, connecting UI to functionality, and handling user input to make your app interactive.",
    outcomes: ["Manage application state", "Handle user interactions", "Connect UI components to logic"],
    tools: ["React", "TypeScript", "Zustand"],
    icon: Zap,
  },
  {
    step: "04",
    title: "The Backend",
    desc: "Databases, APIs, and auth simplified. Setting up Supabase/Postgres, REST endpoints, and server functions.",
    outcomes: ["Set up a database with Supabase", "Create REST API endpoints", "Implement authentication flows"],
    tools: ["Supabase", "Drizzle ORM", "Express"],
    icon: Code2,
  },
  {
    step: "05",
    title: "AI Integration",
    desc: "Adding AI to your app: chat interfaces, streaming responses, structured outputs, and prompt engineering basics.",
    outcomes: ["Build a chat interface with streaming", "Use structured AI outputs", "Apply prompt engineering techniques"],
    tools: ["AiAssist.net API", "OpenAI SDK", "Vercel AI SDK"],
    icon: Brain,
  },
  {
    step: "06",
    title: "AI Agents for Founders",
    desc: "Building AI agents that help founders locate and enrich contacts for investors and journalists. Contact enrichment pipelines, data scraping ethics, CRM integration.",
    outcomes: ["Build contact enrichment pipelines", "Understand data scraping ethics", "Integrate with CRM tools"],
    tools: ["AiAssist.net Agents", "Apollo/Hunter APIs", "Airtable"],
    icon: Bot,
  },
  {
    step: "07",
    title: "The Polish",
    desc: "Animations, micro-interactions, glassmorphism, dark mode, responsive design, and accessibility for a premium feel.",
    outcomes: ["Add animations with Framer Motion", "Implement dark mode and themes", "Ensure accessibility standards"],
    tools: ["Framer Motion", "CSS Animations"],
    icon: Sparkles,
  },
  {
    step: "08",
    title: "The Ship",
    desc: "Deployment, domains, analytics, SEO basics, and your launch checklist to get your project live.",
    outcomes: ["Deploy to Vercel or Replit", "Set up a custom domain", "Configure analytics and SEO"],
    tools: ["Vercel", "GitHub Actions"],
    icon: Rocket,
  },
  {
    step: "09",
    title: "The Pitch",
    desc: "Presenting your project: demo day prep, storytelling for builders, recording demos, and building a portfolio.",
    outcomes: ["Prepare a compelling demo", "Tell your builder story", "Create a project portfolio"],
    tools: ["Loom", "Notion"],
    icon: Presentation,
  },
];

export default function SyllabusRoom() {
  const { navigateToRoom } = useSpatial();
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 text-white bg-primary border-primary px-3 py-1 rounded-full text-sm">
            <GraduationCap className="w-3.5 h-3.5 mr-2 inline" /> Beginner Track
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            From Idea to Demo<br />in 9 Modules
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            The Vibe Code 101 pathway is designed for absolute beginners. We'll take you from a blank canvas to a shipped project ready for the gallery.
          </p>
        </div>

        <div className="relative mb-16">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-primary/10 hidden lg:block" />

          <div className="flex flex-col gap-8">
            {modules.map((module, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex flex-col lg:flex-row gap-6 items-start",
                  i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary/10 border-2 border-primary/30 items-center justify-center z-10">
                  <span className="text-xs font-bold text-primary">{module.step}</span>
                </div>

                <div className={cn("flex-1", i % 2 === 0 ? "lg:pr-16 lg:text-right" : "lg:pl-16")}>
                  <div className="lg:hidden mb-2">
                    <Badge className="bg-primary text-white border-none text-xs">Step {module.step}</Badge>
                  </div>
                </div>

                <div className={cn("flex-1", i % 2 === 0 ? "lg:pl-16" : "lg:pr-16")}>
                  <div className="holo-card holo-glow group p-8 transition-all hover:-translate-y-1">
                    <div className="relative z-[2]">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-muted/50 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors border border-white/20 dark:border-white/5 holo-border">
                          <module.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors relative z-[2]" />
                        </div>
                        <div>
                          <p className="text-xs text-primary font-mono uppercase tracking-widest mb-1">Module {module.step}</p>
                          <h3 className="text-xl font-bold text-foreground">{module.title}</h3>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6">{module.desc}</p>

                      <div className="mb-6">
                        <p className="text-xs font-medium text-foreground uppercase tracking-wider mb-3">Learning Outcomes</p>
                        <ul className="flex flex-col gap-2">
                          {module.outcomes.map((outcome, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground font-light">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {module.tools.map((tool) => (
                          <Badge key={tool} variant="outline" className="bg-gray-100 dark:bg-white/10 text-foreground border-gray-300 dark:border-white/20 text-xs px-2.5 py-1 rounded-full">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="holo-card holo-glow group inline-block">
            <div className="relative z-[2] px-8 py-6 flex flex-col sm:flex-row items-center gap-4">
              <GraduationCap className="w-8 h-8 text-primary" />
              <div className="text-center sm:text-left">
                <p className="font-bold text-foreground">Ready to start your journey?</p>
                <p className="text-sm text-muted-foreground font-light">Get the Beginner Track ticket and follow the full pathway.</p>
              </div>
              <Button onClick={() => navigateToRoom("pricing")} className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shrink-0">
                Get Beginner Track <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
