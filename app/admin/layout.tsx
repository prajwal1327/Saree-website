'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: '◈' },
  { label: 'Products', href: '/admin/products', icon: '◆' },
  { label: 'Categories', href: '/admin/categories', icon: '◇' },
  { label: 'Orders', href: '/admin/orders', icon: '◉' },
  { label: 'Customers', href: '/admin/customers', icon: '◎' },
  { label: 'Offers', href: '/admin/offers', icon: '◑' },
  { label: 'Banners', href: '/admin/banners', icon: '▣' },
  { label: 'Reports', href: '/admin/reports', icon: '▦' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (path === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} transition-all duration-300 bg-espresso flex flex-col flex-shrink-0`}>
        <div className="px-4 py-5 border-b border-ivory/10 flex items-center justify-between">
          {sidebarOpen && (
            <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.2em' }} className="text-xl font-light text-ivory">
              SĀRI
            </span>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-ivory/40 hover:text-ivory text-xs p-1">
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors rounded-none ${active ? 'bg-ivory/10 text-ivory' : 'text-ivory/40 hover:text-ivory hover:bg-ivory/5'}`}
              >
                <span className="text-sm flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-xs tracking-wide">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-ivory/10">
          <Link href="/" className={`flex items-center gap-3 text-ivory/30 hover:text-ivory/60 transition-colors text-xs`}>
            <span>↗</span>
            {sidebarOpen && <span>View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
          <div className="text-xs text-gray-400 tracking-wide">ADMIN PANEL</div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400">Admin</span>
            <Link href="/admin/login" className="text-xs text-gray-400 hover:text-gray-600">Logout</Link>
          </div>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
