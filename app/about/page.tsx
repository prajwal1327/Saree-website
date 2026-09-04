'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';

const TEAM = [
  { name: 'Anjali Mehta', role: 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80&fit=crop&crop=top' },
  { name: 'Kavitha Iyer', role: 'Head of Curation', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=600&q=80&fit=crop&crop=top' },
  { name: 'Deepa Nair', role: 'Master Weaver Liaison', img: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&q=80&fit=crop&crop=top' },
];

const STATS = [
  { value: '200+', label: 'Weavers Supported' },
  { value: '6', label: 'Weaving Traditions' },
  { value: '1000+', label: 'Sarees Curated' },
  { value: '8', label: 'States, One India' },
];

const VALUES = [
  { title: 'Handcrafted Excellence', body: 'Every saree in our collection is handpicked directly from master weavers. No middlemen. No shortcuts. Only the finest work of human hands.' },
  { title: 'Living Traditions', body: 'We work with weaving clusters from Kanchipuram, Varanasi, Pochampally, Chanderi and more — keeping centuries-old traditions alive through commerce.' },
  { title: 'Transparent Sourcing', body: 'We believe you deserve to know where your saree comes from. Each piece is documented — the weaver, the cluster, the technique, the time it took.' },
  { title: 'Slow Fashion', body: 'A master weaver takes 2 to 8 weeks to create a single saree. We honour that time. This is not fast fashion. This is forever fashion.' },
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] lg:h-[85vh] overflow-hidden bg-espresso">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&q=90&fit=crop"
            alt="About SĀRI"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p className="label text-gold text-[10px] mb-6 tracking-[0.3em]">OUR STORY</p>
              <h1 className="editorial-heading text-ivory text-5xl lg:text-7xl leading-tight max-w-3xl mx-auto">
                Woven in India.<br /><em>Worn by the world.</em>
              </h1>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-screen-lg mx-auto px-6 lg:px-12 py-24 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="label text-gold text-[10px] mb-6">WHO WE ARE</p>
              <h2 className="editorial-heading text-espresso text-4xl lg:text-5xl mb-8 leading-tight">
                A love letter to India's<br />greatest weavers.
              </h2>
              <p className="text-espresso/60 font-light leading-relaxed mb-6">
                SĀRI was born from a simple belief: that India's handloom heritage deserves a stage worthy of its beauty. We are not a marketplace. We are a curation house — rigorous, editorial, and deeply personal in our selection.
              </p>
              <p className="text-espresso/60 font-light leading-relaxed">
                Every saree we carry has been visited at source, examined by hand, and approved by our curatorial team. If it is on SĀRI, it is the finest version of its kind.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[3/4] overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=900&q=85&fit=crop"
                alt="Indian weaver"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-espresso py-20">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="editorial-heading text-gold text-5xl lg:text-6xl mb-3">{s.value}</p>
                  <p className="label text-ivory/40 text-[10px]">{s.label.toUpperCase()}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 lg:py-36">
          <div className="mb-16">
            <p className="label text-gold text-[10px] mb-4">WHAT WE STAND FOR</p>
            <h2 className="editorial-heading text-espresso text-4xl lg:text-5xl">Our principles.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="border-t-2 border-gold pt-6"
              >
                <h3 className="editorial-heading text-espresso text-xl mb-4">{v.title}</h3>
                <p className="text-espresso/55 text-sm font-light leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* The Craft */}
        <section className="bg-cream py-24">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 aspect-[4/3] lg:aspect-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200&q=85&fit=crop"
                  alt="Saree craft"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="label text-gold text-[10px] mb-6">THE CRAFT</p>
                <h2 className="editorial-heading text-espresso text-4xl mb-6 leading-tight">
                  Months of work.<br /><em>Lifetimes of knowledge.</em>
                </h2>
                <p className="text-espresso/55 font-light leading-relaxed mb-8">
                  A Kanchipuram saree requires up to 4 weeks to weave. A Patola, up to 6 months. Each thread is placed with intention. Each motif carries meaning. We document every piece so you understand what you wear.
                </p>
                <Link
                  href="/shop"
                  className="label text-[10px] text-espresso border-b border-espresso pb-1 w-fit hover:text-gold hover:border-gold transition-colors"
                >
                  EXPLORE THE COLLECTION →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-screen-xl mx-auto px-6 lg:px-12 py-24 lg:py-36">
          <div className="mb-16">
            <p className="label text-gold text-[10px] mb-4">THE PEOPLE</p>
            <h2 className="editorial-heading text-espresso text-4xl lg:text-5xl">Behind every saree,<br /><em>a person who cares.</em></h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TEAM.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="editorial-heading text-espresso text-xl mb-1">{t.name}</h3>
                <p className="label text-espresso/40 text-[10px]">{t.role.toUpperCase()}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-burgundy py-24 text-center">
          <div className="max-w-screen-md mx-auto px-6">
            <p className="label text-blush/60 text-[10px] mb-6">JOIN THE STORY</p>
            <h2 className="editorial-heading text-ivory text-4xl lg:text-5xl mb-8 leading-tight">
              Ready to wear a piece<br />of Indian heritage?
            </h2>
            <Link
              href="/shop"
              className="inline-block bg-ivory text-espresso px-10 py-4 label text-[10px] hover:bg-gold transition-colors"
            >
              SHOP THE COLLECTION
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
