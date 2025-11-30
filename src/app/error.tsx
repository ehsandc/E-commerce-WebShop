'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Basic logging; swap with Sentry or other service.
    // eslint-disable-next-line no-console
    console.error('[app-error]', error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-background text-foreground">
        <main className="mx-auto flex max-w-lg flex-col items-center justify-center gap-6 py-20 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground">
            An unexpected error occurred. You can retry or return home.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Go home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
