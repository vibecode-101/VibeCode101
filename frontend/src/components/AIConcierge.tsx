import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Sparkles, Send, X, Globe, Building2, User, Zap, Brain, Search, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSpatial } from "@/components/spatial/SpatialProvider";
import { useChatContext, type LoadingStatus } from "@/components/ChatProvider";
import { ProjectConfirmForm } from "@/components/ProjectConfirmForm";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function AgentActivityIndicator({ status }: { status: LoadingStatus }) {
  const configs = {
    thinking: {
      icon: Brain,
      text: "Thinking",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      pulse: "bg-violet-500",
    },
    researching: {
      icon: Search,
      text: status.detail ? `Researching ${status.detail}` : "Researching",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      pulse: "bg-blue-500",
    },
    composing: {
      icon: PenLine,
      text: "Composing response",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      pulse: "bg-emerald-500",
    },
  };

  const cfg = configs[status.phase];
  const Icon = cfg.icon;

  return (
    <div className="mr-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl rounded-bl-md bg-muted text-sm animate-fade-in-up">
      <div className={cn("w-6 h-6 rounded-full flex items-center justify-center shrink-0", cfg.bg)}>
        <Icon className={cn("w-3.5 h-3.5", cfg.color, status.phase === "researching" && "animate-pulse")} />
      </div>
      <span className="text-muted-foreground text-xs font-medium">{cfg.text}</span>
      <div className="flex gap-0.5 items-center ml-auto">
        <div className={cn("w-1 h-1 rounded-full opacity-60 animate-bounce", cfg.pulse)} style={{ animationDelay: "0ms" }} />
        <div className={cn("w-1 h-1 rounded-full opacity-60 animate-bounce", cfg.pulse)} style={{ animationDelay: "150ms" }} />
        <div className={cn("w-1 h-1 rounded-full opacity-60 animate-bounce", cfg.pulse)} style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export function AIConcierge() {
  const { messages, isLoading, loadingStatus, isOpen, setIsOpen, sendMessage } = useChatContext();
  const [inputValue, setInputValue] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dismissedForms, setDismissedForms] = useState<Set<number>>(new Set());
  const [approvedForms, setApprovedForms] = useState<Set<number>>(new Set());
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigateToRoom, currentRoom, currentView } = useSpatial();

  useEffect(() => {
    if (chatPanelRef.current && messages.length > 0) {
      chatPanelRef.current.scrollTop = chatPanelRef.current.scrollHeight;
    }
  }, [messages, loadingStatus]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messages.length > 0) setHasInteracted(true);
  }, [messages.length]);

  const executeAction = useCallback((action: { type: string; target: string }) => {
    if (action.type === "enter_room" || action.type === "scroll_to") {
      navigateToRoom(action.target);
    }
  }, [navigateToRoom]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const msg = inputValue.trim();
    setInputValue("");

    const result = await sendMessage(msg);
    if (result.action) {
      setTimeout(() => executeAction(result.action!), 600);
    }
  };

  const handleQuickAction = async (msg: string) => {
    if (isLoading) return;
    setInputValue("");
    const result = await sendMessage(msg);
    if (result.action) {
      setTimeout(() => executeAction(result.action!), 600);
    }
  };

  const contextHint = currentView === "content" && currentRoom
    ? `Browsing: ${currentRoom.title}`
    : "Ask me anything about the expo";

  return createPortal(
    <>
      {isOpen && (
        <div
          className="fixed z-[60] animate-fade-in-up inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:max-w-[calc(100vw-3rem)] sm:max-h-[calc(100vh-8rem)]"
          style={{ animationDelay: "0s" }}
        >
          <div className="h-full sm:h-auto sm:max-h-[calc(100vh-8rem)] holo-card holo-glow !rounded-none sm:!rounded-2xl overflow-hidden shadow-2xl concierge-panel">
            <div className="relative z-[2] flex flex-col h-full sm:h-auto sm:max-h-[calc(100vh-8rem)]">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/30 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-foreground">AI Concierge</span>
                    <span className="text-[10px] text-muted-foreground ml-1.5">by AiAssist.net</span>
                    {currentRoom && (
                      <span className="text-[10px] text-muted-foreground ml-2">· {currentRoom.title}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div
                ref={chatPanelRef}
                className="flex-1 sm:h-80 overflow-y-auto px-5 py-4 flex flex-col gap-3"
              >
                {messages.length === 0 && !isLoading && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground mb-1">Hey! Welcome to Vibe Code Expo</p>
                    <p className="text-xs text-muted-foreground max-w-[280px] mb-5 leading-relaxed">
                      I can help you find the right badge, explore masterclasses, or show you how your company fits as a sponsor.
                    </p>
                    <div className="w-full space-y-2">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Tell me about yourself</p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleQuickAction("I'm a solo developer interested in attending!")}
                          className="flex items-center gap-3 w-full text-left text-xs px-4 py-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all group"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                            <User className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground">I'm a solo developer</span>
                            <span className="block text-[10px] text-muted-foreground">Find the right track & badge for me</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleQuickAction("I'm here representing a company — we might be interested in sponsoring or attending as a team.")}
                          className="flex items-center gap-3 w-full text-left text-xs px-4 py-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all group"
                        >
                          <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors">
                            <Building2 className="w-4 h-4 text-amber-500" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground">I represent a company</span>
                            <span className="block text-[10px] text-muted-foreground">Explore sponsorship & team packages</span>
                          </div>
                        </button>
                        <button
                          onClick={() => handleQuickAction("Just browsing — tell me what Vibe Code Expo is all about!")}
                          className="flex items-center gap-3 w-full text-left text-xs px-4 py-3 rounded-xl border border-border hover:border-primary/40 hover:bg-primary/5 text-muted-foreground hover:text-foreground transition-all group"
                        >
                          <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                            <Zap className="w-4 h-4 text-green-500" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground">Just curious</span>
                            <span className="block text-[10px] text-muted-foreground">Give me the quick rundown</span>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i}>
                    <div
                      className={cn(
                        "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                        msg.role === "user"
                          ? "ml-auto bg-primary text-white rounded-br-md"
                          : "mr-auto bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      {msg.role === "assistant" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
                            li: ({ children }) => <li>{children}</li>,
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">
                                {children}
                              </a>
                            ),
                            code: ({ children }) => (
                              <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.role === "assistant" && msg.toolsUsed && msg.toolsUsed.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1.5 ml-1">
                        <Globe className="w-3 h-3 text-primary" />
                        <span className="text-[10px] text-muted-foreground">
                          Visited:{" "}
                          {msg.toolsUsed.map((u, j) => (
                            <a key={j} href={u.startsWith("http") ? u : `https://${u}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                              {u.replace(/^https?:\/\//, "").replace(/\/.*$/, "")}
                            </a>
                          ))}
                        </span>
                      </div>
                    )}
                    {msg.role === "assistant" && msg.confirmForm && !dismissedForms.has(i) && (
                      <ProjectConfirmForm
                        initial={msg.confirmForm}
                        onApproved={() => setApprovedForms(prev => new Set(prev).add(i))}
                        onDismiss={() => setDismissedForms(prev => new Set(prev).add(i))}
                      />
                    )}
                  </div>
                ))}
                {isLoading && loadingStatus && (
                  <AgentActivityIndicator status={loadingStatus} />
                )}
              </div>

              <form onSubmit={handleSubmit} className="border-t border-border/30 px-4 py-3 flex items-center gap-2 shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={contextHint}
                  className="flex-1 h-10 bg-transparent text-foreground placeholder:text-muted-foreground text-sm outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center transition-all shrink-0",
                    inputValue.trim() && !isLoading
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-[60] transition-all duration-500",
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        )}
      >
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-50 blur-md group-hover:opacity-80 transition-opacity concierge-breathe" />
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            <img src={`${import.meta.env.BASE_URL}images/logo-vibe-code-alt.png`} alt="Vibe Code 101" className="w-full h-full object-contain p-0.5 invert brightness-0 drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
          </div>
          {!hasInteracted && messages.length === 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-foreground flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            </div>
          )}
        </div>
      </button>
    </>,
    document.body
  );
}
