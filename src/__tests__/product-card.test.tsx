import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '../components/products/product-card';
import type { Product } from '../types';

const mockProduct: Product = {
  id: 1,
  slug: 'test-product',
  title: 'Test Product',
  description: 'This is a test product',
  price: 99.99,
  rating: 4.5,
  reviewCount: 100,
  brand: 'TestBrand',
  images: ['https://via.placeholder.com/400'],
  category: 'electronics',
  tags: ['test'],
  stock: 10,
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('TestBrand')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('shows discount badge when salePrice is present', () => {
    const productWithSale = { ...mockProduct, salePrice: 79.99 };
    render(<ProductCard product={productWithSale} />);

    expect(screen.getByText('-20%')).toBeInTheDocument();
    expect(screen.getByText('$79.99')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('shows NEW badge for new products', () => {
    const newProduct = { ...mockProduct, isNew: true };
    render(<ProductCard product={newProduct} />);

    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('disables add to cart button when out of stock', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    render(<ProductCard product={outOfStockProduct} />);

    const button = screen.getByRole('button', { name: /out of stock/i });
    expect(button).toBeDisabled();
  });
});
