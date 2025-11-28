'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { useWishlistStore } from '@/store/wishlist';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';

export default function WishlistPage() {
  const { ids } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (ids.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await fetch('/api/products');
      const allProducts: Product[] = await res.json();
      const wishlistProducts = allProducts.filter((p) => ids.includes(p.id));
      setProducts(wishlistProducts);
      setLoading(false);
    }

    fetchProducts();
  }, [ids]);

  if (ids.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="relative mb-6">
            <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-16 w-16 text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <span className="text-2xl">💝</span>
            </div>
          </div>
          <h1 className="mb-3 text-2xl sm:text-3xl font-bold">Your Wishlist is Empty</h1>
          <p className="mb-6 text-sm sm:text-base text-muted-foreground">
            Save your favorite products for later. Click the heart icon on any product to add it to your wishlist!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Start Shopping
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link href="/category/electronics">Browse Electronics</Link>
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 w-full text-xs text-muted-foreground">
            <div className="text-center">
              <div className="font-semibold text-foreground">♥</div>
              <div>Save favorites</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">🔔</div>
              <div>Get notified</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">🛒</div>
              <div>Quick access</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} {products.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: ids.length }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
