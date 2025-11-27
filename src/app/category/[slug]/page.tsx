import { CategoryPageClient } from '@/components/category/category-page-client';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  const categoryNames: Record<string, string> = {
    electronics: 'Electronics',
    fashion: 'Fashion',
    home: 'Home & Living',
    beauty: 'Beauty',
    toys: 'Toys & Games',
  };

  const name = categoryNames[slug] || slug;

  return {
    title: `${name} - ShopHub`,
    description: `Browse our collection of ${name.toLowerCase()} products.`,
  };
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  return <CategoryPageClient slug={slug} />;
}
