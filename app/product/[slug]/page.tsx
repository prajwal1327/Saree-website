'use client';
export const runtime = 'edge';
import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductBySlug, PRODUCTS, formatPrice } from '@/lib/data';
import { useCart, useWishlist } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);

  // Hooks must run unconditionally before any conditional return
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? { name: '', hex: '' });
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toggle, isWished } = useWishlist();
  const wished = isWished(product?.id ?? 0);

  if (!product) notFound();
  const p = product;

  const whatsappNum = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
  const waMsg = encodeURIComponent(`Hi SĀRI! I'm interested in: ${p.name} (${formatPrice(p.sale_price ?? p.price)}). Can you help me?`);
  const relatedProducts = PRODUCTS.filter((x) => x.category_id === p.category_id && x.id !== p.id).slice(0, 4);

  const accordions = [
    { id: 'description', title: 'DESCRIPTION', content: p.description },
    { id: 'fabric', title: 'FABRIC & CARE', content: `Fabric: ${p.fabric}\n\nDry clean recommended. Store in a cool, dry place. Avoid perfume contact. Handle zari with care.` },
    { id: 'delivery', title: 'DELIVERY & RETURNS', content: 'Pan-India delivery in 5–7 business days. Returns accepted within 7 days for unused items in original packaging. Bridal sarees are non-returnable.' },
  ];

  function handleAddToBag() {
    addItem(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20">

            {/* Image gallery */}
            <div className="flex gap-3 lg:gap-4">
              <div className="hidden lg:flex flex-col gap-2 w-16">
                {p.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative overflow-hidden aspect-[3/4] border transition-all duration-200 ${activeImg === i ? 'border-espresso' : 'border-transparent opacity-50 hover:opacity-80'}`}
                  >
                    <img src={img} alt={`${p.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex-1 relative overflow-hidden bg-cream aspect-[3/4] cursor-zoom-in" onClick={() => setLightbox(true)}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={p.images[activeImg]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>
                {p.stock <= 3 && p.stock > 0 && (
                  <div className="absolute top-4 left-4 bg-burgundy px-3 py-1">
                    <p className="label text-ivory text-[9px]">ONLY {p.stock} LEFT</p>
                  </div>
                )}
              </div>

              <div className="lg:hidden flex gap-1.5 absolute bottom-0 left-0 right-0 justify-center pb-4">
                {p.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${activeImg === i ? 'bg-espresso w-4' : 'bg-espresso/30'}`}
                  />
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="lg:pt-4">
              <p className="label text-gold text-[10px] mb-3">{p.category?.toUpperCase()}</p>
              <h1 className="editorial-heading text-espresso text-4xl lg:text-5xl mb-4 leading-tight">{p.name}</h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#A88955">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <span className="label text-espresso/40 text-[9px]">48 REVIEWS</span>
              </div>

              <div className="flex items-baseline gap-3 mb-8">
                {p.sale_price ? (
                  <>
                    <span className="text-2xl text-burgundy font-medium">{formatPrice(p.sale_price)}</span>
                    <span className="text-lg text-espresso/40 line-through">{formatPrice(p.price)}</span>
                    <span className="label text-burgundy text-[9px] bg-burgundy/10 px-2 py-1">
                      {Math.round((1 - p.sale_price / p.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-2xl text-espresso font-medium">{formatPrice(p.price)}</span>
                )}
              </div>

              <p className="text-espresso/60 text-sm font-light leading-relaxed mb-8 max-w-md">{p.description}</p>

              <div className="mb-6">
                <p className="label text-espresso text-[10px] mb-3">
                  COLOUR — <span className="text-gold">{selectedColor.name.toUpperCase()}</span>
                </p>
                <div className="flex gap-3">
                  {p.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${selectedColor.name === c.name ? 'border-espresso scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="label text-espresso/40 text-[10px] mb-1">FABRIC</p>
                <p className="text-espresso text-sm font-light">{p.fabric}</p>
              </div>

              <div className="mb-8">
                <p className="label text-[10px] mb-1 text-espresso/40">AVAILABILITY</p>
                {p.stock === 0 ? (
                  <p className="label text-[10px] text-burgundy">SOLD OUT</p>
                ) : p.stock <= 3 ? (
                  <p className="label text-[10px] text-burgundy">ONLY {p.stock} LEFT</p>
                ) : (
                  <p className="label text-[10px] text-espresso">IN STOCK</p>
                )}
              </div>

              <div className="space-y-3 mb-8">
                <button
                  onClick={handleAddToBag}
                  disabled={p.stock === 0}
                  className="w-full bg-espresso text-ivory py-4 label text-[10px] hover:bg-burgundy transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {p.stock === 0 ? 'SOLD OUT' : added ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
                </button>
                <button
                  onClick={() => toggle(p)}
                  className="w-full border border-espresso text-espresso py-4 label text-[10px] hover:bg-espresso hover:text-ivory transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={wished ? '#641F2B' : 'none'} stroke={wished ? '#641F2B' : 'currentColor'} strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {wished ? 'IN YOUR WISHLIST' : 'ADD TO WISHLIST'}
                </button>
              </div>

              <a
                href={`https://wa.me/${whatsappNum}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-espresso/50 hover:text-espresso transition-colors mb-10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="label text-[9px]">HAVE A QUESTION? CHAT WITH US</p>
                </div>
              </a>

              <div className="flex flex-col gap-3 mb-8 pb-8 border-b border-blush/40">
                {[
                  { icon: '🚚', text: 'Pan-India delivery in 5–7 days' },
                  { icon: '↩', text: '7-day easy returns' },
                  { icon: '🔒', text: 'Secure checkout' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span>{item.icon}</span>
                    <p className="label text-espresso/40 text-[10px]">{item.text.toUpperCase()}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-0">
                {accordions.map((acc) => (
                  <div key={acc.id} className="border-b border-blush/40">
                    <button
                      onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                      className="w-full flex items-center justify-between py-4"
                    >
                      <span className="label text-espresso text-[10px]">{acc.title}</span>
                      <span className="label text-espresso/40 text-lg">{openAccordion === acc.id ? '−' : '+'}</span>
                    </button>
                    <AnimatePresence>
                      {openAccordion === acc.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-espresso/60 text-sm font-light leading-relaxed pb-4 whitespace-pre-line">{acc.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-24 lg:mt-36">
              <div className="mb-12">
                <p className="label text-gold text-[10px] mb-4">YOU MAY ALSO LOVE</p>
                <h2 className="editorial-heading text-espresso text-4xl lg:text-5xl">More from {p.category}.</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((x) => (
                  <ProductCard key={x.id} product={x} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-espresso/90 z-[400] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-6 right-6 text-ivory label text-[10px]">CLOSE ×</button>
            <img src={p.images[activeImg]} alt={p.name} className="max-w-full max-h-full object-contain" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-ivory border-t border-blush/40 px-4 py-4 z-[100]">
        <div className="flex gap-3">
          <button
            onClick={() => toggle(p)}
            className="w-12 h-12 flex items-center justify-center border border-espresso flex-shrink-0"
            aria-label="Wishlist"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={wished ? '#641F2B' : 'none'} stroke={wished ? '#641F2B' : '#211A17'} strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button
            onClick={handleAddToBag}
            disabled={p.stock === 0}
            className="flex-1 bg-espresso text-ivory py-3 label text-[10px] hover:bg-burgundy transition-colors disabled:opacity-40"
          >
            {p.stock === 0 ? 'SOLD OUT' : added ? '✓ ADDED' : 'ADD TO BAG'}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
