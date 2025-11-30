# Architecture Overview

This document captures the high-level application architecture so collaborators can understand where to extend features or swap integrations.

## Runtime Stack

- **Next.js App Router** for routing, server components, and API routes.
- **TypeScript** with strict config for type-safe data flows.
- **Tailwind CSS + shadcn/ui** for the component library.
- **Zustand** with persistent slices for cart, wishlist, compare, and user session state.
- **Mock data layer** (`src/lib/db/products.ts`) that emulates a repository. The module can be replaced with a real data source (Supabase, Prisma, etc.) without touching the UI.

## Data Access

`src/lib/db/products.ts` provides:

- `getProducts(options)` – filter & sort catalogue queries.
- `getProductById(id)` – fetch a single product.
- `getRelatedProducts(product, limit)` – contextual recommendations.
- `searchProducts(query)` – full-text style lookup.

All API routes now depend on this repository, which makes the migration path to a real database straightforward. Swap the implementation to call your chosen SDK and keep the signatures intact.

## State Management

Each store is defined as a dedicated slice with explicit `State`, `Actions`, and computed helpers.

- `src/store/cart.ts` – cart line items, optimistic add/update/remove, derived subtotal & item count, selectors for granular subscriptions.
- `src/store/wishlist.ts` – product id collection with memoized selectors and persistence.
- `src/store/compare.ts` – bounded comparison list with automatic eviction when the max is reached.
- `src/store/user.ts` – mock authentication session and order history holders.

`src/store/utils.ts` exposes a `createSelectors` helper so components can subscribe to narrow slices (`cartSelectors.use(selectCartItemCount)`) and avoid unnecessary re-renders.

## API Surface

- `GET /api/products` – supports filtering, sorting, limit, and returns cached responses.
- `GET /api/products/:id` – validated id param, structured error handling, related products payload.
- `GET /api/search` – debounced semantic search with shared repository logic.

Each route returns cache headers for browsers/CDNs and handles error cases gracefully.

## Testing Strategy

- Store unit tests (`src/__tests__/cart.test.ts`) ensure business rules.
- Additional tests should cover API routes, selectors, and UI integration as the real data source is introduced.

## Migration Guide

1. Replace repository functions with real database operations (Prisma, Supabase, Convex, etc.).
2. Update the tests to mock the new data source.
3. Configure environment variables (`DATABASE_URL`, `SUPABASE_URL`, etc.) and document them in `.env.example`.
4. Extend `docs/architecture.md` with the new ERD once the database schema is finalized.
