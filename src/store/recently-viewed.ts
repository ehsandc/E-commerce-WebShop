import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  productIds: string[];
  addProduct: (productId: string) => void;
  getProducts: () => string[];
  clear: () => void;
}

const MAX_RECENT_PRODUCTS = 8;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],
      
      addProduct: (productId: string) => {
        set((state) => {
          // Remove if already exists
          const filtered = state.productIds.filter((id) => id !== productId);
          // Add to front and limit to max
          return {
            productIds: [productId, ...filtered].slice(0, MAX_RECENT_PRODUCTS),
          };
        });
      },
      
      getProducts: () => get().productIds,
      
      clear: () => set({ productIds: [] }),
    }),
    {
      name: 'recently-viewed-storage',
    }
  )
);
