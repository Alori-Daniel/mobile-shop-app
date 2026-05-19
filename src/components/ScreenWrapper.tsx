import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = {
  scrollable?: boolean;
  children: React.ReactNode;
};

const ScreenWrapper = ({ scrollable = false, children }: ScreenProps) => {
  const insets = useSafeAreaInsets();
  return scrollable ? (
    <ScrollView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingHorizontal: 16 },
      ]}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingHorizontal: 16 },
      ]}
    >
      {children}
    </View>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
