'use client';

const daily = [
  { day: 'Mon', sales: 12400 },
  { day: 'Tue', sales: 8900 },
  { day: 'Wed', sales: 21300 },
  { day: 'Thu', sales: 15600 },
  { day: 'Fri', sales: 28100 },
  { day: 'Sat', sales: 35400 },
  { day: 'Sun', sales: 19800 },
];

const topProducts = [
  { name: 'Ruby Zari Kanchipuram Silk', category: 'Kanchipuram', sales: 24, revenue: '₹3,59,976' },
  { name: 'Bridal Crimson Patola', category: 'Bridal', sales: 8, revenue: '₹2,79,992' },
  { name: 'Midnight Banarasi Silk', category: 'Silk', sales: 18, revenue: '₹2,33,982' },
  { name: 'Gold Tissue Party Silk', category: 'Party Wear', sales: 22, revenue: '₹2,19,978' },
  { name: 'Ivory Temple Kanjivaram', category: 'Kanchipuram', sales: 9, revenue: '₹2,06,991' },
];

const topCategories = [
  { name: 'Kanchipuram', sales: 42, revenue: '₹7,23,958', pct: 35 },
  { name: 'Bridal', sales: 18, revenue: '₹5,39,982', pct: 26 },
  { name: 'Silk Sarees', sales: 36, revenue: '₹3,89,964', pct: 19 },
  { name: 'Party Wear', sales: 28, revenue: '₹2,23,972', pct: 11 },
  { name: 'Designer', sales: 15, revenue: '₹1,19,985', pct: 6 },
  { name: 'Cotton', sales: 24, revenue: '₹59,976', pct: 3 },
];

const maxSales = Math.max(...daily.map((d) => d.sales));

export default function AdminReports() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs tracking-widest text-gray-400 mb-1">ADMIN</p>
        <h1 className="text-2xl font-light text-espresso" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Reports</h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'MONTHLY SALES', value: '₹1,24,500', sub: 'September 2025' },
          { label: 'TOTAL ORDERS', value: '163', sub: 'This month' },
          { label: 'AVG ORDER VALUE', value: '₹7,638', sub: '↑ 8% vs last month' },
          { label: 'NEW CUSTOMERS', value: '28', sub: 'This month' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 p-5">
            <p className="text-[10px] tracking-widest text-gray-400 mb-3">{stat.label}</p>
            <p className="text-2xl font-light text-espresso mb-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{stat.value}</p>
            <p className="text-[10px] text-gray-400">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Daily sales chart */}
      <div className="bg-white border border-gray-100 p-6">
        <p className="text-xs tracking-widest text-gray-400 mb-6">DAILY SALES — THIS WEEK</p>
        <div className="flex items-end gap-3 h-40">
          {daily.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] text-gray-400">₹{(d.sales / 1000).toFixed(1)}k</span>
              <div
                className="w-full bg-espresso transition-all duration-500"
                style={{ height: `${(d.sales / maxSales) * 100}%` }}
              />
              <span className="text-[10px] text-gray-400 tracking-wider">{d.day.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top products */}
        <div className="bg-white border border-gray-100 p-6">
          <p className="text-xs tracking-widest text-gray-400 mb-5">TOP SELLING PRODUCTS</p>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-300 w-4">{i + 1}</span>
                  <div>
                    <p className="text-xs text-espresso">{p.name}</p>
                    <p className="text-[10px] text-gray-400">{p.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-espresso font-medium">{p.revenue}</p>
                  <p className="text-[10px] text-gray-400">{p.sales} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top categories */}
        <div className="bg-white border border-gray-100 p-6">
          <p className="text-xs tracking-widest text-gray-400 mb-5">PERFORMANCE BY CATEGORY</p>
          <div className="space-y-4">
            {topCategories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-xs text-espresso">{cat.name}</p>
                  <p className="text-xs text-espresso font-medium">{cat.revenue}</p>
                </div>
                <div className="w-full bg-gray-100 h-1.5">
                  <div className="h-full bg-espresso transition-all duration-700" style={{ width: `${cat.pct}%` }} />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{cat.pct}% of revenue · {cat.sales} orders</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
