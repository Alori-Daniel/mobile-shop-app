import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
const index = () => {
  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
      router.push("(tabs)/home");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/shopLogo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Shopping Made Easy</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
