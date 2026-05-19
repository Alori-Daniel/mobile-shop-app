import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type ProductImageProps = {
  uri: string;
  label: string;
  height?: number;
};

const palette = ["#E8F2FF", "#FFF0E6", "#EAFBE7", "#F4EBFF", "#FFE7EC", "#E8F9F5"];

const ProductImage = ({ uri, label, height = 160 }: ProductImageProps) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [uri]);

  const fallbackColor = useMemo(() => {
    const index = Math.abs(label.length) % palette.length;
    return palette[index];
  }, [label]);

  if (!uri || hasError) {
    return (
      <View style={[styles.fallback, { backgroundColor: fallbackColor, height }]}> 
        <Text style={styles.fallbackText}>{label.slice(0, 1).toUpperCase()}</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: "100%", height }}
      contentFit="cover"
      transition={150}
      onError={() => setHasError(true)}
    />
  );
};

export default ProductImage;

const styles = StyleSheet.create({
  fallback: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#374151",
  },
});
