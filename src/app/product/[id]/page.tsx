import { ProductDetailClient } from '@/components/product/product-detail-client';
import type { Metadata } from 'next';

async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products/${id}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getProduct(id);
  if (!data) return { title: 'Product Not Found' };

  const { product } = data;
  const currentPrice = product.salePrice || product.price;

  return {
    title: `${product.title} - ShopHub`,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProduct(id);

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return <ProductDetailClient product={data.product} related={data.related} />;
}
