'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Minus, Plus, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductCard } from '@/components/products/product-card';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { useRecentlyViewedStore } from '@/store/recently-viewed';
import { toast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
}

export function ProductDetailClient({ product, related }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const addToCart = useCartStore((state) => state.add);
  const { toggle: toggleWishlist, has: inWishlist } = useWishlistStore();
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addProduct);

  useEffect(() => {
    addRecentlyViewed(product.id.toString());
  }, [product.id, addRecentlyViewed]);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 600px
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.salePrice || product.price,
      qty: quantity,
      image: product.images[0],
      variant: {
        color: selectedColor,
        size: selectedSize,
      },
    });
    toast({
      title: 'Added to cart',
      description: `${quantity}x ${product.title} added to your cart.`,
    });
  };

  const currentPrice = product.salePrice || product.price;
  const hasDiscount = !!product.salePrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: product.category, href: `/category/${product.category}` },
          { label: product.title, href: `/product/${product.id}` },
        ]}
      />

      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link href={`/category/${product.category}`}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to {product.category}
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[selectedImage]}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
            {product.isNew && (
              <Badge className="absolute left-4 top-4">NEW</Badge>
            )}
            {hasDiscount && (
              <Badge variant="destructive" className="absolute left-4 top-16">
                -{discountPercent}% OFF
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {product.images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === idx
                      ? 'border-primary'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm text-muted-foreground">{product.brand}</div>
          <h1 className="mb-4 text-3xl font-bold">{product.title}</h1>
          
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
            {product.stock > 0 ? (
              <Badge variant="secondary">In Stock ({product.stock})</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          <div className="mb-6 flex items-center gap-4">
            <span className="text-4xl font-bold">{formatPrice(currentPrice)}</span>
            {hasDiscount && (
              <span className="text-2xl text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <p className="mb-6 text-muted-foreground">{product.description}</p>

          <Separator className="my-6" />

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <p className="mb-3 font-semibold">Color: {selectedColor}</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'default' : 'outline'}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <p className="mb-3 font-semibold">Size: {selectedSize}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <p className="mb-3 font-semibold">Quantity</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-16 text-center text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => {
                toggleWishlist(product.id);
                toast({
                  title: inWishlist(product.id)
                    ? 'Removed from wishlist'
                    : 'Added to wishlist',
                });
              }}
            >
              <Heart
                className={`mr-2 h-5 w-5 ${
                  inWishlist(product.id) ? 'fill-current text-red-500' : ''
                }`}
              />
              {inWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Frequently Bought Together */}
      {related.length >= 2 && (
        <div className="mt-12 rounded-lg border bg-muted/20 p-6">
          <h2 className="mb-4 text-xl font-bold">Frequently Bought Together</h2>
          <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
            <div className="flex flex-wrap items-center gap-4">
              {[product, ...related.slice(0, 2)].map((item, index) => (
                <div key={item.id} className="flex items-center gap-2">
                  {index > 0 && <span className="text-2xl text-muted-foreground">+</span>}
                  <div className="flex flex-col items-center">
                    <div className="relative h-20 w-20 overflow-hidden rounded border">
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-2 text-xs text-center line-clamp-2 w-20">{item.title}</p>
                    <p className="text-sm font-semibold">{formatPrice(item.salePrice || item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center gap-3">
              <div className="text-sm">
                <span className="text-muted-foreground">Bundle Price: </span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(
                    (product.salePrice || product.price) +
                    (related[0]?.salePrice || related[0]?.price || 0) +
                    (related[1]?.salePrice || related[1]?.price || 0)
                  )}
                </span>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  const items = [product, related[0], related[1]];
                  items.forEach((item) => {
                    if (item) {
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.salePrice || item.price,
                        image: item.images[0],
                      });
                    }
                  });
                  toast({
                    title: 'Bundle added to cart',
                    description: 'All 3 products have been added to your cart.',
                  });
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add All to Cart
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Save by buying together
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Add to Cart Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 overflow-hidden rounded border">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <h3 className="font-semibold line-clamp-1">{product.title}</h3>
                <p className="text-lg font-bold">{formatPrice(currentPrice)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <span className="w-8 sm:w-12 text-center text-sm sm:text-base font-medium">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 sm:h-10 sm:w-10"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="h-10 sm:h-11"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
