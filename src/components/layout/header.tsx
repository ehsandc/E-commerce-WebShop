'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  User,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { cartSelectors, selectCartItemCount } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import { debounce } from '@/lib/utils';

const categories = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home', slug: 'home' },
  { name: 'Beauty', slug: 'beauty' },
  { name: 'Toys', slug: 'toys' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = cartSelectors.use(selectCartItemCount);
  const { user, isAuthenticated } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 0);

      // Show banner when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setShowBanner(false);
      } else {
        // Scrolling up
        setShowBanner(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearch = debounce((query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }, 500);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur transition-all supports-[backdrop-filter]:bg-background/60 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        {/* Top Banner - Hidden on mobile, slides in/out on scroll */}
        <div
          className={`hidden overflow-hidden bg-primary py-2 text-center text-xs text-primary-foreground transition-all duration-300 sm:block sm:text-sm ${
            showBanner ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p>
            Free shipping on orders over $50 | Flash Sale: Up to 40% Off
            Selected Items
          </p>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-3 sm:px-4">
          <div
            className={`flex items-center justify-between gap-2 transition-all duration-300 sm:gap-4 ${
              showBanner ? 'h-14 sm:h-16' : 'h-12 sm:h-14'
            }`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-shrink-0 items-center space-x-1.5 sm:space-x-2"
            >
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg font-bold sm:text-xl">ShopHub</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-4 md:flex lg:space-x-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="whitespace-nowrap text-sm font-medium transition-colors hover:text-primary"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* Search Bar - Desktop only */}
            <div className="hidden max-w-md flex-1 lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={onSearchChange}
                  aria-label="Search products"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10"
                asChild
              >
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 sm:h-10 sm:w-10"
                onClick={() => setCartOpen(true)}
                aria-label={`Shopping cart with ${itemCount} items`}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground sm:-right-1 sm:-top-1 sm:h-5 sm:w-5 sm:text-xs">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hidden h-10 w-10 md:flex"
                asChild
              >
                <Link
                  href={isAuthenticated ? '/account' : '/auth/login'}
                  aria-label="Account"
                >
                  <User className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="pb-3 sm:pb-4 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="h-9 pl-10 text-sm"
                value={searchQuery}
                onChange={onSearchChange}
                aria-label="Search products"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="border-t py-3 sm:py-4 md:hidden">
              <div className="flex flex-col space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="rounded py-1 text-sm font-medium transition-colors hover:text-primary active:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                <Link
                  href={isAuthenticated ? '/account' : '/auth/login'}
                  className="rounded py-1 text-sm font-medium transition-colors hover:text-primary active:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isAuthenticated ? user?.name || 'Account' : 'Login'}
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
