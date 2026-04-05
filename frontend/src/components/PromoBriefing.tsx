import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

type Scene = {
  id: string;
  duration: number;
  content: React.ReactNode;
};

const scenes: Scene[] = [
  {
    id: "act1a",
    duration: 4600,
    content: (
      <div className="flex flex-col gap-2.5 items-center justify-center">
        <span className="promo-split-line promo-dim">THE A.I. HYPE</span>
        <span className="promo-split-line promo-dim">CYCLE IS OVER.</span>
        <span className="promo-split-line promo-accent-line"><span>THE SHIPPING</span></span>
        <span className="promo-split-line promo-accent-line"><span>CYCLE HAS BEGUN.</span></span>
      </div>
    ),
  },
  {
    id: "act1b",
    duration: 5600,
    content: (
      <div>
        <div className="promo-eyebrow">Market Shift</div>
        <h2 className="promo-mega mt-5">
          The edge is no longer <span className="promo-accent">access</span>.<br />
          It is <span className="promo-accent">execution</span>.
        </h2>
        <p className="promo-sub">
          The market has moved beyond learning how to prompt. The next winners are the teams that can ship
          practical, production-grade AI workflows.
        </p>
      </div>
    ),
  },
  {
    id: "act2a",
    duration: 5800,
    content: (
      <div>
        <img src={`${BASE}images/logo-vibe-code-alt.png`} alt="Vibe Code 101" className="promo-hero-logo" />
        <div className="promo-eyebrow">Orlando, FL &bull; International Drive</div>
        <h2 className="promo-mega mt-5">Enter the <span className="promo-accent">Arena</span>.</h2>
        <div className="promo-date">June 5–7, 2026</div>
        <p className="promo-sub">500+ Builders. 20+ Masterclasses. One mission: Build. Ship. Be Seen.</p>
      </div>
    ),
  },
  {
    id: "act3a",
    duration: 5500,
    content: (
      <div>
        <div className="promo-eyebrow">The MasterClass Pathway</div>
        <h2 className="promo-mega mt-4" style={{ fontSize: "clamp(1.8rem, 5.8vw, 3.1rem)" }}>
          9 Modules.<br />
          <span className="promo-accent">Setup to Ship.</span>
        </h2>
        <p className="promo-sub mt-3" style={{ maxWidth: 360 }}>
          A guided progression from foundations to agentic execution.
        </p>
        <div className="promo-stats mt-4">
          <div className="promo-stat">
            <h3>Foundation</h3>
            <p>Setup &bull; Fundamentals &bull; Method</p>
          </div>
          <div className="promo-stat">
            <h3>Build</h3>
            <p>Integration &bull; Tool Use &bull; Agents</p>
          </div>
          <div className="promo-stat">
            <h3>Ship</h3>
            <p>Deployment &bull; Readiness &bull; Execution</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "act4a",
    duration: 4400,
    content: (
      <div>
        <div className="promo-eyebrow">Choose Your Pipeline</div>
        <h2 className="promo-mega mt-5" style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}>
          Beginner <span style={{ color: "rgba(255,255,255,0.42)" }}>&amp;</span><br />
          <span className="promo-accent">Builder Pro.</span>
        </h2>
        <p className="promo-sub">High-signal mentorship for every level of the stack.</p>
      </div>
    ),
  },
  {
    id: "act5a",
    duration: 6400,
    content: null,
  },
  {
    id: "act6a",
    duration: 4200,
    content: (
      <div>
        <div className="promo-eyebrow">Market Research Briefing</div>
        <h2 className="promo-mega mt-5" style={{ color: "var(--promo-primary)" }}>AUTHORITY.</h2>
        <p className="promo-sub">AiAssist.net analysis: &ldquo;Hardware and models are table stakes. Execution is the only remaining edge.&rdquo;</p>
      </div>
    ),
  },
  {
    id: "act7a",
    duration: 4400,
    content: (
      <div>
        <div className="promo-eyebrow">Partner Network</div>
        <h2 className="promo-mega mt-5" style={{ fontSize: "clamp(2rem, 6vw, 3.8rem)" }}>
          Defining the <span className="promo-accent">Future.</span>
        </h2>
        <p className="promo-sub">Join the ecosystem of brands and builders shipping the next generation of software.</p>
      </div>
    ),
  },
  {
    id: "act8a",
    duration: 6600,
    content: (
      <div className="promo-cta-panel">
        <div className="promo-eyebrow">Phase 1 Access Now Live</div>
        <h2 className="promo-mega mt-4" style={{ fontSize: "clamp(1.85rem, 5.5vw, 3.4rem)" }}>
          Secure the <span className="promo-accent">Advantage</span>.
        </h2>
        <p className="promo-sub mt-3">Join the builders, founders, and engineers moving from AI curiosity to production-grade execution.</p>
        <div className="flex justify-center gap-3 flex-wrap mt-5">
          <a href="#" className="promo-btn promo-btn-primary">Register Now</a>
          <a href="#" className="promo-btn promo-btn-secondary">Become a Sponsor</a>
        </div>
        <p className="mt-5 opacity-40 text-xs tracking-[0.18em] uppercase">Orlando, FL &bull; June 2026</p>
      </div>
    ),
  },
];

const STING_WORDS = ["AGENTIC", "TOOL USE", "WORKFLOWS", "EXECUTION", "DEPLOYMENT", "SHIPPING"];

export default function PromoBriefing() {
  const [playing, setPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(-1);
  const [scenePhase, setScenePhase] = useState<"enter" | "exit" | "idle">("idle");
  const [progress, setProgress] = useState(0);
  const [stingWord, setStingWord] = useState(STING_WORDS[0]);
  const [stingPhase, setSting] = useState<"in" | "out" | "idle">("idle");
  const [finished, setFinished] = useState(false);
  const cancelRef = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

  const sleep = (ms: number) => new Promise<void>((resolve) => {
    const start = Date.now();
    const check = () => {
      if (cancelRef.current) return resolve();
      if (Date.now() - start >= ms) return resolve();
      requestAnimationFrame(check);
    };
    requestAnimationFrame(check);
  });

  const playSequence = useCallback(async () => {
    cancelRef.current = false;
    setPlaying(true);
    setFinished(false);
    let elapsed = 0;

    for (let i = 0; i < scenes.length; i++) {
      if (cancelRef.current) break;
      const scene = scenes[i];

      setCurrentScene(i);
      setScenePhase("enter");

      if (scene.id === "act5a") {
        for (let w = 0; w < STING_WORDS.length; w++) {
          if (cancelRef.current) break;
          setStingWord(STING_WORDS[w]);
          setSting("in");
          await sleep(280);
          await sleep(620);
          if (w < STING_WORDS.length - 1) {
            setSting("out");
            await sleep(140);
          }
        }
      } else {
        await sleep(scene.duration);
      }

      const progressEnd = ((elapsed + scene.duration) / totalDuration) * 100;
      setProgress(progressEnd);

      if (i < scenes.length - 1) {
        setScenePhase("exit");
        await sleep(450);
      }

      elapsed += scene.duration;
    }

    setFinished(true);
  }, [totalDuration]);

  const handleReplay = () => {
    setCurrentScene(-1);
    setScenePhase("idle");
    setProgress(0);
    setPlaying(false);
    setFinished(false);
    setTimeout(() => playSequence(), 100);
  };

  useEffect(() => {
    if (!playing) return;
    let elapsed = 0;
    const startTime = Date.now();
    let raf: number;
    const update = () => {
      const dt = Date.now() - startTime;
      setProgress(Math.min((dt / totalDuration) * 100, 100));
      if (dt < totalDuration) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [playing, totalDuration]);

  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-xl mx-auto">
          <div
            ref={frameRef}
            className="promo-phone-stage relative mx-auto"
          >
            <div className="promo-phone-grid" />

            <div className="promo-orb promo-orb-1" />
            <div className="promo-orb promo-orb-2" />

            <div className="promo-hud">
              <div className="promo-topbar">
                <div className="promo-hud-brand">
                  <span className="promo-hud-dot" />
                  Vibe Code 101
                </div>
                <div className="promo-hud-progress-group">
                  <div className="promo-hud-label">Briefing Sequence</div>
                  <div className="promo-progress-wrap">
                    <div className="promo-progress-bar" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
              <div className="promo-hud-diagnostic">
                <div className="promo-diag-item"><span className="promo-diag-dot" /> Signal: 100%</div>
                <div className="promo-diag-item"><span className="promo-diag-dot" /> Vibe: Active</div>
              </div>
            </div>

            {!playing && !finished && (
              <div className="promo-play-shell">
                <div className="promo-play-card">
                  <img src={`${BASE}images/logo-vibe-code-alt.png`} alt="Vibe Code 101" className="w-[92px] mx-auto mb-4 drop-shadow-[0_0_20px_rgba(242,85,55,0.22)]" />
                  <div className="promo-eyebrow mb-4">Official Briefing</div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-none mb-3 text-white">
                    The Shipping Cycle<br />Has Begun.
                  </h2>
                  <p className="text-white/68 text-sm leading-relaxed max-w-[320px] mx-auto mb-5">
                    Witness the definitive shift from A.I. hype to production-grade agentic workflows.
                  </p>
                  <button onClick={playSequence} className="promo-btn promo-btn-primary inline-flex items-center gap-2">
                    <Play className="w-4 h-4" /> Enter the Arena
                  </button>
                  <p className="mt-5 mb-0 text-white/40 text-xs">
                    Brought to you in part by{" "}
                    <a href="https://aiassist.net" className="text-[#ff8a1f] no-underline hover:underline">AiAssist.net</a>
                  </p>
                </div>
              </div>
            )}

            {finished && (
              <div className="promo-play-shell">
                <div className="promo-play-card">
                  <img src={`${BASE}images/logo-vibe-code-alt.png`} alt="Vibe Code 101" className="w-[92px] mx-auto mb-4 drop-shadow-[0_0_20px_rgba(242,85,55,0.22)]" />
                  <h2 className="text-2xl font-bold tracking-tight leading-none mb-3 text-white">
                    Ready to Build?
                  </h2>
                  <p className="text-white/68 text-sm leading-relaxed max-w-[320px] mx-auto mb-5">
                    Scroll down to explore the event or replay the briefing.
                  </p>
                  <button onClick={handleReplay} className="promo-btn promo-btn-primary inline-flex items-center gap-2">
                    <Play className="w-4 h-4" /> Replay Briefing
                  </button>
                </div>
              </div>
            )}

            <div className="promo-stage">
              {scenes.map((scene, i) => {
                const isActive = currentScene === i;
                const phaseClass = isActive
                  ? scenePhase === "enter" ? "promo-scene-enter" : scenePhase === "exit" ? "promo-scene-exit" : ""
                  : "";

                if (scene.id === "act5a") {
                  return (
                    <div
                      key={scene.id}
                      className={cn("promo-scene", isActive && "promo-scene-visible", phaseClass)}
                    >
                      <div className="promo-scene-inner">
                        <div
                          className={cn(
                            "promo-mega promo-accent transition-all duration-300",
                            stingPhase === "in" && "scale-100 opacity-100",
                            stingPhase === "out" && "scale-75 opacity-0",
                            stingPhase === "idle" && "scale-110 opacity-0"
                          )}
                          style={{ textShadow: "0 0 50px rgba(242,85,55,0.4)", fontSize: "clamp(2rem, 9vw, 4.2rem)" }}
                        >
                          {stingWord}
                        </div>
                        <div className="promo-eyebrow mt-7">Production-Ready Signal</div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={scene.id}
                    className={cn("promo-scene", isActive && "promo-scene-visible", phaseClass)}
                  >
                    <div className="promo-scene-inner">
                      {scene.content}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="promo-footer-note">AiAssist.net Authorized Briefing &bull; 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
}
