'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === 'admin@sari.com' && password === 'admin123') {
      router.push('/admin');
    } else {
      setError('Invalid credentials.');
    }
  }

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center px-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.25em' }} className="text-4xl font-light text-ivory block mb-2">
            SĀRI
          </span>
          <p className="text-ivory/30 text-xs tracking-widest">ADMIN PANEL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-ivory/40 text-[10px] tracking-widest mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-ivory/20 text-ivory text-sm font-light py-2 outline-none focus:border-ivory/50 placeholder-ivory/20 transition-colors"
              placeholder="admin@sari.com"
              required
            />
          </div>
          <div>
            <label className="block text-ivory/40 text-[10px] tracking-widest mb-2">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-ivory/20 text-ivory text-sm font-light py-2 outline-none focus:border-ivory/50 placeholder-ivory/20 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" className="w-full bg-gold text-espresso py-4 text-[10px] tracking-widest hover:bg-gold/80 transition-colors mt-6">
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  );
}
