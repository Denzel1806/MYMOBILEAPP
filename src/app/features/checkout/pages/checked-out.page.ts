import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
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
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBack,
  receiptOutline,
  calendarOutline,
  cashOutline,
} from 'ionicons/icons';
import { StorageService } from '../../../core/services/storage.service';
import { Order } from '../../../shared/interfaces/order.interface';

@Component({
  selector: 'app-checked-out',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/account"></ion-back-button>
        </ion-buttons>
        <ion-title>Order History</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="orders-content">
        <!-- Loading -->
        <div class="loading-section" *ngIf="isLoading">
          <ion-spinner name="crescent"></ion-spinner>
          <p>Loading orders...</p>
        </div>

        <!-- Orders List -->
        <div class="orders-list" *ngIf="!isLoading && orders.length > 0">
          <div class="order-card" *ngFor="let order of orders">
            <ion-card>
              <ion-card-content>
                <div class="order-header">
                  <div class="order-info">
                    <h3>Order #{{ order.id }}</h3>
                    <p class="order-date">
                      <ion-icon name="calendar-outline"></ion-icon>
                      {{ order.createdAt | date:'mediumDate' }}
                    </p>
                  </div>
                  <div class="order-status">
                    <ion-badge
                      [color]="getStatusColor(order.status)"
                      class="status-badge"
                    >
                      {{ order.status | titlecase }}
                    </ion-badge>
                  </div>
                </div>

                <div class="order-items">
                  <div class="order-item" *ngFor="let item of order.items.slice(0, 2)">
                    <div class="item-image">
                      <img [src]="item.car.thumbnail" [alt]="item.car.brand + ' ' + item.car.model" />
                    </div>
                    <div class="order-item-details">
                      <h4>{{ item.car.brand }} {{ item.car.model }}</h4>
                      <p>Qty: {{ item.quantity }}</p>
                    </div>
                  </div>
                  <div class="more-items" *ngIf="order.items.length > 2">
                    +{{ order.items.length - 2 }} more items
                  </div>
                </div>

                <div class="order-total">
                  <div class="total-amount">
                    <ion-icon name="cash-outline"></ion-icon>
                    <span class="amount">\${{ order.total | number }}</span>
                  </div>
                </div>
              </ion-card-content>
            </ion-card>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="!isLoading && orders.length === 0">
          <ion-icon name="receipt-outline" size="large"></ion-icon>
          <h3>No orders yet</h3>
          <p>Your order history will appear here</p>
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
    IonBackButton,
    IonButtons,
    IonIcon,
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
    IonSpinner,
    CommonModule,
    FormsModule,
  ],
})
export class CheckedOutPage implements OnInit {
  private storageService = inject(StorageService);

  orders: Order[] = [];
  isLoading = false;

  constructor() {
    addIcons({
      chevronBack,
      receiptOutline,
      calendarOutline,
      cashOutline,
    });
  }

  async ngOnInit() {
    await this.loadOrders();
  }

  async loadOrders() {
    try {
      this.isLoading = true;
      this.orders = await this.storageService.getOrders();
      // Sort by date, newest first
      this.orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }
}