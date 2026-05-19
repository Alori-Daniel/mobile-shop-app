import ScreenMessage from "@/components/ScreenMessage";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { CheckoutFormValues } from "@/types";
import { calculateCartTotals } from "@/utils/cart";
import { formatCurrency } from "@/utils/currency";
import { CheckoutErrors, validateCheckoutForm } from "@/utils/validation";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const initialValues: CheckoutFormValues = {
  fullName: "",
  email: "",
  phone: "",
  addressLine: "",
  city: "",
  postalCode: "",
};

const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrderStore((state) => state.createOrder);

  const totals = calculateCartTotals(items);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = (field: keyof CheckoutFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const formErrors = validateCheckoutForm(values);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const order = createOrder({
      items: items.map((item) => ({ ...item })),
      customer: values,
      subtotal: totals.subtotal,
      discountTotal: totals.discountTotal,
      total: totals.total,
    });

    clearCart();
    setIsSubmitting(false);

    router.replace({
      pathname: "/orderConfirmation",
      params: { orderId: order.id },
    });
  };

  if (items.length === 0) {
    return (
      <ScreenWrapper>
        <ScreenMessage
          title="No items to checkout"
          description="Add a product to your cart before checkout."
          actionLabel="Go To Home"
          onAction={() => router.replace("/(tabs)/home")}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper scrollable>
      <View style={styles.container}>
        <Text style={styles.title}>Delivery Information</Text>

        <View style={styles.formCard}>
          <FormField
            label="Full Name"
            value={values.fullName}
            placeholder="John Doe"
            onChangeText={(value) => setFieldValue("fullName", value)}
            error={errors.fullName}
          />
          <FormField
            label="Email"
            value={values.email}
            placeholder="john@example.com"
            onChangeText={(value) => setFieldValue("email", value)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <FormField
            label="Phone"
            value={values.phone}
            placeholder="08012345678"
            onChangeText={(value) => setFieldValue("phone", value)}
            keyboardType="phone-pad"
            error={errors.phone}
          />
          <FormField
            label="Address"
            value={values.addressLine}
            placeholder="12 Main Street"
            onChangeText={(value) => setFieldValue("addressLine", value)}
            error={errors.addressLine}
          />
          <FormField
            label="City"
            value={values.city}
            placeholder="Lagos"
            onChangeText={(value) => setFieldValue("city", value)}
            error={errors.city}
          />
          <FormField
            label="Postal Code"
            value={values.postalCode}
            placeholder="100001"
            onChangeText={(value) => setFieldValue("postalCode", value)}
            error={errors.postalCode}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>

          <Row label="Subtotal" value={formatCurrency(totals.subtotal)} />
          <Row
            label="Discount"
            value={`-${formatCurrency(totals.discountTotal)}`}
            success
          />
          <Row label="Total" value={formatCurrency(totals.total)} emphasize />

          <Pressable
            style={[styles.payButton, isSubmitting && styles.payButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.payButtonText}>
              {isSubmitting ? "Processing Payment..." : "Pay & Place Order"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

type FormFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
};

const FormField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
  error,
}: FormFieldProps) => {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        style={[styles.input, error && styles.inputError]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

type RowProps = {
  label: string;
  value: string;
  success?: boolean;
  emphasize?: boolean;
};

const Row = ({
  label,
  value,
  success = false,
  emphasize = false,
}: RowProps) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, emphasize && styles.rowLabelEmphasis]}>
        {label}
      </Text>
      <Text
        style={[
          styles.rowValue,
          success && styles.rowValueSuccess,
          emphasize && styles.rowValueEmphasis,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },
  formCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 14,
    gap: 12,
  },
  fieldWrapper: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    color: "#0F172A",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 12,
  },
  summaryCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    padding: 14,
    gap: 10,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 14,
    color: "#475569",
  },
  rowLabelEmphasis: {
    color: "#0F172A",
    fontWeight: "700",
  },
  rowValue: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  rowValueSuccess: {
    color: "#047857",
  },
  rowValueEmphasis: {
    fontSize: 22,
    fontWeight: "700",
  },
  payButton: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: "#0F172A",
    alignItems: "center",
    paddingVertical: 14,
  },
  payButtonDisabled: {
    opacity: 0.65,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
