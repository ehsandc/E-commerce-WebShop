import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompareState {
  productIds: number[];
  addProduct: (productId: number) => void;
  removeProduct: (productId: number) => void;
  hasProduct: (productId: number) => boolean;
  clear: () => void;
  count: () => number;
}

const MAX_COMPARE_PRODUCTS = 3;

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      productIds: [],
      
      addProduct: (productId: number) => {
        const state = get();
        if (state.productIds.includes(productId)) return;
        if (state.productIds.length >= MAX_COMPARE_PRODUCTS) {
          // Remove the oldest product
          set({ productIds: [...state.productIds.slice(1), productId] });
        } else {
          set({ productIds: [...state.productIds, productId] });
        }
      },
      
      removeProduct: (productId: number) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        }));
      },
      
      hasProduct: (productId: number) => {
        return get().productIds.includes(productId);
      },
      
      clear: () => set({ productIds: [] }),
      
      count: () => get().productIds.length,
    }),
    {
      name: 'compare-storage',
    }
  )
);
