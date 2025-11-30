import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';
import { createSelectors } from '@/store/utils';
import { analytics } from '@/lib/analytics';

interface CartState {
  items: CartItem[];
}

interface CartActions {
  add: (item: Omit<CartItem, 'qty'> & { qty?: number }) => void;
  remove: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clear: () => void;
}

interface CartMetrics {
  subtotal: () => number;
  itemCount: () => number;
}

export type CartStore = CartState & CartActions & CartMetrics;

const cartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id);
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i
            ),
          });
          analytics.addToCart(
            item.id,
            (item as any).name ?? 'unknown',
            item.price,
            existingItem.qty + (item.qty ?? 1)
          ); // name fallback
          return;
        }
        const initialQty = item.qty ?? 1;
        set({ items: [...get().items, { ...item, qty: initialQty }] });
        analytics.addToCart(
          item.id,
          (item as any).name ?? 'unknown',
          item.price,
          initialQty
        );
      },
      remove: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        analytics.removeFromCart(id);
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
        analytics.updateCartQty(id, qty);
      },
      clear: () => {
        set({ items: [] });
      },
      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.qty, 0),
      itemCount: () => get().items.reduce((sum, item) => sum + item.qty, 0),
    }),
    {
      name: 'cart-storage',
      version: 1,
    }
  )
);

export const useCartStore = cartStore;
export const cartSelectors = createSelectors(cartStore);
export const selectCartItems = (state: CartStore) => state.items;
export const selectCartSubtotal = (state: CartStore) => state.subtotal();
export const selectCartItemCount = (state: CartStore) => state.itemCount();
