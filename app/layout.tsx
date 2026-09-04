import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: { default: 'SĀRI — Tradition, With Attitude', template: '%s | SĀRI' },
  description: 'Luxury Indian sarees. Timeless craft, contemporary spirit. Shop Kanchipuram, Banarasi, Silk, Bridal and Designer sarees.',
  keywords: ['saree', 'silk saree', 'kanchipuram', 'banarasi', 'indian fashion', 'luxury saree', 'bridal saree'],
  openGraph: {
    title: 'SĀRI — Tradition, With Attitude',
    description: 'Luxury Indian sarees. Old craft. New energy.',
    siteName: 'SĀRI',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navigation />
        <main>{children}</main>
        <CartDrawer />
        <SearchOverlay />
        <WhatsAppButton />
      </body>
    </html>
  );
}
