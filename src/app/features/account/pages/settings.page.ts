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
  IonButton,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonRange,
  AlertController,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBack,
  notificationsOutline,
  moonOutline,
  languageOutline,
  informationCircleOutline,
  logOutOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/account"></ion-back-button>
        </ion-buttons>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="settings-content">
        <!-- Appearance Settings -->
        <div class="settings-section">
          <h3>Appearance</h3>
          <ion-list>
            <ion-item>
              <ion-icon name="moon-outline" slot="start"></ion-icon>
              <ion-label>Dark Mode</ion-label>
              <ion-toggle
                [(ngModel)]="darkMode"
                (ionChange)="toggleDarkMode()"
                slot="end"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-icon name="language-outline" slot="start"></ion-icon>
              <ion-label>Language</ion-label>
              <ion-select [(ngModel)]="selectedLanguage" slot="end">
                <ion-select-option value="en">English</ion-select-option>
                <ion-select-option value="es">Español</ion-select-option>
                <ion-select-option value="fr">Français</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </div>

        <!-- Notification Settings -->
        <div class="settings-section">
          <h3>Notifications</h3>
          <ion-list>
            <ion-item>
              <ion-icon name="notifications-outline" slot="start"></ion-icon>
              <ion-label>Push Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="pushNotifications"
                (ionChange)="togglePushNotifications()"
                slot="end"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-icon name="notifications-outline" slot="start"></ion-icon>
              <ion-label>Email Notifications</ion-label>
              <ion-toggle
                [(ngModel)]="emailNotifications"
                (ionChange)="toggleEmailNotifications()"
                slot="end"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-icon name="notifications-outline" slot="start"></ion-icon>
              <ion-label>Order Updates</ion-label>
              <ion-toggle
                [(ngModel)]="orderNotifications"
                (ionChange)="toggleOrderNotifications()"
                slot="end"
              ></ion-toggle>
            </ion-item>
          </ion-list>
        </div>

        <!-- App Information -->
        <div class="settings-section">
          <h3>App Information</h3>
          <ion-list>
            <ion-item button (click)="showAppInfo()">
              <ion-icon name="information-circle-outline" slot="start"></ion-icon>
              <ion-label>About AUTOSHOWROOM</ion-label>
            </ion-item>

            <ion-item>
              <ion-label>
                <h3>Version</h3>
                <p>1.0.0</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- Account Actions -->
        <div class="settings-section">
          <h3>Account</h3>
          <ion-list>
            <ion-item button (click)="exportData()">
              <ion-icon name="download-outline" slot="start"></ion-icon>
              <ion-label>Export Data</ion-label>
            </ion-item>

            <ion-item button (click)="clearCache()">
              <ion-icon name="trash-outline" slot="start"></ion-icon>
              <ion-label>Clear Cache</ion-label>
            </ion-item>
          </ion-list>
        </div>

        <!-- Logout -->
        <div class="logout-section">
          <ion-button
            expand="block"
            fill="outline"
            color="danger"
            (click)="logout()"
            class="logout-btn"
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
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonSelect,
    IonSelectOption,
    CommonModule,
    FormsModule,
  ],
})
export class SettingsPage implements OnInit {
  private router = inject(Router);
  private storageService = inject(StorageService);
  private themeService = inject(ThemeService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  darkMode = false;
  selectedLanguage = 'en';
  pushNotifications = true;
  emailNotifications = true;
  orderNotifications = true;

  constructor() {
    addIcons({
      chevronBack,
      notificationsOutline,
      moonOutline,
      languageOutline,
      informationCircleOutline,
      logOutOutline,
    });
  }

  async ngOnInit() {
    await this.loadSettings();
  }

  async loadSettings() {
    try {
      // Load settings from storage
      const settings = await this.storageService.get('settings') || {};
      this.darkMode = settings.darkMode || false;
      this.selectedLanguage = settings.language || 'en';
      this.pushNotifications = settings.pushNotifications !== false;
      this.emailNotifications = settings.emailNotifications !== false;
      this.orderNotifications = settings.orderNotifications !== false;
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }

  async saveSettings() {
    try {
      const settings = {
        darkMode: this.darkMode,
        language: this.selectedLanguage,
        pushNotifications: this.pushNotifications,
        emailNotifications: this.emailNotifications,
        orderNotifications: this.orderNotifications,
      };
      await this.storageService.set('settings', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }

  async toggleDarkMode() {
    await this.themeService.setDarkMode(this.darkMode);
    await this.saveSettings();
  }

  async togglePushNotifications() {
    await this.saveSettings();
    this.showToast('Push notifications ' + (this.pushNotifications ? 'enabled' : 'disabled'));
  }

  async toggleEmailNotifications() {
    await this.saveSettings();
    this.showToast('Email notifications ' + (this.emailNotifications ? 'enabled' : 'disabled'));
  }

  async toggleOrderNotifications() {
    await this.saveSettings();
    this.showToast('Order notifications ' + (this.orderNotifications ? 'enabled' : 'disabled'));
  }

  async showAppInfo() {
    const alert = await this.alertController.create({
      header: 'AUTOSHOWROOM',
      message: 'Version 1.0.0<br><br>Your premier destination for luxury and performance vehicles. Discover, compare, and purchase your dream car with confidence.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async exportData() {
    try {
      const user = await this.storageService.getUser();
      const cart = await this.storageService.getCart();
      const favorites = await this.storageService.getFavorites();
      const orders = await this.storageService.getOrders();

      const data = {
        user,
        cart,
        favorites,
        orders,
        exportedAt: new Date(),
      };

      // In a real app, this would download a file
      console.log('Exporting data:', data);
      this.showToast('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      this.showToast('Error exporting data');
    }
  }

  async clearCache() {
    const alert = await this.alertController.create({
      header: 'Clear Cache',
      message: 'This will clear all cached data. Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Clear',
          role: 'destructive',
          handler: async () => {
            try {
              // Clear non-essential data
              await this.storageService.set('cars', null);
              this.showToast('Cache cleared successfully');
            } catch (error) {
              console.error('Error clearing cache:', error);
              this.showToast('Error clearing cache');
            }
          },
        },
      ],
    });

    await alert.present();
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
            await this.storageService.clearAll();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
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