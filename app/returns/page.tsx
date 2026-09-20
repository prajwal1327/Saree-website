import Footer from '@/components/Footer';
import Link from 'next/link';

const sections = [
  {
    title: 'Return Window',
    body: 'Returns are accepted within 7 days of delivery. The item must be unused, unwashed, and in its original packaging with all tags and certificates intact.',
  },
  {
    title: 'Non-Returnable Items',
    body: 'Bridal sarees, customised pieces, and sarees marked "Final Sale" are not eligible for return or exchange. International orders are also non-returnable due to customs complexities.',
  },
  {
    title: 'How to Initiate a Return',
    body: 'Email us at support@sari.in or WhatsApp us within 7 days of delivery. Include your order number and reason for return. We will arrange a free pickup from your address within 2 business days.',
  },
  {
    title: 'Refunds',
    body: 'Once the returned item reaches our warehouse and passes quality inspection, your refund will be processed within 5–7 business days to your original payment method. Shipping charges are non-refundable.',
  },
  {
    title: 'Exchanges',
    body: 'We offer exchanges for a different colour or size of the same product, subject to availability. Exchanges are processed within 10 business days of the returned item reaching us.',
  },
  {
    title: 'Damaged or Defective Items',
    body: 'If your saree arrives damaged or defective, please contact us within 48 hours with photographs. We will arrange an immediate replacement or full refund, including shipping costs.',
  },
];

export default function ReturnsPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="mb-16">
            <p className="label text-gold text-[10px] mb-4">POLICIES</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Returns &amp; Exchanges</h1>
            <p className="text-espresso/40 text-sm font-light mt-4">Last updated: September 2026</p>
          </div>

          <div className="bg-cream px-8 py-6 mb-12">
            <p className="label text-espresso text-[10px] mb-2">QUICK SUMMARY</p>
            <p className="text-espresso/70 font-light text-sm leading-relaxed">
              7-day returns · Free pickup · Refund in 5–7 days · Bridal sarees non-returnable
            </p>
          </div>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title} className="border-t border-blush/40 pt-8">
                <h2 className="editorial-heading text-espresso text-2xl mb-4">{s.title}</h2>
                <p className="text-espresso/60 font-light leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-blush/40 flex flex-wrap gap-4">
            <Link href="/contact" className="bg-espresso text-ivory px-8 py-3 label text-[10px] hover:bg-burgundy transition-colors">
              CONTACT US
            </Link>
            <Link href="/faq" className="border border-espresso text-espresso px-8 py-3 label text-[10px] hover:bg-espresso hover:text-ivory transition-colors">
              VIEW FAQ
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
