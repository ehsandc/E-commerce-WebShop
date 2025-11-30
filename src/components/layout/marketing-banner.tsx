'use client';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

export function MarketingBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed =
      typeof window !== 'undefined' &&
      localStorage.getItem('promoDismissed') === 'true';
    if (!dismissed) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="relative z-40 w-full bg-gradient-to-r from-primary/85 to-primary px-4 py-2 text-xs text-primary-foreground shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
        <p className="font-medium tracking-wide">
          Holiday Preview:{' '}
          <span className="underline underline-offset-2">15% off</span> select
          electronics. Use code <span className="font-semibold">PREVIEW15</span>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/search?promo=preview15"
            className="rounded bg-primary-foreground/15 px-2 py-1 font-semibold text-primary-foreground transition hover:bg-primary-foreground/25"
          >
            Shop now
          </Link>
          <button
            aria-label="Dismiss banner"
            onClick={() => {
              setOpen(false);
              try {
                localStorage.setItem('promoDismissed', 'true');
              } catch {}
            }}
            className="rounded p-1 transition hover:bg-primary-foreground/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
