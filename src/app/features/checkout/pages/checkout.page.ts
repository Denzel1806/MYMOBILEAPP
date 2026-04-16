import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonCheckbox,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBack,
  addOutline,
  removeOutline,
  trashOutline,
  cardOutline,
  shieldCheckmarkOutline,
  carSportOutline,
  locationOutline,
  personOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { CartItem } from '../../../shared/interfaces/cart-item.interface';
import { Order } from '../../../shared/interfaces/order.interface';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonCheckbox,
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/cart"></ion-back-button>
        </ion-buttons>
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="checkout-page">
      <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
        <div class="page-shell">
          <div class="hero">
            <div>
              <p class="eyebrow">Secure Purchase</p>
              <h1>Complete Your Order</h1>
              <p class="subtitle">Review your vehicles, delivery details, and payment information.</p>
            </div>
            <div class="secure-chip">
              <ion-icon name="shield-checkmark-outline"></ion-icon>
              <span>Secure Checkout</span>
            </div>
          </div>

          <div class="content-grid">
            <div class="left-column">
              <section class="glass-card">
                <div class="section-title">
                  <ion-icon name="car-sport-outline"></ion-icon>
                  <h3>Order Summary</h3>
                </div>

                <div class="cart-items">
                  <div class="cart-item" *ngFor="let item of cartItems">
                    <div class="item-image">
                      <img [src]="item.car.thumbnail" [alt]="item.car.brand + ' ' + item.car.model" />
                    </div>

                    <div class="item-details">
                      <h4>{{ item.car.brand }} {{ item.car.model }}</h4>
                      <p>{{ item.car.year }} • {{ item.car.transmission }} • {{ item.car.fuelType }}</p>
                      <div class="price">\${{ item.car.price | number }}</div>
                    </div>

                    <div class="item-actions">
                      <div class="quantity-controls">
                        <ion-button fill="clear" size="small" (click)="updateQuantity(item, item.quantity - 1)" [disabled]="item.quantity <= 1">
                          <ion-icon name="remove-outline"></ion-icon>
                        </ion-button>
                        <span class="quantity">{{ item.quantity }}</span>
                        <ion-button fill="clear" size="small" (click)="updateQuantity(item, item.quantity + 1)">
                          <ion-icon name="add-outline"></ion-icon>
                        </ion-button>
                      </div>

                      <div class="line-total">\${{ item.car.price * item.quantity | number }}</div>

                      <ion-button fill="clear" color="danger" size="small" (click)="removeItem(item)">
                        <ion-icon name="trash-outline"></ion-icon>
                      </ion-button>
                    </div>
                  </div>
                </div>
              </section>

              <section class="glass-card">
                <div class="section-title">
                  <ion-icon name="person-outline"></ion-icon>
                  <h3>Shipping Information</h3>
                </div>

                <ion-list class="form-list">
                  <ion-item>
                    <ion-input label="Full Name" labelPlacement="stacked" formControlName="fullName" placeholder="Enter your full name"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-input label="Email" labelPlacement="stacked" type="email" formControlName="email" placeholder="Enter your email"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-input label="Phone" labelPlacement="stacked" type="tel" formControlName="phone" placeholder="Enter your phone number"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-input label="Address" labelPlacement="stacked" formControlName="address" placeholder="Enter your address"></ion-input>
                  </ion-item>
                  <div class="grid-two">
                    <ion-item>
                      <ion-input label="City" labelPlacement="stacked" formControlName="city" placeholder="City"></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-input label="State" labelPlacement="stacked" formControlName="state" placeholder="State"></ion-input>
                    </ion-item>
                  </div>
                  <ion-item>
                    <ion-input label="ZIP Code" labelPlacement="stacked" formControlName="zipCode" placeholder="ZIP Code"></ion-input>
                  </ion-item>
                </ion-list>
              </section>

              <section class="glass-card">
                <div class="section-title">
                  <ion-icon name="card-outline"></ion-icon>
                  <h3>Payment Information</h3>
                </div>

                <ion-list class="form-list">
                  <ion-item>
                    <ion-input label="Card Number" labelPlacement="stacked" formControlName="cardNumber" placeholder="1234567890123456" type="tel"></ion-input>
                  </ion-item>
                  <div class="grid-two">
                    <ion-item>
                      <ion-input label="Expiry Date" labelPlacement="stacked" formControlName="expiryDate" placeholder="MM/YY"></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-input label="CVV" labelPlacement="stacked" formControlName="cvv" placeholder="123" type="password"></ion-input>
                    </ion-item>
                  </div>
                  <ion-item>
                    <ion-input label="Cardholder Name" labelPlacement="stacked" formControlName="cardholderName" placeholder="Name on card"></ion-input>
                  </ion-item>
                </ion-list>
              </section>
            </div>

            <div class="right-column">
              <section class="summary-card">
                <h3>Payment Summary</h3>

                <div class="summary-row">
                  <span>Subtotal</span>
                  <strong>\${{ subtotal | number }}</strong>
                </div>
                <div class="summary-row">
                  <span>Tax (8.5%)</span>
                  <strong>\${{ tax | number }}</strong>
                </div>
                <div class="summary-row">
                  <span>Shipping</span>
                  <strong>{{ shipping === 0 ? 'Free' : '$' + (shipping | number:'1.2-2') }}</strong>
                </div>

                <div class="summary-total">
                  <span>Total</span>
                  <strong>\${{ total | number }}</strong>
                </div>

                <div class="terms-box">
                  <ion-item lines="none">
                    <ion-checkbox slot="start" formControlName="acceptTerms" color="primary"></ion-checkbox>
                    <ion-label>
                      I agree to the Terms and Conditions and Privacy Policy
                    </ion-label>
                  </ion-item>
                </div>

                <ion-button expand="block" size="large" type="submit" [disabled]="!checkoutForm.valid || cartItems.length === 0" class="checkout-btn">
                  <ion-icon name="card-outline" slot="start"></ion-icon>
                  Complete Order - \${{ total | number }}
                </ion-button>

                <p class="safe-note">
                  <ion-icon name="shield-checkmark-outline"></ion-icon>
                  Your payment details are encrypted and securely processed.
                </p>
              </section>
            </div>
          </div>
        </div>
      </form>
    </ion-content>
  `,
  styles: [`
    .checkout-page {
      --background: linear-gradient(180deg, #0f172a 0%, #111827 28%, #f8fafc 28%, #f8fafc 100%);
    }

    .page-shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 16px 40px;
    }

    .hero {
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      padding: 6px 4px 24px;
      flex-wrap: wrap;
    }

    .eyebrow {
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      margin: 0 0 8px;
      opacity: 0.8;
    }

    .hero h1 {
      margin: 0;
      font-size: 30px;
      font-weight: 800;
    }

    .subtitle {
      margin: 8px 0 0;
      color: rgba(255,255,255,0.82);
      max-width: 680px;
    }

    .secure-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      color: white;
      backdrop-filter: blur(10px);
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1.6fr 0.9fr;
      gap: 20px;
      align-items: start;
    }

    .left-column,
    .right-column {
      display: grid;
      gap: 20px;
    }

    .glass-card,
    .summary-card {
      background: rgba(255,255,255,0.88);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      color: #0f172a;
    }

    .section-title h3,
    .summary-card h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
    }

    .cart-items {
      display: grid;
      gap: 14px;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 96px 1fr auto;
      gap: 14px;
      align-items: center;
      padding: 12px;
      border-radius: 20px;
      background: #f8fafc;
    }

    .item-image img {
      width: 96px;
      height: 96px;
      border-radius: 16px;
      object-fit: cover;
    }

    .item-details h4 {
      margin: 0 0 6px;
      font-size: 17px;
      color: #0f172a;
    }

    .item-details p {
      margin: 0 0 8px;
      color: #64748b;
      font-size: 14px;
    }

    .price,
    .line-total {
      font-weight: 700;
      color: #0f172a;
    }

    .item-actions {
      display: grid;
      justify-items: end;
      gap: 8px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      background: white;
      border-radius: 999px;
      padding: 2px 6px;
    }

    .quantity {
      min-width: 24px;
      text-align: center;
      font-weight: 700;
    }

    .form-list,
    ion-list {
      background: transparent;
    }

    ion-item {
      --background: #fff;
      --border-radius: 16px;
      --padding-start: 14px;
      --inner-padding-end: 14px;
      margin-bottom: 12px;
      border-radius: 16px;
    }

    .grid-two {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .summary-row,
    .summary-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      color: #0f172a;
    }

    .summary-total {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      font-size: 20px;
    }

    .terms-box {
      margin: 18px 0;
      padding: 12px;
      border-radius: 18px;
      background: #f8fafc;
    }

    .checkout-btn {
      --border-radius: 18px;
      --padding-top: 18px;
      --padding-bottom: 18px;
      font-weight: 700;
    }

    .safe-note {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #64748b;
      font-size: 14px;
      margin: 14px 0 0;
    }

    @media (max-width: 960px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .cart-item {
        grid-template-columns: 1fr;
      }

      .item-actions {
        justify-items: start;
      }

      .grid-two {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class CheckoutPage implements OnInit {
  private router = inject(Router);
  private storageService = inject(StorageService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private fb = inject(FormBuilder);

  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  user: User | null = null;

  constructor() {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      cardholderName: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
    });

    addIcons({
      chevronBack,
      addOutline,
      removeOutline,
      trashOutline,
      cardOutline,
      shieldCheckmarkOutline,
      carSportOutline,
      locationOutline,
      personOutline,
    });
  }

  async ngOnInit() {
    await this.loadCartItems();
    await this.loadUserData();

    if (this.cartItems.length === 0) {
      this.router.navigate(['/tabs/cart']);
    }
  }

  async loadCartItems() {
    try {
      this.cartItems = await this.storageService.getCart();
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  async loadUserData() {
    try {
      this.user = await this.storageService.getUser();
      if (this.user) {
        this.checkoutForm.patchValue({
          fullName: this.user.fullName,
          email: this.user.email,
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  updateQuantity(item: CartItem, newQuantity: number) {
    if (newQuantity < 1) return;
    item.quantity = newQuantity;
    this.storageService.updateCartItem(item);
  }

  async removeItem(item: CartItem) {
    const alert = await this.alertController.create({
      header: 'Remove Item',
      message: 'Are you sure you want to remove this item from your cart?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Remove',
          role: 'destructive',
          handler: async () => {
            await this.storageService.removeFromCart(item.id);
            await this.loadCartItems();

            if (this.cartItems.length === 0) {
              this.router.navigate(['/tabs/cart']);
            }
          },
        },
      ],
    });

    await alert.present();
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.car.price * item.quantity, 0);
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

  async onSubmit() {
    if (!this.checkoutForm.valid) return;

    try {
      const order: Order = {
        id: Date.now().toString(),
        items: this.cartItems,
        shippingInfo: {
          fullName: this.checkoutForm.value.fullName,
          email: this.checkoutForm.value.email,
          phone: this.checkoutForm.value.phone,
          address: this.checkoutForm.value.address,
          city: this.checkoutForm.value.city,
          state: this.checkoutForm.value.state,
          zipCode: this.checkoutForm.value.zipCode,
        },
        paymentInfo: {
          cardNumber: this.checkoutForm.value.cardNumber.replace(/\d(?=\d{4})/g, '*'),
          expiryDate: this.checkoutForm.value.expiryDate,
          cardholderName: this.checkoutForm.value.cardholderName,
        },
        subtotal: this.subtotal,
        tax: this.tax,
        shipping: this.shipping,
        total: this.total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      await this.storageService.addOrder(order);
      await this.storageService.clearCart();

      this.showToast('Order placed successfully!');
      this.router.navigate(['/order-success'], {
        queryParams: { orderId: order.id },
      });
    } catch (error) {
      console.error('Error placing order:', error);
      this.showToast('Error placing order. Please try again.');
    }
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