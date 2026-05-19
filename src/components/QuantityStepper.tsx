import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type QuantityStepperProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const QuantityStepper = ({ quantity, onDecrease, onIncrease }: QuantityStepperProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onDecrease} style={styles.button}>
        <Text style={styles.symbol}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable onPress={onIncrease} style={styles.button}>
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
};

export default QuantityStepper;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  button: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  quantity: {
    minWidth: 34,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});
