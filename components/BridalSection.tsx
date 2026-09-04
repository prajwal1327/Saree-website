'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BridalSection() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-screen-xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="relative overflow-hidden aspect-[3/4]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1000&q=85&fit=crop"
            alt="Bridal Sarees"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent" />
          {/* Gold accent line */}
          <div className="absolute left-0 top-8 bottom-8 w-px bg-gold/40" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:pr-8"
        >
          <p className="label text-gold mb-8">— BRIDAL COLLECTION</p>
          <h2
            className="text-espresso font-light text-5xl lg:text-6xl xl:text-7xl mb-8 leading-none"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            THE BRIDE
            <br />
            DESERVES
            <br />
            <em className="text-burgundy">A LITTLE DRAMA.</em>
          </h2>
          <p className="text-espresso/60 text-sm font-light leading-relaxed mb-12 max-w-sm">
            Bridal sarees made for the moments everyone remembers. Handwoven by artisans who understand
            that some occasions deserve nothing less than extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop?category=bridal"
              className="inline-flex items-center justify-center gap-4 bg-espresso text-ivory px-8 py-4 label text-[10px] hover:bg-burgundy transition-colors duration-300"
            >
              EXPLORE BRIDAL <span>→</span>
            </Link>
            <Link
              href="/bridal-consultation"
              className="inline-flex items-center justify-center gap-4 border border-espresso text-espresso px-8 py-4 label text-[10px] hover:bg-espresso hover:text-ivory transition-all duration-300"
            >
              BOOK A CONSULTATION
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
