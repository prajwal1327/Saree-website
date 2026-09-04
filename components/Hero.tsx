'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=85&fit=crop"
          alt="SĀRI — Luxury Indian Sarees"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/60 via-espresso/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-20 xl:px-32">
        <div className="max-w-xl">
          <motion.p
            className="label text-ivory/70 mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            NEW COLLECTION — 2025
          </motion.p>

          <motion.h1
            className="editorial-heading text-ivory text-6xl sm:text-7xl lg:text-8xl xl:text-9xl mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            THE ART
            <br />
            <em>OF</em>
            <br />
            DRAPING.
          </motion.h1>

          <motion.p
            className="text-ivory/80 text-base lg:text-lg font-light mb-10 lg:mb-12 max-w-xs leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Timeless Indian craft.
            <br />A little more attitude.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-4 bg-ivory text-espresso px-8 py-4 label hover:bg-blush transition-colors duration-300 group"
            >
              SHOP THE COLLECTION
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <p className="label text-ivory/50 text-[10px]">SCROLL TO EXPLORE</p>
        <motion.div
          className="w-px h-12 bg-ivory/30"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
}
