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
  styles: [`
    .cart-page {
      --background: linear-gradient(180deg, #0f172a 0%, #111827 24%, #f8fafc 24%, #f8fafc 100%);
    }

    .cart-shell {
      max-width: 1240px;
      margin: 0 auto;
      padding: 20px 16px 40px;
    }

    .hero-section {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
      color: white;
      padding: 8px 4px 24px;
    }

    .eyebrow {
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      opacity: 0.8;
    }

    .hero-copy h1 {
      margin: 0;
      font-size: 34px;
      font-weight: 800;
      line-height: 1.1;
    }

    .subtitle {
      margin: 10px 0 0;
      color: rgba(255,255,255,0.82);
      max-width: 620px;
      line-height: 1.5;
    }

    .hero-stat {
      min-width: 150px;
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(10px);
      border-radius: 22px;
      padding: 18px;
      text-align: center;
    }

    .hero-stat strong {
      display: block;
      font-size: 30px;
      font-weight: 800;
    }

    .hero-stat span {
      font-size: 13px;
      color: rgba(255,255,255,0.78);
    }

    .loading-section,
    .cart-items-card,
    .cart-summary-card,
    .empty-cart {
      background: rgba(255,255,255,0.94);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .loading-section {
      padding: 40px 20px;
      text-align: center;
    }

    .loading-section p {
      margin-top: 12px;
      color: #64748b;
    }

    .cart-layout {
      display: grid;
      grid-template-columns: 1.5fr 0.9fr;
      gap: 20px;
      align-items: start;
    }

    .cart-items-card,
    .cart-summary-card {
      padding: 20px;
    }

    .cart-summary-card {
      position: sticky;
      top: 16px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    .section-header h3,
    .cart-summary-card h3 {
      margin: 0;
      color: #0f172a;
      font-size: 22px;
    }

    .cart-items {
      display: grid;
      gap: 14px;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 120px 1fr auto;
      gap: 16px;
      align-items: center;
      padding: 14px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
    }

    .item-image {
      cursor: pointer;
    }

    .item-image img {
      width: 120px;
      height: 100px;
      object-fit: cover;
      border-radius: 18px;
      display: block;
      background: #e5e7eb;
    }

    .item-title {
      margin: 0 0 6px;
      font-size: 18px;
      color: #0f172a;
      font-weight: 700;
    }

    .item-meta {
      margin: 0 0 8px;
      color: #64748b;
      font-size: 14px;
    }

    .item-price {
      margin: 0 0 10px;
      color: #0f172a;
      font-weight: 700;
      font-size: 16px;
    }

    .quantity-controls {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 4px 8px;
      background: white;
      border-radius: 999px;
      border: 1px solid #e2e8f0;
    }

    .quantity {
      min-width: 22px;
      text-align: center;
      font-weight: 700;
      color: #0f172a;
    }

    .item-actions {
      display: grid;
      justify-items: end;
      gap: 10px;
    }

    .item-total {
      margin: 0;
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
    }

    .item-action-buttons {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
    }

    .summary-row.total {
      font-size: 20px;
      font-weight: 800;
      border-bottom: 0;
      padding-top: 18px;
    }

    .summary-actions {
      display: grid;
      gap: 12px;
      margin-top: 20px;
    }

    .checkout-btn,
    .shop-btn {
      --border-radius: 18px;
      min-height: 52px;
      font-weight: 700;
    }

    .empty-cart {
      padding: 56px 24px;
      text-align: center;
    }

    .empty-icon-wrap {
      width: 84px;
      height: 84px;
      margin: 0 auto 16px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #dbeafe;
      color: #2563eb;
    }

    .empty-icon {
      font-size: 36px;
    }

    .empty-cart h3 {
      margin: 0 0 8px;
      color: #0f172a;
      font-size: 24px;
    }

    .empty-cart p {
      margin: 0 0 20px;
      color: #64748b;
    }

    .empty-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    @media (max-width: 960px) {
      .cart-layout {
        grid-template-columns: 1fr;
      }

      .cart-summary-card {
        position: static;
      }
    }

    @media (max-width: 720px) {
      .hero-copy h1 {
        font-size: 28px;
      }

      .cart-item {
        grid-template-columns: 1fr;
      }

      .item-image img {
        width: 100%;
        height: 220px;
      }

      .item-actions {
        justify-items: start;
      }
    }
  `],
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