# E-Commerce Demo - ShopHub

A professional, production-ready e-commerce demo built with Next.js 15, TypeScript, Tailwind CSS, and modern React patterns. Perfect for portfolio showcase with clean code, great UX, and easy deployment.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🛍️ Core E-Commerce Functionality

- **Product Catalog**: Browse 18+ products across 5 categories (Electronics, Fashion, Home, Beauty, Toys)
- **Advanced Filtering**: Filter by price range, rating, brand, stock availability
- **Smart Search**: Real-time search with debouncing
- **Product Details**: Image gallery, variant selection (color/size), quantity control
- **Shopping Cart**: Persistent cart with add/remove/update operations
- **Wishlist**: Save favorite products
- **Checkout Flow**: Multi-step checkout with form validation (Zod + React Hook Form)

### 🎨 User Experience

- **Responsive Design**: Mobile-first, works perfectly on all screen sizes
- **Dark Mode**: Full dark mode support with system preference detection
- **Smooth Animations**: Micro-interactions and transitions
- **Toast Notifications**: User feedback for cart/wishlist actions
- **Quick View**: Product preview dialog without leaving the page
- **Skeleton Loaders**: Loading states for better perceived performance
- **Design Tokens**: Centralized theme variables and motion defaults for consistent polish

### 🏗️ Technical Features

- **Next.js 15 App Router**: Latest Next.js features with server & client components
- **TypeScript**: Full type safety throughout the application
- **Zustand**: Lightweight state management with persistence
- **Repository Pattern**: Centralised data-access layer (`src/lib/db/products.ts`) ready to swap for a real database
- **API Routes**: RESTful API endpoints for products and search
- **SEO Optimized**: Meta tags, Open Graph, sitemap, robots.txt
- **Accessible**: ARIA labels, keyboard navigation, semantic HTML
- **Testing**: Vitest + React Testing Library setup with example tests
- **Automation**: Husky + lint-staged pre-commit hooks and GitHub Actions CI pipeline

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Clone or navigate to the project directory
cd ecommerce-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run lint-staged  # Run lint-staged against staged files
npm run format       # Format code with Prettier
npm run typecheck    # Run TypeScript compiler check
npm run test         # Run tests with Vitest
npm run test:ui      # Run tests with UI
npm run test:run     # Run Vitest in CI mode (no watch)
```

## 📁 Project Structure

```
ecommerce-demo/
├── data/
│   └── products.json          # Mock product data
├── src/
│   ├── app/                   # Next.js 15 App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── products/      # Product API
│   │   │   └── search/        # Search API
│   │   ├── auth/              # Login & Signup pages
│   │   ├── cart/              # Shopping cart page
│   │   ├── category/[slug]/   # Category pages
│   │   ├── checkout/          # Checkout flow
│   │   ├── product/[id]/      # Product detail pages
│   │   ├── search/            # Search results
│   │   ├── wishlist/          # Wishlist page
│   │   ├── about/             # About page
│   │   ├── contact/           # Contact page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── not-found.tsx      # 404 page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── cart/              # Cart components
│   │   ├── category/          # Category components
│   │   ├── layout/            # Header, Footer
│   │   ├── product/           # Product components
│   │   ├── products/          # Product grid & card
│   │   ├── ui/                # shadcn/ui components
│   │   ├── theme-provider.tsx # Theme provider
│   │   └── theme-toggle.tsx   # Dark mode toggle
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   ├── store/
│   │   ├── cart.ts            # Cart Zustand store
│   │   └── wishlist.ts        # Wishlist Zustand store
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── __tests__/             # Test files
│   └── test/
│       └── setup.ts           # Test setup
├── public/                    # Static assets
├── .eslintrc.json             # ESLint config
├── .prettierrc                # Prettier config
├── next.config.js             # Next.js config
├── tailwind.config.ts         # Tailwind CSS config
├── tsconfig.json              # TypeScript config
├── vitest.config.ts           # Vitest config
├── docs/                      # Internal documentation
│   └── architecture.md        # High-level architecture guide
└── package.json               # Dependencies & scripts
```

## 🎯 Pages & Routes

- **`/`** - Home page with hero, categories, featured products
- **`/category/[slug]`** - Category pages with filters and sorting
- **`/product/[id]`** - Product detail with gallery and variants
- **`/search`** - Search results page
- **`/cart`** - Shopping cart with item management
- **`/wishlist`** - Saved products
- **`/checkout`** - Checkout with form validation
- **`/auth/login`** - Login page (mock auth)
- **`/auth/signup`** - Signup page (mock auth)
- **`/about`** - About page
- **`/contact`** - Contact form with validation
- **`/404`** - Custom 404 page

## 🔌 API Routes

- **`GET /api/products`** - Get all products with optional filters
  - Query params: `category`, `minPrice`, `maxPrice`, `brands`, `rating`, `inStock`, `sort`, `limit`, `featured`, `new`
- **`GET /api/products/[id]`** - Get single product with related products
- **`GET /api/search?q=query`** - Search products

## 🛠️ Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework

### UI Components

- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Icon library
- **next-themes** - Dark mode support
- **Framer Motion** - Declarative animations & micro-interactions

### State Management

- **Zustand** - Lightweight state management
- **Zustand Middleware** - Persistence

### Forms & Validation

- **React Hook Form** - Form management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

### SEO & Meta

- **next-seo** - SEO management
- **next-sitemap** - Sitemap generation

### Development

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vitest** - Unit testing
- **Testing Library** - React component testing

## 🎨 Design System

### Colors

- **Primary**: Blue (#3b82f6) - CTAs, links, accents
- **Secondary**: Neutral grays - Text, backgrounds
- **Destructive**: Red - Errors, destructive actions
- **Success**: Green - Success states

### Typography

- **Font**: Inter (Google Fonts)
- **Scale**: Tailwind's default type scale

### Components

- Consistent border radius (`--radius: 0.5rem`)
- Smooth transitions (200ms)
- Hover states with elevation changes
- Focus states with ring offset

## 🧪 Testing

Tests are written with Vitest and React Testing Library:

## 🧭 Architecture Docs

See `docs/architecture.md` for an overview of the application layers, repository contracts, and migration guidance for connecting to a production-ready data service.

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test -- --watch
```

Example tests included:

- Cart store operations (add, remove, update, calculate)
- Product card rendering and interactions

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with one click

### Other Platforms

```bash
# Build the application
npm run build

# Start production server
npm run start
```

Set environment variables:

- `NEXT_PUBLIC_API_URL` - API base URL (defaults to `http://localhost:3000`)

## 🔒 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📊 Analytics

Basic analytics instrumentation is included via `src/lib/analytics.ts` and an `AnalyticsProvider` component that fires `page_view` events on route changes. Cart actions emit domain-specific events (`add_to_cart`, `remove_from_cart`, `update_cart_qty`).

To enable Google Analytics 4:

1. Create a GA4 property and obtain a Measurement ID (format `G-XXXXXXXXXX`).
2. Add `NEXT_PUBLIC_GA_ID` to `.env.local`.
3. Restart the dev server.

When `NEXT_PUBLIC_GA_ID` is set, GA script tags are injected in `layout.tsx` and events are forwarded to `gtag`. In development (without an ID) events are logged to the console for inspection.

Extend tracking by calling `track('event_name', { param: 'value' })` or using helpers in `analytics` (e.g. `analytics.search(query, results)`).

## 🤝 Contributing

This is a demo project, but feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

MIT License - feel free to use this project for your portfolio or learning.

## 🙏 Acknowledgments

- **shadcn/ui** - Component library
- **Tailwind CSS** - Styling framework
- **Next.js** - React framework
- **Unsplash** - Product images

## 📧 Contact

For questions or feedback, visit the [contact page](/contact) in the app.

---

Built with ❤️ for demo purposes. Not a real e-commerce store.
