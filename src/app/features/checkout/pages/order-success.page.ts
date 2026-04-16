import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkCircleOutline,
  homeOutline,
  bagOutline,
  shareOutline,
  mailOutline,
  carOutline,
  locationOutline,
  receiptOutline,
} from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { Order } from '../../../shared/interfaces/order.interface';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Order Confirmed</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="success-page">
      <div class="page-shell" *ngIf="order">
        <section class="hero-card">
          <div class="success-icon">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>

          <p class="eyebrow">Purchase Complete</p>
          <h1>Order Confirmed!</h1>
          <p class="hero-message">
            Thank you for your purchase. Your order is confirmed and now being prepared.
          </p>

          <div class="order-pill">
            <span>Order #</span>
            <strong>{{ order.id }}</strong>
          </div>
        </section>

        <div class="content-grid">
          <section class="card">
            <div class="section-header">
              <ion-icon name="receipt-outline"></ion-icon>
              <h3>Order Summary</h3>
            </div>

            <div class="order-items">
              <div class="order-item" *ngFor="let item of order.items">
                <div class="item-image">
                  <img [src]="item.car.thumbnail" [alt]="item.car.brand + ' ' + item.car.model" />
                </div>
                <div class="item-info">
                  <h4>{{ item.car.brand }} {{ item.car.model }}</h4>
                  <p>{{ item.car.year }} • {{ item.car.transmission }} • {{ item.car.fuelType }}</p>
                  <span>Quantity: {{ item.quantity }}</span>
                </div>
                <div class="item-total">\${{ item.car.price * item.quantity | number }}</div>
              </div>
            </div>

            <div class="totals">
              <div class="row"><span>Subtotal</span><strong>\${{ order.subtotal | number }}</strong></div>
              <div class="row"><span>Tax</span><strong>\${{ order.tax | number }}</strong></div>
              <div class="row"><span>Shipping</span><strong>{{ order.shipping === 0 ? 'Free' : '$' + order.shipping }}</strong></div>
              <div class="row total"><span>Total</span><strong>\${{ order.total | number }}</strong></div>
            </div>
          </section>

          <section class="card">
            <div class="section-header">
              <ion-icon name="location-outline"></ion-icon>
              <h3>Shipping Information</h3>
            </div>

            <div class="info-grid">
              <div class="info-block">
                <label>Name</label>
                <p>{{ order.shippingInfo.fullName }}</p>
              </div>
              <div class="info-block">
                <label>Email</label>
                <p>{{ order.shippingInfo.email }}</p>
              </div>
              <div class="info-block">
                <label>Phone</label>
                <p>{{ order.shippingInfo.phone }}</p>
              </div>
              <div class="info-block">
                <label>Address</label>
                <p>
                  {{ order.shippingInfo.address }}<br>
                  {{ order.shippingInfo.city }}, {{ order.shippingInfo.state }} {{ order.shippingInfo.zipCode }}
                </p>
              </div>
            </div>
          </section>
        </div>

        <section class="card">
          <div class="section-header">
            <ion-icon name="mail-outline"></ion-icon>
            <h3>What Happens Next</h3>
          </div>

          <div class="steps">
            <div class="step">
              <div class="step-icon"><ion-icon name="mail-outline"></ion-icon></div>
              <div>
                <h4>Confirmation Sent</h4>
                <p>You’ll receive an email confirmation with your order details.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon"><ion-icon name="car-outline"></ion-icon></div>
              <div>
                <h4>Vehicle Preparation</h4>
                <p>We’ll prepare your vehicle and final delivery arrangements.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-icon"><ion-icon name="location-outline"></ion-icon></div>
              <div>
                <h4>Delivery</h4>
                <p>Your order will be delivered to the address you provided.</p>
              </div>
            </div>
          </div>
        </section>

        <div class="action-buttons">
          <ion-button expand="block" routerLink="/tabs/home" class="primary-btn">
            <ion-icon name="home-outline" slot="start"></ion-icon>
            Continue Shopping
          </ion-button>

          <ion-button expand="block" fill="outline" routerLink="/tabs/account" class="secondary-btn">
            <ion-icon name="bag-outline" slot="start"></ion-icon>
            View Order History
          </ion-button>

          <ion-button expand="block" fill="clear" (click)="shareOrder()" class="share-btn">
            <ion-icon name="share-outline" slot="start"></ion-icon>
            Share Order
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .success-page {
      --background: linear-gradient(180deg, #0f172a 0%, #111827 26%, #f8fafc 26%, #f8fafc 100%);
    }

    .page-shell {
      max-width: 1100px;
      margin: 0 auto;
      padding: 20px 16px 40px;
      display: grid;
      gap: 20px;
    }

    .hero-card,
    .card {
      background: white;
      border-radius: 26px;
      padding: 24px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .hero-card {
      text-align: center;
      background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
    }

    .success-icon {
      width: 88px;
      height: 88px;
      margin: 0 auto 16px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      background: #dcfce7;
      color: #16a34a;
      font-size: 48px;
    }

    .eyebrow {
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      color: #2563eb;
      font-weight: 700;
    }

    .hero-card h1 {
      margin: 10px 0 8px;
      font-size: 34px;
      color: #0f172a;
    }

    .hero-message {
      max-width: 680px;
      margin: 0 auto 18px;
      color: #64748b;
    }

    .order-pill {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      background: #0f172a;
      color: white;
      border-radius: 999px;
      padding: 10px 16px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 20px;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 18px;
      color: #0f172a;
    }

    .section-header h3 {
      margin: 0;
      font-size: 20px;
    }

    .order-items {
      display: grid;
      gap: 12px;
    }

    .order-item {
      display: grid;
      grid-template-columns: 88px 1fr auto;
      gap: 14px;
      align-items: center;
      padding: 12px;
      border-radius: 18px;
      background: #f8fafc;
    }

    .item-image img {
      width: 88px;
      height: 88px;
      border-radius: 16px;
      object-fit: cover;
    }

    .item-info h4 {
      margin: 0 0 6px;
      color: #0f172a;
    }

    .item-info p,
    .item-info span {
      margin: 0;
      color: #64748b;
      font-size: 14px;
      display: block;
    }

    .item-total {
      font-weight: 800;
      color: #0f172a;
    }

    .totals {
      margin-top: 18px;
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      display: grid;
      gap: 10px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      color: #0f172a;
    }

    .row.total {
      font-size: 20px;
      font-weight: 800;
      margin-top: 8px;
    }

    .info-grid {
      display: grid;
      gap: 16px;
    }

    .info-block label {
      display: block;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #64748b;
      margin-bottom: 6px;
      font-weight: 700;
    }

    .info-block p {
      margin: 0;
      color: #0f172a;
      line-height: 1.5;
    }

    .steps {
      display: grid;
      gap: 14px;
    }

    .step {
      display: grid;
      grid-template-columns: 52px 1fr;
      gap: 12px;
      align-items: start;
      padding: 14px;
      border-radius: 18px;
      background: #f8fafc;
    }

    .step-icon {
      width: 52px;
      height: 52px;
      display: grid;
      place-items: center;
      border-radius: 16px;
      background: #dbeafe;
      color: #2563eb;
      font-size: 22px;
    }

    .step h4 {
      margin: 0 0 4px;
      color: #0f172a;
    }

    .step p {
      margin: 0;
      color: #64748b;
    }

    .action-buttons {
      display: grid;
      gap: 12px;
    }

    .primary-btn,
    .secondary-btn,
    .share-btn {
      --border-radius: 18px;
      min-height: 52px;
      font-weight: 700;
    }

    @media (max-width: 860px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 640px) {
      .order-item {
        grid-template-columns: 1fr;
      }

      .item-total {
        justify-self: start;
      }
    }
  `],
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
      mailOutline,
      carOutline,
      locationOutline,
      receiptOutline,
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

    const shareText = `I just ordered a ${this.order.items[0]?.car.brand} ${this.order.items[0]?.car.model} from AUTOSHOWROOM! Order #${this.order.id}`;
    const shareData = {
      title: 'My AUTOSHOWROOM Order',
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      console.log('Order info copied to clipboard.');
    }
  }
}