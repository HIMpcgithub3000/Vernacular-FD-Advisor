'use client';

import Link from 'next/link';
import { SignInButton, useAuth } from '@clerk/nextjs';

const STATS = [
  { value: '3', label: 'Languages' },
  { value: '500M+', label: 'Users Reachable' },
  { value: '₹5L', label: 'DICGC Insured' },
  { value: '< 5 min', label: 'Booking' },
];

const FEATURES = [
  {
    title: 'Vernacular AI Chat',
    body: 'Ask in Hindi, Bhojpuri, or Maithili. Get expert FD guidance in the language you think in.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#A3E635]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 10h8M8 14h5" />
        <path d="M4 5h16v11H7l-3 3V5z" />
      </svg>
    ),
  },
  {
    title: 'Jargon Simplified',
    body: '8.50% p.a., tenor, cumulative, TDS — explained with local analogies you already understand.',
    featured: true,
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#A3E635]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a1 1 0 01-1.447.894L12 17l-6.553 2.894A1 1 0 014 19V5z" />
        <path d="M9 8h6M9 12h6" />
      </svg>
    ),
  },
  {
    title: 'Book in Minutes',
    body: 'From confusion to confirmed FD booking in under 5 minutes. No branch visit required.',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#A3E635]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 7L9 18l-5-5" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <main className="min-h-screen bg-[#0A0F0A] text-[#F0F5F0] font-['Inter'] overflow-y-auto">
      <header className="sticky top-0 z-50 bg-[rgba(10,15,10,0.9)] backdrop-blur-xl border-b border-[rgba(163,230,53,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#A3E635] text-[#0A0F0A] text-xs font-semibold flex items-center justify-center">FG</div>
            <span className="font-semibold">FD Guru</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-[#7A9A7A]">
            <a href="#home" className="hover:text-[#F0F5F0]">Home</a>
            <a href="#features" className="hover:text-[#F0F5F0]">Features</a>
            <a href="#how" className="hover:text-[#F0F5F0]">How it Works</a>
            <a href="#about" className="hover:text-[#F0F5F0]">About</a>
          </nav>
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-[#A3E635] text-[#0A0F0A] text-sm font-semibold">
                Open App →
              </button>
            </SignInButton>
          ) : (
            <Link href="/chat" className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-[#A3E635] text-[#0A0F0A] text-sm font-semibold">
              Open App →
            </Link>
          )}
        </div>
      </header>

      <section id="home" className="max-w-7xl mx-auto px-6 pt-14 pb-16 md:min-h-[calc(100vh-76px)] flex items-center">
        <div className="hidden md:grid md:grid-cols-5 gap-12 w-full">
          <div className="col-span-3">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.2)] text-[#A3E635] text-sm">
              AI-Powered · Free to use
            </div>
            <h1 className="mt-6 text-[64px] leading-[1.1] font-extrabold tracking-tight">
              Vernacular Finance
              <br />
              for <span className="text-[#A3E635]">Bharat&apos;s</span> Future
            </h1>
            <p className="mt-6 text-lg text-[#7A9A7A] max-w-[440px]">
              Ask about FDs in Hindi, Bhojpuri, or Maithili. Plain language. No jargon. Book in minutes.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="px-7 py-3.5 rounded-full bg-[#A3E635] text-[#0A0F0A] font-semibold">
                    Start for free →
                  </button>
                </SignInButton>
              ) : (
                <Link href="/chat" className="px-7 py-3.5 rounded-full bg-[#A3E635] text-[#0A0F0A] font-semibold">
                  Start for free →
                </Link>
              )}
              <button className="px-7 py-3.5 rounded-full border border-[rgba(255,255,255,0.15)] text-[#F0F5F0] font-medium">
                Watch demo
              </button>
            </div>
            <div className="mt-10">
              <p className="text-sm text-[#7A9A7A]">Trusted &amp; Secured by</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {['RBI', 'DICGC', 'NPCI', 'UPI'].map(item => (
                  <span key={item} className="px-3 py-1 rounded-full bg-[#111811] border border-[rgba(163,230,53,0.08)] text-[#7A9A7A] text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-2 relative min-h-[460px]">
            <div className="absolute inset-0 rounded-3xl border border-[rgba(163,230,53,0.08)]" style={{
              backgroundImage:
                'linear-gradient(rgba(163,230,53,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.03) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }} />
            <div className="absolute top-16 left-8 -rotate-3 w-[320px] bg-[#3B82F6] rounded-[20px] p-5 border border-[rgba(255,255,255,0.15)]">
              <div className="flex justify-center mb-2 gap-1.5 text-white/80 text-[8px] tracking-[0.25em]"><span>●</span><span>●</span><span>●</span></div>
              <p className="text-[11px] text-white/80">Fixed Deposit</p>
              <p className="text-[13px] text-white font-semibold mt-1">Suryoday Small Finance Bank</p>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="text-[42px] font-['DM_Mono'] font-bold leading-none">8.50%</p>
                  <p className="text-xs text-white/80 mt-1">per annum</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-['DM_Mono']">12M</span>
              </div>
              <div className="mt-5 bg-[#A3E635] text-[#0A0F0A] py-3 rounded-xl text-sm font-semibold text-center">Explain this to me</div>
            </div>
            <div className="absolute right-5 top-10 px-3 py-2 rounded-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.2)] text-xs text-[#A3E635]">₹5L insured</div>
            <div className="absolute left-2 bottom-20 px-3 py-2 rounded-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.2)] text-xs text-[#A3E635]">8.50% p.a.</div>
            <div className="absolute right-10 bottom-10 px-3 py-2 rounded-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.2)] text-xs text-[#A3E635]">12M tenor</div>
          </div>
        </div>

        <div className="md:hidden w-full">
          <h1 className="text-4xl font-extrabold leading-tight">Vernacular Finance for <span className="text-[#A3E635]">Bharat&apos;s</span> Future</h1>
          <p className="mt-4 text-[#7A9A7A]">FD guidance in your language — simple, safe, and fast.</p>
          <Link href="/chat" className="mt-6 w-full inline-flex items-center justify-center py-3.5 rounded-full bg-[#A3E635] text-[#0A0F0A] font-semibold">
            Open App →
          </Link>
        </div>
      </section>

      <section className="bg-[#111811] border-y border-[rgba(163,230,53,0.08)]">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(stat => (
            <div key={stat.label}>
              <div className="text-3xl text-[#A3E635] font-['DM_Mono']">{stat.value}</div>
              <div className="text-sm text-[#7A9A7A] mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center">
          <div className="inline-flex px-4 py-2 rounded-full bg-[#1C2A1C] border border-[rgba(163,230,53,0.2)] text-[#A3E635] text-sm">Features</div>
          <h2 className="mt-6 text-4xl md:text-5xl font-bold">The Finance Revolution<br />Requires Plain Language</h2>
          <p className="mt-4 text-[#7A9A7A]">Succeeding in modern finance means understanding it first.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {FEATURES.map(feature => (
            <article
              key={feature.title}
              className={`rounded-[20px] bg-[#111811] p-8 border transition-colors ${
                feature.featured
                  ? 'border-2 border-[#A3E635]'
                  : 'border-[rgba(163,230,53,0.08)] hover:border-[rgba(163,230,53,0.25)]'
              }`}
            >
              {feature.icon}
              <h3 className="mt-5 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-3 text-[#7A9A7A] leading-relaxed">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="bg-[#111811] py-24 border-y border-[rgba(163,230,53,0.08)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Simple, Fast &amp; Hassle-Free</h2>
          <p className="mt-4 text-[#7A9A7A]">Three steps to your first FD</p>
          <div className="mt-12 grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] border-t border-dashed border-[rgba(163,230,53,0.2)]" />
            {[
              ['01', 'Choose your language', 'Pick Hindi, Bhojpuri, or Maithili'],
              ['02', 'Ask your question', 'No jargon, no English required'],
              ['03', 'Book your FD', 'Guided 5-step booking flow'],
            ].map(([num, title, desc], idx) => (
              <div key={title} className="relative">
                <div className={`mx-auto w-12 h-12 rounded-full border flex items-center justify-center font-['DM_Mono'] ${
                  idx === 0 ? 'bg-[#A3E635] border-[#A3E635] text-[#0A0F0A]' : 'border-[rgba(255,255,255,0.35)] text-white'
                }`}>
                  {num}
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-[#7A9A7A]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-6 py-20">
        <div className="rounded-3xl bg-[#111811] border border-[rgba(163,230,53,0.08)] py-16 px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">Start saving smarter today</h2>
          <p className="mt-4 text-[#7A9A7A]">Join thousands of first-time FD investors from tier-2 and tier-3 India</p>
          <Link href="/chat" className="mt-8 inline-flex px-8 py-4 rounded-full bg-[#A3E635] text-[#0A0F0A] font-semibold text-lg">
            Open FD Guru →
          </Link>
        </div>
      </section>

      <footer className="border-t border-[rgba(163,230,53,0.06)]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#A3E635] text-[#0A0F0A] text-[10px] font-semibold flex items-center justify-center">FG</div>
            <span>FD Guru</span>
          </div>
          <div className="flex items-center gap-6 text-[#7A9A7A]">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <p className="text-[#7A9A7A]">© 2025 FD Guru. Built for Bharat.</p>
        </div>
      </footer>
    </main>
  );
}
