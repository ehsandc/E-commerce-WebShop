import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCartStore } from '../store/cart';

describe('Cart Store', () => {
  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].title).toBe('Test Product');
    expect(result.current.items[0].qty).toBe(1);
  });

  it('should increase quantity when adding existing item', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
      });
      result.current.add({
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].qty).toBe(2);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
      });
      result.current.remove(1);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
      });
      result.current.updateQty(1, 5);
    });

    expect(result.current.items[0].qty).toBe(5);
  });

  it('should remove item when quantity is set to 0', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
      });
      result.current.updateQty(1, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should calculate subtotal correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Product 1',
        price: 50,
        image: 'test1.jpg',
        qty: 2,
      });
      result.current.add({
        id: 2,
        title: 'Product 2',
        price: 30,
        image: 'test2.jpg',
        qty: 1,
      });
    });

    expect(result.current.subtotal()).toBe(130); // (50 * 2) + (30 * 1)
  });

  it('should calculate item count correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Product 1',
        price: 50,
        image: 'test1.jpg',
        qty: 2,
      });
      result.current.add({
        id: 2,
        title: 'Product 2',
        price: 30,
        image: 'test2.jpg',
        qty: 3,
      });
    });

    expect(result.current.itemCount()).toBe(5); // 2 + 3
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.add({
        id: 1,
        title: 'Test Product',
        price: 99.99,
        image: 'test.jpg',
      });
      result.current.clear();
    });

    expect(result.current.items).toHaveLength(0);
  });
});
