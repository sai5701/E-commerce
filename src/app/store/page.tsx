import { create } from "zustand";

interface CartState {
  items: { id: string; title: string; price: number; quantity: number; image: string }[];
  addToCart: (product: { id: string; title: string; price: number; image: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;  // Add this function
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),
  clearCart: () => set({ items: [] }), 
}));
