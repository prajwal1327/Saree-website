'use client';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQty, total } = useCart();
  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const whatsappMsg = encodeURIComponent(
    `Hi SĀRI! I'd like to order:\n${items.map((i) => `• ${i.product.name} x${i.quantity} — ${formatPrice((i.product.sale_price ?? i.product.price) * i.quantity)}`).join('\n')}\n\nTotal: ${formatPrice(total())}`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-espresso/40 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-ivory z-[201] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-blush/40">
              <h2 className="label text-espresso">YOUR BAG ({items.length})</h2>
              <button onClick={toggleCart} aria-label="Close cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <p className="editorial-heading text-espresso/30 text-4xl mb-4">Your bag<br /><em>is empty.</em></p>
                  <p className="label text-espresso/30 text-[10px] mb-8">Let&apos;s fix that.</p>
                  <Link
                    href="/shop"
                    onClick={toggleCart}
                    className="label text-[10px] bg-espresso text-ivory px-8 py-4 hover:bg-burgundy transition-colors"
                  >
                    SHOP NOW
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <Link href={`/product/${item.product.slug}`} onClick={toggleCart}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-28 object-cover flex-shrink-0"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="label text-gold text-[9px] mb-1">{item.product.category}</p>
                      <h3 className="text-espresso text-base font-light leading-snug mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                        {item.product.name}
                      </h3>
                      <p className="text-espresso text-sm mb-3">
                        {formatPrice(item.product.sale_price ?? item.product.price)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-blush">
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center label text-espresso hover:bg-blush/30 transition-colors"
                          >−</button>
                          <span className="w-8 h-8 flex items-center justify-center label text-espresso text-[11px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center label text-espresso hover:bg-blush/30 transition-colors"
                          >+</button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="label text-espresso/40 text-[9px] hover:text-burgundy transition-colors"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-blush/40 space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="label text-espresso text-[10px]">SUBTOTAL</span>
                  <span className="text-espresso font-medium">{formatPrice(total())}</span>
                </div>
                <p className="label text-espresso/40 text-[9px]">Shipping & taxes calculated at checkout</p>
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="block text-center bg-espresso text-ivory py-4 label text-[10px] hover:bg-burgundy transition-colors"
                >
                  CHECKOUT
                </Link>
                <a
                  href={`https://wa.me/${whatsappNum}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center border border-espresso text-espresso py-4 label text-[10px] hover:bg-espresso hover:text-ivory transition-all"
                >
                  ORDER VIA WHATSAPP
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
