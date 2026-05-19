# Mobile Shop App (React Native Assessment)

A React Native + Expo shopping app implementing a full product browsing and mock checkout flow using a live mock API.

## API

- Base URL: `https://6a0c4e365aa893e1015b7853.mockapi.io/api/v1`
- Resource used: `/meals`, `/meals/:id`

## Implemented Requirements

- Product listing screen
- Product detail screen
- Search + filtering (all, discounted, top-rated, budget)
- Add to cart
- Cart with quantity controls and remove actions
- Checkout screen with form validation
- Mock payment + order creation
- Order confirmation screen
- Orders history screen
- Loading/error/empty states
- Persisted cart and orders using AsyncStorage
- Tab navigation + stack navigation with Expo Router

## Tech Stack

- Expo + React Native + TypeScript
- Expo Router (tabs + stack)
- React Query (remote data)
- Zustand + AsyncStorage (local persisted state)
- StyleSheet-based styling

## Project Structure

- `src/app/(tabs)` - Home, Cart, Orders, Profile tabs
- `src/app/product/[id].tsx` - Product details route
- `src/app/checkout.tsx` - Checkout form + payment action
- `src/app/orderConfirmation.tsx` - Success screen
- `src/lib` - API + query client
- `src/store` - Cart and order stores
- `src/components` - Reusable UI components
- `src/utils` - Pricing, formatting, validation helpers

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start app:

```bash
npm run start
```

3. Run checks:

```bash
npx tsc --noEmit
npm run lint
```

## Architecture Notes

- Remote data is fetched through React Query hooks (`useMealsQuery`, `useMealQuery`) and typed in `src/types`.
- Cart and orders use Zustand with `persist` middleware and AsyncStorage.
- Checkout validates `fullName`, `email`, `phone`, `addressLine`, `city`, and `postalCode` before order creation.
- Pricing helpers (`src/utils/cart.ts`) centralize discount and totals calculations for consistency across Home, Cart, and Checkout.

## Navigation Map

- Stack:
  - `index` (splash)
  - `(tabs)`
  - `product/[id]`
  - `checkout`
  - `orderConfirmation`
- Tabs:
  - `home`
  - `cart`
  - `orders`
  - `profile`
