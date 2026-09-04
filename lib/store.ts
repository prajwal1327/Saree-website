'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, WishlistItem } from './types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  total: () => number;
  count: () => number;
}

interface WishlistStore {
  items: WishlistItem[];
  toggle: (product: Product) => void;
  isWished: (productId: number) => boolean;
  remove: (productId: number) => void;
}

interface SearchStore {
  isOpen: boolean;
  query: string;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (q: string) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, { product, quantity: 1 }] }));
        }
        set({ isOpen: true });
      },
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          items: qty < 1
            ? s.items.filter((i) => i.product.id !== id)
            : s.items.map((i) => (i.product.id === id ? { ...i, quantity: qty } : i)),
        })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      total: () => get().items.reduce((sum, i) => sum + (i.product.sale_price ?? i.product.price) * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'sari-cart' }
  )
);

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const exists = get().items.find((i) => i.product.id === product.id);
        if (exists) {
          set((s) => ({ items: s.items.filter((i) => i.product.id !== product.id) }));
        } else {
          set((s) => ({ items: [...s.items, { product }] }));
        }
      },
      isWished: (id) => !!get().items.find((i) => i.product.id === id),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
    }),
    { name: 'sari-wishlist' }
  )
);

export const useSearch = create<SearchStore>()((set) => ({
  isOpen: false,
  query: '',
  openSearch: () => set({ isOpen: true }),
  closeSearch: () => set({ isOpen: false, query: '' }),
  setQuery: (q) => set({ query: q }),
}));
