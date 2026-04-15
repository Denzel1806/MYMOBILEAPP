import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Car } from '../../shared/interfaces/car.interface';
import { CartItem } from '../../shared/interfaces/cart-item.interface';
import { User } from '../../shared/interfaces/user.interface';
import { Order } from '../../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  async clear(): Promise<void> {
    await this._storage?.clear();
  }

  // User methods
  async getUser(): Promise<User | null> {
    return await this.get('user');
  }

  async setUser(user: User): Promise<void> {
    await this.set('user', user);
  }

  // Cars methods
  async getCars(): Promise<Car[]> {
    const cars = await this.get('cars');
    return cars || [];
  }

  async setCars(cars: Car[]): Promise<void> {
    await this.set('cars', cars);
  }

  // Cart methods
  async getCart(): Promise<CartItem[]> {
    const cart = await this.get('cart');
    return cart || [];
  }

  async addToCart(item: CartItem): Promise<void> {
    const cart = await this.getCart();
    cart.push(item);
    await this.set('cart', cart);
  }

  async removeFromCart(itemId: number): Promise<void> {
    const cart = await this.getCart();
    const filteredCart = cart.filter(item => item.id !== itemId);
    await this.set('cart', filteredCart);
  }

  async updateCartItem(item: CartItem): Promise<void> {
    const cart = await this.getCart();
    const index = cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      cart[index] = item;
      await this.set('cart', cart);
    }
  }

  async clearCart(): Promise<void> {
    await this.set('cart', []);
  }

  // Favorites methods
  async getFavorites(): Promise<Car[]> {
    const favorites = await this.get('favorites');
    return favorites || [];
  }

  async addToFavorites(car: Car): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.some(fav => fav.id === car.id)) {
      favorites.push(car);
      await this.set('favorites', favorites);
    }
  }

  async removeFromFavorites(carId: string): Promise<void> {
    const favorites = await this.getFavorites();
    const filteredFavorites = favorites.filter(car => car.id !== carId);
    await this.set('favorites', filteredFavorites);
  }

  // Orders methods
  async getOrders(): Promise<Order[]> {
    const orders = await this.get('orders');
    return orders || [];
  }

  async addOrder(order: Order): Promise<void> {
    const orders = await this.getOrders();
    orders.push(order);
    await this.set('orders', orders);
  }

  async clearAll(): Promise<void> {
    await this.clear();
  }
}