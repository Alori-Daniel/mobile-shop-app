import ProductImage from "@/components/ProductImage";
import ScreenMessage from "@/components/ScreenMessage";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useMealQuery } from "@/hooks/useMealQuery";
import { useCartStore } from "@/store/cartStore";
import { getDiscountedPrice, getRatingOutOfFive } from "@/utils/cart";
import { formatCurrency } from "@/utils/currency";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ProductDetails = () => {
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const mealId = Array.isArray(params.id) ? params.id[0] : params.id;

  const {
    data: meal,
    isPending,
    isError,
    refetch,
  } = useMealQuery(mealId ?? "");
  const addToCart = useCartStore((state) => state.addToCart);

  if (!mealId) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          title="Invalid product"
          description="We could not identify this product."
        />
      </ScreenWrapper>
    );
  }

  if (isPending) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          loading
          title="Loading product"
          description="Getting product details."
        />
      </ScreenWrapper>
    );
  }

  if (isError || !meal) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          title="Unable to load product"
          description="Please retry loading this item."
          actionLabel="Retry"
          onAction={() => refetch()}
        />
      </ScreenWrapper>
    );
  }

  const discountedPrice = getDiscountedPrice(meal);

  return (
    <ScreenWrapper scrollable>
      <View style={styles.page}>
        <ProductImage uri={meal.image} label={meal.name} height={260} />

        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{meal.name}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>
                {getRatingOutOfFive(meal.rating)}/5
              </Text>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              {formatCurrency(discountedPrice)}
            </Text>
            {meal.discount > 0 ? (
              <Text style={styles.discountBadge}>{meal.discount}% OFF</Text>
            ) : null}
          </View>
          {meal.discount > 0 ? (
            <Text style={styles.originalPrice}>
              Original: {formatCurrency(meal.price)}
            </Text>
          ) : null}

          <Text style={styles.description}>
            Premium meal item with excellent taste and fresh ingredients. Ready
            for your cart.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              addToCart(meal);
              router.push("/(tabs)/cart");
            }}
          >
            <Text style={styles.primaryButtonText}>Add To Cart</Text>
          </Pressable>

          <Pressable
            style={styles.secondaryButton}
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  page: {
    gap: 16,
    paddingVertical: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 16,
    gap: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  name: {
    flex: 1,
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },
  ratingBadge: {
    borderRadius: 999,
    // backgroundColor: "#DBEAFE",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    // color: "#1D4ED8",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  currentPrice: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },
  discountBadge: {
    borderRadius: 999,
    backgroundColor: "#CCFBF1",
    color: "#115E59",
    paddingHorizontal: 10,
    paddingVertical: 6,
    fontWeight: "700",
    fontSize: 12,
  },
  originalPrice: {
    fontSize: 14,
    color: "#6B7280",
    textDecorationLine: "line-through",
  },
  description: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },
  primaryButton: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: "purple",
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
