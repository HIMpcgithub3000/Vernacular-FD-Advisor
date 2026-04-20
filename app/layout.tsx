import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import './globals.css';

export const metadata: Metadata = {
  title: 'FD Guru — Vernacular FD Advisor',
  description:
    'AI-powered Fixed Deposit advisor that speaks Hindi, Bhojpuri, Maithili. Explains FD jargon in your language with local analogies.',
  manifest: '/manifest.json',
  icons: { icon: '/icons/icon-192.png', apple: '/icons/icon-192.png' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#A3E635',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=DM+Mono:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#A3E635" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="FD Guru" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-[#0A0F0A] antialiased overflow-hidden">
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            variables: {
              colorPrimary: '#A3E635',
              colorBackground: '#0A0F0A',
              colorInputBackground: '#1C2A1C',
              colorInputText: '#F0F5F0',
              colorText: '#F0F5F0',
              colorTextSecondary: '#7A9A7A',
              borderRadius: '12px',
              fontFamily: 'Inter, sans-serif',
            },
            elements: {
              card: 'bg-[#111811] border border-[rgba(163,230,53,0.12)]',
              headerTitle: 'text-[#F0F5F0]',
              socialButtonsBlockButton:
                'bg-[#1C2A1C] border-[rgba(163,230,53,0.15)] text-[#F0F5F0]',
              formButtonPrimary: 'bg-[#A3E635] text-[#0A0F0A] hover:bg-[#84CC16]',
              footerActionLink: 'text-[#A3E635]',
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
