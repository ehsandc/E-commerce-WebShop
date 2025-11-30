'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Monitor,
  Shirt,
  Home as HomeIcon,
  Sparkles,
  Gamepad2,
  ShieldCheck,
  Plane,
  BadgeCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/product-card';
import { RecentlyViewed } from '@/components/products/recently-viewed';
import { Testimonials } from '@/components/home/testimonials';
import type { Product } from '@/types';

const categories = [
  {
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
    description: 'Latest tech & smart devices',
    icon: Monitor,
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    description: 'Tailored looks for every mood',
    icon: Shirt,
  },
  {
    name: 'Home',
    slug: 'home',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800',
    description: 'Cozy essentials & decor',
    icon: HomeIcon,
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    description: 'Glow-boosting skincare & more',
    icon: Sparkles,
  },
  {
    name: 'Toys',
    slug: 'toys',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800',
    description: 'Joy for every age',
    icon: Gamepad2,
  },
];

type HomePageContentProps = {
  featuredProducts: Product[];
  newProducts: Product[];
};

const MotionSection = motion.section;

export function HomePageContent({
  featuredProducts,
  newProducts,
}: HomePageContentProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.65,
          ease: shouldReduceMotion ? 'linear' : 'easeOut',
        },
      },
    }),
    [shouldReduceMotion]
  );

  const fadeIn = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: shouldReduceMotion ? 'linear' : 'easeOut',
        },
      },
    }),
    [shouldReduceMotion]
  );

  const staggerChildren = useMemo(
    () => ({
      hidden: {},
      visible: {
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.12,
          delayChildren: shouldReduceMotion ? 0 : 0.1,
        },
      },
    }),
    [shouldReduceMotion]
  );

  return (
    <div className="flex flex-col">
      <MotionSection
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-12 sm:py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary"
              variants={fadeIn}
            >
              <Zap className="h-4 w-4" />
              New arrivals every week
            </motion.span>

            <motion.h1
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              variants={fadeInUp}
            >
              Discover Amazing Products
              <br />
              <span className="text-primary">For Every Lifestyle</span>
            </motion.h1>

            <motion.p
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
              variants={fadeInUp}
            >
              Shop our curated collection of electronics, fashion, home goods,
              and more. Free shipping on orders over $50.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
              variants={fadeInUp}
            >
              <Button size="lg" asChild>
                <Link href="/category/electronics">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/search">Browse All Products</Link>
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 grid gap-8 sm:grid-cols-3"
              variants={staggerChildren}
            >
              {[
                {
                  icon: ShieldCheck,
                  title: 'Secure Checkout',
                  description: 'Safe & encrypted',
                },
                {
                  icon: Plane,
                  title: 'Fast Delivery',
                  description: '2-3 day shipping',
                },
                {
                  icon: BadgeCheck,
                  title: 'Quality Guarantee',
                  description: '30-day returns',
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className="section-shell"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="mb-8 text-center" variants={fadeInUp}>
            <h2 className="text-3xl font-semibold">Shop by category</h2>
            <p className="mt-3 text-balance text-muted-foreground">
              Find curated stories, seasonal trends, and staples across our
              most-loved collections.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.article
                  key={category.slug}
                  variants={fadeInUp}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                  }}
                  whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
                  whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                  className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
                >
                  <Link
                    href={`/category/${category.slug}`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm">
                        <Icon
                          className="h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                        <Icon
                          className="h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                        {category.name}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Explore now
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection
        className="section-shell bg-muted/40"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-3xl font-semibold">Featured picks</h2>
              <p className="mt-2 text-muted-foreground">
                Hand-selected winners from our stylists and power users.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/category/electronics">
                View all electronics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={staggerChildren}
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </MotionSection>

      <MotionSection
        className="section-shell"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            variants={fadeInUp}
          >
            <div>
              <h2 className="text-3xl font-semibold">Fresh arrivals</h2>
              <p className="mt-2 text-muted-foreground">
                Just landed pieces you&apos;ll want before they sell out.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/search?new=true">
                Browse new in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerChildren}
          >
            {newProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </MotionSection>

      <Testimonials />
      <RecentlyViewed />
    </div>
  );
}
