'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    section: 'SHOP',
    links: [
      { label: 'Silk Sarees', href: '/shop?category=silk' },
      { label: 'Kanchipuram', href: '/shop?category=kanchipuram' },
      { label: 'Cotton', href: '/shop?category=cotton' },
      { label: 'Designer', href: '/shop?category=designer' },
      { label: 'Bridal', href: '/shop?category=bridal' },
      { label: 'Party Wear', href: '/shop?category=party-wear' },
    ],
  },
];

export default function MobileMenu({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ivory flex flex-col"
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-between px-6 h-16 border-b border-blush/30">
            <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.25em' }} className="text-2xl font-light text-espresso">SĀRI</span>
            <button onClick={onClose} className="p-2 text-espresso" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-8 py-12 overflow-y-auto">
            {navItems.map((group) => (
              <div key={group.section} className="mb-10">
                <p className="label text-gold mb-6">{group.section}</p>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="text-3xl font-light text-espresso hover:text-burgundy transition-colors"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-5 mt-4">
              {['NEW ARRIVALS', 'ABOUT', 'CONTACT'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  onClick={onClose}
                  className="block label text-espresso hover:text-burgundy transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>

          <div className="px-8 py-6 border-t border-blush/30">
            <p className="label text-gold/70">TRADITION, WITH ATTITUDE.</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
