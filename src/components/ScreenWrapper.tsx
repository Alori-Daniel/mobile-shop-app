import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = {
  scrollable?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const ScreenWrapper = ({
  scrollable = false,
  children,
  style,
  contentContainerStyle,
}: ScreenProps) => {
  const insets = useSafeAreaInsets();

  const basePadding = {
    paddingTop: insets.top,
    // paddingBottom: insets.bottom,
    paddingHorizontal: 16,
  };

  if (scrollable) {
    return (
      <ScrollView
        style={[styles.container, style]}
        contentContainerStyle={[
          styles.scrollContent,
          basePadding,
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[styles.container, basePadding, style]}>{children}</View>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
  },
});
