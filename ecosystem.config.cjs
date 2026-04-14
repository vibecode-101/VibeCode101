/**
 * PM2 Ecosystem Config — VibeCODE 101
 * Licensor: Interchained LLC / AiAssist.net
 * Domain:   vibecode-101.com
 *
 * Usage:
 *   pm2 deploy ecosystem.config.cjs production setup   # first-time server setup
 *   pm2 deploy ecosystem.config.cjs production         # deploy / redeploy
 *   pm2 start ecosystem.config.cjs --env production    # start locally in prod mode
 *   pm2 reload ecosystem.config.cjs --env production   # zero-downtime reload
 */

module.exports = {
  // ─── Apps ──────────────────────────────────────────────────────────────────
  apps: [
    {
      // Express API — port 8086
      name: "vc101-api",
      cwd: "./api-server",
      script: "./dist/index.mjs",
      interpreter: "node",
      interpreter_args: "--enable-source-maps",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "256M",
      error_file: "../logs/vc101-api.error.log",
      out_file: "../logs/vc101-api.out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      env_production: {
        NODE_ENV: "production",

        // ── Server ───────────────────────────────────────────────────────────
        PORT: 8086,

        // ── Auth / Sessions ──────────────────────────────────────────────────
        // Generate: openssl rand -base64 48
        SESSION_SECRET: "",

        // ── Redis ────────────────────────────────────────────────────────────
        REDIS_URL: "redis://127.0.0.1:6379",

        // ── AI Concierge (AiAssist.net) ──────────────────────────────────────
        AIASSIST_API_KEY: "",

        // ── Stripe ───────────────────────────────────────────────────────────
        STRIPE_SECRET_KEY: "",
        STRIPE_WEBHOOK_SECRET: "",

        // ── Email (SMTP) ─────────────────────────────────────────────────────
        SMTP_USER: "founders@vibecode-101.com",
        SMTP_PASS: "",
      },

      env_development: {
        NODE_ENV: "development",
        // ── Server ───────────────────────────────────────────────────────────
        PORT: 8086,

        // ── Auth / Sessions ──────────────────────────────────────────────────
        // Generate: openssl rand -base64 48
        SESSION_SECRET: "",

        // ── Redis ────────────────────────────────────────────────────────────
        REDIS_URL: "redis://127.0.0.1:6379",

        // ── AI Concierge (AiAssist.net) ──────────────────────────────────────
        AIASSIST_API_KEY: "",

        // ── Stripe ───────────────────────────────────────────────────────────
        STRIPE_SECRET_KEY: "",
        STRIPE_WEBHOOK_SECRET: "",

        // ── Email (SMTP) ─────────────────────────────────────────────────────
        SMTP_USER: "founders@vibecode-101.com",
        SMTP_PASS: "",
      },
    },

    {
      // React + Vite frontend — serves built dist via vite preview on port 3000
      // For high-traffic production, replace with nginx serving ./frontend/dist/
      name: "vc101-client",
      cwd: "./frontend",
      script: "./node_modules/.bin/vite",
      args: "preview --config vite.config.ts --host 0.0.0.0 --port 3000",
      interpreter: "none",
      instances: 1,
      exec_mode: "fork",
      watch: false,
      max_memory_restart: "256M",
      error_file: "../logs/vc101-client.error.log",
      out_file: "../logs/vc101-client.out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      env_production: {
        NODE_ENV: "production",

        // ── Vite / Frontend ──────────────────────────────────────────────────
        // Switch to "regular" after early bird window closes
        VITE_PRICING_PHASE: "early_bird",
        BASE_PATH: "/",
        PORT: 3000,
      },

      env_development: {
        NODE_ENV: "development",
        VITE_PRICING_PHASE: "early_bird",
        BASE_PATH: "/",
        PORT: 3000,
      },
    },
  ],

  // ─── Deploy ────────────────────────────────────────────────────────────────
  deploy: {
    production: {
      user: "ubuntu",
      host: "YOUR_SERVER_IP",
      ref: "origin/main",
      repo: "git@github.com:interchained/vibecode_101.git",
      path: "/var/www/vibecode_101",

      // Build API + frontend, create logs dir, reload PM2
      "post-deploy":
        "npm i -g pnpm@latest pm2@latest || true && " +
        "pnpm install --frozen-lockfile && " +
        "pnpm --filter @workspace/api-server run build && " +
        "pnpm --filter @workspace/vibecode-101 run build && " +
        "mkdir -p ../logs && " +
        "pm2 reload ecosystem.config.cjs --env production",

      // First-time setup — run once via: pm2 deploy production setup
      "pre-setup":
        "apt-get update && apt-get install -y git curl && " +
        "curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && " +
        "apt-get install -y nodejs && " +
        "npm i -g pnpm pm2 && " +
        "apt-get install -y redis-server && " +
        "systemctl enable redis-server && systemctl start redis-server && " +
        "mkdir -p /var/www/vibecode_101/logs",

      env: "production",
    },
  },
};
