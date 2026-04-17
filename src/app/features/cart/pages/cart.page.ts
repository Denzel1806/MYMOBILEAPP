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
  heartOutline,
  homeOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { CartItem } from '../../../shared/interfaces/cart-item.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrl: './cart.page.scss',
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
  private router = inject(Router);
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
      heartOutline,
      homeOutline,
    });
  }

  async ngOnInit() {
    await this.loadCartItems();
  }

  async ionViewWillEnter() {
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
    await this.loadCartItems();
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
            await this.showToast('Item removed from cart');
          },
        },
      ],
    });

    await alert.present();
  }

  viewCarDetails(item: CartItem) {
    this.router.navigate(['/car', item.car.id]);
  }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }

  goToShop() {
    this.router.navigate(['/tabs/shop']);
  }

  goToFavorites() {
    this.router.navigate(['/tabs/favorites']);
  }

  goToHome() {
    this.router.navigate(['/tabs/home']);
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.car.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * 0.085;
  }

  get shipping(): number {
    return this.subtotal > 500 ? 0 : 29.99;
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