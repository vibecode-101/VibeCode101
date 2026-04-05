import { Router, type Request, type Response } from "express";

const router = Router();

async function fetchAndExtract(url: string): Promise<{ title: string; description: string; text: string; error?: string }> {
  try {
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; VibeConcierge/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return { title: "", description: "", text: "", error: `HTTP ${res.status}` };
    }

    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim().replace(/\s+/g, " ") : "";

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i)
      || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["']/i);
    const description = descMatch ? descMatch[1].trim().replace(/\s+/g, " ") : "";

    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([\s\S]*?)["']/i);
    const ogDesc = ogDescMatch ? ogDescMatch[1].trim().replace(/\s+/g, " ") : "";

    let textContent = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[\s\S]*?<\/footer>/gi, "")
      .replace(/<header[\s\S]*?<\/header>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#\d+;/g, "")
      .replace(/\s+/g, " ")
      .trim();

    textContent = textContent.slice(0, 3000);

    return { title, description: description || ogDesc, text: textContent };
  } catch (err: any) {
    return { title: "", description: "", text: "", error: err.message || "Failed to fetch" };
  }
}

router.post("/visit-url", async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== "string") {
      res.status(400).json({ error: "url string is required" });
      return;
    }

    const result = await fetchAndExtract(url);
    res.json(result);
  } catch (error) {
    console.error("visit-url error:", error);
    res.status(500).json({ error: "Failed to visit URL" });
  }
});

export { fetchAndExtract };
export default router;
