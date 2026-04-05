import { Router, type Request, type Response } from "express";
import { existsSync, readFileSync, appendFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const router = Router();
const CSV_PATH = join(process.cwd(), "data", "subscribers.csv");

function ensureFile() {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  if (!existsSync(CSV_PATH)) {
    writeFileSync(CSV_PATH, "email,subscribed_at\n", "utf-8");
  }
}

function dedupeFile() {
  const content = readFileSync(CSV_PATH, "utf-8");
  const lines = content.trim().split("\n");
  const header = lines[0];
  const seen = new Set<string>();
  const unique: string[] = [header];

  for (let i = 1; i < lines.length; i++) {
    const email = lines[i].split(",")[0]?.trim().toLowerCase();
    if (email && !seen.has(email)) {
      seen.add(email);
      unique.push(lines[i]);
    }
  }

  writeFileSync(CSV_PATH, unique.join("\n") + "\n", "utf-8");
}

router.post("/subscribe", (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Email is required" });
    return;
  }

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    res.status(400).json({ error: "Invalid email address" });
    return;
  }

  ensureFile();
  const timestamp = new Date().toISOString();
  appendFileSync(CSV_PATH, `${trimmed},${timestamp}\n`, "utf-8");
  dedupeFile();

  res.json({ success: true, message: "You're in! We'll keep you posted." });
});

export default router;
