import { NextResponse } from 'next/server';
import productsData from '@/../../data/products.json';
import type { Product } from '@/types';

const products = productsData as Product[];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = parseInt(idString);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Get related products from the same category
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return NextResponse.json({ product, related });
}
