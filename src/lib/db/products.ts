import productsData from '@/../data/products.json';
import type { FilterOptions, Product, SortOption } from '@/types';

interface QueryOptions extends FilterOptions {
  featured?: boolean;
  isNew?: boolean;
  limit?: number;
  sort?: SortOption;
}

const products = productsData as Product[];

function applyFilters(list: Product[], options: QueryOptions = {}): Product[] {
  return list.filter((product) => {
    if (options.category && product.category !== options.category) {
      return false;
    }

    const currentPrice = product.salePrice ?? product.price;

    if (options.minPrice && currentPrice < options.minPrice) {
      return false;
    }

    if (options.maxPrice && currentPrice > options.maxPrice) {
      return false;
    }

    if (options.brands?.length && !options.brands.includes(product.brand)) {
      return false;
    }

    if (options.rating && product.rating < options.rating) {
      return false;
    }

    if (options.inStock && product.stock <= 0) {
      return false;
    }

    if (options.featured && !product.isFeatured) {
      return false;
    }

    if (options.isNew && !product.isNew) {
      return false;
    }

    return true;
  });
}

function applySort(list: Product[], sort?: SortOption): Product[] {
  if (!sort) {
    return list;
  }

  const sorted = [...list];

  switch (sort) {
    case 'price_asc':
      return sorted.sort(
        (a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)
      );
    case 'price_desc':
      return sorted.sort(
        (a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)
      );
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => Number(b.isNew ?? 0) - Number(a.isNew ?? 0));
    case 'popularity':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return list;
  }
}

export async function getProducts(
  options: QueryOptions = {}
): Promise<Product[]> {
  const filtered = applyFilters(products, options);
  const sorted = applySort(filtered, options.sort);
  const limited = options.limit ? sorted.slice(0, options.limit) : sorted;
  return limited;
}

export async function getProductById(id: number): Promise<Product | null> {
  const product = products.find((item) => item.id === id);
  return product ?? null;
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  return products
    .filter(
      (item) => item.category === product.category && item.id !== product.id
    )
    .slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return products.filter((product) => {
    const haystack = [
      product.title,
      product.description,
      product.brand,
      product.category,
      ...(product.tags ?? []),
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export async function getProductCount(): Promise<number> {
  return products.length;
}
