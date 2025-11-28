'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Star, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';
import { useCompareStore } from '@/store/compare';
import { useCartStore } from '@/store/cart';
import { toast } from '@/components/ui/use-toast';
import type { Product } from '@/types';
import productsData from '@/../../data/products.json';

const products = productsData as Product[];

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const { removeProduct, clear } = useCompareStore();
  const addToCart = useCartStore((state) => state.add);

  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      const productIds = ids.split(',').map(Number);
      const filteredProducts = productIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined);
      setCompareProducts(filteredProducts);
    }
  }, [searchParams]);

  const handleRemove = (productId: number) => {
    removeProduct(productId);
    setCompareProducts(compareProducts.filter((p) => p.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
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

  if (compareProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-2 text-3xl font-bold">No Products to Compare</h1>
          <p className="mb-6 text-muted-foreground">
            Add products to comparison from the product listing pages
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const features = [
    { key: 'price', label: 'Price' },
    { key: 'rating', label: 'Rating' },
    { key: 'brand', label: 'Brand' },
    { key: 'stock', label: 'Availability' },
    { key: 'colors', label: 'Colors' },
    { key: 'sizes', label: 'Sizes' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Compare Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {compareProducts.length} products selected
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={clear} asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <Button variant="destructive" onClick={clear}>
            Clear All
          </Button>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden space-y-4">
        {compareProducts.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-4">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2 h-8 w-8"
                  onClick={() => handleRemove(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="mb-2 font-semibold">{product.title}</h3>
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-bold">{formatPrice(product.salePrice || product.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand:</span>
                  <span>{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
                  </Badge>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <tbody>
            {/* Product Images & Names */}
            <tr>
              <td className="w-32 border-r bg-muted/40 p-4 font-semibold align-top">
                Product
              </td>
              {compareProducts.map((product) => (
                <td key={product.id} className="border-r p-4 align-top">
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 h-8 w-8"
                      onClick={() => handleRemove(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Link
                    href={`/product/${product.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {product.title}
                  </Link>
                </td>
              ))}
            </tr>

            {/* Features */}
            {features.map((feature, index) => (
              <tr key={feature.key} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                <td className="border-r bg-muted/40 p-4 font-semibold">{feature.label}</td>
                {compareProducts.map((product) => (
                  <td key={product.id} className="border-r p-4">
                    {feature.key === 'price' && (
                      <span className="text-lg font-bold">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                    )}
                    {feature.key === 'rating' && (
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviewCount})
                        </span>
                      </div>
                    )}
                    {feature.key === 'brand' && product.brand}
                    {feature.key === 'stock' && (
                      <Badge variant={product.stock > 0 ? 'secondary' : 'destructive'}>
                        {product.stock > 0 ? `${product.stock} available` : 'Out of Stock'}
                      </Badge>
                    )}
                    {feature.key === 'colors' && (
                      product.colors ? product.colors.join(', ') : 'N/A'
                    )}
                    {feature.key === 'sizes' && (
                      product.sizes ? product.sizes.join(', ') : 'N/A'
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Add to Cart */}
            <tr>
              <td className="border-r bg-muted/40 p-4 font-semibold">Action</td>
              {compareProducts.map((product) => (
                <td key={product.id} className="border-r p-4">
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
