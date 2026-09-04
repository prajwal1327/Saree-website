'use client';
import { useState } from 'react';
import type { Banner } from '@/lib/types';

const INIT: Banner[] = [
  { id: 1, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&q=80', heading: 'THE ART OF DRAPING', subtitle: 'Timeless Indian craft. A little more attitude.', cta_text: 'SHOP THE COLLECTION', cta_link: '/shop', active: true, display_order: 1 },
  { id: 2, image: 'https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=1920&q=80', heading: 'THE BRIDE DESERVES A LITTLE DRAMA', subtitle: 'Bridal sarees for the moments everyone remembers.', cta_text: 'EXPLORE BRIDAL', cta_link: '/shop?category=bridal', active: true, display_order: 2 },
];

const empty: Omit<Banner, 'id'> = {
  image: '', heading: '', subtitle: '', cta_text: '', cta_link: '', active: true, display_order: 1,
};

export default function AdminBanners() {
  const [banners, setBanners] = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      setBanners((p) => p.map((b) => (b.id === editing.id ? { ...form, id: editing.id } : b)));
    } else {
      setBanners((p) => [...p, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-400 mb-1">ADMIN</p>
          <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Banners</h1>
        </div>
        <button onClick={() => { setEditing(null); setForm(empty); setShowForm(true); }} className="bg-espresso text-ivory text-xs tracking-wider px-5 py-2.5 hover:bg-burgundy transition-colors">
          + ADD BANNER
        </button>
      </div>

      <div className="space-y-4">
        {banners.map((banner) => (
          <div key={banner.id} className="bg-white border border-gray-100 overflow-hidden flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 aspect-video sm:aspect-auto sm:h-28 flex-shrink-0">
              <img src={banner.image} alt={banner.heading} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-espresso/30" />
            </div>
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-espresso mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{banner.heading}</p>
                  <p className="text-xs text-gray-500 mb-1">{banner.subtitle}</p>
                  <p className="text-[10px] text-gray-400">{banner.cta_text} → {banner.cta_link}</p>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <span className={`text-[9px] tracking-wide px-2 py-0.5 ${banner.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {banner.active ? 'ACTIVE' : 'HIDDEN'}
                  </span>
                  <span className="text-[9px] text-gray-400">#{banner.display_order}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <button onClick={() => { setEditing(banner); setForm({ ...banner }); setShowForm(true); }} className="text-[10px] text-gray-400 hover:text-espresso tracking-wide">EDIT</button>
                <button onClick={() => setBanners((p) => p.map((b) => b.id === banner.id ? { ...b, active: !b.active } : b))} className="text-[10px] text-gray-400 hover:text-espresso tracking-wide">
                  {banner.active ? 'HIDE' : 'SHOW'}
                </button>
                <button onClick={() => setBanners((p) => p.filter((b) => b.id !== banner.id))} className="text-[10px] text-gray-300 hover:text-red-500 tracking-wide">DELETE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-espresso/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg p-8 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-light text-espresso mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {editing ? 'Edit Banner' : 'Add Banner'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'image', label: 'IMAGE URL' },
                { key: 'heading', label: 'HEADING' },
                { key: 'subtitle', label: 'SUBTITLE' },
                { key: 'cta_text', label: 'CTA TEXT' },
                { key: 'cta_link', label: 'CTA LINK' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">{label}</label>
                  <input value={(form as any)[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} required
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">DISPLAY ORDER</label>
                <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: Number(e.target.value) })}
                  className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-espresso" />
                <span className="text-xs text-gray-500">Active</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-espresso text-ivory py-2.5 text-xs tracking-widest hover:bg-burgundy transition-colors">SAVE</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 border border-gray-200 text-gray-400 text-xs">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
