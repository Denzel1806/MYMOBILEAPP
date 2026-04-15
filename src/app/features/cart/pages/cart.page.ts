import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
  IonText,
  IonCard,
  IonCardContent,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  trashOutline,
  addOutline,
  removeOutline,
  bagHandleOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { CartItem } from '../../../shared/interfaces/cart-item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styles: [],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonSpinner,
    CommonModule,
    FormsModule,
  ],
})
export class CartPage implements OnInit {
  private storageService = inject(StorageService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  cartItems: CartItem[] = [];
  isLoading = false;

  constructor() {
    addIcons({
      trashOutline,
      addOutline,
      removeOutline,
      bagHandleOutline,
    });
  }

  async ngOnInit() {
    await this.loadCartItems();
  }

  async loadCartItems() {
    try {
      this.isLoading = true;
      this.cartItems = await this.storageService.getCart();
    } catch (error) {
      console.error('Error loading cart items:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1) return;

    item.quantity = newQuantity;
    await this.storageService.updateCartItem(item);
    await this.loadCartItems(); // Refresh to update totals
  }

  async removeItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Remove Item',
      message: 'Are you sure you want to remove this item from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          role: 'destructive',
          handler: async () => {
            await this.storageService.removeFromCart(item.id);
            await this.loadCartItems();
            this.showToast('Item removed from cart');
          },
        },
      ],
    });

    await alert.present();
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.car.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * 0.085; // 8.5% tax
  }

  get shipping(): number {
    return this.subtotal > 500 ? 0 : 29.99; // Free shipping over $500
  }

  get total(): number {
    return this.subtotal + this.tax + this.shipping;
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
}