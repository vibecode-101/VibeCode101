import { useState, useEffect } from "react";
import { Radio, Users, MessageSquare, Zap, Star } from "lucide-react";

const FEED_ITEMS = [
  { icon: Radio,         color: "text-red-400",    bg: "bg-red-400/10",     text: "Keynote: Training Your AI is now LIVE",                   time: "now" },
  { icon: Users,         color: "text-green-400",  bg: "bg-green-400/10",   text: "47 builders just joined the Networking Lounge",           time: "12s ago" },
  { icon: MessageSquare, color: "text-blue-400",   bg: "bg-blue-400/10",    text: "Sarah K.: \"Just shipped my first AI agent — mind blown\"", time: "38s ago" },
  { icon: Radio,         color: "text-red-400",    bg: "bg-red-400/10",     text: "Master Class: Vibe Backend starting in 5 min",            time: "1m ago" },
  { icon: Zap,           color: "text-primary",    bg: "bg-primary/10",     text: "New Demo Day project submitted: AI Resume Scanner",       time: "2m ago" },
  { icon: Users,         color: "text-green-400",  bg: "bg-green-400/10",   text: "330+ attendees currently online worldwide",               time: "2m ago" },
  { icon: MessageSquare, color: "text-blue-400",   bg: "bg-blue-400/10",    text: "Marcus D.: \"The BYOK concierge just saved me 3 hours\"",  time: "3m ago" },
  { icon: Zap,           color: "text-primary",    bg: "bg-primary/10",     text: "Community vote open: Top Demo Day projects announced",    time: "4m ago" },
  { icon: Star,          color: "text-yellow-400", bg: "bg-yellow-400/10",  text: "Mentor session started: Building Your AI Stack",          time: "5m ago" },
  { icon: MessageSquare, color: "text-blue-400",   bg: "bg-blue-400/10",    text: "Priya M.: \"First time at a virtual conf — this is wild\"", time: "6m ago" },
  { icon: Radio,         color: "text-red-400",    bg: "bg-red-400/10",     text: "Claude session with Mark Jeffrey starting now",           time: "now" },
  { icon: Zap,           color: "text-primary",    bg: "bg-primary/10",     text: "SaaS Signal spotted 12 high-intent leads in the lobby",   time: "just now" },
];

export function NewsFeedSimulation() {
  const [items, setItems]       = useState(FEED_ITEMS.slice(0, 4));
  const [cursor, setCursor]     = useState(4);
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setEntering(true);
      setTimeout(() => {
        setItems(prev => [FEED_ITEMS[cursor % FEED_ITEMS.length], ...prev.slice(0, 3)]);
        setCursor(c => c + 1);
        setEntering(false);
      }, 280);
    }, 2800);
    return () => clearInterval(id);
  }, [cursor]);

  return (
    <div className="holo-card holo-glow p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Live Activity Feed</span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">June 5, 2026</span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {items.map((item, i) => {
          const Icon = item.icon;
          const isNew = i === 0 && entering;
          return (
            <div
              key={`${item.text}-${i}`}
              className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 transition-opacity duration-300"
              style={{ opacity: isNew ? 0 : 1 }}
            >
              <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground leading-snug">{item.text}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
