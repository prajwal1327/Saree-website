import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    // In Cloudflare deployment with D1:
    // const { env } = getRequestContext();
    // const user = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
    // if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    // Verify password hash...
    // Generate JWT or session token

    // Mock response for demo
    if (email === 'admin@sari.com' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: { id: 1, name: 'Admin', email, role: 'admin' },
        token: 'mock-jwt-token',
      });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
