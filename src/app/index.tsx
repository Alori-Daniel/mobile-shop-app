import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Index = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/shopLogo.png")} style={styles.image} />
      <Text style={styles.text}>Shopping Made Easy</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 180,
    height: 180,
  },
  text: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },
});
