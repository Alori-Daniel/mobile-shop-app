import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
      router.push("(tabs)/home");
    }, 2000);
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
