# FD Guru — Vernacular FD Advisor

> The first AI that explains FDs in Bhojpuri and books them too.

Vernacular FD Advisor is a chat-first mobile app that detects your language — Hindi, Bhojpuri, or Maithili — and explains fixed deposit jargon using local analogies before walking you through booking in under 5 minutes.

## Quick Start (< 5 minutes)

```bash
git clone https://github.com/your-team/fd-guru
cd fd-guru
cp .env.example .env.local
# Fill in ANTHROPIC_API_KEY, Clerk keys, and DATABASE_URL
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

```bash
npx vercel
```

## Docker

```bash
docker compose up --build
```

## Environment Variables

| Key | Required | Description |
|-----|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Anthropic API key |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk frontend key |
| `CLERK_SECRET_KEY` | Yes | Clerk server key |
| `DATABASE_URL` | Yes | Neon Postgres connection string |
| `LANGFUSE_PUBLIC_KEY` | No | Observability |
| `REPLICATE_API_TOKEN` | No | Voice input (Whisper) |

## Language Support

| Language | Speakers | Status |
|----------|----------|--------|
| हिन्दी (Hindi) | 422M | Primary |
| भोजपुरी (Bhojpuri) | 52M | World's 1st fintech LLM in this language |
| मैथिली (Maithili) | 34M | 8th Schedule, full support |
| English | Fallback | Full support |

## Architecture

- **LLM**: Claude Sonnet 4
- **Frontend**: Next.js 15 App Router + React 19 + Tailwind v4
- **Animations**: Framer Motion 11
- **Streaming**: Vercel AI SDK v4 `streamText()`
- **Tools**: FD rate lookup, jargon glossary, maturity calculator, booking API

## Key Features

- Vernacular jargon explanations with local analogies (pickle for maturity, crop insurance for DICGC)
- Real-time maturity calculator with rupee slider
- 5-step guided booking flow
- Mid-conversation language switching without state loss
- WhatsApp sharing of booking confirmation
- DICGC/RBI trust signals throughout

## Tech Stack

```
Next.js 15 → App Router + RSC streaming
Claude Sonnet 4 → Multilingual reasoning + tool use
Vercel AI SDK v4 → streamText + useChat
Clerk → Auth
Neon + Drizzle → Message/session persistence
Tailwind + Framer Motion → UI
```

## Authentication & Database Setup

1. Create free Clerk account at [clerk.com](https://clerk.com)
   - Create new application
   - Copy Publishable Key and Secret Key to `.env.local`

2. Create free Neon database at [neon.tech](https://neon.tech)
   - Create new project → copy connection string to `.env.local` as `DATABASE_URL`

3. Run database migration:

```bash
npm run db:push
```

4. Start the app:

```bash
npm run dev
```
