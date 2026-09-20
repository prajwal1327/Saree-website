'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';

const FAQS = [
  {
    section: 'ORDERING',
    items: [
      { q: 'How do I place an order?', a: 'Browse our collection, select your saree, choose your colour and add to bag. At checkout, fill in your delivery details and choose your payment method. You\'ll receive an order confirmation on your email.' },
      { q: 'Can I order via WhatsApp?', a: 'Yes! You can reach us on WhatsApp and our team will guide you through the purchase, answer questions about the saree, and arrange payment directly.' },
      { q: 'Can I customise a saree?', a: 'For bridal sarees we offer limited customisation on blouse measurements and certain border options. Please contact us on WhatsApp to discuss your requirements before ordering.' },
    ],
  },
  {
    section: 'DELIVERY',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery across India is 5–7 business days. Express delivery (2–3 days) is available in metro cities at an additional charge.' },
      { q: 'Do you ship internationally?', a: 'Yes. We ship to USA, UK, UAE, Canada, Australia and Singapore. International delivery takes 10–14 business days. Customs duties are borne by the buyer.' },
      { q: 'How can I track my order?', a: 'Once your order is dispatched you will receive an SMS and email with a tracking link. You can also track from your Account page.' },
    ],
  },
  {
    section: 'RETURNS & EXCHANGES',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 7 days of delivery for unused, unwashed sarees in their original packaging with all tags intact. Bridal sarees and customised pieces are non-returnable.' },
      { q: 'How do I initiate a return?', a: 'Contact us on support@sari.in or WhatsApp within 7 days. We\'ll arrange a free pickup. Refunds are credited to your original payment method within 5–7 business days.' },
      { q: 'Can I exchange for a different colour?', a: 'Yes, subject to availability. Exchanges are processed within 10 business days of the returned item reaching our warehouse.' },
    ],
  },
  {
    section: 'PRODUCT & CARE',
    items: [
      { q: 'Are your sarees authentic handloom?', a: 'Every saree on SĀRI is sourced directly from certified weaver clusters. We do not stock mill-made sarees. Each piece carries a handloom mark where applicable.' },
      { q: 'How should I care for my silk saree?', a: 'Dry clean is strongly recommended for all silk and zari sarees. Store in a muslin cloth in a cool, dry place. Avoid direct contact with perfume and deodorant. Air it occasionally to prevent moisture.' },
      { q: 'Will the colours look the same in person?', a: 'We photograph every saree under natural light to represent colours as accurately as possible. Slight variations may occur due to screen calibration. If you need a closer look, WhatsApp us and we\'ll send you additional photos or a video.' },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
            <p className="label text-gold text-[10px] mb-4">SUPPORT</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Frequently Asked<br /><em>Questions</em></h1>
          </motion.div>

          <div className="space-y-14">
            {FAQS.map((section) => (
              <div key={section.section}>
                <p className="label text-gold text-[10px] mb-6 pb-4 border-b border-blush/40">{section.section}</p>
                <div className="divide-y divide-blush/30">
                  {section.items.map((item) => {
                    const key = `${section.section}-${item.q}`;
                    const isOpen = open === key;
                    return (
                      <div key={item.q}>
                        <button
                          onClick={() => setOpen(isOpen ? null : key)}
                          className="w-full flex items-start justify-between py-5 text-left gap-6"
                        >
                          <span className="text-espresso font-light text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.q}</span>
                          <span className="text-espresso/40 text-xl flex-shrink-0 mt-0.5">{isOpen ? '−' : '+'}</span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-espresso/55 text-sm font-light leading-relaxed pb-6">{item.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-blush/40 text-center">
            <p className="editorial-heading text-espresso text-3xl mb-4">Still have questions?</p>
            <p className="text-espresso/50 font-light mb-8">Our team is happy to help — usually within a few hours.</p>
            <a href="/contact" className="inline-block bg-espresso text-ivory px-10 py-4 label text-[10px] hover:bg-burgundy transition-colors">
              CONTACT US
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
