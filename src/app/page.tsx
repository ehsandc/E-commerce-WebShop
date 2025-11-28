import Link from 'next/link';
import { ArrowRight, Zap, Monitor, Shirt, Home as HomeIcon, Sparkles, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { RecentlyViewed } from '@/components/products/recently-viewed';
import { Testimonials } from '@/components/home/testimonials';
import type { Product } from '@/types';
import productsData from '@/../../data/products.json';

const products = productsData as Product[];

async function getFeaturedProducts() {
  // Get featured products (high rated items)
  return products.filter(p => p.rating >= 4.5).slice(0, 8);
}

async function getNewProducts() {
  // Get newest products (marked as new)
  return products.filter(p => p.isNew).slice(0, 4);
}

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    description: 'Latest tech & gadgets',
    icon: Monitor,
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    description: 'Trendy clothes & accessories',
    icon: Shirt,
  },
  {
    name: 'Home',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
    description: 'Decor & essentials',
    icon: HomeIcon,
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    description: 'Skincare & cosmetics',
    icon: Sparkles,
  },
  {
    name: 'Toys',
    slug: 'toys',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400',
    description: 'Fun for all ages',
    icon: Gamepad2,
  },
];

export default async function HomePage() {
  const featuredProducts: Product[] = await getFeaturedProducts();
  const newProducts: Product[] = await getNewProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 py-10 sm:py-14 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Discover Amazing Products
              <span className="block text-primary mt-2">at Unbeatable Prices</span>
            </h1>
            <p className="mb-5 sm:mb-6 text-base sm:text-lg text-muted-foreground px-4">
              Shop the latest trends in electronics, fashion, home decor, beauty,
              and more. Free shipping on orders over $50.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row px-4">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/category/electronics">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="bg-destructive py-2 sm:py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 text-center text-xs sm:text-sm font-medium text-destructive-foreground">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>
                Flash Sale: Up to 40% off on electronics!
              </span>
            </div>
            <Link
              href="/category/electronics"
              className="underline underline-offset-2 whitespace-nowrap"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-5 sm:py-6 md:py-8">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Shop by Category</h2>
          <p className="mt-1.5 sm:mt-2 text-sm sm:text-base text-muted-foreground">
            Explore our wide range of products
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:shadow-lg active:scale-95"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <h3 className="text-sm sm:text-base font-semibold">{category.name}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted/40 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
                Hand-picked favorites just for you
              </p>
            </div>
            <Button variant="outline" size="sm" className="sm:size-default" asChild>
              <Link href="/category/electronics">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">New Arrivals</h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground">
              Check out our latest additions
            </p>
          </div>
          <Button variant="outline" size="sm" className="sm:size-default" asChild>
            <Link href="/search?new=true">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Newsletter CTA */}
      <section className="border-y bg-primary py-10 sm:py-12 md:py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold">
            Get Exclusive Deals & Updates
          </h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base text-primary-foreground/90">
            Subscribe to our newsletter and never miss a sale
          </p>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
            <Link href="/contact">Subscribe Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
