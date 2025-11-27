import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
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
        {/* Newsletter Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex flex-col items-center text-center">
            <Mail className="mb-3 sm:mb-4 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            <h3 className="mb-1.5 sm:mb-2 text-xl sm:text-2xl font-bold">
              Subscribe to Our Newsletter
            </h3>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground px-4">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex flex-col sm:flex-row w-full max-w-md gap-2 px-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-9 sm:h-10 text-sm"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="h-9 sm:h-10 w-full sm:w-auto">Subscribe</Button>
            </form>
          </div>
        </div>

        <Separator className="mb-8 sm:mb-10 md:mb-12" />

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Shop */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase">Shop</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase">Support</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h4 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase">Follow Us</h4>
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
        <div className="flex flex-col items-center justify-between gap-2 sm:gap-4 text-center text-xs sm:text-sm text-muted-foreground md:flex-row">
          <p>© 2025 ShopHub. All rights reserved.</p>
          <p>Made with ❤️ for demo purposes</p>
        </div>
      </div>
    </footer>
  );
}
