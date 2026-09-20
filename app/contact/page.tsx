'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-16">
            <p className="label text-gold text-[10px] mb-4">GET IN TOUCH</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Contact Us</h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Info */}
            <div>
              <div className="space-y-10">
                {[
                  { icon: '📍', title: 'Our Studio', body: '12, Silk Board Junction\nBengaluru, Karnataka 560068\nIndia' },
                  { icon: '🕐', title: 'Hours', body: 'Monday – Saturday: 10am – 7pm\nSunday: 11am – 5pm' },
                  { icon: '📧', title: 'Email', body: 'hello@sari.in\nsupport@sari.in' },
                  { icon: '📞', title: 'Phone', body: '+91 72041 40921' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5">
                    <span className="text-2xl mt-1">{item.icon}</span>
                    <div>
                      <p className="label text-gold text-[10px] mb-2">{item.title.toUpperCase()}</p>
                      <p className="text-espresso/60 font-light text-sm leading-relaxed whitespace-pre-line">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-blush/40">
                <p className="label text-espresso text-[10px] mb-4">PREFER TO CHAT?</p>
                <a
                  href={`https://wa.me/${wa}?text=Hi%20SĀRI%2C%20I%20have%20a%20question.`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 label text-[10px] hover:bg-[#20b558] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WHATSAPP US
                </a>
              </div>
            </div>

            {/* Form */}
            <div>
              {sent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <p className="editorial-heading text-espresso text-4xl mb-4">Thank you.</p>
                  <p className="text-espresso/50 font-light">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { key: 'name', label: 'FULL NAME', type: 'text', required: true },
                    { key: 'email', label: 'EMAIL ADDRESS', type: 'email', required: true },
                    { key: 'subject', label: 'SUBJECT', type: 'text', required: false },
                  ].map(({ key, label, type, required }) => (
                    <div key={key}>
                      <label className="label text-[9px] text-espresso/40 block mb-2">{label}</label>
                      <input
                        type={type}
                        required={required}
                        value={(form as any)[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border-b border-blush bg-transparent text-espresso text-sm font-light py-2 outline-none focus:border-espresso transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="label text-[9px] text-espresso/40 block mb-2">YOUR MESSAGE</label>
                    <textarea
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border-b border-blush bg-transparent text-espresso text-sm font-light py-2 outline-none focus:border-espresso transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="w-full bg-espresso text-ivory py-4 label text-[10px] hover:bg-burgundy transition-colors mt-4">
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
