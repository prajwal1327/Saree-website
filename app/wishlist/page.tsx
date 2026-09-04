'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWishlist, useCart } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import Footer from '@/components/Footer';

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();

  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="label text-gold text-[10px] mb-4">WISHLIST</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">
              The things
              <br />
              <em>you&apos;re thinking about.</em>
            </h1>
          </motion.div>

          {items.length === 0 ? (
            <div className="text-center py-24">
              <p className="editorial-heading text-espresso/30 text-4xl mb-8">Your wishlist<br /><em>is empty.</em></p>
              <Link href="/shop" className="label text-[10px] bg-espresso text-ivory px-8 py-4 hover:bg-burgundy transition-colors">
                START EXPLORING
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {items.map(({ product }, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group"
                >
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className="relative overflow-hidden aspect-[3/4] bg-cream mb-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <p className="label text-gold text-[9px] mb-1">{product.category?.toUpperCase()}</p>
                    <h3 className="text-espresso text-base font-light mb-1 leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                      {product.name}
                    </h3>
                    <p className="text-espresso text-sm mb-4">
                      {formatPrice(product.sale_price ?? product.price)}
                    </p>
                  </Link>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { addItem(product); }}
                      className="flex-1 bg-espresso text-ivory py-2.5 label text-[9px] hover:bg-burgundy transition-colors"
                    >
                      ADD TO BAG
                    </button>
                    <button
                      onClick={() => remove(product.id)}
                      className="w-10 h-10 flex items-center justify-center border border-blush hover:border-espresso transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
