'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/data';

type Step = 'address' | 'order' | 'payment' | 'confirmed';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>('address');
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
  });

  const orderTotal = total() - discount;

  function handleApplyCoupon() {
    if (coupon.toUpperCase() === 'SARI10') {
      setDiscount(Math.floor(total() * 0.1));
      setCouponApplied(true);
    }
  }

  function handlePlaceOrder() {
    clearCart();
    setStep('confirmed');
  }

  if (step === 'confirmed') {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-16 border border-espresso rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="label text-gold text-[10px] mb-4">ORDER CONFIRMED</p>
          <h1 className="editorial-heading text-espresso text-5xl mb-6">Thank you,<br /><em>beautifully.</em></h1>
          <p className="text-espresso/60 text-sm font-light leading-relaxed mb-10">
            Your order has been placed. You&apos;ll receive a confirmation email shortly.
            Your saree is already being packed with love.
          </p>
          <Link href="/shop" className="label text-[10px] bg-espresso text-ivory px-8 py-4 hover:bg-burgundy transition-colors">
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12">
        {/* Progress */}
        <div className="flex items-center gap-6 mb-12">
          {(['address', 'order', 'payment'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] label transition-colors ${step === s ? 'bg-espresso text-ivory' : 'border border-blush text-espresso/30'}`}>
                {i + 1}
              </div>
              <span className={`label text-[10px] hidden sm:block ${step === s ? 'text-espresso' : 'text-espresso/30'}`}>
                {s.toUpperCase()}
              </span>
              {i < 2 && <div className="hidden sm:block w-8 h-px bg-blush" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {step === 'address' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="editorial-heading text-espresso text-3xl mb-8">Delivery Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'FULL NAME', type: 'text', colSpan: false },
                    { key: 'phone', label: 'PHONE', type: 'tel', colSpan: false },
                    { key: 'email', label: 'EMAIL', type: 'email', colSpan: true },
                    { key: 'address', label: 'ADDRESS', type: 'text', colSpan: true },
                    { key: 'city', label: 'CITY', type: 'text', colSpan: false },
                    { key: 'state', label: 'STATE', type: 'text', colSpan: false },
                    { key: 'pincode', label: 'PINCODE', type: 'text', colSpan: false },
                  ].map(({ key, label, type, colSpan }) => (
                    <div key={key} className={colSpan ? 'sm:col-span-2' : ''}>
                      <label className="label text-[9px] text-espresso/50 block mb-2">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border-b border-blush bg-transparent text-espresso text-sm font-light py-2 outline-none focus:border-espresso transition-colors placeholder-espresso/20"
                        required
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep('order')}
                  className="mt-8 bg-espresso text-ivory px-10 py-4 label text-[10px] hover:bg-burgundy transition-colors"
                >
                  CONTINUE TO ORDER SUMMARY →
                </button>
              </motion.div>
            )}

            {step === 'order' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="editorial-heading text-espresso text-3xl mb-8">Order Summary</h2>
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-20 object-cover" />
                      <div className="flex-1">
                        <h3 className="text-espresso text-sm font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{item.product.name}</h3>
                        <p className="label text-[9px] text-espresso/40">Qty: {item.quantity}</p>
                        <p className="text-espresso text-sm mt-1">{formatPrice((item.product.sale_price ?? item.product.price) * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon */}
                <div className="flex gap-3 mb-8">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="COUPON CODE"
                    className="flex-1 border-b border-blush bg-transparent label text-[10px] py-2 outline-none focus:border-espresso placeholder-espresso/30"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                    className="label text-[10px] text-espresso border border-espresso px-4 py-2 hover:bg-espresso hover:text-ivory transition-all disabled:opacity-40"
                  >
                    {couponApplied ? '✓ APPLIED' : 'APPLY'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="label text-[9px] text-burgundy mb-6">SARI10 applied — {formatPrice(discount)} off</p>
                )}

                <button
                  onClick={() => setStep('payment')}
                  className="bg-espresso text-ivory px-10 py-4 label text-[10px] hover:bg-burgundy transition-colors"
                >
                  PROCEED TO PAYMENT →
                </button>
              </motion.div>
            )}

            {step === 'payment' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="editorial-heading text-espresso text-3xl mb-8">Payment</h2>
                <div className="space-y-3 mb-8">
                  <div className="border border-espresso p-4 label text-[10px] text-espresso">
                    ONLINE PAYMENT (UPI / CARD / NET BANKING)
                    <p className="text-espresso/40 mt-1 normal-case font-light text-[10px]">Powered by Razorpay — coming soon</p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-espresso text-ivory py-4 label text-[10px] hover:bg-burgundy transition-colors"
                  >
                    PLACE ORDER — {formatPrice(orderTotal)}
                  </button>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'}?text=${encodeURIComponent(`Hi SĀRI! I'd like to place an order worth ${formatPrice(orderTotal)}. Name: ${form.name}, Phone: ${form.phone}, Address: ${form.address}, ${form.city}, ${form.state} ${form.pincode}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center border border-espresso text-espresso py-4 label text-[10px] hover:bg-espresso hover:text-ivory transition-all"
                  >
                    ORDER VIA WHATSAPP
                  </a>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order total sidebar */}
          <div className="bg-cream p-6 h-fit">
            <p className="label text-gold text-[10px] mb-6">YOUR BAG</p>
            <div className="space-y-3 mb-6 pb-6 border-b border-blush/40">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <span className="text-espresso text-sm font-light text-ellipsis overflow-hidden" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    {item.product.name} ×{item.quantity}
                  </span>
                  <span className="text-espresso text-sm ml-4 flex-shrink-0">
                    {formatPrice((item.product.sale_price ?? item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {couponApplied && (
                <div className="flex justify-between">
                  <span className="label text-[10px] text-burgundy">DISCOUNT</span>
                  <span className="label text-[10px] text-burgundy">−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-blush/40">
                <span className="label text-[10px] text-espresso">TOTAL</span>
                <span className="text-espresso font-medium">{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
