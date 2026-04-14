import Redis from "ioredis";
import { logger } from "./logger";

const REDIS_URL = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
  enableOfflineQueue: false,
});

redis.on("connect", () => logger.info("Redis connected (vc101)"));
redis.on("error", (err) => logger.error({ err }, "Redis error (vc101)"));

// ── Namespace keys ──────────────────────────────────────────────────────────
export const KEYS = {
  project: (id: string) => `vc101:project:${id}`,
  index:   "vc101:projects:index",
};
