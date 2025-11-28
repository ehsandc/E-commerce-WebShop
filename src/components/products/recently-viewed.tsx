'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/types';
import { useRecentlyViewedStore } from '@/store/recently-viewed';
import productsData from '@/../../data/products.json';

const products = productsData as Product[];

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const productIds = useRecentlyViewedStore((state) => state.productIds);

  useEffect(() => {
    // Get products from IDs
    const filteredProducts = productIds
      .map((id) => products.find((p) => p.id === id))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 4);
    
    setRecentProducts(filteredProducts);
  }, [productIds]);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold">Recently Viewed</h2>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
          Continue where you left off
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
