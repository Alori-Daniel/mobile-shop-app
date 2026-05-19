import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { CartItem, CheckoutFormValues, Order } from "@/types";
import { persistStorage } from "./persistStorage";

type CreateOrderPayload = {
  items: CartItem[];
  customer: CheckoutFormValues;
  subtotal: number;
  discountTotal: number;
  total: number;
};

type OrderState = {
  orders: Order[];
  createOrder: (payload: CreateOrderPayload) => Order;
  clearOrders: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [],
      createOrder: (payload) => {
        const order: Order = {
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          ...payload,
        };

        set((state) => ({
          orders: [order, ...state.orders],
        }));

        return order;
      },
      clearOrders: () => {
        set({ orders: [] });
      },
    }),
    {
      name: "order-store-v1",
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);
