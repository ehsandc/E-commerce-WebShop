import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/../../data/products.json';
import type { Product, FilterOptions, SortOption } from '@/types';

const products = productsData as Product[];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const brands = searchParams.get('brands')?.split(',');
  const rating = searchParams.get('rating');
  const inStock = searchParams.get('inStock');
  const sort = searchParams.get('sort') as SortOption | null;
  const limit = searchParams.get('limit');
  const featured = searchParams.get('featured');
  const isNew = searchParams.get('new');

  let filtered = [...products];

  // Apply filters
  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (minPrice) {
    filtered = filtered.filter((p) => {
      const price = p.salePrice || p.price;
      return price >= parseFloat(minPrice);
    });
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => {
      const price = p.salePrice || p.price;
      return price <= parseFloat(maxPrice);
    });
  }

  if (brands && brands.length > 0) {
    filtered = filtered.filter((p) => brands.includes(p.brand));
  }

  if (rating) {
    filtered = filtered.filter((p) => p.rating >= parseFloat(rating));
  }

  if (inStock === 'true') {
    filtered = filtered.filter((p) => p.stock > 0);
  }

  if (featured === 'true') {
    filtered = filtered.filter((p) => p.isFeatured);
  }

  if (isNew === 'true') {
    filtered = filtered.filter((p) => p.isNew);
  }

  // Apply sorting
  if (sort) {
    switch (sort) {
      case 'price_asc':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        filtered.sort((a, b) => {
          const priceA = a.salePrice || a.price;
          const priceB = b.salePrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
  }

  // Apply limit
  if (limit) {
    filtered = filtered.slice(0, parseInt(limit));
  }

  return NextResponse.json(filtered);
}
