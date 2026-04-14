import { useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, X } from "lucide-react";
import type { ConfirmForm } from "@/components/ChatProvider";

const BASE = import.meta.env.BASE_URL;

const CATEGORIES = [
  "AI Apps", "SaaS", "Developer Tools", "Creative Tools",
  "Automation", "Mobile Apps", "Games", "Beginner Builds",
  "Fintech", "EdTech", "HealthTech", "Productivity",
  "Open Source", "API / Platform", "Browser Extension", "Other",
];

interface Props {
  initial: ConfirmForm;
  onApproved: (project: any) => void;
  onDismiss: () => void;
}

export function ProjectConfirmForm({ initial, onApproved, onDismiss }: Props) {
  const [form, setForm]       = useState<ConfirmForm>(initial);
  const [stackInput, setStackInput] = useState(initial.stack.join(", "));
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState("");

  function set(field: keyof ConfirmForm, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function approve() {
    if (!form.name || !form.url || !form.email || !form.builderName) {
      setError("Name, URL, your name, and email are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const stackArr = stackInput.split(",").map(s => s.trim()).filter(Boolean);
      const res = await fetch(`${BASE}api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, stack: stackArr }),
      });
      if (!res.ok) throw new Error("Submit failed");
      const data = await res.json();
      setDone(true);
      onApproved(data.project);
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mt-2 rounded-2xl rounded-tl-sm border border-emerald-500/30 bg-emerald-500/[0.05] p-5 space-y-1 text-center">
        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
        <p className="text-sm font-bold text-foreground">You're on the Demo Day board!</p>
        <p className="text-xs text-muted-foreground">Check your inbox — your builder badge is on the way.</p>
      </div>
    );
  }

  return (
    <div className="mt-2 rounded-2xl rounded-tl-sm border border-primary/30 bg-primary/[0.04] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-primary/20 bg-primary/10">
        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-xs font-semibold text-primary flex-1">Review your submission</span>
        <button onClick={onDismiss} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-4 space-y-3">
        <Field label="Project Name" value={form.name} onChange={v => set("name", v)} />
        <Field label="Tagline" value={form.tagline} onChange={v => set("tagline", v)} placeholder="One punchy sentence…" />
        <Field label="Description" value={form.description} onChange={v => set("description", v)} multiline />
        <Field label="Live URL" value={form.url} onChange={v => set("url", v)} placeholder="https://…" />
        <Field label="GitHub URL (optional)" value={form.githubUrl} onChange={v => set("githubUrl", v)} placeholder="https://github.com/…" />

        <div>
          <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block">Tech Stack</label>
          <input
            value={stackInput}
            onChange={e => setStackInput(e.target.value)}
            placeholder="React, Node.js, OpenAI…"
            className="w-full bg-background/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors"
          />
          <p className="text-[9px] text-muted-foreground mt-0.5">Comma-separated</p>
        </div>

        <div>
          <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block">Category</label>
          <select
            value={form.category}
            onChange={e => set("category", e.target.value)}
            className="w-full bg-background/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary/50 transition-colors"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Field label="Your Name" value={form.builderName} onChange={v => set("builderName", v)} placeholder="Full name or team" />
          <Field label="Email" value={form.email} onChange={v => set("email", v)} placeholder="you@example.com" />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          onClick={approve}
          disabled={submitting}
          className="w-full h-10 rounded-full bg-primary text-white text-xs font-bold hover:opacity-90 transition-all disabled:opacity-50 shadow-[0_0_14px_rgba(124,58,237,0.3)] flex items-center justify-center gap-2"
        >
          {submitting
            ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting…</>
            : <><CheckCircle2 className="w-3.5 h-3.5" /> Approve &amp; Submit</>
          }
        </button>
      </div>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, multiline,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean;
}) {
  const cls = "w-full bg-background/60 border border-border rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 transition-colors";
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} className={`${cls} resize-none`} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </div>
  );
}
