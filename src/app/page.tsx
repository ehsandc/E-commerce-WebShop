import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/types';

async function getFeaturedProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products?featured=true&limit=8`,
    { cache: 'no-store' }
  );
  return res.json();
}

async function getNewProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products?new=true&limit=4`,
    { cache: 'no-store' }
  );
  return res.json();
}

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    description: 'Latest tech & gadgets',
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    description: 'Trendy clothes & accessories',
  },
  {
    name: 'Home',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
    description: 'Decor & essentials',
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    description: 'Skincare & cosmetics',
  },
  {
    name: 'Toys',
    slug: 'toys',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',
    description: 'Fun for all ages',
  },
];

export default async function HomePage() {
  const featuredProducts: Product[] = await getFeaturedProducts();
  const newProducts: Product[] = await getNewProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Discover Amazing Products
              <span className="block text-primary">at Unbeatable Prices</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Shop the latest trends in electronics, fashion, home decor, beauty,
              and more. Free shipping on orders over $50.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/category/electronics">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="bg-destructive py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-center text-sm font-medium text-destructive-foreground">
            <Zap className="h-4 w-4" />
            <span>
              Flash Sale: Up to 40% off on selected electronics! Ends in 24 hours.
            </span>
            <Link
              href="/category/electronics"
              className="underline underline-offset-2"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Shop by Category</h2>
          <p className="mt-2 text-muted-foreground">
            Explore our wide range of products
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/40 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Products</h2>
              <p className="mt-2 text-muted-foreground">
                Hand-picked favorites just for you
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/category/electronics">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <p className="mt-2 text-muted-foreground">
              Check out our latest additions
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/search?new=true">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-y bg-primary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Get Exclusive Deals & Updates
          </h2>
          <p className="mb-8 text-primary-foreground/90">
            Subscribe to our newsletter and never miss a sale
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Subscribe Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
