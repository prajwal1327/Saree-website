import Footer from '@/components/Footer';

const sections = [
  { title: 'Acceptance of Terms', body: 'By accessing or using the SĀRI website (saree-website.pages.dev), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.' },
  { title: 'Products & Pricing', body: 'All prices are in Indian Rupees (INR) and include applicable taxes. Prices are subject to change without notice. We reserve the right to refuse or cancel orders at our discretion, including if product information or pricing is incorrect.' },
  { title: 'Orders & Payment', body: 'An order confirmation email is sent upon successful placement of your order. This constitutes acceptance of your order. We accept major credit/debit cards, UPI, net banking, and cash on delivery (select pincodes). All payments are processed securely.' },
  { title: 'Intellectual Property', body: 'All content on this website — including text, photographs, graphics, logos, and product descriptions — is the property of SĀRI and protected by copyright law. You may not reproduce, distribute, or use our content without written permission.' },
  { title: 'User Accounts', body: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to terminate accounts that violate these terms.' },
  { title: 'Limitation of Liability', body: 'SĀRI shall not be liable for any indirect, incidental, or consequential damages arising from use of our website or products. Our maximum liability is limited to the amount paid for the product in question.' },
  { title: 'Governing Law', body: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka, India.' },
  { title: 'Changes to Terms', body: 'We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated date. Continued use of the website after changes constitutes acceptance of the new terms.' },
];

export default function TermsPage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="mb-16">
            <p className="label text-gold text-[10px] mb-4">LEGAL</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Terms of Service</h1>
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
          <div className="mt-12 pt-8 border-t border-blush/40">
            <p className="text-espresso/50 font-light text-sm">
              Questions about our terms? Contact us at <a href="mailto:legal@sari.in" className="text-espresso underline hover:text-burgundy">legal@sari.in</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
