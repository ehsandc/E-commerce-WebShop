import { NextResponse } from 'next/server';
import { getProductById, getRelatedProducts } from '@/lib/db/products';

const responseCacheHeaders = {
  'Cache-Control':
    'public, max-age=120, s-maxage=300, stale-while-revalidate=600',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params;
  const id = Number(idString);

  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid product id' }, { status: 400 });
  }

  try {
    const product = await getProductById(id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const related = await getRelatedProducts(product, 4);

    return NextResponse.json(
      { product, related },
      { headers: responseCacheHeaders }
    );
  } catch (error) {
    console.error(`[api/products/${id}] failed to fetch product`, error);
    return NextResponse.json(
      { error: 'Unable to fetch product at this time.' },
      { status: 500 }
    );
  }
}
