import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ScreenMessageProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
};

const ScreenMessage = ({
  title,
  description,
  actionLabel,
  onAction,
  loading = false,
}: ScreenMessageProps) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#2563EB"
          style={styles.spinner}
        />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {actionLabel && onAction ? (
        <Pressable style={styles.actionButton} onPress={onAction}>
          <Text style={styles.actionText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default ScreenMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 24,
  },
  spinner: {
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4B5563",
    textAlign: "center",
  },
  actionButton: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "purple",
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
});
