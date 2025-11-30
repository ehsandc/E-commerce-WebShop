import { NextRequest, NextResponse } from 'next/server';
import { searchProducts } from '@/lib/db/products';

const responseCacheHeaders = {
  'Cache-Control':
    'public, max-age=30, s-maxage=60, stale-while-revalidate=120',
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.trim() ?? '';

  if (!query) {
    return NextResponse.json([], { headers: responseCacheHeaders });
  }

  try {
    const results = await searchProducts(query);

    return NextResponse.json(results, { headers: responseCacheHeaders });
  } catch (error) {
    console.error('[api/search] failed to execute search', error);
    return NextResponse.json(
      { error: 'Unable to perform search at this time.' },
      { status: 500 }
    );
  }
}
