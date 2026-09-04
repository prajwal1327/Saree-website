'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function EditorialBanner() {
  return (
    <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85&fit=crop"
          alt="Party Wear Sarees"
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-espresso/50" />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col justify-end pb-16 lg:pb-24 px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label text-gold/70 mb-8">— PARTY WEAR</p>
          <h2
            className="text-ivory font-light text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-10 leading-none"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            FOR THE WOMAN
            <br />
            WHO DOESN&apos;T
            <br />
            <em>ENTER A ROOM QUIETLY.</em>
          </h2>
          <Link
            href="/shop?category=party-wear"
            className="inline-flex items-center gap-4 border border-ivory text-ivory px-8 py-4 label text-[10px] hover:bg-ivory hover:text-espresso transition-all duration-300"
          >
            SHOP PARTY WEAR <span>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
