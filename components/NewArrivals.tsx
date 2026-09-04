'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { getNewArrivals } from '@/lib/data';

export default function NewArrivals() {
  const products = getNewArrivals().slice(0, 4);

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-screen-xl mx-auto">
      <motion.div
        className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <p className="label text-gold mb-4">JUST ARRIVED</p>
          <h2 className="editorial-heading text-espresso text-5xl lg:text-6xl xl:text-7xl">
            New, but make it
            <br />
            <em>timeless.</em>
          </h2>
        </div>
        <Link
          href="/shop?filter=new"
          className="mt-8 lg:mt-0 label text-espresso hover:text-burgundy transition-colors flex items-center gap-3"
        >
          VIEW ALL NEW ARRIVALS <span>→</span>
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
