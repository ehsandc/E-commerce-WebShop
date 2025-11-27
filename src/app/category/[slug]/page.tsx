import { CategoryPageClient } from '@/components/category/category-page-client';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categoryNames: Record<string, string> = {
    electronics: 'Electronics',
    fashion: 'Fashion',
    home: 'Home & Living',
    beauty: 'Beauty',
    toys: 'Toys & Games',
  };

  const name = categoryNames[params.slug] || params.slug;

  return {
    title: `${name} - ShopHub`,
    description: `Browse our collection of ${name.toLowerCase()} products.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryPageClient slug={params.slug} />;
}
