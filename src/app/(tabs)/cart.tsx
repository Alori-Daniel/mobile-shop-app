import ProductImage from "@/components/ProductImage";
import QuantityStepper from "@/components/QuantityStepper";
import ScreenMessage from "@/components/ScreenMessage";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useCartStore } from "@/store/cartStore";
import { calculateCartTotals, getDiscountedPrice } from "@/utils/cart";
import { formatCurrency } from "@/utils/currency";
import { router } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totals = calculateCartTotals(items);

  if (items.length === 0) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          title="Your cart is empty"
          description="Add products from Home to start your checkout flow."
          actionLabel="Browse Products"
          onAction={() => router.push("/(tabs)/home")}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Cart</Text>
        <Text style={styles.subtitle}>{totals.itemCount} item(s) selected</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const discountedPrice = getDiscountedPrice(item.product);

          return (
            <View style={styles.cartItem}>
              <View style={styles.imageContainer}>
                <ProductImage
                  uri={item.product.image}
                  label={item.product.name}
                  height={72}
                />
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.product.name}
                </Text>
                <Text style={styles.itemPrice}>
                  {formatCurrency(discountedPrice)}
                </Text>

                <View style={styles.itemControls}>
                  <QuantityStepper
                    quantity={item.quantity}
                    onDecrease={() => decreaseQuantity(item.product.id)}
                    onIncrease={() => increaseQuantity(item.product.id)}
                  />
                  <Pressable onPress={() => removeFromCart(item.product.id)}>
                    <Text style={styles.removeText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          );
        }}
      />

      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(totals.subtotal)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount</Text>
          <Text style={[styles.summaryValue, styles.discountValue]}>
            -{formatCurrency(totals.discountTotal)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(totals.total)}</Text>
        </View>

        <Pressable
          style={styles.checkoutButton}
          onPress={() => router.push("/checkout")}
        >
          <Text style={styles.checkoutText}>Proceed To Checkout</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    marginTop: 4,
    color: "#475569",
    fontSize: 14,
  },
  listContent: {
    gap: 12,
    paddingVertical: 14,
  },
  cartItem: {
    flexDirection: "row",
    gap: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  imageContainer: {
    width: 72,
    borderRadius: 10,
    overflow: "hidden",
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
    gap: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  itemControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  removeText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "600",
  },
  summaryCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    padding: 14,
    gap: 10,
    marginBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#475569",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  discountValue: {
    color: "#047857",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },
  checkoutButton: {
    marginTop: 6,
    borderRadius: 12,
    backgroundColor: "purple",
    alignItems: "center",
    paddingVertical: 14,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
    textTransform: "uppercase",
  },
});
