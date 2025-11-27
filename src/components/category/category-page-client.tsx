'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/products/product-card';
import { ProductGridSkeleton } from '@/components/products/product-skeleton';
import type { Product } from '@/types';

interface CategoryPageClientProps {
  slug: string;
}

export function CategoryPageClient({ slug }: CategoryPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    inStock: searchParams.get('inStock') === 'true',
    sort: searchParams.get('sort') || 'popularity',
  });

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const params = new URLSearchParams();
      params.set('category', slug);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      if (filters.rating) params.set('rating', filters.rating);
      if (filters.inStock) params.set('inStock', 'true');
      if (filters.sort) params.set('sort', filters.sort);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, [slug, filters]);

  const updateFilters = (key: string, value: string | boolean) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, String(value));
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      rating: '',
      inStock: false,
      sort: 'popularity',
    });
    router.push(`/category/${slug}`, { scroll: false });
  };

  const categoryNames: Record<string, string> = {
    electronics: 'Electronics',
    fashion: 'Fashion',
    home: 'Home & Living',
    beauty: 'Beauty',
    toys: 'Toys & Games',
  };

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <div className="mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">{categoryNames[slug] || slug}</h1>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
          {products.length} products found
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-4">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </div>

        {/* Filters Sidebar */}
        <aside className={`space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Filters</h3>
            <Separator />
          </div>

          {/* Price Range */}
          <div className="space-y-2 sm:space-y-3">
            <Label className="text-sm">Price Range</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                className="h-9 text-sm"
                value={filters.minPrice}
                onChange={(e) => updateFilters('minPrice', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                className="h-9 text-sm"
                value={filters.maxPrice}
                onChange={(e) => updateFilters('maxPrice', e.target.value)}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-2 sm:space-y-3">
            <Label className="text-sm">Minimum Rating</Label>
            <Select
              value={filters.rating}
              onValueChange={(value) => updateFilters('rating', value)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Any rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any rating</SelectItem>
                <SelectItem value="4">4+ stars</SelectItem>
                <SelectItem value="4.5">4.5+ stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="inStock"
              checked={filters.inStock}
              onChange={(e) => updateFilters('inStock', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <Label htmlFor="inStock" className="text-sm">In stock only</Label>
          </div>

          <Button variant="outline" className="w-full h-9 text-sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </aside>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Sort */}
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing {products.length} products
            </p>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Label htmlFor="sort" className="text-xs sm:text-sm whitespace-nowrap">Sort by:</Label>
              <Select
                value={filters.sort}
                onValueChange={(value) => updateFilters('sort', value)}
              >
                <SelectTrigger id="sort" className="h-9 w-full sm:w-[180px] text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price_asc">Price: Low to High</SelectItem>
                  <SelectItem value="price_desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <ProductGridSkeleton />
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-base sm:text-lg font-medium">No products found</p>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                Try adjusting your filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
