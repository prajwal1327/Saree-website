'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { label: 'Dashboard',  href: '/admin',            icon: '◈' },
  { label: 'Products',   href: '/admin/products',   icon: '◆' },
  { label: 'Categories', href: '/admin/categories', icon: '◇' },
  { label: 'Orders',     href: '/admin/orders',     icon: '◉' },
  { label: 'Customers',  href: '/admin/customers',  icon: '◎' },
  { label: 'Offers',     href: '/admin/offers',     icon: '◑' },
  { label: 'Banners',    href: '/admin/banners',    icon: '▣' },
  { label: 'Reports',    href: '/admin/reports',    icon: '▦' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  if (path === '/admin/login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-espresso/60 z-[300] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-espresso z-[301] flex flex-col transition-transform duration-300 lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-4 py-5 border-b border-ivory/10 flex items-center justify-between">
          <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.2em' }} className="text-xl font-light text-ivory">
            SĀRI
          </span>
          <button onClick={() => setMobileOpen(false)} className="text-ivory/40 hover:text-ivory text-xl leading-none">×</button>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 transition-colors ${active ? 'bg-ivory/10 text-ivory' : 'text-ivory/40 hover:text-ivory hover:bg-ivory/5'}`}
              >
                <span className="text-sm w-5 text-center flex-shrink-0">{item.icon}</span>
                <span className="text-xs tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-ivory/10">
          <Link href="/" className="flex items-center gap-3 text-ivory/30 hover:text-ivory/60 text-xs">
            <span>↗</span><span>View Site</span>
          </Link>
        </div>
      </aside>

      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col flex-shrink-0 bg-espresso transition-all duration-300 ${desktopCollapsed ? 'w-16' : 'w-56'}`}>
        <div className={`px-4 py-5 border-b border-ivory/10 flex items-center ${desktopCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!desktopCollapsed && (
            <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.2em' }} className="text-xl font-light text-ivory">
              SĀRI
            </span>
          )}
          <button onClick={() => setDesktopCollapsed(!desktopCollapsed)} className="text-ivory/40 hover:text-ivory text-xs p-1">
            {desktopCollapsed ? '▶' : '◀'}
          </button>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const active = path === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${active ? 'bg-ivory/10 text-ivory' : 'text-ivory/40 hover:text-ivory hover:bg-ivory/5'}`}
              >
                <span className="text-sm flex-shrink-0 w-5 text-center">{item.icon}</span>
                {!desktopCollapsed && <span className="text-xs tracking-wide">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-ivory/10">
          <Link href="/" className="flex items-center gap-3 text-ivory/30 hover:text-ivory/60 text-xs">
            <span className="w-5 text-center">↗</span>
            {!desktopCollapsed && <span>View Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
              aria-label="Open menu"
            >
              <span className="w-5 h-px bg-gray-400 block" />
              <span className="w-5 h-px bg-gray-400 block" />
              <span className="w-5 h-px bg-gray-400 block" />
            </button>
            <div className="text-xs text-gray-400 tracking-wide">ADMIN PANEL</div>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <span className="text-xs text-gray-400 hidden sm:block">Admin</span>
            <Link href="/admin/login" className="text-xs text-gray-400 hover:text-gray-600">Logout</Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
