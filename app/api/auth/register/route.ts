import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, phone } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // In Cloudflare deployment with D1:
    // const { env } = getRequestContext();
    // Hash password with Web Crypto API (available in Workers)
    // const encoder = new TextEncoder();
    // const data = encoder.encode(password);
    // const hash = await crypto.subtle.digest('SHA-256', data);
    // const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
    //
    // await env.DB.prepare('INSERT INTO users (name, email, phone, password_hash) VALUES (?, ?, ?, ?)')
    //   .bind(name, email, phone || null, hashHex).run();

    return NextResponse.json({ success: true, message: 'Account created' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
