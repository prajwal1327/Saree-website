'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CATEGORIES } from '@/lib/data';

const layouts = [
  'col-span-2 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-2',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];

export default function CategorySection() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-screen-xl mx-auto">
      <motion.div
        className="mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="label text-gold mb-4">THE COLLECTION</p>
        <h2 className="editorial-heading text-espresso text-5xl lg:text-6xl xl:text-7xl">
          Six ways to wear
          <br />
          <em>your mood.</em>
        </h2>
      </motion.div>

      {/* Desktop editorial grid */}
      <div className="hidden lg:grid grid-cols-4 grid-rows-3 gap-3 h-[700px]">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className={`${layouts[i]} relative overflow-hidden group img-overlay-group cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <Link href={`/shop?category=${cat.slug}`} className="absolute inset-0 z-10" aria-label={cat.name} />
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover img-scale"
              loading="lazy"
            />
            <div className="img-overlay absolute inset-0 bg-espresso/30" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <div className="cat-label">
                <p className="label text-ivory/70 mb-1">{cat.name.split(' ')[1] || ''}</p>
                <h3
                  className="text-ivory text-2xl lg:text-3xl font-light mb-2"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {cat.name.split(' ')[0]}
                </h3>
                <div className="flex items-center gap-2 overflow-hidden h-4">
                  <span className="label text-ivory/70 text-[10px] whitespace-nowrap">EXPLORE</span>
                  <motion.span
                    className="text-ivory/70 text-sm"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >→</motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile horizontal scroll */}
      <div className="lg:hidden flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6 pb-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            className="relative flex-shrink-0 w-52 h-72 overflow-hidden rounded-none"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Link href={`/shop?category=${cat.slug}`} className="absolute inset-0 z-10" aria-label={cat.name} />
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-espresso/40" />
            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-ivory text-xl font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                {cat.name}
              </h3>
              <p className="label text-ivory/60 text-[10px]">EXPLORE →</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
