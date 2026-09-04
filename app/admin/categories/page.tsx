'use client';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/data';
import type { Category } from '@/lib/types';

export default function AdminCategories() {
  const [categories, setCategories] = useState(CATEGORIES);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState<Omit<Category, 'id'>>({ name: '', slug: '', image: '', description: '', display_order: 1, active: true });

  function openAdd() {
    setEditing(null);
    setForm({ name: '', slug: '', image: '', description: '', display_order: categories.length + 1, active: true });
    setShowForm(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: Category = {
      ...form,
      id: editing?.id ?? Date.now(),
      slug: form.name.toLowerCase().replace(/\s+/g, '-'),
    };
    if (editing) {
      setCategories((prev) => prev.map((c) => (c.id === editing.id ? data : c)));
    } else {
      setCategories((prev) => [...prev, data]);
    }
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-400 mb-1">ADMIN</p>
          <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Categories</h1>
        </div>
        <button onClick={openAdd} className="bg-espresso text-ivory text-xs tracking-wider px-5 py-2.5 hover:bg-burgundy transition-colors">
          + ADD CATEGORY
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-gray-100 overflow-hidden">
            <div className="relative aspect-video">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-espresso/30" />
              <div className="absolute bottom-3 left-3">
                <p className="text-ivory text-sm font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{cat.name}</p>
              </div>
              <div className="absolute top-3 right-3">
                <span className={`text-[9px] tracking-wide px-2 py-0.5 ${cat.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                  {cat.active ? 'ACTIVE' : 'HIDDEN'}
                </span>
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400">Order: {cat.display_order}</p>
                <p className="text-[10px] text-gray-300">/{cat.slug}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setEditing(cat); setForm({ ...cat }); setShowForm(true); }}
                  className="text-[10px] text-gray-400 hover:text-espresso tracking-wide"
                >EDIT</button>
                <button
                  onClick={() => setCategories((p) => p.filter((c) => c.id !== cat.id))}
                  className="text-[10px] text-gray-300 hover:text-red-500 tracking-wide"
                >DELETE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-espresso/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-8">
            <h2 className="text-xl font-light text-espresso mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {editing ? 'Edit Category' : 'Add Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { key: 'name', label: 'NAME', type: 'text', required: true },
                { key: 'image', label: 'IMAGE URL', type: 'text', required: true },
                { key: 'display_order', label: 'DISPLAY ORDER', type: 'number', required: true },
                { key: 'description', label: 'DESCRIPTION', type: 'text', required: false },
              ].map(({ key, label, type, required }) => (
                <div key={key}>
                  <label className="block text-[10px] tracking-widest text-gray-400 mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={(form as any)[key] ?? ''}
                    onChange={(e) => setForm({ ...form, [key]: type === 'number' ? Number(e.target.value) : e.target.value })}
                    required={required}
                    className="w-full border border-gray-200 px-3 py-2 text-sm text-espresso outline-none focus:border-espresso"
                  />
                </div>
              ))}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="accent-espresso" />
                <span className="text-xs text-gray-500">Active</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-espresso text-ivory py-2.5 text-xs tracking-widest hover:bg-burgundy transition-colors">SAVE</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 border border-gray-200 text-gray-400 text-xs hover:border-gray-400">CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
