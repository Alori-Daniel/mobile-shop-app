import { CartItem, Meal } from "@/types";

const roundToCents = (value: number) => Math.round(value * 100) / 100;

export const getDiscountedPrice = (product: Meal) => {
  const discounted = product.price * (1 - product.discount / 100);
  return roundToCents(Math.max(0, discounted));
};

export const getRatingOutOfFive = (rating: number) => {
  return Math.max(0, Math.min(5, Math.round((rating / 100) * 5)));
};

export const calculateCartTotals = (items: CartItem[]) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const total = items.reduce(
    (sum, item) => sum + getDiscountedPrice(item.product) * item.quantity,
    0,
  );

  return {
    subtotal: roundToCents(subtotal),
    total: roundToCents(total),
    discountTotal: roundToCents(subtotal - total),
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};
