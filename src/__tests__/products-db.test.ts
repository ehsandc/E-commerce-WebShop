import { describe, it, expect } from 'vitest';
import {
  getProductById,
  getProducts,
  getRelatedProducts,
  searchProducts,
} from '@/lib/db/products';

describe('product data repository', () => {
  it('returns products filtered by category and price range', async () => {
    const results = await getProducts({
      category: 'electronics',
      minPrice: 100,
      maxPrice: 500,
    });

    expect(results.length).toBeGreaterThan(0);
    results.forEach((product) => {
      const currentPrice = product.salePrice ?? product.price;
      expect(product.category).toBe('electronics');
      expect(currentPrice).toBeGreaterThanOrEqual(100);
      expect(currentPrice).toBeLessThanOrEqual(500);
    });
  });

  it('sorts products by rating descending when requested', async () => {
    const [first, second] = await getProducts({ sort: 'rating', limit: 2 });

    expect(first.rating).toBeGreaterThanOrEqual(second.rating);
  });

  it('returns a product by id and matching related products', async () => {
    const product = await getProductById(1);

    expect(product).not.toBeNull();
    if (!product) return;

    const related = await getRelatedProducts(product, 3);

    related.forEach((item) => {
      expect(item.id).not.toBe(product.id);
      expect(item.category).toBe(product.category);
    });
  });

  it('searches products by keyword across fields', async () => {
    const results = await searchProducts('electronics');

    expect(results.length).toBeGreaterThan(0);
    results.forEach((product) => {
      const haystack = [
        product.title,
        product.description,
        product.brand,
        product.category,
        ...(product.tags ?? []),
      ]
        .join(' ')
        .toLowerCase();
      expect(haystack).toContain('electronics');
    });
  });
});
