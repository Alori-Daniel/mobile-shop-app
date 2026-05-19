import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
