import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  add: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  remove: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + (item.qty || 1) } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, qty: item.qty || 1 }] });
        }
      },
      remove: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },
      updateQty: (id, qty) => {
        if (qty <= 0) {
          get().remove(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        });
      },
      clear: () => {
        set({ items: [] });
      },
      subtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.qty, 0);
      },
      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.qty, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
