import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { BackToTop } from '@/components/ui/back-to-top';
import { LiveChatWidget } from '@/components/ui/live-chat-widget';
import { CompareBar } from '@/components/products/compare-bar';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BackToTop />
          <LiveChatWidget />
          <CompareBar />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
