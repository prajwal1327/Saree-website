'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';

const STATUS_STEPS = ['ORDER PLACED', 'CONFIRMED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED'];

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<null | { id: string; product: string; date: string; step: number }>(null);
  const [notFound, setNotFound] = useState(false);

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setNotFound(false);
    setResult(null);
    // Demo: accept any order ID starting with #SARI or SARI
    const clean = orderId.trim().toUpperCase().replace('#', '');
    if (clean.startsWith('SARI') && clean.length >= 7) {
      setResult({ id: `#${clean}`, product: 'Kanchipuram Silk Saree', date: '18 Sep 2026', step: 2 });
    } else {
      setNotFound(true);
    }
  }

  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-md mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
            <p className="label text-gold text-[10px] mb-4">TRACK</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Track Your Order</h1>
          </motion.div>

          <form onSubmit={handleTrack} className="flex gap-3 mb-12">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter order ID (e.g. #SARI1024)"
              required
              className="flex-1 border-b border-blush bg-transparent text-espresso text-sm font-light py-3 outline-none focus:border-espresso transition-colors placeholder-espresso/30"
            />
            <button type="submit" className="bg-espresso text-ivory px-8 py-3 label text-[10px] hover:bg-burgundy transition-colors flex-shrink-0">
              TRACK
            </button>
          </form>

          <AnimatePresence>
            {notFound && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-burgundy label text-[10px] mb-8">
                ORDER NOT FOUND. PLEASE CHECK YOUR ORDER ID AND TRY AGAIN.
              </motion.p>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="bg-cream p-6 mb-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="label text-gold text-[10px] mb-1">{result.id}</p>
                      <p className="editorial-heading text-espresso text-xl">{result.product}</p>
                      <p className="label text-espresso/40 text-[9px] mt-1">PLACED ON {result.date}</p>
                    </div>
                    <span className="label text-[9px] bg-gold/10 text-gold px-3 py-1">
                      {STATUS_STEPS[result.step]}
                    </span>
                  </div>
                </div>

                <div className="space-y-0">
                  {STATUS_STEPS.map((step, i) => {
                    const done = i <= result.step;
                    const active = i === result.step;
                    return (
                      <div key={step} className="flex gap-5 pb-6 last:pb-0">
                        <div className="flex flex-col items-center">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${done ? 'border-espresso bg-espresso' : 'border-blush'}`}>
                            {done && (
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          {i < STATUS_STEPS.length - 1 && (
                            <div className={`w-px mt-1 ${done ? 'bg-espresso' : 'bg-blush'}`} style={{ minHeight: 32 }} />
                          )}
                        </div>
                        <div className="pb-1">
                          <p className={`label text-[10px] ${active ? 'text-espresso' : done ? 'text-espresso/60' : 'text-espresso/25'}`}>{step}</p>
                          {active && <p className="text-espresso/40 text-xs mt-1 font-light">Expected delivery in 2–3 days</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-16 pt-10 border-t border-blush/40">
            <p className="text-espresso/50 font-light text-sm">
              Can't find your order? <a href="/contact" className="text-espresso underline hover:text-burgundy">Contact us</a> with your registered email.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
