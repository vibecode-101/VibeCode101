import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

const faqCategories = [
  {
    category: "General",
    questions: [
      { q: "Do I need to know how to code?", a: "Not at all. The Beginner Track is designed specifically for people who have never written a line of code. We use AI tools and visual builders to help you learn the concepts while actually building something real." },
      { q: "What should I bring?", a: "Just your laptop, a charger, and an idea. We provide the wifi, food, drinks, and all the vibes." },
      { q: "Can I work with a team?", a: "Yes! You can work solo or in teams of up to 4 people. You can come with a team or form one on Friday night during the kickoff." },
      { q: "What kind of projects are allowed?", a: "Anything software. Web apps, mobile apps, AI tools, games, chrome extensions. As long as it's built during the weekend, it's fair game." },
      { q: "Who is this event for?", a: "Beginners who want to learn to build, founders prototyping MVPs, designers exploring code, and experienced devs who want to explore AI-assisted development. Everyone is welcome." },
    ],
  },
  {
    category: "Tickets",
    questions: [
      { q: "Can I upgrade my ticket later?", a: "Yes! You can upgrade from General to Builder Pro or Beginner Track at any time before the event. Just pay the difference." },
      { q: "Are refunds available?", a: "Full refunds are available up to 14 days before the event. After that, tickets are transferable to another attendee." },
      { q: "Are there travel stipends available?", a: "Currently, we do not offer travel stipends, but we have negotiated discounted rates at several hotels near International Drive. Check the Discord for details after registering." },
      { q: "What's included in the ticket price?", a: "All tickets include event access, meals, snacks, drinks, WiFi, and swag. Builder Pro and Beginner Track add additional perks listed on the pricing page." },
    ],
  },
  {
    category: "Content",
    questions: [
      { q: "What tools will I learn?", a: "The curriculum covers Cursor, Replit, GitHub Copilot, React, Tailwind CSS, shadcn/ui, Supabase, Drizzle ORM, OpenAI SDK, Vercel AI SDK, Framer Motion, and more." },
      { q: "Do I need to follow the Beginner Track?", a: "No. The Beginner Track is optional. General and Builder Pro attendees can explore the event freely, attend masterclasses, and work on their own projects." },
      { q: "Will sessions be recorded?", a: "Keynotes and masterclasses will be recorded and made available to all ticket holders after the event. Workshop sessions are live-only." },
    ],
  },
  {
    category: "Logistics",
    questions: [
      { q: "Where is the event?", a: "The event is held on International Drive in Orlando, FL. The exact venue address will be shared with ticket holders 2 weeks before the event." },
      { q: "Is there parking?", a: "Yes, free parking is available at the venue. There's also rideshare pickup/dropoff points right at the entrance." },
      { q: "What are the event hours?", a: "Doors open at 8 AM each day. Day 1 and 2 end around 9 PM. Day 3 (Demo Day) ends at 6 PM after the awards ceremony." },
      { q: "Is food provided?", a: "Yes! Breakfast, lunch, snacks, and drinks are included with every ticket. We accommodate dietary restrictions — just let us know when you register." },
    ],
  },
];

export default function FAQRoom() {
  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 text-white bg-primary border-primary px-3 py-1 rounded-full text-sm">
            <MessageCircleQuestion className="w-3.5 h-3.5 mr-2 inline" /> Help Center
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground font-light">
            Everything you need to know about Vibe Code 101.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {faqCategories.map((cat, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm text-primary font-bold">{cat.questions.length}</span>
                {cat.category}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {cat.questions.map((faq, i) => (
                  <AccordionItem key={i} value={`${catIdx}-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-lg hover:text-primary transition-colors py-6 font-medium">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
