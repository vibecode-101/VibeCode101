import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Layers, Heart, Trophy, ArrowRight } from "lucide-react";
import { useSpatial } from "@/components/spatial/SpatialProvider";

const BASE = import.meta.env.BASE_URL;

const projects = [
  { name: "Synapse Workspace", author: "Team Alpha", desc: "An AI-powered collaborative workspace that adapts to your workflow and suggests next steps.", votes: 342, img: `${BASE}images/gallery-warm.png`, tags: ["AI Apps"], stack: ["React", "OpenAI", "Supabase"] },
  { name: "FlowState Tracker", author: "Elena R.", desc: "A minimalist productivity app that tracks your coding flow state and optimizes your schedule.", votes: 289, img: `${BASE}images/hero-warm.png`, tags: ["Beginner Builds"], stack: ["React", "Tailwind", "localStorage"] },
  { name: "Cosmic Analytics", author: "DevSquad", desc: "Beautiful real-time analytics dashboard with AI-generated insights and anomaly detection.", votes: 415, img: `${BASE}images/masterclass-warm.png`, tags: ["Developer Tools"], stack: ["Next.js", "D3", "Vercel AI"] },
  { name: "VibeBoard", author: "Marcus T.", desc: "A collaborative mood board tool for designers that uses AI to suggest complementary colors and layouts.", votes: 198, img: `${BASE}images/project-1.png`, tags: ["Creative Tools"], stack: ["React", "Canvas API", "GPT-4"] },
  { name: "PitchPal", author: "Sarah & Co.", desc: "AI agent that researches investors, enriches contact info, and drafts personalized outreach emails.", votes: 523, img: `${BASE}images/orlando-vibe.png`, tags: ["AI Apps"], stack: ["AiAssist.net", "Apollo API", "Airtable"] },
  { name: "LearnLoop", author: "First Timer", desc: "A flashcard app that generates questions from any topic using AI, built in a single weekend.", votes: 156, img: `${BASE}images/hero-warm.png`, tags: ["Beginner Builds"], stack: ["React", "OpenAI", "Replit"] },
];

const categories = ["All", "AI Apps", "Creative Tools", "Developer Tools", "Beginner Builds"];

export default function ProjectsRoom() {
  const { navigateToRoom } = useSpatial();
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 text-white bg-primary border-primary px-3 py-1 rounded-full text-sm">
            <Layers className="w-3.5 h-3.5 mr-2 inline" /> Vibe Coded
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Projects Spotlight</h2>
          <p className="text-xl text-muted-foreground font-light">
            Every project submitted during the event is displayed here. These are REAL projects built with vibe coding methodology. The community votes. The best builds win.
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/10 p-1 rounded-full">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-white">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter((p) => cat === "All" || p.tags.includes(cat))
                  .map((project, i) => (
                    <div key={i} className="holo-card holo-glow group overflow-hidden transition-all hover:-translate-y-1">
                      <div className="relative z-[2]">
                        <div className="h-56 relative overflow-hidden bg-muted/30 dark:bg-white/5 p-2">
                          <div className="absolute inset-2 rounded-2xl overflow-hidden">
                            <img
                              src={project.img}
                              alt={project.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                          </div>
                          <div className="absolute top-6 left-6 flex gap-2 z-[3]">
                            {project.tags.map((tag) => (
                              <Badge key={tag} className="holo-pill bg-black/40 backdrop-blur-md text-white border-white/20">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-lg text-foreground mb-1">{project.name}</h4>
                              <p className="text-sm text-muted-foreground font-light">by <span className="text-foreground/80">{project.author}</span></p>
                            </div>
                            <Button variant="outline" size="sm" className="h-9 px-3 rounded-full bg-white/90 dark:bg-white/10 border border-white/50 dark:border-white/10 hover:bg-primary/20 hover:text-primary group/btn">
                              <Heart className="w-4 h-4 mr-2 group-hover/btn:fill-primary" /> {project.votes}
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground font-light mb-4 line-clamp-2">{project.desc}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-[10px] px-2 py-0.5 rounded-full border-border">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-20">
          <div className="holo-card holo-glow holo-specular group">
            <div className="relative z-[2] flex flex-col md:flex-row items-center justify-between bg-card p-10 md:p-12 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
              <div className="relative z-10 mb-8 md:mb-0 max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground">Submit Your Project</h3>
                </div>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Earn digital badges, finalist ribbons, and physical awards at the closing ceremony. Every shipped project gets a builder badge.
                </p>
              </div>
              <div className="relative z-10 shrink-0 w-full md:w-auto">
                <Button size="lg" onClick={() => navigateToRoom("syllabus")} className="w-full md:w-auto h-14 px-8 rounded-full bg-primary text-white hover:bg-primary/90 text-lg shadow-[0_0_20px_rgba(235,90,30,0.3)]">
                  View Guidelines <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
