'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, updateQty, remove, subtotal, clear } = useCartStore();

  const shipping = items.length > 0 ? 10 : 0;
  const tax = subtotal() * 0.08;
  const total = subtotal() + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center text-center">
          <ShoppingBag className="mb-4 h-24 w-24 text-muted-foreground" />
          <h1 className="mb-2 text-3xl font-bold">Your Cart is Empty</h1>
          <p className="mb-6 text-muted-foreground">
            Start adding some products to your cart
          </p>
          <Button asChild size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <h1 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">
                  Cart Items ({items.length})
                </h2>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm" onClick={clear}>
                  Clear Cart
                </Button>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.variant?.color}-${item.variant?.size}`}
                    className="flex gap-3 sm:gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <Link
                      href={`/product/${item.id}`}
                      className="relative h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 overflow-hidden rounded-lg border"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col min-w-0">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-sm sm:text-base font-medium hover:text-primary line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                      {item.variant && (
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground">
                          {item.variant.color && `Color: ${item.variant.color}`}
                          {item.variant.size && ` | Size: ${item.variant.size}`}
                        </p>
                      )}
                      <p className="mt-1 sm:mt-2 text-sm sm:text-base font-semibold">
                        {formatPrice(item.price)}
                      </p>

                      <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => updateQty(item.id, item.qty - 1)}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="w-6 sm:w-8 text-center text-sm">{item.qty}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            onClick={() => updateQty(item.id, item.qty + 1)}
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive h-7 sm:h-8 text-xs sm:text-sm px-2"
                          onClick={() => remove(item.id)}
                        >
                          <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                          Remove
                        </Button>
                        <div className="sm:ml-auto text-sm sm:text-base font-semibold">
                          {formatPrice(item.price * item.qty)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-4 sm:p-6">
              <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold">Order Summary</h2>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal())}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button className="mt-4 sm:mt-6 w-full h-10 sm:h-11" size="lg" asChild>
                <Link href="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button variant="outline" className="mt-2 w-full h-10 sm:h-11" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>

              <div className="mt-4 sm:mt-6 space-y-1.5 sm:space-y-2 text-center text-xs sm:text-sm text-muted-foreground">
                <p>Free shipping on orders over $50</p>
                <p>30-day return policy</p>
                <p>Secure checkout</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
