export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
  paymentMethod: string;
  createdAt: string;
}