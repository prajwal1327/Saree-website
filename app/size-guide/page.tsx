import Footer from '@/components/Footer';
import Link from 'next/link';

const blouseRows = [
  ['XS', '30–31', '28–29', '32–33'],
  ['S',  '32–33', '30–31', '34–35'],
  ['M',  '34–35', '32–33', '36–37'],
  ['L',  '36–37', '34–35', '38–39'],
  ['XL', '38–40', '36–38', '40–42'],
  ['XXL','41–43', '39–41', '43–45'],
];

const tips = [
  { title: 'Saree Length', body: 'All sarees in our collection are 5.5 to 6.3 metres long — sufficient for all draping styles including Nivi, Gujarati, and Bengali. Blouse fabric of 0.8m is included in most silk sarees.' },
  { title: 'Saree Width', body: 'Standard width is 44–48 inches. Our silk sarees are typically 44–46 inches; cotton and georgette sarees can be up to 48 inches.' },
  { title: 'Fall & Pico', body: 'Our sarees come without fall and pico. We recommend getting it done locally to match the saree weight and your preferred drape.' },
  { title: 'Blouse Piece', body: 'Most silk and Kanchipuram sarees include a matching blouse piece of 0.8m. Cotton and lightweight sarees may not include a blouse piece — check the product description.' },
];

export default function SizeGuidePage() {
  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <div className="mb-16">
            <p className="label text-gold text-[10px] mb-4">GUIDE</p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">Size Guide</h1>
          </div>

          <div className="space-y-12 mb-16">
            {tips.map((t) => (
              <div key={t.title} className="border-t border-blush/40 pt-8">
                <h2 className="editorial-heading text-espresso text-2xl mb-4">{t.title}</h2>
                <p className="text-espresso/60 font-light leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-blush/40 pt-12">
            <p className="label text-gold text-[10px] mb-6">BLOUSE SIZE CHART</p>
            <p className="text-espresso/50 font-light text-sm mb-8">All measurements in inches. When in doubt, go one size up for saree blouses.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-espresso/10">
                    {['SIZE', 'BUST', 'WAIST', 'HIPS'].map((h) => (
                      <th key={h} className="text-left py-3 pr-8 label text-[9px] text-espresso/40">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {blouseRows.map(([size, ...rest]) => (
                    <tr key={size} className="border-b border-blush/30 hover:bg-cream transition-colors">
                      <td className="py-3 pr-8 label text-[10px] text-espresso">{size}</td>
                      {rest.map((val, i) => (
                        <td key={i} className="py-3 pr-8 text-espresso/60 font-light">{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-blush/40">
            <p className="text-espresso/50 font-light text-sm mb-6">
              Not sure about your size? Send us your measurements on WhatsApp and we'll help you pick the right blouse.
            </p>
            <Link href="/contact" className="inline-block bg-espresso text-ivory px-8 py-3 label text-[10px] hover:bg-burgundy transition-colors">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
