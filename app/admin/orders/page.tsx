'use client';
import { useState } from 'react';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

const MOCK_ORDERS = [
  { id: '#SARI1024', customer: 'Priya Sharma', email: 'priya@example.com', date: '28 Aug 2025', total: '₹14,999', payment: 'Online', status: 'Delivered', items: [{ name: 'Ruby Zari Kanchipuram Silk', qty: 1, price: '₹14,999' }] },
  { id: '#SARI1025', customer: 'Ananya Reddy', email: 'ananya@example.com', date: '01 Sep 2025', total: '₹12,999', payment: 'Online', status: 'Shipped', items: [{ name: 'Midnight Banarasi Silk', qty: 1, price: '₹12,999' }] },
  { id: '#SARI1026', customer: 'Meera Nair', email: 'meera@example.com', date: '03 Sep 2025', total: '₹34,999', payment: 'WhatsApp', status: 'Confirmed', items: [{ name: 'Bridal Crimson Patola', qty: 1, price: '₹34,999' }] },
  { id: '#SARI1027', customer: 'Kavya Iyer', email: 'kavya@example.com', date: '04 Sep 2025', total: '₹6,999', payment: 'Online', status: 'Pending', items: [{ name: 'Blush Organza Designer', qty: 1, price: '₹6,999' }] },
];

const statusColor: Record<string, string> = {
  Pending: 'bg-gray-100 text-gray-600',
  Confirmed: 'bg-amber-50 text-amber-700',
  Processing: 'bg-blue-50 text-blue-700',
  Shipped: 'bg-indigo-50 text-indigo-700',
  'Out for Delivery': 'bg-purple-50 text-purple-700',
  Delivered: 'bg-green-50 text-green-700',
  Cancelled: 'bg-red-50 text-red-600',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [expanded, setExpanded] = useState<string | null>(null);

  function updateStatus(id: string, status: string) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-widest text-gray-400 mb-1">ADMIN</p>
        <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Orders</h1>
      </div>

      <div className="bg-white border border-gray-100">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {['ORDER', 'CUSTOMER', 'DATE', 'TOTAL', 'PAYMENT', 'STATUS', 'UPDATE'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                <tr
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                >
                  <td className="px-5 py-4 text-xs text-espresso font-medium">{order.id}</td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-espresso">{order.customer}</p>
                    <p className="text-[10px] text-gray-400">{order.email}</p>
                  </td>
                  <td className="px-5 py-4 text-xs text-gray-500">{order.date}</td>
                  <td className="px-5 py-4 text-xs text-espresso font-medium">{order.total}</td>
                  <td className="px-5 py-4 text-[10px] text-gray-400 tracking-wide">{order.payment.toUpperCase()}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[9px] tracking-wide px-2 py-1 ${statusColor[order.status]}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => { e.stopPropagation(); updateStatus(order.id, e.target.value); }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] border border-gray-200 px-2 py-1 outline-none text-gray-500 bg-white"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                {expanded === order.id && (
                  <tr key={`${order.id}-expanded`} className="bg-gray-50/50">
                    <td colSpan={7} className="px-5 py-4">
                      <p className="text-[10px] tracking-widest text-gray-400 mb-3">ORDER ITEMS</p>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs text-gray-600">
                          <span>{item.name} × {item.qty}</span>
                          <span>{item.price}</span>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
