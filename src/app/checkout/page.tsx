'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  phone: z.string().min(10, 'Phone number is required'),
  cardNumber: z.string().min(16, 'Card number is required'),
  cardExpiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Format: MM/YY'),
  cardCVC: z.string().min(3, 'CVC is required'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, subtotal, clear } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const shipping = items.length > 0 ? 10 : 0;
  const tax = subtotal() * 0.08;
  const total = subtotal() + shipping + tax;

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    toast({
      title: 'Order placed successfully!',
      description: 'Thank you for your purchase. Order confirmation sent to your email.',
    });

    clear();
    router.push('/');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 md:py-8">
      <h1 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl font-bold">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-3">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div>
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-9 sm:h-10 mt-1.5"
                    {...register('email')}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName" className="text-sm">First Name</Label>
                    <Input id="firstName" className="h-9 sm:h-10 mt-1.5" {...register('firstName')} />
                    {errors.firstName && (
                      <p className="mt-1 text-xs sm:text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                    <Input id="lastName" className="h-9 sm:h-10 mt-1.5" {...register('lastName')} />
                    {errors.lastName && (
                      <p className="mt-1 text-xs sm:text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm">Address</Label>
                  <Input id="address" className="h-9 sm:h-10 mt-1.5" {...register('address')} />
                  {errors.address && (
                    <p className="mt-1 text-xs sm:text-sm text-destructive">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3">
                  <div className="col-span-2 sm:col-span-1">
                    <Label htmlFor="city" className="text-sm">City</Label>
                    <Input id="city" className="h-9 sm:h-10 mt-1.5" {...register('city')} />
                    {errors.city && (
                      <p className="mt-1 text-xs sm:text-sm text-destructive">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-sm">State</Label>
                    <Input id="state" className="h-9 sm:h-10 mt-1.5" {...register('state')} />
                    {errors.state && (
                      <p className="mt-1 text-xs sm:text-sm text-destructive">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-sm">ZIP Code</Label>
                    <Input id="zipCode" className="h-9 sm:h-10 mt-1.5" {...register('zipCode')} />
                    {errors.zipCode && (
                      <p className="mt-1 text-xs sm:text-sm text-destructive">
                        {errors.zipCode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm">Phone</Label>
                  <Input id="phone" type="tel" className="h-9 sm:h-10 mt-1.5" {...register('phone')} />
                  {errors.phone && (
                    <p className="mt-1 text-xs sm:text-sm text-destructive">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div>
                  <Label htmlFor="cardNumber" className="text-sm">Card Number</Label>
                  <Input
                    id="cardNumber"
                    className="h-9 sm:h-10 mt-1.5"
                    {...register('cardNumber')}
                    placeholder="1234 5678 9012 3456"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-xs sm:text-sm text-destructive">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="cardExpiry" className="text-sm">Expiry Date</Label>
                    <Input
                      id="cardExpiry"
                      className="h-9 sm:h-10 mt-1.5"
                      {...register('cardExpiry')}
                      placeholder="MM/YY"
                    />
                    {errors.cardExpiry && (
                      <p className="mt-1 text-xs sm:text-sm text-destructive">
                        {errors.cardExpiry.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cardCVC" className="text-sm">CVC</Label>
                    <Input
                      id="cardCVC"
                      className="h-9 sm:h-10 mt-1.5"
                      {...register('cardCVC')}
                      placeholder="123"
                    />
                    {errors.cardCVC && (
                      <p className="mt-1 text-xs sm:text-sm text-destructive">
                        {errors.cardCVC.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-1.5 sm:space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-xs sm:text-sm gap-2">
                      <span className="line-clamp-1">
                        {item.title} x{item.qty}
                      </span>
                      <span className="font-medium whitespace-nowrap">{formatPrice(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Button
                  type="submit"
                  className="w-full h-10 sm:h-11"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </Button>

                <p className="text-center text-[10px] sm:text-xs text-muted-foreground leading-tight">
                  By placing your order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
