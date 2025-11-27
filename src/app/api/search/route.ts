import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/../../data/products.json';
import type { Product } from '@/types';

const products = productsData as Product[];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  const results = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return NextResponse.json(results);
}
