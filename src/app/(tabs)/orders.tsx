import ScreenMessage from "@/components/ScreenMessage";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useOrderStore } from "@/store/orderStore";
import { formatCurrency } from "@/utils/currency";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const Orders = () => {
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          title="No orders yet"
          description="Your completed orders will appear here after checkout."
          actionLabel="Start Shopping"
          onAction={() => router.push("/(tabs)/home")}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
        <Text style={styles.subtitle}>{orders.length} completed order(s)</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const itemSummary = item.items
            .slice(0, 2)
            .map((entry) => `${entry.product.name} x${entry.quantity}`)
            .join(", ");

          return (
            <View style={styles.orderCard}>
              <View style={styles.row}>
                <Text style={styles.orderId}>Order #{item.id}</Text>
                <Text style={styles.amount}>{formatCurrency(item.total)}</Text>
              </View>

              <Text style={styles.meta}>Placed {dateFormatter.format(new Date(item.createdAt))}</Text>
              <Text style={styles.meta}>Deliver to: {item.customer.addressLine}</Text>
              <Text style={styles.itemsText} numberOfLines={2}>
                Items: {itemSummary}
                {item.items.length > 2 ? ` +${item.items.length - 2} more` : ""}
              </Text>
            </View>
          );
        }}
      />
    </ScreenWrapper>
  );
};

export default Orders;

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
    paddingVertical: 14,
    gap: 12,
  },
  orderCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 14,
    gap: 7,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  meta: {
    fontSize: 13,
    color: "#64748B",
  },
  itemsText: {
    marginTop: 2,
    fontSize: 13,
    color: "#334155",
  },
});
