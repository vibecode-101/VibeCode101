# Vibe Code 101 — The MasterClass & Expo Event

Premium landing experience for **Vibe Code 101**, a 3-day coding event in Orlando, FL by [AiAssist.net](https://aiassist.net).

## Features

- **Spatial Navigation** — WhiteGlove-style door card directory with full-screen room transitions
- **8 Content Rooms** — About, Syllabus (9 modules), MasterClasses, Projects, Schedule, Pricing, FAQ, Sponsors
- **AI Concierge** — Chat assistant that can navigate users between rooms
- **Early Bird Pricing** — Env-configurable pricing phases (early bird / regular)
- **Email Subscriptions** — CSV-backed subscriber list with deduplication
- **Holographic Design System** — Glass cards, warm space aesthetic, Eventbrite orange (#F05537)
- **Dark/Light Mode** — Full theme support with Space Grotesk typography

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion, wouter
- **Backend**: Express 5, Node.js
- **AI**: AiAssist.net API (chat completions)

## Getting Started

```bash
# Install dependencies
pnpm install

# Copy env file and add your keys
cp .env.example .env

# Run both frontend + API server
pnpm dev
```

The frontend runs on `http://localhost:3000` and proxies `/api` requests to the API server on port `8080`.

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Frontend dev server port (default: 3000) |
| `BASE_PATH` | URL base path (default: /) |
| `VITE_PRICING_PHASE` | `early_bird` or `regular` — controls pricing display |
| `AIASSIST_API_KEY` | API key for the AI concierge chat |
| `SESSION_SECRET` | Session encryption secret |

## Project Structure

```
vibecode_101/
  frontend/          # React + Vite landing site
    src/
      components/    # UI components, spatial nav, rooms
      pages/         # Landing, legal pages
      hooks/         # Custom React hooks
    public/images/   # Event imagery
  api-server/        # Express API
    src/routes/      # /api/chat, /api/subscribe, /api/health
  lib/               # Shared workspace libraries
```

## Pricing Phases

Switch between early bird and regular pricing by setting the env var:

```bash
# Early bird (default)
VITE_PRICING_PHASE=early_bird

# Regular pricing
VITE_PRICING_PHASE=regular
```

| Tier | Early Bird | Regular |
|---|---|---|
| General | $49 | $79 |
| Beginner Track | $89 | $129 |
| Builder Pro | $149 | $249 |

## License

MIT
