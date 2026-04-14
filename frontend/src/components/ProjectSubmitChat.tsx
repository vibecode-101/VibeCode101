import { useState, useRef, useEffect } from "react";
import {
  Rocket, Send, X, Brain, PenLine,
  ExternalLink, Github, CheckCircle2, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BASE = import.meta.env.BASE_URL;
const MAX_CHARS = 1000;

type Role = "user" | "assistant";

interface SubmittedProject {
  id: string; name: string; tagline: string; description: string;
  url: string; githubUrl?: string; stack: string[]; category: string;
  builderName: string; email: string; votes: number; submittedAt: string;
}

interface Message {
  role: Role;
  content: string;
  project?: SubmittedProject;
}

function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl rounded-bl-md bg-muted w-fit text-sm">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <Brain className="w-3.5 h-3.5 text-primary animate-pulse" />
      </div>
      <span className="text-muted-foreground text-xs font-medium">Thinking</span>
      <div className="flex gap-0.5">
        {[0, 150, 300].map(d => (
          <div key={d} className="w-1 h-1 rounded-full opacity-60 animate-bounce bg-primary"
            style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  );
}

function ComposingIndicator() {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl rounded-bl-md bg-muted w-fit text-sm">
      <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
        <PenLine className="w-3.5 h-3.5 text-emerald-500" />
      </div>
      <span className="text-muted-foreground text-xs font-medium">Composing</span>
      <div className="flex gap-0.5">
        {[0, 150, 300].map(d => (
          <div key={d} className="w-1 h-1 rounded-full opacity-60 animate-bounce bg-emerald-500"
            style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  );
}

function InlineProjectCard({ project }: { project: SubmittedProject }) {
  return (
    <div className="rounded-2xl rounded-tl-sm border border-emerald-500/30 bg-emerald-500/[0.04] overflow-hidden mt-2">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-emerald-500/20 bg-emerald-500/10">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span className="text-xs font-semibold text-emerald-300">Submitted to Demo Day</span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          {project.category}
        </span>
      </div>
      <div className="p-4 space-y-2.5">
        <div>
          <h4 className="font-bold text-sm text-foreground">{project.name}</h4>
          <p className="text-xs text-muted-foreground italic mt-0.5">{project.tagline}</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{project.description}</p>
        {project.stack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border border-border bg-muted/50 text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 pt-1">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-primary hover:opacity-80 transition-opacity">
              <ExternalLink className="w-3 h-3" /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-3 h-3" /> GitHub
            </a>
          )}
          <span className="ml-auto text-[10px] text-muted-foreground/60">by {project.builderName}</span>
        </div>
      </div>
    </div>
  );
}

interface ProjectSubmitChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSubmitChat({ isOpen, onClose }: ProjectSubmitChatProps) {
  const [phase, setPhase]             = useState<"compose" | "chat">("compose");
  const [pitch, setPitch]             = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput]     = useState("");

  const [messages, setMessages]       = useState<Message[]>([]);
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const [chatInput, setChatInput]     = useState("");
  const [isLoading, setIsLoading]     = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<"thinking" | "composing">("thinking");
  const [submitted, setSubmitted]     = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatRef     = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && phase === "compose") textareaRef.current?.focus();
  }, [isOpen, phase]);

  useEffect(() => {
    if (editingName) nameRef.current?.focus();
  }, [editingName]);

  useEffect(() => {
    if (phase === "chat") {
      setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }), 50);
    }
  }, [messages, isLoading, phase]);

  function autoGrow() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(120, el.scrollHeight)}px`;
  }

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;
    setMessages(prev => [...prev, { role: "user", content: text.trim() }]);
    setChatInput("");
    setIsLoading(true);
    setLoadingPhase("thinking");
    const timer = setTimeout(() => setLoadingPhase("composing"), 1200);

    try {
      const res = await fetch(`${BASE}api/projects/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), workspaceId }),
      });
      clearTimeout(timer);
      const data = await res.json();
      if (data.workspaceId) setWorkspaceId(data.workspaceId);

      if (data.submitted && data.project) {
        setSubmitted(true);
        setMessages(prev => [...prev, {
          role: "assistant",
          content: data.celebrationMessage || `**${data.project.name}** is on the board! Check your inbox — your builder badge is on the way.`,
          project: data.project,
        }]);
        return;
      }

      if (data.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
      }
    } catch {
      clearTimeout(timer);
      setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Give it another shot!" }]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitPitch() {
    if (!pitch.trim() || isLoading) return;
    const fullMessage = submitterName.trim()
      ? `My name is ${submitterName.trim()}. Here's my project: ${pitch.trim()}`
      : pitch.trim();
    setPhase("chat");
    await sendMessage(fullMessage);
  }

  function handleClose() {
    setPhase("compose");
    setPitch("");
    setSubmitterName("");
    setMessages([]);
    setWorkspaceId(null);
    setChatInput("");
    setSubmitted(false);
    setIsLoading(false);
    onClose();
  }

  function commitName() {
    setSubmitterName(nameInput.trim());
    setEditingName(false);
  }

  if (!isOpen) return null;

  const displayName = submitterName.trim() || "Builder";
  const initial     = displayName[0]?.toUpperCase() ?? "B";
  const canSubmit   = pitch.trim().length > 0 && !isLoading;

  return (
    <div className="space-y-3">

      {/* ── Composer ── */}
      {phase === "compose" && (
        <div className="composer-holo">
          <div className="bg-card rounded-[calc(1rem-1.5px)] p-4 space-y-3">

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={pitch}
              onChange={e => { setPitch(e.target.value); autoGrow(); }}
              placeholder="Tell us about your project..."
              maxLength={MAX_CHARS}
              style={{ minHeight: 120, resize: "none" }}
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground/50 focus:outline-none leading-relaxed"
            />

            {/* Submitting as row */}
            <div className="border-t border-white/[0.06] pt-3">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center text-white text-[9px] font-black shrink-0">
                    {nameInput[0]?.toUpperCase() ?? "B"}
                  </div>
                  <input
                    ref={nameRef}
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    onBlur={commitName}
                    onKeyDown={e => { if (e.key === "Enter") commitName(); if (e.key === "Escape") setEditingName(false); }}
                    placeholder="Your name"
                    className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground/50 outline-none border-b border-primary/40 pb-0.5"
                  />
                </div>
              ) : (
                <button
                  onClick={() => { setNameInput(submitterName); setEditingName(true); }}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center text-white text-[9px] font-black shrink-0">
                    {initial}
                  </div>
                  <span>
                    Submitting as{" "}
                    <span className="font-semibold text-foreground/80">{displayName}</span>
                  </span>
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                </button>
              )}
            </div>

            {/* Bottom toolbar */}
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-mono ${pitch.length > MAX_CHARS * 0.9 ? "text-amber-400" : "text-muted-foreground"}`}>
                {pitch.length}/{MAX_CHARS}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-muted transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPitch}
                  disabled={!canSubmit}
                  className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold hover:opacity-90 transition-all disabled:opacity-40 shadow-[0_0_14px_rgba(124,58,237,0.35)]"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Conversation thread (chat phase) ── */}
      {phase === "chat" && (
        <div className="holo-card holo-glow !rounded-2xl overflow-hidden">
          <div className="relative z-[2] flex flex-col" style={{ maxHeight: 480 }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/30 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-yellow-500 flex items-center justify-center shrink-0">
                  <Rocket className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-semibold text-foreground">Demo Day Agent</span>
                {submitted && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 ml-1">
                    <CheckCircle2 className="w-3 h-3" /> Submitted
                  </span>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Message thread */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-[160px]"
            >
              {messages.map((msg, i) => (
                <div key={i} className="flex flex-col">
                  <div className={cn(
                    "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user"
                      ? "ml-auto bg-primary text-white rounded-br-md"
                      : "mr-auto bg-muted text-foreground rounded-bl-md"
                  )}>
                    {msg.role === "assistant" ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                        li: ({ children }) => <li>{children}</li>,
                        a: ({ href, children }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer"
                            className="text-primary underline underline-offset-2 hover:opacity-80">
                            {children}
                          </a>
                        ),
                      }}>{msg.content}</ReactMarkdown>
                    ) : msg.content}
                  </div>
                  {msg.project && <InlineProjectCard project={msg.project} />}
                </div>
              ))}
              {isLoading && (
                <div>
                  {loadingPhase === "thinking" ? <ThinkingIndicator /> : <ComposingIndicator />}
                </div>
              )}
            </div>

            {/* Follow-up input */}
            {!submitted && (
              <form
                onSubmit={e => { e.preventDefault(); sendMessage(chatInput); }}
                className="border-t border-border/30 px-4 py-3 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={chatInputRef}
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Reply to the agent..."
                  className="flex-1 h-9 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isLoading}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0",
                    chatInput.trim() && !isLoading
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
