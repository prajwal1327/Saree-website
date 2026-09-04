'use client';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <footer className="bg-espresso text-ivory">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-ivory/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.25em' }} className="text-3xl font-light block mb-4">SĀRI</span>
            <p className="label text-ivory/30 text-[10px] mb-8">TRADITION, WITH ATTITUDE.</p>
            <p className="text-ivory/40 text-sm font-light leading-relaxed max-w-xs">
              Handcrafted sarees for the woman who knows exactly what she wants — and isn&apos;t afraid to wear it.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className="label text-gold text-[10px] mb-6">SHOP</p>
            <ul className="space-y-3">
              {['Silk Sarees', 'Kanchipuram', 'Cotton', 'Designer', 'Bridal', 'Party Wear'].map((item) => (
                <li key={item}>
                  <Link href={`/shop?category=${item.toLowerCase().replace(' ', '-')}`} className="text-ivory/50 text-sm font-light hover:text-ivory transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <p className="label text-gold text-[10px] mb-6">HELP</p>
            <ul className="space-y-3">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
                { label: 'Track Order', href: '/track' },
                { label: 'FAQs', href: '/faq' },
                { label: 'Size Guide', href: '/size-guide' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-ivory/50 text-sm font-light hover:text-ivory transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="label text-gold text-[10px] mb-6">NEWSLETTER</p>
            <p className="text-ivory/50 text-sm font-light leading-relaxed mb-6">
              Beautiful things.
              <br />
              Occasionally in your inbox.
            </p>
            {submitted ? (
              <p className="label text-gold text-[10px]">THANK YOU. WATCH YOUR INBOX. ✓</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-transparent border-b border-ivory/20 pb-2 text-ivory text-sm font-light outline-none placeholder-ivory/30 focus:border-ivory/50 transition-colors"
                />
                <button type="submit" className="label text-[10px] bg-gold text-espresso px-6 py-3 hover:bg-gold/80 transition-colors text-left">
                  SUBSCRIBE →
                </button>
              </form>
            )}

            <div className="flex gap-5 mt-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="label text-ivory/30 text-[10px] hover:text-gold transition-colors">
                INSTAGRAM
              </a>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'}`} target="_blank" rel="noopener noreferrer" className="label text-ivory/30 text-[10px] hover:text-gold transition-colors">
                WHATSAPP
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label text-ivory/20 text-[9px]">© 2025 SĀRI. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="label text-ivory/20 text-[9px] hover:text-ivory/50 transition-colors">PRIVACY</Link>
            <Link href="/terms" className="label text-ivory/20 text-[9px] hover:text-ivory/50 transition-colors">TERMS</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
