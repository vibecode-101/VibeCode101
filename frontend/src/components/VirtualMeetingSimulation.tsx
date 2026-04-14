import { useState, useEffect } from "react";
import { Mic, MicOff, Video, Users } from "lucide-react";

const ATTENDEES = [
  { initials: "MJ", name: "Mark Jeffrey",   color: "from-primary to-orange-600"    },
  { initials: "SK", name: "Sarah K.",        color: "from-blue-500 to-blue-700"     },
  { initials: "PM", name: "Priya M.",        color: "from-violet-500 to-purple-700" },
  { initials: "MD", name: "Marcus D.",       color: "from-green-500 to-emerald-700" },
  { initials: "AL", name: "Aisha L.",        color: "from-pink-500 to-rose-700"     },
  { initials: "TR", name: "Tom R.",          color: "from-amber-500 to-yellow-700"  },
];

const CHAT_MESSAGES = [
  { from: "Sarah K.",   text: "This concierge is insane — it knows the schedule cold",       delay: 0     },
  { from: "Marcus D.",  text: "BYOK setup took 30 seconds. Already using my own key",        delay: 4000  },
  { from: "Priya M.",   text: "Networking room matched me with 3 people in my exact niche",  delay: 8000  },
  { from: "Tom R.",     text: "Keynote is fire. Mark dropping gems every 5 minutes",         delay: 11000 },
  { from: "Aisha L.",   text: "Forming a Demo Day team — who else is building?",             delay: 15000 },
  { from: "Sarah K.",   text: "Browse With Me + this session = brain fully upgraded",        delay: 19000 },
  { from: "Marcus D.",  text: "SaaS Signal flagged 8 warm leads just from my booth card",    delay: 23000 },
  { from: "Priya M.",   text: "First vibe-coded app is LIVE. Shipped in 47 minutes.",        delay: 27000 },
];

export function VirtualMeetingSimulation() {
  const [messages, setMessages]     = useState<typeof CHAT_MESSAGES>([]);
  const [speakerIdx, setSpeakerIdx] = useState(0);

  useEffect(() => {
    const timers = CHAT_MESSAGES.map(msg =>
      setTimeout(() => {
        setMessages(prev => [...prev, msg].slice(-5));
      }, msg.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSpeakerIdx(i => (i + 1) % ATTENDEES.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="holo-card holo-glow p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">Live</span>
          </span>
          <span className="text-xs text-muted-foreground font-light">Keynote: Training Your AI</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>330</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {ATTENDEES.map((att, i) => {
          const isSpeaking = i === speakerIdx;
          return (
            <div
              key={att.initials}
              className="relative rounded-xl overflow-hidden aspect-video flex items-center justify-center transition-all duration-500"
              style={{
                boxShadow: isSpeaking ? "0 0 0 2px rgba(235,90,30,0.8), 0 0 16px rgba(235,90,30,0.25)" : "none",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${att.color} flex items-center justify-center`}>
                <span className="text-white text-xs font-bold">{att.initials}</span>
              </div>
              <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between">
                <span className="text-[9px] text-white/70 truncate">{att.name}</span>
                {isSpeaking
                  ? <Mic className="w-2.5 h-2.5 text-primary shrink-0" />
                  : <MicOff className="w-2.5 h-2.5 text-white/30 shrink-0" />
                }
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1 bg-muted/20 rounded-xl p-3 flex flex-col gap-2 overflow-hidden min-h-[110px]">
        <div className="flex items-center gap-1.5 mb-1">
          <Video className="w-3 h-3 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-mono">Session Chat</span>
        </div>
        <div className="flex flex-col gap-1.5 overflow-hidden">
          {messages.length === 0
            ? <p className="text-[11px] text-muted-foreground italic">Chat warming up...</p>
            : messages.map((msg, i) => (
              <div key={i} className="text-xs leading-snug">
                <span className="font-semibold text-primary">{msg.from}</span>
                <span className="text-muted-foreground ml-1">{msg.text}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
