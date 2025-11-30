'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

export function AnalyticsProvider() {
  const pathname = usePathname();
  const search = useSearchParams();
  const firstLoad = useRef(true);

  useEffect(() => {
    // Fire a page_view event on route changes (ignore first hydration if GA already tracked initial config)
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }
    track('page_view', { path: pathname, search: search?.toString() || '' });
  }, [pathname, search]);

  return null;
}
