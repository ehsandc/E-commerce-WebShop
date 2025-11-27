export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  brand: string;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  colors?: string[];
  sizes?: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  qty: number;
  image: string;
  variant?: {
    color?: string;
    size?: string;
  };
}

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  rating?: number;
  inStock?: boolean;
  category?: string;
}

export type SortOption =
  | 'popularity'
  | 'price_asc'
  | 'price_desc'
  | 'newest'
  | 'rating';
