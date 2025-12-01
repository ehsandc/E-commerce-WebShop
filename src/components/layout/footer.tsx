import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  CreditCard,
  Lock,
  Truck,
  Shield,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  shop: [
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Fashion', href: '/category/fashion' },
    { name: 'Home & Living', href: '/category/home' },
    { name: 'Beauty', href: '/category/beauty' },
    { name: 'Toys & Games', href: '/category/toys' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  support: [
    { name: 'Help Center', href: '#' },
    { name: 'Shipping Info', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Track Order', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        {/* Trust Badges */}
        <div className="mb-8 sm:mb-10">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:h-14 sm:w-14">
                <Truck className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h4 className="mb-1 text-xs font-semibold sm:text-sm">
                Free Shipping
              </h4>
              <p className="text-xs text-muted-foreground">Orders over $50</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:h-14 sm:w-14">
                <Shield className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h4 className="mb-1 text-xs font-semibold sm:text-sm">
                Secure Payment
              </h4>
              <p className="text-xs text-muted-foreground">100% Protected</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:h-14 sm:w-14">
                <Lock className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h4 className="mb-1 text-xs font-semibold sm:text-sm">
                Money Back
              </h4>
              <p className="text-xs text-muted-foreground">30 Day Guarantee</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:h-14 sm:w-14">
                <CreditCard className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
              </div>
              <h4 className="mb-1 text-xs font-semibold sm:text-sm">
                Easy Payments
              </h4>
              <p className="text-xs text-muted-foreground">Multiple Options</p>
            </div>
          </div>
        </div>

        <Separator className="mb-8 sm:mb-10" />

        {/* Newsletter Section */}
        <div className="relative mb-8 overflow-hidden rounded-2xl sm:mb-10 md:mb-12">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Newsletter background"
              fill
              className="object-cover"
              quality={90}
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 flex flex-col items-center py-12 text-center sm:py-16">
            <Mail className="mb-3 h-6 w-6 text-primary sm:mb-4 sm:h-8 sm:w-8" />
            <h3 className="mb-1.5 text-xl font-bold sm:mb-2 sm:text-2xl">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 px-4 text-sm text-muted-foreground sm:mb-6 sm:text-base">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex w-full max-w-md flex-col gap-2 px-4 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter your email"
                className="h-9 flex-1 text-sm sm:h-10"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="h-9 w-full sm:h-10 sm:w-auto">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="mb-8 sm:mb-10 md:mb-12" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Shop */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase sm:mb-4 sm:text-sm">
              Shop
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground active:text-foreground sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase sm:mb-4 sm:text-sm">
              Company
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground active:text-foreground sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase sm:mb-4 sm:text-sm">
              Support
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground active:text-foreground sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase sm:mb-4 sm:text-sm">
              Legal
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground active:text-foreground sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="mb-3 text-xs font-semibold uppercase sm:mb-4 sm:text-sm">
              Follow Us
            </h4>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 sm:h-5 sm:w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-6 sm:my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-2 text-center text-xs text-muted-foreground sm:gap-4 sm:text-sm md:flex-row">
          <p>© 2025 ShopHub. All rights reserved.</p>
          <p>Made with ❤️ for demo purposes</p>
        </div>
      </div>
    </footer>
  );
}
