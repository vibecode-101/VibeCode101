import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";

const faqCategories = [
  {
    category: "General",
    questions: [
      { q: "Is this a virtual event or in-person?", a: "Both — and virtual-first. The main event experience is live-broadcast globally. Every session, masterclass, and demo day streams simultaneously to all attendees worldwide via the VibeCODE Expo platform. In-person hubs (starting with Orlando, FL) let you watch the live broadcast alongside your local builder community. More hub cities are being added." },
      { q: "Do I need to know how to code?", a: "Not at all. The Beginner Track is designed specifically for people who have never written a line of code. We use AI tools and visual builders to help you learn the concepts while actually building something real — all live, alongside the community." },
      { q: "What do I need to participate?", a: "A laptop and a solid internet connection. The entire event runs in your browser through the VibeCODE Expo platform. No special software required. Show up and start building." },
      { q: "What kind of projects are allowed?", a: "Anything software. Web apps, mobile apps, AI tools, games, Chrome extensions. As long as it's built during the weekend, it's fair game. Projects are submitted through the platform and voted on by the community." },
      { q: "Who is this event for?", a: "Beginners who want to learn to build, founders prototyping MVPs, designers exploring code, and experienced devs who want to master AI-assisted development. You can join from anywhere in the world." },
    ],
  },
  {
    category: "Badges",
    questions: [
      { q: "Can I upgrade my badge later?", a: "Yes! You can upgrade from Virtual Access to Builder Pro or Beginner Track at any time before the event. Just pay the difference." },
      { q: "Are refunds available?", a: "Full refunds are available up to 14 days before the event. After that, badges are transferable to another attendee." },
      { q: "What's included in the badge price?", a: "All badges include access to all live-broadcast sessions and masterclasses, virtual networking, community voting, post-event recordings, Discord access, and sponsor perks. Builder Pro and Beginner Track add additional perks listed on the pricing page." },
      { q: "What about in-person hub badges?", a: "In-person hub access for the Orlando, FL inaugural location is available as an add-on. Hub attendees get workspace, food, drinks, and the in-person community experience while watching the live broadcast. Email founders@vibecode-101.com to inquire about hub availability or to bring a hub to your city." },
    ],
  },
  {
    category: "Content",
    questions: [
      { q: "What tools will I learn?", a: "The curriculum covers Cursor, Replit, GitHub Copilot, React, Tailwind CSS, shadcn/ui, Supabase, Drizzle ORM, OpenAI SDK, Vercel AI SDK, Framer Motion, and more — all taught in the context of real, shipped projects." },
      { q: "Do I need to follow the Beginner Track?", a: "No. The Beginner Track is optional. Virtual Access and Builder Pro attendees can explore the event freely, attend any masterclass, and work on their own projects." },
      { q: "Will sessions be recorded?", a: "Yes. All live-broadcast sessions and masterclasses are recorded and made available to all badge holders after the event through the VibeCODE Expo platform." },
      { q: "Is there networking?", a: "Yes — the VibeCODE Expo platform has a full virtual networking lounge, real-time DMs, sponsor booths, and an AI concierge that helps connect you with other builders based on your interests and goals." },
    ],
  },
  {
    category: "Logistics",
    questions: [
      { q: "What time do sessions start?", a: "Live sessions begin at 9:00 AM ET each day. Doors (virtual lobby) open at 8:00 AM ET. The full schedule is posted in the Event Schedule room." },
      { q: "What time zone is the event in?", a: "All published times are Eastern Time (ET). The VibeCODE Expo platform will display times adjusted to your local time zone once you're logged in." },
      { q: "How do I access the virtual event?", a: "Once you complete your badge purchase, you'll receive an email with a one-click login link to the VibeCODE Expo platform. Your account is ready before the event so you can explore, set up your profile, and connect with other builders." },
      { q: "Is there an in-person location?", a: "Our inaugural in-person hub is in Orlando, FL on International Drive — where builders can watch the live broadcast together. More hub cities are coming soon. All in-person attendees receive the same live-broadcast experience as virtual attendees." },
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
