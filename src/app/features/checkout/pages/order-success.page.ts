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
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  homeOutline,
  bagOutline,
  shareOutline,
} from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { Order } from '../../../shared/interfaces/order.interface';

@Component({
  selector: 'app-order-success',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Order Confirmed</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="order-success-content">
        <!-- Success Message -->
        <div class="success-section">
          <div class="success-icon">
            <ion-icon name="checkmark-circle-outline" size="large"></ion-icon>
          </div>
          <h1 class="success-title">Order Confirmed!</h1>
          <p class="success-message">
            Thank you for your purchase. Your order has been successfully placed and is being processed.
          </p>
          <div class="order-number">
            <span class="label">Order #</span>
            <span class="number">{{ order?.id }}</span>
          </div>
        </div>

        <!-- Order Details -->
        <div class="order-details-section" *ngIf="order">
          <h3>Order Summary</h3>

          <div class="order-items">
            <div class="order-item" *ngFor="let item of order.items">
              <div class="item-image">
                <img [src]="item.car.thumbnail" [alt]="item.car.brand + ' ' + item.car.model" />
              </div>
              <div class="order-item-details">
                <h4>{{ item.car.brand }} {{ item.car.model }}</h4>
                <p class="item-specs">{{ item.car.year }} • {{ item.car.fuelType }}</p>
                <p class="item-quantity">Quantity: {{ item.quantity }}</p>
              </div>
              <div class="item-price">
                <p>\${{ (item.car.price * item.quantity) | number }}</p>
              </div>
            </div>
          </div>

          <div class="order-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>\${{ order.subtotal | number }}</span>
            </div>
            <div class="total-row">
              <span>Tax</span>
              <span>\${{ order.tax | number }}</span>
            </div>
            <div class="total-row">
              <span>Shipping</span>
              <span>{{ order.shipping === 0 ? 'Free' : '$' + order.shipping }}</span>
            </div>
            <div class="total-row total">
              <span>Total</span>
              <span>\${{ order.total | number }}</span>
            </div>
          </div>
        </div>

        <!-- Shipping Information -->
        <div class="shipping-info-section" *ngIf="order">
          <h3>Shipping Information</h3>
          <div class="info-card">
            <div class="info-row">
              <span class="label">Name:</span>
              <span class="value">{{ order.shippingInfo.fullName }}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">{{ order.shippingInfo.email }}</span>
            </div>
            <div class="info-row">
              <span class="label">Phone:</span>
              <span class="value">{{ order.shippingInfo.phone }}</span>
            </div>
            <div class="info-row">
              <span class="label">Address:</span>
              <span class="value">
                {{ order.shippingInfo.address }}<br>
                {{ order.shippingInfo.city }}, {{ order.shippingInfo.state }} {{ order.shippingInfo.zipCode }}
              </span>
            </div>
          </div>
        </div>

        <!-- What's Next -->
        <div class="next-steps-section">
          <h3>What's Next?</h3>
          <div class="steps-list">
            <div class="step">
              <div class="step-icon">
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <div class="step-content">
                <h4>Order Confirmation</h4>
                <p>You'll receive an email confirmation with your order details.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">
                <ion-icon name="car-outline"></ion-icon>
              </div>
              <div class="step-content">
                <h4>Processing</h4>
                <p>We'll prepare your vehicle for delivery within 2-3 business days.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon">
                <ion-icon name="location-outline"></ion-icon>
              </div>
              <div class="step-content">
                <h4>Delivery</h4>
                <p>Your car will be delivered to the address provided.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <ion-button
            expand="block"
            fill="solid"
            routerLink="/tabs/home"
            class="primary-btn"
          >
            <ion-icon name="home-outline" slot="start"></ion-icon>
            Continue Shopping
          </ion-button>

          <ion-button
            expand="block"
            fill="outline"
            routerLink="/tabs/account"
            class="secondary-btn"
          >
            <ion-icon name="bag-outline" slot="start"></ion-icon>
            View Order History
          </ion-button>

          <ion-button
            expand="block"
            fill="clear"
            (click)="shareOrder()"
            class="share-btn"
          >
            <ion-icon name="share-outline" slot="start"></ion-icon>
            Share Order
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
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
    IonBadge,
    CommonModule,
    FormsModule,
  ],
})
export class OrderSuccessPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storageService = inject(StorageService);

  order: Order | null = null;

  constructor() {
    addIcons({
      checkmarkCircleOutline,
      homeOutline,
      bagOutline,
      shareOutline,
    });
  }

  async ngOnInit() {
    const orderId = this.route.snapshot.queryParams['orderId'];
    if (orderId) {
      await this.loadOrder(orderId);
    }
  }

  async loadOrder(orderId: string) {
    try {
      const orders = await this.storageService.getOrders();
      this.order = orders.find(o => o.id === orderId) || null;
    } catch (error) {
      console.error('Error loading order:', error);
    }
  }

  async shareOrder() {
    if (!this.order) return;

    const shareData = {
      title: 'My AUTOSHOWROOM Order',
      text: `I just ordered a ${this.order.items[0]?.car.brand} ${this.order.items[0]?.car.model} from AUTOSHOWROOM! Order #${this.order.id}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      // Could show a toast here
    }
  }
}