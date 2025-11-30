import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSelectors } from '@/store/utils';
import { analytics } from '@/lib/analytics';

interface WishlistState {
  ids: number[];
}

interface WishlistActions {
  toggle: (id: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
}

export type WishlistStore = WishlistState & WishlistActions;

const wishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => {
        const current = get().ids;
        if (current.includes(id)) {
          set({ ids: current.filter((itemId) => itemId !== id) });
          analytics.track?.('wishlist_remove', { id });
          return;
        }

        set({ ids: [...current, id] });
        analytics.track?.('wishlist_add', { id });
      },
      has: (id) => get().ids.includes(id),
      clear: () => {
        set({ ids: [] });
        analytics.track?.('wishlist_clear');
      },
    }),
    {
      name: 'wishlist-storage',
      version: 1,
    }
  )
);

export const useWishlistStore = wishlistStore;
export const wishlistSelectors = createSelectors(wishlistStore);
export const selectWishlistIds = (state: WishlistStore) => state.ids;
export const selectIsInWishlist = (id: number) => (state: WishlistStore) =>
  state.ids.includes(id);
