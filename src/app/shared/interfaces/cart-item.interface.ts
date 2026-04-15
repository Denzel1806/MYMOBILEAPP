import { Car } from './car.interface';

export interface CartItem {
  id: number;
  car: Car;
  quantity: number;
  addedAt: Date;
}