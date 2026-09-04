'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const MOCK_ORDERS = [
  { id: '#SARI1024', product: 'Kanchipuram Silk Saree', price: '₹7,999', status: 'DELIVERED', date: '28 Aug 2025' },
  { id: '#SARI1018', product: 'Midnight Banarasi Silk', price: '₹12,999', status: 'SHIPPED', date: '01 Sep 2025' },
  { id: '#SARI1009', product: 'Blush Organza Designer', price: '₹6,999', status: 'CONFIRMED', date: '04 Sep 2025' },
];

const STATUS_STEPS = ['ORDER PLACED', 'CONFIRMED', 'SHIPPED', 'OUT FOR DELIVERY', 'DELIVERED'];

type Tab = 'overview' | 'orders' | 'wishlist' | 'profile';

export default function AccountPage() {
  const [tab, setTab] = useState<Tab>('overview');
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="label text-gold text-[10px] mb-4">ACCOUNT</p>
          <h1 className="editorial-heading text-espresso text-5xl">My Account</h1>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-10 lg:gap-16">
          {/* Sidebar nav */}
          <aside className="lg:col-span-1">
            <nav className="space-y-1">
              {(['overview', 'orders', 'wishlist', 'profile'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`block w-full text-left label text-[10px] py-3 border-b border-blush/30 transition-colors ${tab === t ? 'text-espresso' : 'text-espresso/40 hover:text-espresso'}`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
              <button className="block w-full text-left label text-[10px] py-3 text-espresso/40 hover:text-burgundy transition-colors">
                LOGOUT
              </button>
            </nav>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="editorial-heading text-espresso text-3xl mb-8">Welcome back.</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                  {[
                    { label: 'TOTAL ORDERS', value: '3' },
                    { label: 'IN WISHLIST', value: '5' },
                    { label: 'LOYALTY POINTS', value: '1,240' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-cream p-5">
                      <p className="editorial-heading text-espresso text-3xl mb-1">{stat.value}</p>
                      <p className="label text-espresso/40 text-[9px]">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="label text-gold text-[10px] mb-4">RECENT ORDER</p>
                  <div className="flex items-center justify-between border-b border-blush/40 pb-4">
                    <div>
                      <p className="label text-espresso text-[10px]">{MOCK_ORDERS[0].id}</p>
                      <p className="text-espresso font-light text-sm mt-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{MOCK_ORDERS[0].product}</p>
                      <p className="text-espresso text-sm">{MOCK_ORDERS[0].price}</p>
                    </div>
                    <div className="text-right">
                      <p className="label text-[9px] text-gold mb-2">{MOCK_ORDERS[0].status}</p>
                      <button onClick={() => setTab('orders')} className="label text-[9px] text-espresso underline">VIEW ORDER</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="editorial-heading text-espresso text-3xl mb-8">My Orders</h2>
                {trackingOrder ? (
                  <div className="mb-8">
                    <button onClick={() => setTrackingOrder(null)} className="label text-[10px] text-espresso/40 hover:text-espresso mb-6 flex items-center gap-2">
                      ← BACK TO ORDERS
                    </button>
                    <p className="label text-gold text-[10px] mb-8">ORDER TIMELINE — {trackingOrder}</p>
                    <div className="space-y-0">
                      {STATUS_STEPS.map((s, i) => {
                        const completed = i <= 2; // mock: shipped
                        const active = i === 2;
                        return (
                          <div key={s} className="flex gap-4 pb-6 last:pb-0">
                            <div className="flex flex-col items-center">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${completed ? 'border-espresso bg-espresso' : 'border-blush'}`}>
                                {completed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>}
                              </div>
                              {i < STATUS_STEPS.length - 1 && (
                                <div className={`w-px flex-1 mt-1 ${completed ? 'bg-espresso' : 'bg-blush'}`} style={{ minHeight: 32 }} />
                              )}
                            </div>
                            <div className="pb-2">
                              <p className={`label text-[10px] ${active ? 'text-espresso' : completed ? 'text-espresso/60' : 'text-espresso/25'}`}>{s}</p>
                              {active && <p className="text-espresso/40 text-xs mt-1 font-light">In transit — arriving soon</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b border-blush/30 pb-5">
                        <div>
                          <p className="label text-espresso text-[10px] mb-1">{order.id} · {order.date}</p>
                          <h3 className="text-espresso font-light text-base" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{order.product}</h3>
                          <p className="text-espresso text-sm">{order.price}</p>
                        </div>
                        <div className="text-right">
                          <span className={`label text-[9px] inline-block px-2 py-1 mb-2 ${order.status === 'DELIVERED' ? 'bg-espresso/10 text-espresso' : 'bg-gold/10 text-gold'}`}>
                            {order.status}
                          </span>
                          <br />
                          <button onClick={() => setTrackingOrder(order.id)} className="label text-[9px] text-espresso/40 hover:text-espresso underline">
                            TRACK ORDER
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {tab === 'profile' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="editorial-heading text-espresso text-3xl mb-8">Profile</h2>
                <div className="grid sm:grid-cols-2 gap-6 max-w-lg">
                  {[
                    { label: 'FULL NAME', value: 'Priya Sharma' },
                    { label: 'EMAIL', value: 'priya@example.com' },
                    { label: 'PHONE', value: '+91 98765 43210' },
                  ].map((field) => (
                    <div key={field.label} className="sm:col-span-1">
                      <label className="label text-[9px] text-espresso/40 block mb-2">{field.label}</label>
                      <input
                        defaultValue={field.value}
                        className="w-full border-b border-blush bg-transparent text-espresso text-sm font-light py-2 outline-none focus:border-espresso transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-8 bg-espresso text-ivory px-8 py-3 label text-[10px] hover:bg-burgundy transition-colors">
                  SAVE CHANGES
                </button>
              </motion.div>
            )}

            {tab === 'wishlist' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="editorial-heading text-espresso text-3xl mb-8">Wishlist</h2>
                <Link href="/wishlist" className="label text-[10px] text-espresso border-b border-espresso pb-1 hover:text-burgundy hover:border-burgundy transition-colors">
                  VIEW YOUR WISHLIST →
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
