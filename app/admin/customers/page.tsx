'use client';
const CUSTOMERS = [
  { id: 1, name: 'Priya Sharma', email: 'priya@example.com', phone: '+91 98765 43210', orders: 3, total: '₹34,997', joined: '12 Jan 2025' },
  { id: 2, name: 'Ananya Reddy', email: 'ananya@example.com', phone: '+91 87654 32109', orders: 1, total: '₹12,999', joined: '03 Mar 2025' },
  { id: 3, name: 'Meera Nair', email: 'meera@example.com', phone: '+91 76543 21098', orders: 2, total: '₹41,998', joined: '22 May 2025' },
  { id: 4, name: 'Kavya Iyer', email: 'kavya@example.com', phone: '+91 65432 10987', orders: 1, total: '₹6,999', joined: '15 Aug 2025' },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs tracking-widest text-gray-400 mb-1">ADMIN</p>
        <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Customers</h1>
      </div>

      <div className="bg-white border border-gray-100">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {['CUSTOMER', 'EMAIL', 'PHONE', 'ORDERS', 'TOTAL SPENT', 'JOINED'].map((h) => (
                <th key={h} className="px-5 py-3 text-left text-[10px] tracking-widest text-gray-300 font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-4">
                  <div className="w-7 h-7 rounded-full bg-espresso/10 flex items-center justify-center text-xs text-espresso font-medium inline-flex mr-2">
                    {c.name[0]}
                  </div>
                  <span className="text-xs text-espresso">{c.name}</span>
                </td>
                <td className="px-5 py-4 text-xs text-gray-500">{c.email}</td>
                <td className="px-5 py-4 text-xs text-gray-500">{c.phone}</td>
                <td className="px-5 py-4 text-xs text-espresso font-medium text-center">{c.orders}</td>
                <td className="px-5 py-4 text-xs text-espresso font-medium">{c.total}</td>
                <td className="px-5 py-4 text-xs text-gray-400">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
