import Footer from '@/components/Footer';

const sections = [
  { title: 'Information We Collect', body: 'We collect information you provide when placing an order or creating an account: name, email address, phone number, delivery address, and payment details. We also collect browsing data (pages visited, time spent) through cookies to improve your experience.' },
  { title: 'How We Use Your Information', body: 'Your information is used to process and fulfill your orders, communicate order status and updates, send promotional emails (with your consent), improve our website and services, and comply with legal obligations.' },
  { title: 'Data Security', body: 'All payment information is encrypted using SSL/TLS. We do not store full card details on our servers. Passwords are hashed and salted. Access to personal data is restricted to authorised personnel only.' },
  { title: 'Sharing of Information', body: 'We do not sell your personal data. We share information only with delivery partners (name, address, phone for delivery), payment gateways (for transaction processing), and analytics providers (anonymised data only).' },
  { title: 'Cookies', body: 'We use essential cookies for cart functionality and session management, and optional analytics cookies to understand site usage. You can disable analytics cookies at any time from your browser settings.' },
  { title: 'Your Rights', body: 'You have the right to access your personal data, correct inaccurate information, request deletion of your data, withdraw consent for marketing emails, and lodge a complaint with the relevant data authority. To exercise these rights, email us at privacy@sari.in.' },
  { title: 'Data Retention', body: 'Order data is retained for 7 years for accounting and tax purposes. Account data is retained until you request deletion. Marketing consent records are retained for 3 years.' },
  { title: 'Contact', body: 'For privacy-related queries, contact our Data Protection Officer at privacy@sari.in or write to us at SĀRI, 12 Silk Board Junction, Bengaluru 560068, India.' },
];

export default function PrivacyPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="mb-16">
            <p className="label text-gold text-[10px] mb-4">LEGAL</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Privacy Policy</h1>
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
        </div>
      </div>
      <Footer />
    </>
  );
}
