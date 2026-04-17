import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonList,
  IonListHeader,
  IonBadge,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  notificationsOutline,
  helpCircleOutline,
  logOutOutline,
  chevronForwardOutline,
  settingsOutline,
  receiptOutline,
  heartOutline,
  shieldCheckmarkOutline,
  sunnyOutline,
  sparklesOutline,
  bagHandleOutline,
  cardOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { User } from '../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-profile',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="profile-content">
      <div class="profile-container">
        <section class="profile-hero glass-card">
          <div class="hero-gradient"></div>

          <div class="profile-top">
            <div class="avatar-wrap">
              <div class="avatar-ring">
                <div class="avatar">
                  <span>{{ getInitials() }}</span>
                </div>
              </div>
            </div>

            <div class="profile-copy">
              <div class="profile-chip">
                <ion-icon name="sparkles-outline"></ion-icon>
                <span>Premium Member</span>
              </div>

              <h2 class="user-name">{{ user?.fullName || 'Guest User' }}</h2>
              <p class="user-email">{{ user?.email || 'user@example.com' }}</p>

              <div class="hero-actions">
                <ion-button fill="solid" (click)="goToSettings()">
                  <ion-icon name="settings-outline" slot="start"></ion-icon>
                  Edit Profile
                </ion-button>

                <ion-button fill="outline" (click)="goToFavorites()">
                  <ion-icon name="heart-outline" slot="start"></ion-icon>
                  Favorites
                </ion-button>
              </div>
            </div>
          </div>

          <div class="hero-stats">
            <div class="stat-card">
              <div class="stat-icon">
                <ion-icon name="heart-outline"></ion-icon>
              </div>
              <div>
                <span class="stat-value">{{ favoritesCount }}</span>
                <span class="stat-label">Saved Cars</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <ion-icon name="receipt-outline"></ion-icon>
              </div>
              <div>
                <span class="stat-value">{{ ordersCount }}</span>
                <span class="stat-label">Orders</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <ion-icon name="bag-handle-outline"></ion-icon>
              </div>
              <div>
                <span class="stat-value">{{ cartCount }}</span>
                <span class="stat-label">In Cart</span>
              </div>
            </div>
          </div>
        </section>

        <section class="shortcut-grid">
          <button type="button" class="shortcut-card glass-card" (click)="goToSettings()">
            <div class="shortcut-icon primary">
              <ion-icon name="settings-outline"></ion-icon>
            </div>
            <h3>Settings</h3>
            <p>Manage your preferences</p>
          </button>

          <button type="button" class="shortcut-card glass-card" (click)="goToOrders()">
            <div class="shortcut-icon warning">
              <ion-icon name="receipt-outline"></ion-icon>
            </div>
            <h3>Orders</h3>
            <p>Track your activity</p>
          </button>

          <button type="button" class="shortcut-card glass-card" (click)="goToFavorites()">
            <div class="shortcut-icon danger">
              <ion-icon name="heart-outline"></ion-icon>
            </div>
            <h3>Favorites</h3>
            <p>Open your shortlist</p>
          </button>
        </section>

        <section class="menu-card glass-card">
          <div class="section-heading">
            <p class="section-eyebrow">Manage</p>
            <h3>Account Center</h3>
          </div>

          <ion-list class="profile-menu">
            <ion-item class="menu-item" button detail="false" (click)="goToSettings()">
              <div class="menu-icon primary" slot="start">
                <ion-icon name="person-outline"></ion-icon>
              </div>
              <ion-label>
                <h3>Edit Profile</h3>
                <p>Update your account information</p>
              </ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item class="menu-item" button detail="false" (click)="goToSecurity()">
              <div class="menu-icon warning" slot="start">
                <ion-icon name="shield-checkmark-outline"></ion-icon>
              </div>
              <ion-label>
                <h3>Security</h3>
                <p>Password, privacy, and account access</p>
              </ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item class="menu-item" button detail="false" (click)="goToNotifications()">
              <div class="menu-icon success" slot="start">
                <ion-icon name="notifications-outline"></ion-icon>
              </div>
              <ion-label>
                <h3>Notifications</h3>
                <p>Control app and order alerts</p>
              </ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item class="menu-item" button detail="false" (click)="goToSupport()">
              <div class="menu-icon tertiary" slot="start">
                <ion-icon name="help-circle-outline"></ion-icon>
              </div>
              <ion-label>
                <h3>Help & Support</h3>
                <p>Get help or contact support</p>
              </ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>
          </ion-list>
        </section>

        <section class="info-card glass-card">
          <div class="section-heading compact">
            <p class="section-eyebrow">Overview</p>
            <h3>Account Details</h3>
          </div>

          <div class="info-row">
            <div class="info-left">
              <div class="info-icon">
                <ion-icon name="mail-outline"></ion-icon>
              </div>
              <div>
                <p class="info-label">Email Address</p>
                <p class="info-value">{{ user?.email || 'No email saved' }}</p>
              </div>
            </div>
          </div>

          <div class="info-row">
            <div class="info-left">
              <div class="info-icon">
                <ion-icon name="sunny-outline"></ion-icon>
              </div>
              <div>
                <p class="info-label">Status</p>
                <p class="info-value">Active member</p>
              </div>
            </div>
            <ion-badge color="success">Active</ion-badge>
          </div>
        </section>

        <div class="logout-section">
          <ion-button
            expand="block"
            fill="outline"
            color="danger"
            class="logout-btn"
            (click)="logout()"
          >
            <ion-icon name="log-out-outline" slot="start"></ion-icon>
            Logout
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
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonList,
    IonBadge,
    CommonModule,
  ],
})
export class ProfilePage implements OnInit {
  private router = inject(Router);
  private storageService = inject(StorageService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  user: User | null = null;
  favoritesCount = 0;
  ordersCount = 0;
  cartCount = 0;

  constructor() {
    addIcons({
      personOutline,
      mailOutline,
      notificationsOutline,
      helpCircleOutline,
      logOutOutline,
      chevronForwardOutline,
      settingsOutline,
      receiptOutline,
      heartOutline,
      shieldCheckmarkOutline,
      sunnyOutline,
      sparklesOutline,
      bagHandleOutline,
      cardOutline,
    });
  }

  async ngOnInit() {
    await this.loadProfileData();
  }

  async ionViewWillEnter() {
    await this.loadProfileData();
  }

  async loadProfileData() {
    try {
      const [user, favorites, orders, cart] = await Promise.all([
        this.storageService.getUser(),
        this.storageService.getFavorites(),
        this.storageService.getOrders(),
        this.storageService.getCart(),
      ]);

      this.user = user;
      this.favoritesCount = favorites.length;
      this.ordersCount = orders.length;
      this.cartCount = cart.reduce((total, item) => total + Number(item.quantity || 0), 0);
    } catch (error) {
      console.error('Error loading user profile:', error);
      await this.presentToast('Unable to load profile data.', 'danger');
    }
  }

  getInitials(): string {
    const fullName = this.user?.fullName?.trim();
    if (!fullName) return 'U';

    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToSecurity() {
    this.router.navigate(['/settings'], {
      queryParams: { section: 'security' },
    });
  }

  goToNotifications() {
    this.router.navigate(['/settings'], {
      queryParams: { section: 'notifications' },
    });
  }

  async goToSupport() {
    await this.presentToast('Support page is not connected yet.');
    this.router.navigate(['/support']);
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Logout',
          role: 'destructive',
          handler: async () => {
            try {
              await this.storageService.clearAll();
              await this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error during logout:', error);
              await this.presentToast('Logout failed. Please try again.', 'danger');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1800,
      position: 'bottom',
      color,
    });

    await toast.present();
  }
}