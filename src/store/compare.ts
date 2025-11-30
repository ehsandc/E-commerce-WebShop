import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from '@/store/utils';
import { analytics } from '@/lib/analytics';

interface CompareState {
  productIds: number[];
}

interface CompareActions {
  addProduct: (productId: number) => void;
  removeProduct: (productId: number) => void;
  hasProduct: (productId: number) => boolean;
  clear: () => void;
  count: () => number;
}

export type CompareStore = CompareState & CompareActions;

const MAX_COMPARE_PRODUCTS = 3;

const compareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      productIds: [],

      addProduct: (productId: number) => {
        const state = get();
        if (state.productIds.includes(productId)) {
          return;
        }

        if (state.productIds.length >= MAX_COMPARE_PRODUCTS) {
          set({ productIds: [...state.productIds.slice(1), productId] });
          analytics.track?.('compare_replace', {
            productId,
            removed: state.productIds[0],
          });
          return;
        }

        set({ productIds: [...state.productIds, productId] });
        analytics.track?.('compare_add', { productId });
      },

      removeProduct: (productId: number) => {
        set((state) => ({
          productIds: state.productIds.filter((id) => id !== productId),
        }));
        analytics.track?.('compare_remove', { productId });
      },

      hasProduct: (productId: number) => get().productIds.includes(productId),

      clear: () => {
        set({ productIds: [] });
        analytics.track?.('compare_clear');
      },

      count: () => get().productIds.length,
    }),
    {
      name: 'compare-storage',
      version: 1,
    }
  )
);

export const useCompareStore = compareStore;
export const compareSelectors = createSelectors(compareStore);
export const selectCompareIds = (state: CompareStore) => state.productIds;
