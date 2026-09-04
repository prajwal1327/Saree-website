import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import BrandStatement from '@/components/BrandStatement';
import NewArrivals from '@/components/NewArrivals';
import EditorialBanner from '@/components/EditorialBanner';
import ShopByMood from '@/components/ShopByMood';
import BridalSection from '@/components/BridalSection';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SĀRI — Tradition, With Attitude',
  description: 'Luxury Indian sarees. Timeless craft, contemporary spirit. Shop Kanchipuram, Banarasi, Silk, Bridal and Designer sarees.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <BrandStatement />
      <NewArrivals />
      <EditorialBanner />
      <ShopByMood />
      <BridalSection />
      <Footer />
    </>
  );
}
