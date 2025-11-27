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
        <div className="flex flex-col items-center justify-center text-center">
          <Heart className="mb-4 h-24 w-24 text-muted-foreground" />
          <h1 className="mb-2 text-3xl font-bold">Your Wishlist is Empty</h1>
          <p className="mb-6 text-muted-foreground">
            Save your favorite products to your wishlist
          </p>
          <Button asChild size="lg">
            <Link href="/">Start Shopping</Link>
          </Button>
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
