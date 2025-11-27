'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { ProductGridSkeleton } from '@/components/products/product-skeleton';
import type { Product } from '@/types';

export default function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <SearchIcon className="h-8 w-8 text-muted-foreground" />
        <div>
          <h1 className="text-3xl font-bold">Search Results</h1>
          {query && (
            <p className="mt-1 text-muted-foreground">
              Results for &quot;{query}&quot;
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : !query ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium">Enter a search query</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Use the search bar above to find products
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium">No products found</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm text-muted-foreground">
            Found {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
