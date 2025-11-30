import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { BackToTop } from '@/components/ui/back-to-top';
import { LiveChatWidget } from '@/components/ui/live-chat-widget';
import { CompareBar } from '@/components/products/compare-bar';
import { Header } from '@/components/layout/header';
import { MarketingBanner } from '@/components/layout/marketing-banner';
import { Footer } from '@/components/layout/footer';
import { AnalyticsProvider } from '@/components/analytics-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce Demo - Your Online Shopping Destination',
  description:
    'Discover amazing products across electronics, fashion, home, beauty, and toys. Shop with confidence with our curated selection and great deals.',
  keywords: [
    'ecommerce',
    'online shopping',
    'electronics',
    'fashion',
    'home decor',
    'beauty products',
  ],
  authors: [{ name: 'E-Commerce Demo' }],
  openGraph: {
    title: 'E-Commerce Demo - Your Online Shopping Destination',
    description:
      'Discover amazing products across electronics, fashion, home, beauty, and toys.',
    type: 'website',
    siteName: 'E-Commerce Demo',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce Demo - Your Online Shopping Destination',
    description:
      'Discover amazing products across electronics, fashion, home, beauty, and toys.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);} 
                      gtag('js', new Date());
                      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
                    `,
              }}
            />
          </>
        )}
      </head>
      <body className={inter.className}>
        <a
          href="#main-content"
          className="sr-only shadow focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <MarketingBanner />
            <Header />
            <main id="main-content" role="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <BackToTop />
          <LiveChatWidget />
          <CompareBar />
          <Toaster />
          <AnalyticsProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
