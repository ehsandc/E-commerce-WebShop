'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { toast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { useState } from 'react';
import { QuickViewDialog } from './quick-view-dialog';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addToCart = useCartStore((state) => state.add);
  const { toggle: toggleWishlist, has: inWishlist } = useWishlistStore();
  const isInWishlist = inWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      title: product.title,
      price: product.salePrice || product.price,
      image: product.images[0],
    });
    toast({
      title: 'Added to cart',
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product.id);
    toast({
      title: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: isInWishlist
        ? `${product.title} has been removed from your wishlist.`
        : `${product.title} has been added to your wishlist.`,
    });
  };

  const currentPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <>
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            {/* Badges */}
            <div className="absolute left-1.5 sm:left-2 top-1.5 sm:top-2 flex flex-col gap-1">
              {product.isNew && <Badge variant="default" className="text-[10px] sm:text-xs px-1.5 sm:px-2">NEW</Badge>}
              {hasDiscount && (
                <Badge variant="destructive" className="text-[10px] sm:text-xs px-1.5 sm:px-2">-{discountPercent}%</Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">Out of Stock</Badge>
              )}
            </div>
            {/* Quick Actions - Always visible on mobile, hover on desktop */}
            <div className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 flex flex-col gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 transition-opacity sm:group-hover:opacity-100">
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 shadow-md"
                onClick={handleWishlistToggle}
                aria-label={
                  isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'
                }
              >
                <Heart
                  className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isInWishlist ? 'fill-current text-red-500' : ''}`}
                />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 shadow-md hidden sm:flex"
                onClick={(e) => {
                  e.preventDefault();
                  setQuickViewOpen(true);
                }}
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <CardContent className="p-3 sm:p-4">
            <p className="mb-0.5 sm:mb-1 text-[10px] sm:text-xs text-muted-foreground truncate">{product.brand}</p>
            <h3 className="mb-1.5 sm:mb-2 line-clamp-2 text-xs sm:text-sm font-medium leading-tight">
              {product.title}
            </h3>
            <div className="mb-1.5 sm:mb-2 flex items-center gap-1">
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-medium">{product.rating}</span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg font-bold">{formatPrice(currentPrice)}</span>
              {hasDiscount && (
                <span className="text-xs sm:text-sm text-muted-foreground line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </CardContent>
        </Link>

        <CardFooter className="p-3 sm:p-4 pt-0">
          <Button
            className="w-full h-9 sm:h-10 text-xs sm:text-sm"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>

      <QuickViewDialog
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
