import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, WebP or AVIF.' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 });
    }

    // In Cloudflare deployment with R2:
    // const { env } = getRequestContext();
    // const key = `products/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    // const arrayBuffer = await file.arrayBuffer();
    // await env.R2.put(key, arrayBuffer, { httpMetadata: { contentType: file.type } });
    // const url = `${process.env.R2_PUBLIC_URL}/${key}`;
    // return NextResponse.json({ success: true, url });

    // Mock response
    return NextResponse.json({
      success: true,
      url: `https://pub-xxx.r2.dev/products/${Date.now()}-${file.name}`,
      message: 'Connect R2 bucket to enable actual uploads',
    });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
