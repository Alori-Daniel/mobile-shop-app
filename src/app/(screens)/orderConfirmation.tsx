import ScreenMessage from "@/components/ScreenMessage";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useOrderStore } from "@/store/orderStore";
import { formatCurrency } from "@/utils/currency";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const OrderConfirmation = () => {
  const params = useLocalSearchParams<{ orderId?: string | string[] }>();
  const orderId = Array.isArray(params.orderId)
    ? params.orderId[0]
    : params.orderId;

  const order = useOrderStore(
    (state) =>
      state.orders.find((item) => item.id === orderId) ?? state.orders[0],
  );

  if (!order) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          title="No recent order"
          description="Complete a checkout to see your confirmation details here."
          actionLabel="Back To Home"
          onAction={() => router.replace("/(tabs)/home")}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.successBadge}>
          <Text style={styles.successMark}>✓</Text>
        </View>

        <Text style={styles.title}>Order Placed Successfully</Text>
        <Text style={styles.subtitle}>
          Your payment was successful and your order is now confirmed.
        </Text>

        <View style={styles.summaryCard}>
          <Row label="Order ID" value={`#${order.id}`} />
          <Row label="Items" value={`${order.items.length}`} />
          <Row
            label="Total Paid"
            value={formatCurrency(order.total)}
            emphasize
          />
        </View>

        <Pressable
          style={styles.primaryButton}
          onPress={() => router.replace("/(tabs)/orders")}
        >
          <Text style={styles.primaryButtonText}>View Orders</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() => router.replace("/(tabs)/home")}
        >
          <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

type RowProps = {
  label: string;
  value: string;
  emphasize?: boolean;
};

const Row = ({ label, value, emphasize = false }: RowProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, emphasize && styles.rowValueEmphasis]}>
        {value}
      </Text>
    </View>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 14,
  },
  successBadge: {
    alignSelf: "center",
    width: 76,
    height: 76,
    borderRadius: 999,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  successMark: {
    fontSize: 38,
    color: "#166534",
    fontWeight: "700",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },
  subtitle: {
    textAlign: "center",
    color: "#475569",
    fontSize: 15,
    lineHeight: 22,
  },
  summaryCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
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
    fontSize: 14,
    color: "#475569",
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  rowValueEmphasis: {
    fontSize: 20,
    fontWeight: "700",
  },
  primaryButton: {
    borderRadius: 12,
    backgroundColor: "#0F172A",
    alignItems: "center",
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  secondaryButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "600",
  },
});
