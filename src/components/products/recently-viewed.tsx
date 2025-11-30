'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import type { Product } from '@/types';
import { useRecentlyViewedStore } from '@/store/recently-viewed';
import { Button } from '@/components/ui/button';
import productsData from '@/../../data/products.json';

const products = productsData as Product[];

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const productIds = useRecentlyViewedStore((state) => state.productIds);
  const prefersReducedMotion = useReducedMotion();

  const fadeIn = useMemo(
    () => ({
      hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: prefersReducedMotion ? 'linear' : 'easeOut',
        },
      },
    }),
    [prefersReducedMotion]
  );

  useEffect(() => {
    // Get products from IDs
    const filteredProducts = productIds
      .map((id) => products.find((p) => p.id === Number(id)))
      .filter((p): p is Product => p !== undefined)
      .slice(0, 4);

    setRecentProducts(filteredProducts);
  }, [productIds]);

  if (recentProducts.length === 0) {
    return (
      <section className="section-shell">
        <div className="container mx-auto px-4">
          <div className="glass-panel relative overflow-hidden rounded-3xl p-8 text-center">
            <div
              className="absolute inset-x-0 -top-32 h-40 bg-primary/10 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative mx-auto max-w-2xl space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">
                Start discovering products tailored for you
              </h2>
              <p className="text-balance text-muted-foreground">
                Explore our curated collections and we&apos;ll save your journey
                here so you can jump back in instantly.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/category/electronics">
                    Browse trending picks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/search">Search the catalog</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="section-shell"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4">
        <motion.div className="mb-6 sm:mb-8" variants={fadeIn}>
          <h2 className="text-3xl font-semibold">Recently viewed</h2>
          <p className="mt-2 text-muted-foreground">
            Pick up where you left off or refresh recommendations.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
              },
            },
          }}
        >
          {recentProducts.map((product) => (
            <motion.div key={product.id} variants={fadeIn}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
