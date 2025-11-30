import type { Product } from '@/types';
import { getProducts } from '@/lib/db/products';
import { HomePageContent } from '@/components/home/home-page-content';

async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ rating: 4.5, sort: 'rating', limit: 8 });
}

async function getNewProducts(): Promise<Product[]> {
  return getProducts({ isNew: true, sort: 'newest', limit: 4 });
}

export default async function HomePage() {
  const [featuredProducts, newProducts] = await Promise.all([
    getFeaturedProducts(),
    getNewProducts(),
  ]);

  return (
    <HomePageContent
      featuredProducts={featuredProducts}
      newProducts={newProducts}
    />
  );
}
