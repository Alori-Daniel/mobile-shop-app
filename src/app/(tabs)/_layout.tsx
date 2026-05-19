import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCartStore } from "@/store/cartStore";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const cartItemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  return (
    <Tabs
      screenOptions={{
        tabBarLabelPosition: "below-icon",
        tabBarActiveTintColor: "#0F172A",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          paddingHorizontal: 10,
          height: Platform.OS === "android" ? 58 + insets.bottom : 86,
          alignItems: "center",
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#CBD5E1",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={22} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => <Ionicons name="cart-outline" color={color} size={22} />,
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => <Ionicons name="receipt-outline" color={color} size={22} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" color={color} size={22} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
