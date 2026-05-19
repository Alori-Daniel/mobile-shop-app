import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Meal } from "@/types";
import { getDiscountedPrice, getRatingOutOfFive } from "@/utils/cart";
import { formatCurrency } from "@/utils/currency";

import ProductImage from "./ProductImage";

type ProductCardProps = {
  meal: Meal;
  onPress: () => void;
  onAddToCart: () => void;
};

const ProductCard = ({ meal, onPress, onAddToCart }: ProductCardProps) => {
  const discountedPrice = getDiscountedPrice(meal);

  return (
    <View style={styles.card}>
      <Pressable onPress={onPress}>
        <ProductImage uri={meal.image} label={meal.name} height={140} />
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={1}>
            {meal.name}
          </Text>
          <Text style={styles.rating}>
            Rating: {getRatingOutOfFive(meal.rating)}/5
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.currentPrice}>
              {formatCurrency(discountedPrice)}
            </Text>
            {meal.discount > 0 ? (
              <Text style={styles.discount}>{meal.discount}% off</Text>
            ) : null}
          </View>

          {meal.discount > 0 ? (
            <Text style={styles.originalPrice}>
              {formatCurrency(meal.price)}
            </Text>
          ) : null}
        </View>
      </Pressable>

      <Pressable onPress={onAddToCart} style={styles.button}>
        <Text style={styles.buttonText}>Add To Cart</Text>
      </Pressable>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  content: {
    padding: 12,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  rating: {
    fontSize: 13,
    color: "#4B5563",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  currentPrice: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  discount: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0F766E",
    backgroundColor: "#CCFBF1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#6B7280",
  },
  button: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});
