'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    rating: 5,
    content:
      "Absolutely love shopping here! The quality of products is outstanding and shipping is always fast. Best online store I've found.",
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Verified Buyer',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 5,
    content:
      "Great customer service and amazing deals. I've recommended ShopHub to all my friends. The products always match the descriptions perfectly.",
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Verified Buyer',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    rating: 5,
    content:
      'The variety of products is incredible! Found everything I needed in one place. Checkout process is smooth and hassle-free.',
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/40 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center sm:mb-12">
          <h2 className="mb-3 text-3xl font-bold sm:mb-4 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
            Join thousands of happy customers who trust ShopHub for their
            shopping needs
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/20" />

                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
