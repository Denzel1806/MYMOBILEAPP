export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string | null;
  savedAddresses: Address[];
  paymentMethods: PaymentMethod[];
}

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  lastFour: string;
  expiryMonth: number;
  expiryYear: number;
}