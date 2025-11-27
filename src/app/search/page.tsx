'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { ProductGridSkeleton } from '@/components/products/product-skeleton';
import type { Product } from '@/types';

export default function SearchPage() {
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        {query && (
          <p className="mt-2 text-muted-foreground">
            Showing results for "{query}" ({products.length} found)
          </p>
        )}
      </div>

      {loading ? (
        <ProductGridSkeleton />
      ) : !query ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchIcon className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold">Start Searching</h2>
          <p className="text-muted-foreground">
            Use the search bar above to find products
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <SearchIcon className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-semibold">No Results Found</h2>
          <p className="text-muted-foreground">
            Try adjusting your search terms or browse our categories
          </p>
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
