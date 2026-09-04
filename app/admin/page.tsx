'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PRODUCTS } from '@/lib/data';

const now = new Date();
const hour = now.getHours();
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

const stats = [
  { label: 'TOTAL SALES', value: '₹1,24,500', delta: '+12%', color: 'text-green-600' },
  { label: 'ORDERS', value: '126', delta: '+8 today', color: 'text-blue-600' },
  { label: 'CUSTOMERS', value: '48', delta: '+3 new', color: 'text-purple-600' },
  { label: 'LOW STOCK', value: `${PRODUCTS.filter((p) => p.stock <= 3).length}`, delta: 'items', color: 'text-red-500' },
];

const recentOrders = [
  { id: '#SARI1024', customer: 'Priya Sharma', product: 'Ruby Zari Kanchipuram', total: '₹14,999', status: 'Delivered', date: '28 Aug' },
  { id: '#SARI1025', customer: 'Ananya Reddy', product: 'Midnight Banarasi Silk', total: '₹12,999', status: 'Shipped', date: '01 Sep' },
  { id: '#SARI1026', customer: 'Meera Nair', product: 'Bridal Crimson Patola', total: '₹34,999', status: 'Confirmed', date: '03 Sep' },
  { id: '#SARI1027', customer: 'Kavya Iyer', product: 'Blush Organza Designer', total: '₹6,999', status: 'Pending', date: '04 Sep' },
];

const statusColor: Record<string, string> = {
  Delivered: 'bg-green-50 text-green-700',
  Shipped: 'bg-blue-50 text-blue-700',
  Confirmed: 'bg-gold/10 text-amber-700',
  Pending: 'bg-gray-100 text-gray-600',
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-gray-400 text-xs tracking-widest mb-1">{new Date().toDateString().toUpperCase()}</p>
        <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {greeting}, Admin.
        </h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-white p-6 border border-gray-100"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <p className="text-xs tracking-widest text-gray-400 mb-3">{stat.label}</p>
            <p className="text-3xl font-light text-espresso mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
              {stat.value}
            </p>
            <p className={`text-xs ${stat.color}`}>{stat.delta}</p>
          </motion.div>
        ))}
      </div>

      {/* Sales chart placeholder */}
      <div className="bg-white border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs tracking-widest text-gray-400">SALES — LAST 7 DAYS</p>
          <p className="text-xs text-gray-300">Chart coming with DB connection</p>
        </div>
        <div className="flex items-end gap-2 h-32">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-espresso/80 rounded-none" style={{ height: `${h}%` }} />
              <span className="text-[9px] text-gray-300 tracking-wider">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <p className="text-xs tracking-widest text-gray-400">RECENT ORDERS</p>
          <Link href="/admin/orders" className="text-xs text-espresso/50 hover:text-espresso tracking-wide">VIEW ALL →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal">ORDER</th>
                <th className="px-6 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal">CUSTOMER</th>
                <th className="px-6 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal hidden md:table-cell">PRODUCT</th>
                <th className="px-6 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal">TOTAL</th>
                <th className="px-6 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs text-espresso font-medium">{order.id}</td>
                  <td className="px-6 py-4 text-xs text-gray-600">{order.customer}</td>
                  <td className="px-6 py-4 text-xs text-gray-500 hidden md:table-cell">{order.product}</td>
                  <td className="px-6 py-4 text-xs text-espresso font-medium">{order.total}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] tracking-wide px-2 py-1 ${statusColor[order.status] || 'bg-gray-100 text-gray-500'}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low stock */}
      <div className="bg-white border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100">
          <p className="text-xs tracking-widest text-gray-400">LOW STOCK ALERT</p>
        </div>
        <div className="p-6 space-y-3">
          {PRODUCTS.filter((p) => p.stock <= 3).map((p) => (
            <div key={p.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm text-espresso font-light" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{p.name}</p>
                <p className="text-[10px] text-gray-400">{p.category}</p>
              </div>
              <span className="text-[10px] tracking-wide text-red-500 bg-red-50 px-2 py-1">
                {p.stock === 0 ? 'SOLD OUT' : `${p.stock} LEFT`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
