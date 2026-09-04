import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

function generateOrderNumber(): string {
  return `SARI${Date.now().toString().slice(-6)}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, address, city, state, pincode, items, subtotal, coupon_code, discount, total, payment_method } = body;

    if (!name || !email || !phone || !address || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const order_number = generateOrderNumber();

    // In Cloudflare deployment, use D1:
    // const { env } = getRequestContext();
    // const result = await env.DB.prepare(
    //   `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, address_line, city, state, pincode, subtotal, coupon_code, discount, total, payment_method)
    //    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    // ).bind(order_number, name, email, phone, address, city, state, pincode, subtotal, coupon_code, discount, total, payment_method).run();

    return NextResponse.json({
      success: true,
      order_number,
      message: 'Order placed successfully',
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
