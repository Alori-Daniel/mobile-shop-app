import { CheckoutFormValues } from "@/types";

export type CheckoutErrors = Partial<Record<keyof CheckoutFormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9+()\-\s]{10,}$/;

export const validateCheckoutForm = (values: CheckoutFormValues): CheckoutErrors => {
  const errors: CheckoutErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!emailRegex.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!phoneRegex.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (values.addressLine.trim().length < 5) {
    errors.addressLine = "Enter a complete delivery address.";
  }

  if (values.city.trim().length < 2) {
    errors.city = "City is required.";
  }

  if (values.postalCode.trim().length < 3) {
    errors.postalCode = "Postal code is required.";
  }

  return errors;
};
