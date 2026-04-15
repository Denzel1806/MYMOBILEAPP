import { CartItem } from './cart-item.interface';

export interface Order {
  id: string;
  items: CartItem[];
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentInfo: {
    cardNumber: string;
    expiryDate: string;
    cardholderName: string;
  };
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}