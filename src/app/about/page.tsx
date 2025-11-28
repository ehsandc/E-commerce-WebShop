import Link from 'next/link';
import { 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Award, 
  Zap, 
  Heart,
  Shield,
  Sparkles,
  ArrowRight,
  Package,
  Clock,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '50K+' },
    { icon: Package, label: 'Products', value: '10K+' },
    { icon: Award, label: 'Five Star Reviews', value: '25K+' },
    { icon: TrendingUp, label: 'Growth Rate', value: '200%' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We carefully curate every product to ensure the highest standards of quality and value for our customers.'
    },
    {
      icon: Heart,
      title: 'Customer Focused',
      description: 'Your satisfaction is our top priority. We go above and beyond to exceed your expectations every time.'
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'We continuously improve our platform with the latest technology to provide the best shopping experience.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Shop with confidence knowing your data is secure and our pricing is always transparent.'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Delivery',
      description: 'Get your orders delivered in 2-3 business days with free shipping on orders over $50.'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Shop safely with our encrypted payment system supporting all major payment methods.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our dedicated support team is always ready to help you with any questions or concerns.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Trusted by 50,000+ customers worldwide</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              About ShopHub
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Your trusted destination for quality products across electronics, fashion, home, beauty, and more. 
              We're on a mission to make online shopping delightful.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">Start Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/40 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-16 sm:w-16">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <div className="text-2xl font-bold sm:text-3xl md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Our Story</h2>
              <p className="text-lg text-muted-foreground">
                From humble beginnings to a thriving e-commerce platform
              </p>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                Founded in 2025, ShopHub began with a simple yet powerful vision: to create an online shopping 
                experience that combines quality, convenience, and affordability. What started as a small team 
                passionate about e-commerce has grown into a trusted platform serving thousands of customers worldwide.
              </p>
              <p>
                We believe that shopping online should be easy, enjoyable, and worry-free. That's why we've built 
                a platform that not only offers a wide selection of products but also prioritizes customer 
                satisfaction at every step of the journey.
              </p>
              <p>
                Today, ShopHub is more than just an online store—it's a community of savvy shoppers who trust 
                us to deliver quality products, competitive prices, and exceptional service. We're proud of how 
                far we've come, but even more excited about where we're heading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/40 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="border-2 transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Why Choose ShopHub?</h2>
            <p className="text-lg text-muted-foreground">
              We make shopping simple, safe, and satisfying
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-y bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to Start Shopping?</h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            Discover amazing products at unbeatable prices. Join thousands of happy customers today!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/">
                Browse Products
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
