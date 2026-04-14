import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const BASE = import.meta.env.BASE_URL;

type Tier = {
  id: string;
  label: string;
  role: string;
  name: string;
  accent: string;
  stripe: string;
  chipColor: string;
  textColor: string;
  qrColor: string;
  badgeNum: string;
  holoBg: string;
};

const TIERS: Tier[] = [
  {
    id: "general",
    label: "ATTENDEE",
    role: "General Access",
    name: "Alex Rivera",
    accent: "from-blue-600 to-indigo-700",
    stripe: "bg-gradient-to-r from-blue-600 to-indigo-700",
    chipColor: "#c0c0c0",
    textColor: "text-blue-700 dark:text-blue-400",
    qrColor: "#3b5bdb",
    badgeNum: "VC26-00142",
    holoBg: "from-blue-400/20 via-indigo-300/10 to-violet-400/20",
  },
  {
    id: "builder",
    label: "BUILDER PRO",
    role: "Builder Pro Access",
    name: "Jordan M.",
    accent: "from-orange-500 to-rose-600",
    stripe: "bg-gradient-to-r from-orange-500 to-rose-600",
    chipColor: "#f5a623",
    textColor: "text-orange-600 dark:text-orange-400",
    qrColor: "#c2410c",
    badgeNum: "VC26-00031",
    holoBg: "from-orange-400/20 via-rose-300/10 to-amber-400/20",
  },
  {
    id: "vip",
    label: "VIP",
    role: "Lifetime Member",
    name: "Sam Chen",
    accent: "from-violet-600 to-purple-800",
    stripe: "bg-gradient-to-r from-violet-600 to-purple-800",
    chipColor: "#ffd700",
    textColor: "text-violet-700 dark:text-violet-400",
    qrColor: "#6d28d9",
    badgeNum: "VC26-00007",
    holoBg: "from-violet-400/20 via-fuchsia-300/10 to-purple-400/20",
  },
];

function QRCode({ color }: { color: string }) {
  const cols = 7;
  const pattern = [
    [1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1],
    [1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1],
  ];
  const inner = [
    [0,1,0,1,0,1],
    [1,0,0,0,1,0],
    [0,0,1,0,0,1],
    [1,1,0,1,0,0],
    [0,1,0,0,1,1],
    [1,0,1,0,0,1],
  ];

  return (
    <svg viewBox="0 0 72 72" width="52" height="52" xmlns="http://www.w3.org/2000/svg">
      {pattern.map((row, r) =>
        row.map((cell, c) =>
          cell ? <rect key={`tl-${r}-${c}`} x={c * 8} y={r * 8} width={7} height={7} fill={color} rx="0.5" /> : null
        )
      )}
      {pattern.map((row, r) =>
        row.map((cell, c) =>
          cell ? <rect key={`tr-${r}-${c}`} x={64 - c * 8} y={r * 8} width={7} height={7} fill={color} rx="0.5" /> : null
        )
      )}
      {pattern.map((row, r) =>
        row.map((cell, c) =>
          cell ? <rect key={`bl-${r}-${c}`} x={c * 8} y={64 - r * 8} width={7} height={7} fill={color} rx="0.5" /> : null
        )
      )}
      {inner.map((row, r) =>
        row.map((cell, c) =>
          cell ? <rect key={`in-${r}-${c}`} x={26 + c * 8} y={26 + r * 8} width={6} height={6} fill={color} rx="0.5" /> : null
        )
      )}
    </svg>
  );
}

function NFCChip({ color }: { color: string }) {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="27" height="19" rx="3.5" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.6" />
      <rect x="4" y="4" width="20" height="12" rx="2" fill={color} fillOpacity="0.2" />
      <line x1="9" y1="4" x2="9" y2="16" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <line x1="14" y1="4" x2="14" y2="16" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <line x1="19" y1="4" x2="19" y2="16" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <line x1="4" y1="8" x2="24" y2="8" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
      <line x1="4" y1="12" x2="24" y2="12" stroke={color} strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  );
}

function Badge3D({ tier, className, style }: { tier: Tier; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [holoPos, setHoloPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -12, y: dx * 12 });
    setHoloPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
    setHoloPos({ x: 50, y: 50 });
    setIsHovered(false);
  }

  const initial = tier.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div
      className={cn("select-none cursor-pointer", className)}
      style={{ perspective: "900px", ...style }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative w-[210px] transition-all duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovered ? "scale(1.04)" : "scale(1)"}`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Lanyard hole */}
        <div className="flex justify-center mb-[-1px] relative z-10">
          <div className="w-5 h-5 rounded-full bg-background border-2 border-border shadow-inner" />
        </div>

        {/* Card body */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          style={{ boxShadow: isHovered ? `0 30px 60px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)` : `0 20px 40px -10px rgba(0,0,0,0.4)` }}
        >
          {/* Holographic shimmer overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(ellipse at ${holoPos.x}% ${holoPos.y}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
              opacity: isHovered ? 1 : 0,
              mixBlendMode: "overlay",
            }}
          />
          <div
            className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
            style={{
              background: `linear-gradient(${holoPos.x * 1.8}deg, rgba(255,0,128,0.06), rgba(0,255,200,0.06), rgba(100,0,255,0.06), rgba(255,200,0,0.06))`,
              opacity: isHovered ? 1 : 0.3,
              transition: "opacity 0.3s",
            }}
          />

          {/* Header stripe */}
          <div className={cn("relative px-4 pt-4 pb-3 flex items-center justify-between", tier.stripe)}>
            <div className="flex items-center gap-2">
              <img
                src={`${BASE}images/logo-vibe-code-alt.png`}
                alt="VibeCODE"
                className="w-7 h-7 object-contain drop-shadow brightness-0 invert"
              />
              <div>
                <p className="text-white text-[10px] font-black uppercase tracking-widest leading-none">VibeCODE</p>
                <p className="text-white/70 text-[8px] uppercase tracking-wider leading-none mt-0.5">101 · June 2026</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">
                {tier.label}
              </span>
            </div>
          </div>

          {/* Card body — white/near-white */}
          <div className="bg-white dark:bg-zinc-900 px-4 pt-4 pb-3">
            {/* Avatar + name */}
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0 bg-gradient-to-br shadow-md", tier.accent)}>
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-zinc-900 dark:text-white font-black text-base leading-tight truncate">{tier.name}</p>
                <p className={cn("text-xs font-semibold mt-0.5", tier.textColor)}>{tier.role}</p>
              </div>
            </div>

            {/* Divider with NFC chip */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
              <NFCChip color={tier.chipColor} />
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
            </div>

            {/* Bottom row: QR + info */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[8px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold mb-0.5">Platform Access</p>
                <p className="text-zinc-800 dark:text-zinc-200 text-[10px] font-bold">vibecode-101.com</p>
                <p className="text-[8px] text-zinc-400 dark:text-zinc-500 mt-2 font-mono">{tier.badgeNum}</p>
                <p className="text-[7px] text-zinc-300 dark:text-zinc-600 mt-0.5">GLOBAL VIRTUAL EVENT</p>
              </div>
              <div className="opacity-90">
                <QRCode color={tier.qrColor} />
              </div>
            </div>
          </div>

          {/* Bottom accent strip */}
          <div className={cn("h-1.5 w-full bg-gradient-to-r", tier.accent)} />
        </div>

        {/* Drop shadow glow */}
        <div
          className={cn("absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full blur-xl opacity-40 bg-gradient-to-r", tier.accent)}
          style={{ transition: "opacity 0.3s", opacity: isHovered ? 0.6 : 0.3 }}
        />
      </div>
    </div>
  );
}

export function BadgeShowcaseSection({ onGetBadge }: { onGetBadge: () => void }) {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-orange-500/5 blur-[60px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-3">Your Credential</p>
          <h2 className="text-3xl md:text-5xl font-black mb-5 leading-tight">
            Not a ticket.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-rose-500">
              A badge.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed">
            Every attendee gets a digital credential that looks this good — complete with platform access, class tier, NFC chip art, and a scannable QR code. It's an expo, not just a website.
          </p>
        </div>

        {/* Badge stack */}
        <div className="flex items-end justify-center gap-6 md:gap-10 mb-14 flex-wrap">
          <Badge3D
            tier={TIERS[0]}
            style={{ transform: "rotate(-6deg)", transformOrigin: "bottom center", marginBottom: "0px" }}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          <Badge3D
            tier={TIERS[1]}
            style={{ zIndex: 10, marginBottom: "24px" }}
          />
          <Badge3D
            tier={TIERS[2]}
            style={{ transform: "rotate(6deg)", transformOrigin: "bottom center", marginBottom: "0px" }}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={onGetBadge}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-bold text-sm shadow-[0_0_30px_rgba(235,90,30,0.4)] hover:shadow-[0_0_40px_rgba(235,90,30,0.6)] hover:bg-primary/90 transition-all"
          >
            Claim Your Badge
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="text-xs text-muted-foreground">Founding member pricing · No card required for free tier</p>
        </div>
      </div>
    </section>
  );
}
