'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useWishlist, useSearch } from '@/lib/store';
import MobileMenu from './MobileMenu';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, toggleCart } = useCart();
  const { items: wishItems } = useWishlist();
  const { openSearch } = useSearch();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md border-b border-blush/30'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Mobile: hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2"
              aria-label="Open menu"
            >
              <div className="space-y-1.5">
                <span className="block w-6 h-px bg-espresso"></span>
                <span className="block w-4 h-px bg-espresso"></span>
              </div>
            </button>

            {/* Desktop: left nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {[
                { label: 'SHOP', href: '/shop' },
                { label: 'COLLECTIONS', href: '/shop' },
                { label: 'NEW ARRIVALS', href: '/shop?filter=new' },
                { label: 'BRIDAL', href: '/shop?category=bridal' },
                { label: 'ABOUT', href: '/about' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="label text-espresso hover:text-burgundy transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span
                className="text-2xl lg:text-3xl tracking-[0.3em] font-light text-espresso"
                style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.25em' }}
              >
                SĀRI
              </span>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-5 lg:gap-7">
              <button
                onClick={openSearch}
                className="hidden lg:block label text-espresso hover:text-burgundy transition-colors"
                aria-label="Search"
              >
                SEARCH
              </button>
              <Link href="/wishlist" className="relative" aria-label={`Wishlist (${wishItems.length})`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-espresso hover:text-burgundy transition-colors">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-burgundy text-ivory text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {wishItems.length}
                  </span>
                )}
              </Link>
              <button
                onClick={toggleCart}
                className="relative"
                aria-label={`Cart (${count()})`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-espresso hover:text-burgundy transition-colors">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-burgundy text-ivory text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                    {count()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
