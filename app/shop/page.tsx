'use client';
import { Suspense, useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { PRODUCTS, CATEGORIES, formatPrice } from '@/lib/data';

const SORT_OPTIONS = [
  { label: 'FEATURED', value: 'featured' },
  { label: 'NEWEST', value: 'newest' },
  { label: 'PRICE — LOW TO HIGH', value: 'price-asc' },
  { label: 'PRICE — HIGH TO LOW', value: 'price-desc' },
];

function ShopContent() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get('category') || '');
  const [sort, setSort] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(50000);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.active);
    if (category) list = list.filter((p) => p.category_slug === category);
    if (params.get('filter') === 'new') list = list.filter((p) => p.new_arrival);
    list = list.filter((p) => (p.sale_price ?? p.price) <= priceMax);

    if (sort === 'featured') list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    else if (sort === 'newest') list = [...list].sort((a, b) => (b.new_arrival ? 1 : 0) - (a.new_arrival ? 1 : 0));
    else if (sort === 'price-asc') list = [...list].sort((a, b) => (a.sale_price ?? a.price) - (b.sale_price ?? b.price));
    else if (sort === 'price-desc') list = [...list].sort((a, b) => (b.sale_price ?? b.price) - (a.sale_price ?? a.price));

    return list;
  }, [category, sort, params, priceMax]);

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <p className="label text-gold text-[10px] mb-5">CATEGORY</p>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setCategory('')}
              className={`label text-[10px] ${!category ? 'text-espresso' : 'text-espresso/40 hover:text-espresso'} transition-colors`}
            >
              ALL SAREES
            </button>
          </li>
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setCategory(cat.slug)}
                className={`label text-[10px] ${category === cat.slug ? 'text-espresso' : 'text-espresso/40 hover:text-espresso'} transition-colors`}
              >
                {cat.name.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="label text-gold text-[10px] mb-5">PRICE</p>
        <input
          type="range"
          min={1000}
          max={50000}
          step={500}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-espresso"
        />
        <div className="flex justify-between mt-2">
          <span className="label text-[9px] text-espresso/40">₹1,000</span>
          <span className="label text-[9px] text-espresso">{formatPrice(priceMax)}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="pt-20 min-h-screen">
        <div className="px-6 lg:px-12 py-16 max-w-screen-xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="label text-gold text-[10px] mb-4">
              {category ? CATEGORIES.find((c) => c.slug === category)?.name.toUpperCase() : 'ALL SAREES'}
            </p>
            <h1 className="editorial-heading text-espresso text-5xl lg:text-6xl">
              {category ? CATEGORIES.find((c) => c.slug === category)?.name : 'Shop All'}
            </h1>
          </motion.div>
        </div>

        <div className="px-6 lg:px-12 max-w-screen-xl mx-auto pb-24">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            <aside className="hidden lg:block w-52 flex-shrink-0">
              <FilterPanel />
            </aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-blush/40">
                <p className="label text-espresso/40 text-[10px]">{filtered.length} STYLES</p>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="lg:hidden label text-[10px] text-espresso flex items-center gap-2"
                  >
                    FILTER +
                  </button>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-transparent border-none label text-[10px] text-espresso outline-none cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-24">
                  <p className="editorial-heading text-espresso/30 text-4xl mb-4">Nothing here<br /><em>just yet.</em></p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-espresso/40 z-[200] lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFilterOpen(false)}
              />
              <motion.div
                className="fixed bottom-0 left-0 right-0 bg-ivory z-[201] p-8 lg:hidden"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between mb-8">
                  <p className="label text-espresso">FILTER</p>
                  <button onClick={() => setFilterOpen(false)} className="label text-espresso/40 text-[10px]">DONE</button>
                </div>
                <FilterPanel />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="label text-espresso/30 text-[10px]">LOADING...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
