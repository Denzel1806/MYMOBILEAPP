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
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonNote,
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
  downloadOutline,
  trashOutline,
  shieldCheckmarkOutline,
  colorPaletteOutline,
  chevronForwardOutline,
  sparklesOutline,
  cloudDownloadOutline,
  settingsOutline,
} from 'ionicons/icons';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { ThemeService } from '../../../core/services/theme.service';

interface AppSettings {
  darkMode: boolean;
  language: string;
  pushNotifications: boolean;
  emailNotifications: boolean;
  orderNotifications: boolean;
}

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

    <ion-content [fullscreen]="true" class="settings-page">
      <div class="settings-content">
        <section class="hero-card glass-card">
          <div class="hero-chip">
            <ion-icon name="sparkles-outline"></ion-icon>
            <span>Personalized Experience</span>
          </div>

          <h2>Customize your experience</h2>
          <p>
            Fine-tune appearance, notifications, app behavior, and account tools from a cleaner modern settings hub.
          </p>

          <div class="hero-mini-actions">
            <button type="button" class="mini-action" (click)="scrollToSection('appearance')">
              <ion-icon name="color-palette-outline"></ion-icon>
              <span>Appearance</span>
            </button>

            <button type="button" class="mini-action" (click)="scrollToSection('notifications')">
              <ion-icon name="notifications-outline"></ion-icon>
              <span>Notifications</span>
            </button>

            <button type="button" class="mini-action" (click)="scrollToSection('security')">
              <ion-icon name="shield-checkmark-outline"></ion-icon>
              <span>Tools</span>
            </button>
          </div>
        </section>

        <section class="settings-section glass-card" id="appearance">
          <div class="section-heading">
            <div class="section-icon primary">
              <ion-icon name="color-palette-outline"></ion-icon>
            </div>
            <div>
              <p class="section-eyebrow">Appearance</p>
              <h3>Visual Preferences</h3>
              <p>Theme style and language settings</p>
            </div>
          </div>

          <ion-list>
            <ion-item>
              <ion-icon name="moon-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Dark Mode</h3>
                <p>Switch the app theme instantly</p>
              </ion-label>
              <ion-toggle
                [(ngModel)]="darkMode"
                (ionChange)="toggleDarkMode()"
                slot="end"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-icon name="language-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Language</h3>
                <p>Choose your preferred language</p>
              </ion-label>
              <ion-select
                interface="action-sheet"
                [(ngModel)]="selectedLanguage"
                (ionChange)="changeLanguage()"
                slot="end"
              >
                <ion-select-option value="en">English</ion-select-option>
                <ion-select-option value="es">Español</ion-select-option>
                <ion-select-option value="fr">Français</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-list>
        </section>

        <section class="settings-section glass-card" id="notifications">
          <div class="section-heading">
            <div class="section-icon success">
              <ion-icon name="notifications-outline"></ion-icon>
            </div>
            <div>
              <p class="section-eyebrow">Notifications</p>
              <h3>Alert Controls</h3>
              <p>Manage app, email, and order alerts</p>
            </div>
          </div>

          <ion-list>
            <ion-item>
              <ion-icon name="notifications-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Push Notifications</h3>
                <p>Receive important updates on your device</p>
              </ion-label>
              <ion-toggle
                [(ngModel)]="pushNotifications"
                (ionChange)="togglePushNotifications()"
                slot="end"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-icon name="notifications-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Email Notifications</h3>
                <p>Get account and platform updates by email</p>
              </ion-label>
              <ion-toggle
                [(ngModel)]="emailNotifications"
                (ionChange)="toggleEmailNotifications()"
                slot="end"
              ></ion-toggle>
            </ion-item>

            <ion-item>
              <ion-icon name="notifications-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Order Updates</h3>
                <p>Stay informed about order progress</p>
              </ion-label>
              <ion-toggle
                [(ngModel)]="orderNotifications"
                (ionChange)="toggleOrderNotifications()"
                slot="end"
              ></ion-toggle>
            </ion-item>
          </ion-list>
        </section>

        <section class="settings-section glass-card" id="security">
          <div class="section-heading">
            <div class="section-icon warning">
              <ion-icon name="settings-outline"></ion-icon>
            </div>
            <div>
              <p class="section-eyebrow">Tools</p>
              <h3>App Information & Data</h3>
              <p>Version, export tools, and cleanup actions</p>
            </div>
          </div>

          <ion-list>
            <ion-item button detail="false" (click)="showAppInfo()">
              <ion-icon name="information-circle-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>About AUTOSHOWROOM</h3>
                <p>Learn more about the app</p>
              </ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item>
              <ion-icon name="shield-checkmark-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Version</h3>
                <p>1.0.0</p>
              </ion-label>
              <ion-note slot="end">Stable</ion-note>
            </ion-item>

            <ion-item button detail="false" (click)="exportData()">
              <ion-icon name="download-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Export Data</h3>
                <p>Back up your user, favorites, orders, and cart data</p>
              </ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item button detail="false" (click)="clearCache()">
              <ion-icon name="trash-outline" slot="start"></ion-icon>
              <ion-label>
                <h3>Clear Cache</h3>
                <p>Remove non-essential cached vehicle data</p>
              </ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>
          </ion-list>
        </section>

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
    IonNote,
    CommonModule,
    FormsModule,
  ],
})
export class SettingsPage implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
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
      downloadOutline,
      trashOutline,
      shieldCheckmarkOutline,
      colorPaletteOutline,
      chevronForwardOutline,
      sparklesOutline,
      cloudDownloadOutline,
      settingsOutline,
    });
  }

  async ngOnInit() {
    await this.loadSettings();

    this.route.queryParams.subscribe((params) => {
      const section = params['section'];
      if (section) {
        setTimeout(() => this.scrollToSection(section), 150);
      }
    });
  }

  scrollToSection(sectionId: string) {
    const target = document.getElementById(sectionId);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async loadSettings() {
    try {
      const settings: Partial<AppSettings> = (await this.storageService.get('settings')) || {};

      this.darkMode = settings.darkMode ?? this.themeService.isDarkMode;
      this.selectedLanguage = settings.language ?? 'en';
      this.pushNotifications = settings.pushNotifications ?? true;
      this.emailNotifications = settings.emailNotifications ?? true;
      this.orderNotifications = settings.orderNotifications ?? true;
    } catch (error) {
      console.error('Error loading settings:', error);
      await this.showToast('Error loading settings', 'danger');
    }
  }

  async saveSettings() {
    try {
      const settings: AppSettings = {
        darkMode: this.darkMode,
        language: this.selectedLanguage,
        pushNotifications: this.pushNotifications,
        emailNotifications: this.emailNotifications,
        orderNotifications: this.orderNotifications,
      };

      await this.storageService.set('settings', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
      await this.showToast('Error saving settings', 'danger');
    }
  }

  async toggleDarkMode() {
    await this.themeService.setDarkMode(this.darkMode);
    await this.saveSettings();
    await this.showToast(`Dark mode ${this.darkMode ? 'enabled' : 'disabled'}`);
  }

  async changeLanguage() {
    await this.saveSettings();
    await this.showToast(`Language changed to ${this.getLanguageLabel(this.selectedLanguage)}`);
  }

  async togglePushNotifications() {
    await this.saveSettings();
    await this.showToast(
      `Push notifications ${this.pushNotifications ? 'enabled' : 'disabled'}`
    );
  }

  async toggleEmailNotifications() {
    await this.saveSettings();
    await this.showToast(
      `Email notifications ${this.emailNotifications ? 'enabled' : 'disabled'}`
    );
  }

  async toggleOrderNotifications() {
    await this.saveSettings();
    await this.showToast(
      `Order notifications ${this.orderNotifications ? 'enabled' : 'disabled'}`
    );
  }

  getLanguageLabel(language: string): string {
    switch (language) {
      case 'es':
        return 'Español';
      case 'fr':
        return 'Français';
      case 'en':
      default:
        return 'English';
    }
  }

  async showAppInfo() {
    const alert = await this.alertController.create({
      header: 'AUTOSHOWROOM',
      message:
        'Version 1.0.0<br><br>Your premier destination for luxury and performance vehicles. Discover, compare, and purchase your dream car with confidence.',
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
      const settings = await this.storageService.get('settings');

      const exportedData = {
        user,
        cart,
        favorites,
        orders,
        settings,
        exportedAt: new Date().toISOString(),
      };

      console.log('Exported data:', exportedData);
      await this.showToast('Data exported successfully');
    } catch (error) {
      console.error('Error exporting data:', error);
      await this.showToast('Error exporting data', 'danger');
    }
  }

  async clearCache() {
    const alert = await this.alertController.create({
      header: 'Clear Cache',
      message: 'This will remove cached car data only. Your profile, cart, favorites, and orders will remain safe.',
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
              await this.storageService.remove('cars');
              await this.showToast('Cache cleared successfully');
            } catch (error) {
              console.error('Error clearing cache:', error);
              await this.showToast('Error clearing cache', 'danger');
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
            try {
              await this.storageService.clearAll();
              await this.router.navigate(['/login']);
            } catch (error) {
              console.error('Error logging out:', error);
              await this.showToast('Logout failed', 'danger');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  private async showToast(
    message: string,
    color: 'success' | 'danger' = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}