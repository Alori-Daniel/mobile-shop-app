import ScreenWrapper from "@/components/ScreenWrapper";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Profile = () => {
  const cartItemsCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const ordersCount = useOrderStore((state) => state.orders.length);
  const clearOrders = useOrderStore((state) => state.clearOrders);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.card}>
          <Row label="Items in cart" value={`${cartItemsCount}`} />
          <Row label="Completed orders" value={`${ordersCount}`} />
        </View>

        <Pressable style={styles.secondaryButton} onPress={clearCart}>
          <Text style={styles.secondaryButtonText}>Clear Cart</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={clearOrders}>
          <Text style={styles.secondaryButtonText}>Clear Orders</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

type RowProps = {
  label: string;
  value: string;
};

const Row = ({ label, value }: RowProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    color: "#64748B",
    fontSize: 14,
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 14,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    color: "#334155",
    fontSize: 15,
  },
  rowValue: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  secondaryButtonText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
});
