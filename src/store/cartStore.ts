import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CartItem, Meal } from "@/types";
import { persistStorage } from "./persistStorage";

type CartState = {
  items: CartItem[];
  addToCart: (product: Meal, quantity?: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const updateItemQuantity = (
  items: CartItem[],
  productId: string,
  updater: (quantity: number) => number,
) => {
  return items
    .map((item) => {
      if (item.product.id !== productId) {
        return item;
      }

      return {
        ...item,
        quantity: updater(item.quantity),
      };
    })
    .filter((item) => item.quantity > 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (product, quantity = 1) => {
        if (quantity <= 0) {
          return;
        }

        set((state) => {
          const existing = state.items.find((item) => item.product.id === product.id);

          if (!existing) {
            return {
              items: [...state.items, { product, quantity }],
            };
          }

          return {
            items: state.items.map((item) => {
              if (item.product.id !== product.id) {
                return item;
              }

              return {
                ...item,
                quantity: item.quantity + quantity,
              };
            }),
          };
        });
      },
      increaseQuantity: (productId) => {
        set((state) => ({
          items: updateItemQuantity(state.items, productId, (quantity) => quantity + 1),
        }));
      },
      decreaseQuantity: (productId) => {
        set((state) => ({
          items: updateItemQuantity(state.items, productId, (quantity) => quantity - 1),
        }));
      },
      setQuantity: (productId, quantity) => {
        set((state) => ({
          items: updateItemQuantity(state.items, productId, () => quantity),
        }));
      },
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "cart-store-v1",
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);
