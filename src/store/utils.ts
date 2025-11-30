import type { StoreApi } from 'zustand';
import type { UseBoundStore } from 'zustand';

// Helper to expose memoised selectors without leaking implementation details.
export const createSelectors = <S extends object>(
  store: UseBoundStore<StoreApi<S>>
) => {
  const useSelector = <T>(selector: (state: S) => T) => store(selector);

  return {
    use: useSelector,
    getState: store.getState,
  } as const;
};
