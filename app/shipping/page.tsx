import Footer from '@/components/Footer';

const sections = [
  {
    title: 'Standard Delivery',
    body: 'All orders within India are dispatched within 1–2 business days and delivered in 5–7 business days. Free shipping on orders above ₹2,000.',
  },
  {
    title: 'Express Delivery',
    body: 'Available in Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, and Kolkata. Delivered in 2–3 business days. Additional charge of ₹199.',
  },
  {
    title: 'International Shipping',
    body: 'We ship to USA, UK, UAE, Canada, Australia, and Singapore. Delivery takes 10–14 business days from dispatch. Customs and import duties are the responsibility of the recipient.',
  },
  {
    title: 'Order Processing',
    body: 'Orders placed before 2 PM IST on business days are processed the same day. Orders placed on weekends or public holidays are processed the next business day.',
  },
  {
    title: 'Tracking Your Order',
    body: 'Once your order is dispatched, you will receive an SMS and email with a tracking link. You can also view your order status under My Account → Orders.',
  },
  {
    title: 'Packaging',
    body: 'Every SĀRI order is packed in our signature recyclable box with tissue wrap, a hand-written care card, and a complimentary muslin storage bag for your saree.',
  },
  {
    title: 'Lost or Damaged Orders',
    body: 'In the unlikely event that your order is lost or arrives damaged, please contact us within 48 hours of the estimated delivery date. We will arrange a replacement or full refund.',
  },
];

export default function ShippingPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="mb-16">
            <p className="label text-gold text-[10px] mb-4">POLICIES</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Shipping Policy</h1>
            <p className="text-espresso/40 text-sm font-light mt-4">Last updated: September 2026</p>
          </div>

          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.title} className="border-t border-blush/40 pt-8">
                <h2 className="editorial-heading text-espresso text-2xl mb-4">{s.title}</h2>
                <p className="text-espresso/60 font-light leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-blush/40">
            <p className="text-espresso/50 font-light text-sm">
              Questions about your shipment? <a href="/contact" className="text-espresso underline hover:text-burgundy">Contact us</a> or{' '}
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'}`} target="_blank" rel="noopener noreferrer" className="text-espresso underline hover:text-burgundy">WhatsApp us</a>.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
