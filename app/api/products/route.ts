import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const newArrival = searchParams.get('new');
    const slug = searchParams.get('slug');

    // In Cloudflare Pages deployment, use getRequestContext from @cloudflare/next-on-pages
    // For now, return demo data
    const { PRODUCTS, getProductBySlug, getProductsByCategory, getFeaturedProducts, getNewArrivals } = await import('@/lib/data');

    let data;
    if (slug) {
      data = getProductBySlug(slug);
      if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    } else if (category) {
      data = getProductsByCategory(category);
    } else if (featured === '1') {
      data = getFeaturedProducts();
    } else if (newArrival === '1') {
      data = getNewArrivals();
    } else {
      data = PRODUCTS.filter((p) => p.active);
    }

    return NextResponse.json({ data }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
