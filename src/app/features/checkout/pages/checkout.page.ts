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
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonBadge,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons/icons';
import {
  chevronBack,
  addOutline,
  removeOutline,
  trashOutline,
  cardOutline,
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
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/cart"></ion-back-button>
        </ion-buttons>
        <ion-title>Checkout</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
        <div class="checkout-content">
          <!-- Order Summary -->
          <div class="order-summary-section">
            <h3>Order Summary</h3>
            <div class="cart-items">
              <div class="cart-item" *ngFor="let item of cartItems">
                <div class="item-image">
                  <img [src]="item.car.thumbnail" [alt]="item.car.brand + ' ' + item.car.model" />
                </div>
                <div class="checkout-item-details">
                  <h4>{{ item.car.brand }} {{ item.car.model }}</h4>
                  <p class="item-price">${{ item.car.price | number }}</p>
                  <div class="quantity-controls">
                    <ion-button
                      fill="clear"
                      size="small"
                      (click)="updateQuantity(item, item.quantity - 1)"
                      [disabled]="item.quantity <= 1"
                    >
                      <ion-icon name="remove-outline"></ion-icon>
                    </ion-button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <ion-button
                      fill="clear"
                      size="small"
                      (click)="updateQuantity(item, item.quantity + 1)"
                    >
                      <ion-icon name="add-outline"></ion-icon>
                    </ion-button>
                  </div>
                </div>
                <div class="item-total">
                  <p>${{ (item.car.price * item.quantity) | number }}</p>
                  <ion-button
                    fill="clear"
                    color="danger"
                    size="small"
                    (click)="removeItem(item)"
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </ion-button>
                </div>
              </div>
            </div>

            <div class="order-totals">
              <div class="total-row">
                <span>Subtotal</span>
                <span>${{ subtotal | number }}</span>
              </div>
              <div class="total-row">
                <span>Tax (8.5%)</span>
                <span>${{ tax | number }}</span>
              </div>
              <div class="total-row">
                <span>Shipping</span>
                <span>{{ shipping === 0 ? 'Free' : '$' + shipping }}</span>
              </div>
              <div class="total-row total">
                <span>Total</span>
                <span>${{ total | number }}</span>
              </div>
            </div>
          </div>

          <!-- Shipping Information -->
          <div class="shipping-section">
            <h3>Shipping Information</h3>
            <ion-list>
              <ion-item>
                <ion-input
                  label="Full Name"
                  labelPlacement="stacked"
                  formControlName="fullName"
                  placeholder="Enter your full name"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="Email"
                  labelPlacement="stacked"
                  type="email"
                  formControlName="email"
                  placeholder="Enter your email"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="Phone"
                  labelPlacement="stacked"
                  type="tel"
                  formControlName="phone"
                  placeholder="Enter your phone number"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="Address"
                  labelPlacement="stacked"
                  formControlName="address"
                  placeholder="Enter your address"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-input
                  label="City"
                  labelPlacement="stacked"
                  formControlName="city"
                  placeholder="Enter your city"
                ></ion-input>
              </ion-item>
              <ion-row>
                <ion-col size="6">
                  <ion-item>
                    <ion-input
                      label="State"
                      labelPlacement="stacked"
                      formControlName="state"
                      placeholder="State"
                    ></ion-input>
                  </ion-item>
                </ion-col>
                <ion-col size="6">
                  <ion-item>
                    <ion-input
                      label="ZIP Code"
                      labelPlacement="stacked"
                      formControlName="zipCode"
                      placeholder="ZIP"
                    ></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-list>
          </div>

          <!-- Payment Information -->
          <div class="payment-section">
            <h3>Payment Information</h3>
            <ion-list>
              <ion-item>
                <ion-input
                  label="Card Number"
                  labelPlacement="stacked"
                  formControlName="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  type="tel"
                ></ion-input>
              </ion-item>
              <ion-row>
                <ion-col size="6">
                  <ion-item>
                    <ion-input
                      label="Expiry Date"
                      labelPlacement="stacked"
                      formControlName="expiryDate"
                      placeholder="MM/YY"
                    ></ion-input>
                  </ion-item>
                </ion-col>
                <ion-col size="6">
                  <ion-item>
                    <ion-input
                      label="CVV"
                      labelPlacement="stacked"
                      formControlName="cvv"
                      placeholder="123"
                      type="password"
                    ></ion-input>
                  </ion-item>
                </ion-col>
              </ion-row>
              <ion-item>
                <ion-input
                  label="Cardholder Name"
                  labelPlacement="stacked"
                  formControlName="cardholderName"
                  placeholder="Name on card"
                ></ion-input>
              </ion-item>
            </ion-list>
          </div>

          <!-- Terms and Conditions -->
          <div class="terms-section">
            <ion-item lines="none">
              <ion-checkbox
                slot="start"
                formControlName="acceptTerms"
                color="primary"
              ></ion-checkbox>
              <ion-label>
                I agree to the <a href="#" class="link">Terms and Conditions</a> and
                <a href="#" class="link">Privacy Policy</a>
              </ion-label>
            </ion-item>
          </div>

          <!-- Checkout Button -->
          <div class="checkout-actions">
            <ion-button
              expand="block"
              size="large"
              type="submit"
              [disabled]="!checkoutForm.valid || cartItems.length === 0"
              class="checkout-btn"
            >
              <ion-icon name="card-outline" slot="start"></ion-icon>
              Complete Order - ${{ total | number }}
            </ion-button>
          </div>
        </div>
      </form>
    </ion-content>
  `,
  styles: [],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonCheckbox,
    IonBadge,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
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
          fullName: this.user.name,
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

  async onSubmit() {
    if (this.checkoutForm.valid) {
      try {
        const order: Order = {
          id: Date.now(),
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
          createdAt: new Date(),
        };

        await this.storageService.addOrder(order);
        await this.storageService.clearCart();

        this.showToast('Order placed successfully!');
        this.router.navigate(['/order-success'], {
          queryParams: { orderId: order.id }
        });
      } catch (error) {
        console.error('Error placing order:', error);
        this.showToast('Error placing order. Please try again.');
      }
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