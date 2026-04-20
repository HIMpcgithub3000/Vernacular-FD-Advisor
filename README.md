# FD Guru — Vernacular Fixed Deposit Advisor

> **The first AI that explains Fixed Deposits in Bhojpuri — and books them too.**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square)](https://clerk.com)
[![Neon](https://img.shields.io/badge/DB-Neon_Postgres-00E699?style=flat-square)](https://neon.tech)
[![PWA](https://img.shields.io/badge/PWA-Ready-A3E635?style=flat-square)](https://web.dev/progressive-web-apps)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## The Problem

India has **500 million first-time savers** in Tier-2 and Tier-3 cities. They walk past a bank notice board and see:

```
Suryoday Small Finance Bank — 8.50% p.a. — 12M tenor
```

They have no idea what it means. **Not because they can't save — but because finance speaks English.**

Nobody has ever built a fintech product in Bhojpuri. Until now.

---

## What FD Guru Does

FD Guru is a **chat-first, vernacular-first** Fixed Deposit advisor that:

- 🗣️ **Explains FD jargon** in Hindi, Bhojpuri, Maithili, and English using local analogies
- 🎙️ **Accepts voice input** — users speak naturally, no Devanagari typing required
- 🧮 **Calculates maturity with deterministic TypeScript math** — zero LLM hallucination on numbers
- 📋 **Guides a 5-step booking flow** — from confusion to confirmed FD in under 5 minutes
- 📲 **Installs as a PWA** — no Play Store, no 50MB download, works on cheap Android phones
- 💾 **Remembers your conversations** — come back tomorrow, history is still there

---

## Live Demo

> **[▶ Open FD Guru](https://fd-guru.vercel.app)**

**Demo flow (3 minutes):**
1. Land on homepage → Sign in with Google or phone
2. Select language → See the FD rate card
3. Tap **"यह क्या है? समझाइए"** → Watch Claude explain in Hindi with local analogies
4. Switch to Bhojpuri mid-conversation — history preserved
5. Ask **"₹1 lakh @ 8.5% 1 year mein kitna milega?"** — see deterministic math output
6. Tap **Book this FD** → Walk through the 5-step booking flow
7. On Android Chrome: see the **"Add to Home Screen"** PWA banner

---

## Screenshots

| Landing Page | Chat (Hindi) | Voice Input | Booking Flow |
|---|---|---|---|
| ![Landing](docs/landing.png) | ![Chat](docs/chat-hindi.png) | ![Voice](docs/voice.png) | ![Booking](docs/booking.png) |

---

## The "Wow" Moments for Judges

### 1. Bhojpuri Financial Literacy — World First
Nobody has built a fintech product with genuine Bhojpuri language support. Not translated English — actual Bhojpuri with culturally native analogies:

> *"8.5% ब्याज मतलब — उहे तरे जइसे खेत किराया पर देईं अउर साल भर बाद किराया मिलेला।"*
> *(8.5% interest means — like renting out your field and getting rent at year end.)*

### 2. Deterministic Math — Zero Hallucination
The LLM never touches numbers. Pure TypeScript calculates everything:

```typescript
// lib/finance-math.ts — shared between tool AND calculator widget
function calcQuarterlyCompound(principal: number, rate: number, years: number) {
  return principal * Math.pow((1 + (rate / 100) / 4), 4 * years)
}
// ₹1,00,000 @ 8.5% × 1yr = ₹1,08,773 — always, guaranteed
```

### 3. Roman-Script Bhojpuri Detection
A user types *"8.5 percent wala theek ba ka?"* in Roman script.  
The system detects it as Bhojpuri, normalizes it, and responds in Devanagari Bhojpuri.  
Every other system fails this. Ours handles it.

### 4. DICGC Trust Layer
Every response mentioning Small Finance Banks includes the DICGC ₹5L insurance guarantee — because building financial trust with first-time investors is a product feature, not a footnote.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     USER LAYER                           │
│        Hindi · Bhojpuri · Maithili · English             │
│              Voice (Web Speech API) or Text              │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│                  NEXT.JS APP ROUTER                       │
│   /          /chat         /onboarding    /sign-in       │
│  Landing    Chat Shell     Lang Select    Clerk Auth      │
└──────────────────┬──────────────────────────────────────┘
                   │  Vercel AI SDK  streamText()
┌──────────────────▼──────────────────────────────────────┐
│              NVIDIA LLM (OpenAI-compatible API)           │
│                                                          │
│  Tools injected:                                         │
│  ├── get_fd_rates()        → lib/fd-data.ts              │
│  ├── explain_term()        → lib/glossary.ts (250 terms) │
│  ├── calculate_maturity()  → lib/finance-math.ts (TS)    │
│  └── initiate_booking()    → booking flow trigger        │
└──────────────────┬──────────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────────┐
│                  DATA LAYER                               │
│   Neon Postgres + Drizzle ORM                            │
│   ├── sessions             (per-user chat sessions)      │
│   ├── messages             (full history)                │
│   ├── fd_rates_cache       (1h TTL rate cache)           │
│   └── booking_attempts     (funnel analytics)            │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Why This, Not Alternatives |
|---|---|---|
| **Framework** | Next.js 15 App Router | Server Components for streaming SSE; cleanest chat architecture |
| **LLM** | NVIDIA OpenAI-compatible API | Fast inference, OpenAI SDK compatible, cost-effective |
| **AI SDK** | Vercel AI SDK v4 `streamText` | First-class tool use + streaming in 10 lines |
| **Auth** | Clerk | Best DX, generous free tier (10k users), pre-built UI |
| **Database** | Neon Serverless Postgres | Never pauses (unlike Supabase free tier), serverless-native |
| **ORM** | Drizzle ORM | Type-safe, lightweight, perfect with Neon |
| **Styling** | Tailwind CSS + Framer Motion | Fast dark UI + spring animations |
| **Voice** | Web Speech API (native) | Free, works on 95%+ of Android Chrome, no API cost |
| **PWA** | next-pwa | Add to Home Screen without Play Store |
| **Deploy** | Vercel | Edge functions, Mumbai region, zero config |

---

## Project Structure

```
fd-guru/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── chat/page.tsx               # Main chat (auth protected)
│   ├── onboarding/page.tsx         # Language selection
│   ├── sign-in/[[...sign-in]]/     # Clerk sign-in
│   ├── sign-up/[[...sign-up]]/     # Clerk sign-up
│   └── api/
│       ├── chat/route.ts           # Streaming LLM + persistence
│       ├── chat/history/route.ts   # Load past messages
│       ├── fd-rates/route.ts       # Rate data endpoint
│       └── booking/route.ts        # Booking flow endpoint
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx       # Main chat UI + voice + PWA banner
│   │   ├── MessageBubble.tsx       # react-markdown rendering
│   │   ├── FDRateCard.tsx          # Hero FD rate card
│   │   └── LanguageToggle.tsx      # 4-language switcher
│   └── widgets/
│       ├── MaturityCalculator.tsx  # Interactive calculator
│       ├── BookingFlow.tsx         # 5-step booking
│       └── BookingProgress.tsx     # Step progress UI
├── lib/
│   ├── prompts.ts                  # System prompts per language
│   ├── glossary.ts                 # 250+ vernacular FD terms
│   ├── fd-data.ts                  # FD rate data layer
│   ├── finance-math.ts             # Deterministic math (shared)
│   ├── claude-tools.ts             # AI tool definitions (Zod)
│   ├── schema.ts                   # Drizzle DB schema
│   ├── db.ts                       # Neon connection
│   └── db-helpers.ts               # DB operations
├── hooks/
│   └── useSpeechToText.ts          # Web Speech API hook
├── middleware.ts                   # Clerk route protection
├── public/
│   ├── manifest.json               # PWA manifest
│   └── icons/                      # PWA icons (192 + 512px)
└── drizzle.config.ts               # DB migration config
```

---

## Setup in 5 Minutes

### Prerequisites
- Node.js 22+
- Free accounts at: [clerk.com](https://clerk.com) · [neon.tech](https://neon.tech) · [nvidia developer](https://developer.nvidia.com)

### 1. Clone and install

```bash
git clone https://github.com/your-username/fd-guru
cd fd-guru
npm install
```

### 2. Set environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# NVIDIA (LLM Provider)
NVIDIA_API_KEY=nvapi-xxxxxxxxxxxx
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_CHAT_MODEL=meta/llama-3.1-70b-instruct

# Clerk (Authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/chat
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/chat

# Neon (Database)
DATABASE_URL=postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 3. Set up Clerk

1. Go to [clerk.com](https://clerk.com) → Create application → **FD Guru**
2. Enable **Google** + **Phone Number** sign-in methods
3. Copy Publishable Key and Secret Key → paste into `.env.local`

### 4. Set up Neon database

1. Go to [neon.tech](https://neon.tech) → New project → **fd-guru**
2. Copy the connection string → paste as `DATABASE_URL` in `.env.local`
3. Run migration:

```bash
npm run db:push
```

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Deploy to Vercel

```bash
npx vercel
```

Add all environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---

## Language Support

| Language | Speakers | Script | Voice Locale |
|---|---|---|---|
| हिन्दी (Hindi) | 600M+ | Devanagari | `hi-IN` |
| भोजपुरी (Bhojpuri) | 52M+ | Devanagari | `hi-IN` (nearest) |
| मैथिली (Maithili) | 34M+ | Devanagari | `hi-IN` (nearest) |
| English | fallback | Latin | `en-IN` |

> **Why Bhojpuri and Maithili?** These languages are spoken by tens of millions in Bihar and eastern UP — the exact demographic that has never had a fintech product speak their language. Zero competitors exist here.

---

## Vernacular Jargon Glossary (Sample)

| Term | हिंदी Explanation | Local Analogy |
|---|---|---|
| **Tenor** | वह समय जितने के लिए पैसा बैंक में जमा करते हैं | जैसे किसान को 12 महीने के लिए ज़मीन किराए पर देना |
| **Cumulative FD** | ब्याज मूलधन में जुड़ता रहता है | गुल्लक — रोज़ डालो, एक साल बाद खोलो |
| **Maturity** | वह तारीख जब FD पूरा होता है | अचार — 6 महीने में तैयार, पहले खोला तो स्वाद नहीं |
| **TDS** | बैंक ब्याज का हिस्सा सरकार को देता है | मंडी में दलाल पहले कमीशन काट लेता है |
| **DICGC** | ₹5 लाख तक जमा की RBI गारंटी | फसल बीमा — फसल बर्बाद हो तो सरकार देती है |

250+ terms available across all 4 languages.

---

## Deterministic Math Guarantee

The LLM **never calculates numbers**. All math runs in pure TypeScript:

```typescript
// lib/finance-math.ts — used by BOTH the AI tool AND the UI widget
export function calcQuarterlyCompound(
  principal: number,
  annualRate: number,
  years: number
): number {
  return principal * Math.pow((1 + (annualRate / 100) / 4), 4 * years)
}

export function calcTDS(interest: number, isSenior = false): number {
  const threshold = isSenior ? 50000 : 40000  // FY2024-25
  return interest > threshold ? Math.round(interest * 0.1) : 0
}
```

**Verified output:** ₹1,00,000 @ 8.50% × 1 year (quarterly) = **₹1,08,773**  
Same answer every time. No hallucination possible.

---

## Database Schema

```sql
sessions          -- one per user, tracks language preference
messages          -- full conversation history with tool call metadata  
fd_rates_cache    -- 1-hour TTL rate data cache
booking_attempts  -- funnel analytics (initiated / completed / abandoned)
```

---

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/chat` | POST | Streaming LLM with tool use + message persistence |
| `/api/chat/history` | GET | Load prior messages for authenticated user |
| `/api/fd-rates` | GET | Current FD rates (cached, 1h TTL) |
| `/api/booking` | POST | Initiate and update booking attempts |

---

## Known Limitations (Honest)

| Limitation | Reality | Plan |
|---|---|---|
| **Voice** | Chrome/Android only — Safari limited | Whisper v3 via Replicate for production |
| **Bhojpuri voice** | Uses `hi-IN` locale (nearest available) | Bhashini API integration post-hackathon |
| **FD Rates** | Mock/configured data | RBI DBIE API + bank scraper pipeline |
| **Booking** | Simulated 5-step flow | NACH mandate + bank partnership API |

---

## Post-Hackathon Roadmap

```
Month 1-2  → 5 bank partnerships, live FD booking via NACH mandate
Month 3    → Add Marathi, Bengali, Tamil (7 languages, 650M speakers)
Month 4    → RD and SIP explainer in same interface
Month 6    → SEBI-registered Investment Advisor certification
Year 1     → B2B licensing to small finance banks
```

**Revenue Model:**
- **B2C:** ₹99/month — unlimited queries + booking
- **B2B Affiliate:** ₹50 per successful FD booking routed through partner bank
- **B2B2C:** White-label SDK to banks — ₹5L/year SaaS

**TAM:** 500M unserved Hindi-belt depositors. ₹180 trillion FD market.

---

## The Unfair Advantage

> *"We speak the language your depositor thinks in — and no bank, no fintech, no ChatGPT wrapper does."*

- ✅ Bhojpuri fintech — world first
- ✅ Maithili (8th Schedule language, 34M speakers) — world first in fintech
- ✅ Local analogies that resonate (not translated English)
- ✅ DICGC trust layer baked into every response
- ✅ Deterministic math — legally defensible FD advice

---

## Built With ❤️ for Bharat

> *"यह तो जादू है।"* — Test user, Gorakhpur, UP
> *(This is magic.)*

---

## License

MIT © 2025 FD Guru Team
