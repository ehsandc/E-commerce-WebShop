export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">About ShopHub</h1>
        
        <div className="prose dark:prose-invert">
          <p className="text-lg text-muted-foreground">
            Welcome to ShopHub, your one-stop destination for quality products across multiple categories.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">Our Story</h2>
          <p>
            Founded in 2025, ShopHub started with a simple mission: to make online shopping easy, 
            enjoyable, and accessible to everyone. We've grown from a small startup to a trusted 
            e-commerce platform serving thousands of customers worldwide.
          </p>

          <h2 className="mt-8 text-2xl font-semibold">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Wide selection of electronics, fashion, home goods, beauty products, and toys</li>
            <li>Competitive prices and regular sales</li>
            <li>Fast and reliable shipping</li>
            <li>Excellent customer service</li>
            <li>Secure payment processing</li>
            <li>30-day return policy</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Quality:</strong> We carefully curate our product selection</li>
            <li><strong>Customer First:</strong> Your satisfaction is our priority</li>
            <li><strong>Innovation:</strong> We continuously improve our platform</li>
            <li><strong>Trust:</strong> Transparent pricing and policies</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold">Contact Us</h2>
          <p>
            Have questions? We'd love to hear from you. Visit our{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a> to get in touch.
          </p>
        </div>
      </div>
    </div>
  );
}
