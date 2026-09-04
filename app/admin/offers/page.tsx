'use client';
import { useState } from 'react';
import type { Offer } from '@/lib/types';

const INIT: Offer[] = [
  { id: 1, code: 'SARI10', type: 'percentage', value: 10, min_order: 5000, start_date: '2025-09-01', end_date: '2025-09-30', usage_limit: 100, used_count: 12, active: true },
  { id: 2, code: 'BRIDAL500', type: 'fixed', value: 500, min_order: 20000, start_date: '2025-09-01', end_date: '2025-12-31', usage_limit: 50, used_count: 3, active: true },
];

const empty: Omit<Offer, 'id' | 'used_count'> = {
  code: '', type: 'percentage', value: 0, min_order: 0, start_date: '', end_date: '', usage_limit: 100, active: true,
};

export default function AdminOffers() {
  const [offers, setOffers] = useState(INIT);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<typeof empty>(empty);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOffers((prev) => [...prev, { ...form, id: Date.now(), used_count: 0 }]);
    setShowForm(false);
    setForm(empty);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-400 mb-1">ADMIN</p>
          <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Offers & Coupons</h1>
        </div>
        <button onClick={() => setShowForm(true)} className="bg-espresso text-ivory text-xs tracking-wider px-5 py-2.5 hover:bg-burgundy transition-colors">
          + ADD OFFER
        </button>
      </div>

      <div className="grid gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-white border border-gray-100 p-5 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-espresso tracking-widest">{offer.code}</span>
                <span className={`text-[9px] tracking-wide px-2 py-0.5 ${offer.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {offer.active ? 'ACTIVE' : 'INACTIVE'}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {offer.type === 'percentage' ? `${offer.value}% off` : `₹${offer.value} off`} · Min order ₹{offer.min_order.toLocaleString('en-IN')}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                {offer.start_date} → {offer.end_date} · Used {offer.used_count}/{offer.usage_limit}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setOffers((p) => p.map((o) => o.id === offer.id ? { ...o, active: !o.active } : o))}
                className="text-[10px] text-gray-400 hover:text-espresso tracking-wide"
              >
                {offer.active ? 'DISABLE' : 'ENABLE'}
              </button>
              <button
                onClick={() => setOffers((p) => p.filter((o) => o.id !== offer.id))}
                className="text-[10px] text-gray-300 hover:text-red-500 tracking-wide"
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-espresso/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-8">
            <h2 className="text-xl font-light text-espresso mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>New Offer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">COUPON CODE</label>
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required
                  className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">TYPE</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">VALUE</label>
                  <input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} required
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">MIN ORDER (₹)</label>
                  <input type="number" value={form.min_order} onChange={(e) => setForm({ ...form, min_order: Number(e.target.value) })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">USAGE LIMIT</label>
                  <input type="number" value={form.usage_limit} onChange={(e) => setForm({ ...form, usage_limit: Number(e.target.value) })}
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">START DATE</label>
                  <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} required
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso" />
                </div>
                <div>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">END DATE</label>
                  <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} required
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-espresso text-ivory py-2.5 text-xs tracking-widest hover:bg-burgundy transition-colors">CREATE OFFER</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 border border-gray-200 text-gray-400 text-xs hover:border-gray-400">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
