import { CartItem } from './cart-item.interface';

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}