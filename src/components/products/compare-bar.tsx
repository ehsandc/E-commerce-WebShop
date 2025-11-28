'use client';

import { Scale, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useCompareStore } from '@/store/compare';

export function CompareBar() {
  const { productIds, count, removeProduct, clear } = useCompareStore();

  if (count() === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm rounded-lg border bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Compare Products</h3>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clear}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-3 text-sm text-muted-foreground">
          {count()} of 3 products selected
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1" disabled={count() < 2}>
            <Link href={`/compare?ids=${productIds.join(',')}`}>
              Compare Now
            </Link>
          </Button>
        </div>

        {count() < 2 && (
          <p className="mt-2 text-xs text-muted-foreground text-center">
            Add at least 2 products to compare
          </p>
        )}
      </div>
    </div>
  );
}
