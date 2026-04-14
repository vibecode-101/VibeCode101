import { Router, type Request, type Response } from "express";
import { createTransport } from "nodemailer";
import { redis, KEYS } from "../lib/redis";

const router = Router();

const transporter = createTransport({
  host: "box.electronero.org",
  port: 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

// ── Helpers ─────────────────────────────────────────────────────────────────

async function getAllProjects(): Promise<any[]> {
  const ids = await redis.lrange(KEYS.index, 0, -1);
  if (!ids.length) return [];
  const pipeline = redis.pipeline();
  ids.forEach(id => pipeline.hgetall(KEYS.project(id)));
  const results = await pipeline.exec();
  return (results ?? [])
    .map(([err, val]) => (err || !val ? null : val))
    .filter(Boolean)
    .map((p: any) => ({
      ...p,
      votes: Number(p.votes ?? 0),
      stack: tryParse(p.stack, []),
    }));
}

function tryParse(val: any, fallback: any) {
  try { return JSON.parse(val); } catch { return fallback; }
}

// ── Public gallery (approved only) ──────────────────────────────────────────
router.get("/projects", async (_req: Request, res: Response) => {
  try {
    const all = await getAllProjects();
    res.json({ projects: all.filter((p: any) => p.status === "approved") });
  } catch (err) {
    res.status(500).json({ error: "Failed to load projects" });
  }
});

// ── Admin list (all) ─────────────────────────────────────────────────────────
router.get("/projects/admin", async (_req: Request, res: Response) => {
  try {
    res.json({ projects: await getAllProjects() });
  } catch (err) {
    res.status(500).json({ error: "Failed to load projects" });
  }
});

// ── Submit (from approved confirm form) ──────────────────────────────────────
router.post("/projects", async (req: Request, res: Response) => {
  try {
    const { name, tagline, description, url, githubUrl, stack, category, builderName, email } = req.body;
    if (!name || !url || !email || !builderName) {
      res.status(400).json({ error: "name, url, email, and builderName are required" });
      return;
    }

    const id = `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const submittedAt = new Date().toISOString();

    const project = {
      id, name, tagline: tagline || "", description: description || "",
      url, githubUrl: githubUrl || "", stack: JSON.stringify(Array.isArray(stack) ? stack : []),
      category: category || "Other", builderName, email,
      votes: "0", status: "pending", submittedAt,
    };

    await redis.hset(KEYS.project(id), project);
    await redis.lpush(KEYS.index, id);

    transporter.sendMail({
      from: `"VibeCODE 101 Demo Day" <founders@vibecode-101.com>`,
      to: email,
      bcc: "founders@vibecode-101.com",
      subject: `Your project "${name}" is in for Demo Day!`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;">
          <div style="background:linear-gradient(135deg,#F05537 0%,#f97316 100%);padding:24px 32px;border-radius:12px 12px 0 0;">
            <h2 style="margin:0;color:white;font-size:22px;">You're on the Demo Day board!</h2>
          </div>
          <div style="background:#111;padding:32px;border-radius:0 0 12px 12px;color:#e0e0e0;">
            <p style="font-size:16px;margin-top:0;">Hey <strong>${builderName}</strong> — <strong>${name}</strong> is officially submitted for VibeCODE 101 Demo Day.</p>
            <div style="background:#1a1a1a;border:1px solid #333;border-radius:10px;padding:20px;margin:20px 0;">
              <h3 style="color:#F05537;margin:0 0 8px;">${name}</h3>
              <p style="color:#ccc;margin:0 0 8px;font-style:italic;">${tagline}</p>
              <p style="margin:0;font-size:13px;"><a href="${url}" style="color:#F05537;">${url}</a></p>
            </div>
            <p style="color:#ccc;font-size:14px;">Community voting goes live on Demo Day — June 7. See you on stage.</p>
            <p style="color:#ccc;font-size:14px;"><strong style="color:white;">— The VibeCODE 101 Team</strong></p>
          </div>
        </div>`,
    }).catch((err: any) => console.error("SMTP send failed:", err));

    res.json({ ok: true, project: { ...project, stack: tryParse(project.stack, []), votes: 0 } });
  } catch (err) {
    console.error("Project submit error:", err);
    res.status(500).json({ error: "Failed to submit project" });
  }
});

// ── Vote ─────────────────────────────────────────────────────────────────────
router.post("/projects/:id/vote", async (req: Request, res: Response) => {
  const { id } = req.params;
  const votes = await redis.hincrby(KEYS.project(id), "votes", 1);
  res.json({ votes });
});

// ── Approve ──────────────────────────────────────────────────────────────────
router.post("/projects/:id/approve", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { note } = req.body;
  await redis.hset(KEYS.project(id), {
    status: "approved",
    reviewNote: note || "",
    reviewedAt: new Date().toISOString(),
  });
  res.json({ ok: true });
});

// ── Reject ───────────────────────────────────────────────────────────────────
router.post("/projects/:id/reject", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { note } = req.body;
  await redis.hset(KEYS.project(id), {
    status: "rejected",
    reviewNote: note || "",
    reviewedAt: new Date().toISOString(),
  });
  res.json({ ok: true });
});

export default router;
