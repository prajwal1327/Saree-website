'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '@/lib/store';
import { PRODUCTS, formatPrice } from '@/lib/data';

const trending = ['Kanchipuram', 'Silk', 'Bridal', 'Pink', 'Banarasi', 'Cotton'];

export default function SearchOverlay() {
  const { isOpen, query, closeSearch, setQuery } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        (p.category ?? '').toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-ivory z-[300] overflow-y-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-3xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-12">
              <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.25em' }} className="text-2xl font-light text-espresso">
                SĀRI
              </span>
              <button onClick={closeSearch} className="label text-espresso/50 hover:text-espresso text-[10px] flex items-center gap-2">
                CLOSE <span className="text-base">×</span>
              </button>
            </div>

            {/* Search input */}
            <div className="mb-12">
              <p className="editorial-heading text-espresso/30 text-sm mb-4 label">WHAT ARE YOU LOOKING FOR?</p>
              <div className="border-b-2 border-espresso flex items-center gap-4 pb-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-espresso/40 flex-shrink-0">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search sarees, colours, fabrics..."
                  className="flex-1 bg-transparent text-espresso text-xl font-light outline-none placeholder-espresso/30"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-espresso/40 hover:text-espresso text-lg">×</button>
                )}
              </div>
            </div>

            {/* Results */}
            {results.length > 0 ? (
              <div>
                <p className="label text-gold text-[10px] mb-6">RESULTS ({results.length})</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {results.map((p) => (
                    <Link key={p.id} href={`/product/${p.slug}`} onClick={closeSearch} className="group">
                      <div className="aspect-[3/4] overflow-hidden bg-cream mb-2">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <p className="text-espresso text-sm font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{p.name}</p>
                      <p className="text-espresso text-xs">{formatPrice(p.sale_price ?? p.price)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ) : query.length > 1 ? (
              <p className="text-espresso/40 text-sm">No results for &quot;{query}&quot;</p>
            ) : (
              <div>
                <p className="label text-gold text-[10px] mb-6">TRENDING SEARCHES</p>
                <div className="flex flex-wrap gap-3">
                  {trending.map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="px-4 py-2 border border-blush text-espresso label text-[10px] hover:border-espresso transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
