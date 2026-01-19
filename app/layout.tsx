import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Eagle Crest Travel | Luxury Travel & Exclusive Destinations',
  description: 'Plan your dream vacation with Eagle Crest Travel. Discover curated destinations, exclusive packages, and premium experiences worldwide.',
  openGraph: {
    title: 'Eagle Crest Travel | Discover Your Next Adventure',
    description: 'Curating exclusive travel experiences for the modern explorer.',
    type: 'website',
    locale: 'en_US',
    url: 'https://eagle-crest-travel.com',
    siteName: 'Eagle Crest Travel',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eagle Crest Travel',
    description: 'Luxury travel booking made simple.',
  },
};

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
