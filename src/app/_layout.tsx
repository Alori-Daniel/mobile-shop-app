import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="(screens)/product/[id]"
            options={{ title: "Product Details", headerBackTitle: "Home" }}
          />
          <Stack.Screen
            name="(screens)/checkout"
            options={{ title: "Checkout", presentation: "modal" }}
          />
          <Stack.Screen
            name="(screens)/orderConfirmation"
            options={{ title: "Order Confirmation", headerLeft: () => null }}
          />
        </Stack>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
