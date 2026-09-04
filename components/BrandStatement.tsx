'use client';
import { motion } from 'framer-motion';

export default function BrandStatement() {
  const words = ['A MOOD.', 'A MEMORY.', 'A LITTLE DRAMA.'];

  return (
    <section className="py-28 lg:py-44 px-6 lg:px-12 bg-espresso overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="label text-gold/60 mb-12 lg:mb-16">— THE SĀRI PHILOSOPHY</p>
        </motion.div>

        <motion.h2
          className="editorial-heading text-ivory text-5xl sm:text-6xl lg:text-8xl xl:text-[110px] mb-8 lg:mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          NOT JUST
          <br />A SAREE.
        </motion.h2>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-0">
          <div className="space-y-2 lg:space-y-3">
            {words.map((word, i) => (
              <motion.p
                key={word}
                className="text-blush/70 text-3xl lg:text-5xl xl:text-6xl font-light"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.p>
            ))}
          </div>

          <motion.div
            className="max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-blush/50 text-sm font-light leading-relaxed mb-6">
              Rooted in tradition.
              <br />
              Styled for now.
            </p>
            <div className="w-12 h-px bg-gold/40" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
