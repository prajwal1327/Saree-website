'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES, formatPrice } from '@/lib/data';
import type { Product } from '@/lib/types';

const emptyProduct: Omit<Product, 'id'> = {
  name: '', slug: '', category_id: 1, category: '', category_slug: '', price: 0,
  description: '', fabric: '', colors: [], stock: 0, images: [], featured: false, new_arrival: false, active: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<typeof emptyProduct>(emptyProduct);
  const [imagesInput, setImagesInput] = useState('');
  const [colorsInput, setColorsInput] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditing(null);
    setForm(emptyProduct);
    setImagesInput('');
    setColorsInput('');
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({ ...p });
    setImagesInput(p.images.join('\n'));
    setColorsInput(p.colors.map((c) => `${c.name}:${c.hex}`).join('\n'));
    setShowForm(true);
  }

  function handleDelete(id: number) {
    if (confirm('Delete this product?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cat = CATEGORIES.find((c) => c.id === form.category_id);
    const parsed: Product = {
      ...form,
      id: editing?.id ?? Date.now(),
      category: cat?.name || '',
      category_slug: cat?.slug || '',
      slug: form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      images: imagesInput.split('\n').filter(Boolean),
      colors: colorsInput.split('\n').filter(Boolean).map((line) => {
        const [name, hex] = line.split(':');
        return { name: name?.trim() || '', hex: hex?.trim() || '#000000' };
      }),
    };
    if (editing) {
      setProducts((prev) => prev.map((p) => (p.id === editing.id ? parsed : p)));
    } else {
      setProducts((prev) => [...prev, parsed]);
    }
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-400 mb-1">ADMIN</p>
          <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Products</h1>
        </div>
        <button onClick={openAdd} className="bg-espresso text-ivory text-xs tracking-wider px-5 py-2.5 hover:bg-burgundy transition-colors">
          + ADD PRODUCT
        </button>
      </div>

      <div className="flex items-center gap-3 bg-white border border-gray-100 px-4 py-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 text-sm text-gray-600 outline-none"
        />
      </div>

      <div className="bg-white border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {['PRODUCT', 'CATEGORY', 'PRICE', 'STOCK', 'STATUS', ''].map((h) => (
                <th key={h} className="px-6 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-14 object-cover flex-shrink-0" />
                    <div>
                      <p className="text-xs text-espresso font-medium">{p.name}</p>
                      <p className="text-[10px] text-gray-400">{p.fabric}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{p.category}</td>
                <td className="px-6 py-4 text-xs text-espresso">
                  {p.sale_price ? (
                    <span>{formatPrice(p.sale_price)} <span className="line-through text-gray-300">{formatPrice(p.price)}</span></span>
                  ) : (
                    formatPrice(p.price)
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] tracking-wide px-2 py-1 ${p.stock === 0 ? 'bg-red-50 text-red-600' : p.stock <= 3 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-700'}`}>
                    {p.stock === 0 ? 'OUT' : p.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {p.featured && <span className="text-[9px] bg-gold/10 text-amber-600 px-1.5 py-0.5 tracking-wide">FEATURED</span>}
                    {p.new_arrival && <span className="text-[9px] bg-espresso/10 text-espresso px-1.5 py-0.5 tracking-wide">NEW</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(p)} className="text-[10px] text-gray-400 hover:text-espresso tracking-wide">EDIT</button>
                    <button onClick={() => handleDelete(p.id)} className="text-[10px] text-gray-300 hover:text-red-500 tracking-wide">DELETE</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product form modal */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              className="fixed inset-0 bg-espresso/50 z-[200]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[600px] bg-white z-[201] overflow-y-auto"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-lg font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  {editing ? 'Edit Product' : 'Add Product'}
                </h2>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">×</button>
              </div>

              <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
                {[
                  { key: 'name', label: 'Product Name', type: 'text', required: true },
                  { key: 'fabric', label: 'Fabric', type: 'text', required: true },
                  { key: 'price', label: 'Price (₹)', type: 'number', required: true },
                  { key: 'sale_price', label: 'Sale Price (₹) — optional', type: 'number', required: false },
                  { key: 'stock', label: 'Stock', type: 'number', required: true },
                ].map(({ key, label, type, required }) => (
                  <div key={key}>
                    <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">{label.toUpperCase()}</label>
                    <input
                      type={type}
                      value={(form as any)[key] ?? ''}
                      onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
                      required={required}
                      className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">CATEGORY</label>
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">DESCRIPTION</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">IMAGE URLS (one per line)</label>
                  <textarea
                    value={imagesInput}
                    onChange={(e) => setImagesInput(e.target.value)}
                    rows={3}
                    placeholder="https://..."
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-espresso transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">COLORS (Name:Hex, one per line)</label>
                  <textarea
                    value={colorsInput}
                    onChange={(e) => setColorsInput(e.target.value)}
                    rows={3}
                    placeholder="Ruby:#9B2335"
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-espresso transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  {[
                    { key: 'featured', label: 'Featured' },
                    { key: 'new_arrival', label: 'New Arrival' },
                    { key: 'active', label: 'Active' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={(form as any)[key] ?? false}
                        onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                        className="accent-espresso"
                      />
                      <span className="text-xs text-gray-500">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button type="submit" className="flex-1 bg-espresso text-ivory py-3 text-xs tracking-widest hover:bg-burgundy transition-colors">
                    {editing ? 'SAVE CHANGES' : 'ADD PRODUCT'}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-5 border border-gray-200 text-gray-400 text-xs tracking-wider hover:border-gray-400 transition-colors">
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
