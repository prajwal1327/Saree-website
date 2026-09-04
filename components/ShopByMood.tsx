'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const moods = [
  { label: 'SOFT & ROMANTIC', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80&fit=crop', href: '/shop?mood=romantic', sub: 'Organza, Georgette, Chiffon' },
  { label: 'BOLD & BEAUTIFUL', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800&q=80&fit=crop', href: '/shop?mood=bold', sub: 'Banarasi, Kanchi Silk' },
  { label: 'FESTIVE & EXTRA', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop', href: '/shop?mood=festive', sub: 'Tissue, Sequin, Zari' },
  { label: 'QUIETLY LUXURIOUS', img: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&q=80&fit=crop', href: '/shop?mood=quiet', sub: 'Linen, Cotton, Chanderi' },
];

export default function ShopByMood() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-screen-xl mx-auto">
      <motion.div
        className="mb-16 lg:mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="label text-gold mb-4">SHOP BY MOOD</p>
        <h2 className="editorial-heading text-espresso text-5xl lg:text-6xl xl:text-7xl">
          Dress
          <br />
          <em>accordingly.</em>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {moods.map((mood, i) => (
          <motion.div
            key={mood.label}
            className="relative overflow-hidden group img-overlay-group cursor-pointer"
            style={{ aspectRatio: i % 2 === 0 ? '2/3' : '2/3' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
          >
            <Link href={mood.href} className="absolute inset-0 z-10" aria-label={mood.label} />
            <img
              src={mood.img}
              alt={mood.label}
              className="w-full h-full object-cover img-scale"
              style={{ aspectRatio: '2/3' }}
              loading="lazy"
            />
            <div className="img-overlay absolute inset-0 bg-espresso/35" />
            <div className="absolute inset-x-0 bottom-0 p-5 z-10">
              <div className="cat-label">
                <p className="text-ivory/60 text-[10px] label mb-1">{mood.sub}</p>
                <h3 className="text-ivory text-sm font-medium label leading-tight">{mood.label}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
