type AnalyticsEvent = {
  name: string;
  params?: Record<string, any>;
};

// Simple runtime check for window + GA4 ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

function sendToGA(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;
  // @ts-ignore
  if (GA_MEASUREMENT_ID && typeof window.gtag === 'function') {
    // @ts-ignore
    window.gtag('event', event.name, event.params || {});
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[analytics]', event.name, event.params || {});
    }
  }
}

export function track(name: string, params?: Record<string, any>) {
  sendToGA({ name, params });
}

// Domain specific helpers
export const analytics = {
  track,
  viewProduct: (id: number, name: string, price: number) =>
    track('view_product', { id, name, price }),
  addToCart: (id: number, name: string, price: number, qty: number) =>
    track('add_to_cart', { id, name, price, qty }),
  removeFromCart: (id: number) => track('remove_from_cart', { id }),
  updateCartQty: (id: number, qty: number) =>
    track('update_cart_qty', { id, qty }),
  beginCheckout: (subtotal: number, itemCount: number) =>
    track('begin_checkout', { subtotal, itemCount }),
  search: (query: string, results: number) =>
    track('search', { query, results }),
};
