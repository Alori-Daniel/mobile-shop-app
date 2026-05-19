export type Meal = {
  id: string;
  name: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
};

export type CartItem = {
  product: Meal;
  quantity: number;
};

export type CheckoutFormValues = {
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  postalCode: string;
};

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: CheckoutFormValues;
  subtotal: number;
  discountTotal: number;
  total: number;
};
