import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const interDisplay = Inter({
  subsets: ['latin'],
  variable: '--font-inter-display',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['500'],
  style: ['italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://threatsense.ai'),
  title: 'ThreatSenseAI Pricing | Endpoint, Browser & SAP Data Security',
  description:
    'Choose ThreatSenseAI security plans for endpoint, browser, and SAP data protection. Start a free trial or purchase an annual plan.',
  openGraph: {
    title: 'ThreatSenseAI Pricing | Endpoint, Browser & SAP Data Security',
    description:
      'Choose ThreatSenseAI security plans for endpoint, browser, and SAP data protection. Start a free trial or purchase an annual plan.',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interDisplay.variable} ${playfair.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
