import type { MetadataRoute } from 'next';
import { PRODUCTS, CATEGORIES } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://sari.pages.dev';

  const productPages = PRODUCTS.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = CATEGORIES.map((c) => ({
    url: `${base}/shop?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/wishlist`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/account`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...categoryPages,
    ...productPages,
  ];
}
