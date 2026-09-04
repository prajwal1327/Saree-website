'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart, useWishlist } from '@/lib/store';
import { formatPrice } from '@/lib/data';
import type { Product } from '@/lib/types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product.id);

  const img = product.images[0];
  const img2 = product.images[1] ?? product.images[0];

  function handleAddToBag(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product);
  }

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        {/* Image container */}
        <div className="relative overflow-hidden bg-cream aspect-[3/4] mb-4">
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-20 p-2 bg-ivory/80 rounded-none"
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24"
              fill={wished ? '#641F2B' : 'none'}
              stroke={wished ? '#641F2B' : '#211A17'}
              strokeWidth="1.5"
              animate={{ scale: wished ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </motion.svg>
          </button>

          {/* Sale badge */}
          {product.sale_price && (
            <div className="absolute top-3 left-3 z-20 bg-burgundy px-2 py-1">
              <span className="label text-ivory text-[9px]">SALE</span>
            </div>
          )}

          {/* Images */}
          <motion.img
            src={img}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            animate={{ opacity: hovered && img2 !== img ? 0 : 1, scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {img2 !== img && (
            <motion.img
              src={img2}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.04 : 1.06 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}

          {/* Quick add */}
          <AnimatePresence>
            {hovered && (
              <motion.button
                onClick={handleAddToBag}
                className="absolute bottom-0 left-0 right-0 bg-espresso text-ivory py-3 label text-[10px] hover:bg-burgundy transition-colors"
                initial={{ y: 48 }}
                animate={{ y: 0 }}
                exit={{ y: 48 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {added ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div>
          <p className="label text-gold text-[10px] mb-1">{product.category?.toUpperCase()}</p>
          <h3 className="text-espresso font-light text-base mb-1 leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}>
            {product.name}
          </h3>
          <p className="label text-espresso/40 text-[10px] mb-2">{product.fabric}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.sale_price ? (
                <>
                  <span className="text-burgundy font-medium text-sm">{formatPrice(product.sale_price)}</span>
                  <span className="text-espresso/40 line-through text-xs">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-espresso text-sm">{formatPrice(product.price)}</span>
              )}
            </div>
            {/* Color dots */}
            <div className="flex gap-1.5">
              {product.colors.slice(0, 3).map((c) => (
                <div
                  key={c.name}
                  className="w-3 h-3 rounded-full border border-espresso/20"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
