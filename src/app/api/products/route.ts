import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/db/products';
import type { SortOption } from '@/types';

const responseCacheHeaders = {
  'Cache-Control':
    'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const sortParam = searchParams.get('sort');
  const sort = (sortParam as SortOption) ?? undefined;

  const limit = searchParams.get('limit');

  try {
    const products = await getProducts({
      category: searchParams.get('category') ?? undefined,
      minPrice: searchParams.get('minPrice')
        ? Number(searchParams.get('minPrice'))
        : undefined,
      maxPrice: searchParams.get('maxPrice')
        ? Number(searchParams.get('maxPrice'))
        : undefined,
      brands: searchParams.get('brands')?.split(',').filter(Boolean),
      rating: searchParams.get('rating')
        ? Number(searchParams.get('rating'))
        : undefined,
      inStock: searchParams.get('inStock') === 'true',
      featured: searchParams.get('featured') === 'true',
      isNew: searchParams.get('new') === 'true',
      sort,
      limit: limit ? Number(limit) : undefined,
    });

    return NextResponse.json(products, {
      headers: responseCacheHeaders,
    });
  } catch (error) {
    console.error('[api/products] failed to fetch products', error);
    return NextResponse.json(
      { error: 'Unable to fetch products at this time.' },
      { status: 500 }
    );
  }
}
