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
        className="section-shell-hero hero-pattern relative overflow-hidden"
      >
        <div
          className="hero-surface absolute inset-0 -z-10"
          aria-hidden="true"
        />
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] md:items-center md:gap-12">
          <motion.div
            className="space-y-5"
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur"
              variants={fadeIn}
            >
              <Zap className="h-3.5 w-3.5" />
              New drops every Friday
            </motion.span>

            <motion.h1
              className="text-balance text-[2.4rem] font-bold leading-[1.05] tracking-tight sm:text-[2.9rem] lg:text-[3.4rem]"
              variants={fadeInUp}
            >
              Discover what makes shopping
              <br className="hidden sm:block" />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-primary/70 to-primary/50 bg-clip-text text-transparent">
                  remarkable
                </span>
                <span
                  className="absolute -inset-x-1 -bottom-1 h-[10px] rounded bg-primary/15 blur-sm"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            <motion.p
              className="max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base"
              variants={fadeInUp}
            >
              Curated collections, limited-time exclusives & concierge support
              for modern shoppers. Free shipping over $50 and carbon-neutral
              delivery on every order.
            </motion.p>

            <motion.div
              className="flex flex-col gap-2.5 sm:flex-row"
              variants={fadeInUp}
            >
              <Button size="lg" className="h-11" asChild>
                <Link href="/category/electronics">
                  Shop the Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11" asChild>
                <Link href="/about">Learn how we curate</Link>
              </Button>
            </motion.div>

            {/* Slim benefits bar */}
            <motion.ul
              variants={fadeInUp}
              aria-label="Store benefits"
              className="horizontal-scroll scrollbar-hide gap-2 pt-1 sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:pt-1"
            >
              {[
                { label: 'Live concierge 7d', icon: Sparkles },
                { label: 'Carbon-neutral', icon: Plane },
                { label: '30d price match', icon: ShieldCheck },
                { label: 'Flexible payments', icon: BadgeCheck },
              ].map(({ label, icon: Icon }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/10 bg-white/60 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur dark:bg-slate-900/60"
                >
                  <Icon
                    className="h-3.5 w-3.5 text-primary"
                    aria-hidden="true"
                  />
                  <span>{label}</span>
                </li>
              ))}
            </motion.ul>

            <motion.dl
              className="grid gap-3 rounded-2xl border border-primary/10 bg-white/60 p-4 text-sm shadow-sm backdrop-blur dark:bg-slate-900/60 sm:grid-cols-3"
              variants={fadeInUp}
            >
              {[
                {
                  label: 'Verified brands',
                  value: '80+',
                  icon: BadgeCheck,
                },
                {
                  label: 'Avg. delivery time',
                  value: '2.5 days',
                  icon: Plane,
                },
                {
                  label: 'Customer satisfaction',
                  value: '4.9/5',
                  icon: ShieldCheck,
                },
              ].map(({ label, value, icon: Icon }) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-2.5"
                  variants={fadeInUp}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      {label}
                    </dt>
                    <dd className="text-base font-semibold text-foreground">
                      {value}
                    </dd>
                  </div>
                </motion.div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="hero-mosaic relative grid grid-cols-2 gap-2 rounded-[var(--token-radius-xl)]"
            aria-label="Featured preview mosaic"
          >
            {(featuredProducts.slice(0, 4).length
              ? featuredProducts.slice(0, 4)
              : [
                  {
                    id: 'placeholder-1',
                    name: 'Essentials Pack',
                    image:
                      'https://images.unsplash.com/photo-1518081461904-9ac6e800c4f0?w=600',
                    price: 0,
                  },
                  {
                    id: 'placeholder-2',
                    name: 'Workspace Upgrade',
                    image:
                      'https://images.unsplash.com/photo-1559163499-3b7f166bd3f0?w=600',
                    price: 0,
                  },
                  {
                    id: 'placeholder-3',
                    name: 'Comfort Wear',
                    image:
                      'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=600',
                    price: 0,
                  },
                  {
                    id: 'placeholder-4',
                    name: 'Smart Living',
                    image:
                      'https://images.unsplash.com/photo-1556909210-778beb1a4338?w=600',
                    price: 0,
                  },
                ]
            ).map((p, i) => (
              <div
                key={p.id}
                className={`group relative aspect-square overflow-hidden rounded-xl border border-primary/10 bg-white/40 dark:bg-slate-900/40 ${i === 0 ? 'col-span-1 row-span-1' : ''}`}
              >
                <Image
                  src={(p as any).image}
                  alt={(p as any).name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/0 to-black/30 opacity-40 transition group-hover:opacity-50" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-medium text-white/90">
                  <span className="max-w-[60%] truncate">
                    {(p as any).name}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            ))}
          </motion.div>
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
