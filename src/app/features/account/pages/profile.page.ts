import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonAvatar,
  IonList,
  IonListHeader,
  IonText,
  IonRouterOutlet,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  mailOutline,
  lockClosedOutline,
  notificationsOutline,
  helpCircleOutline,
  logOutOutline,
  chevronForwardOutline,
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
        <div class="profile-header">
          <div class="avatar-section">
            <div class="avatar">
              <ion-icon name="person-outline"></ion-icon>
            </div>
            <div class="user-info">
              <h2 class="user-name">{{ user?.fullName || 'User' }}</h2>
              <p class="user-email">{{ user?.email || 'user@example.com' }}</p>
            </div>
          </div>
        </div>

        <div class="menu-section">
          <ion-list class="profile-menu">
            <ion-list-header>
              <ion-label>Account Settings</ion-label>
            </ion-list-header>

            <ion-item class="menu-item" button detail="true" routerLink="/tabs/profile/edit">
              <ion-icon name="person-outline" slot="start"></ion-icon>
              <ion-label>Edit Profile</ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item class="menu-item" button detail="true" routerLink="/tabs/profile/security">
              <ion-icon name="lock-closed-outline" slot="start"></ion-icon>
              <ion-label>Security</ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item class="menu-item" button detail="true" routerLink="/tabs/profile/notifications">
              <ion-icon name="notifications-outline" slot="start"></ion-icon>
              <ion-label>Notifications</ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>

            <ion-item class="menu-item" button detail="true" routerLink="/tabs/profile/help">
              <ion-icon name="help-circle-outline" slot="start"></ion-icon>
              <ion-label>Help & Support</ion-label>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-item>
          </ion-list>
        </div>

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
    IonListHeader,
    CommonModule,
    FormsModule,
  ],
})
export class ProfilePage implements OnInit {
  private router = inject(Router);
  private storageService = inject(StorageService);
  private alertController = inject(AlertController);

  user: User | null = null;

  constructor() {
    addIcons({
      personOutline,
      mailOutline,
      lockClosedOutline,
      notificationsOutline,
      helpCircleOutline,
      logOutOutline,
      chevronForwardOutline,
    });
  }

  async ngOnInit() {
    await this.loadUserProfile();
  }

  async loadUserProfile() {
    try {
      this.user = await this.storageService.getUser();
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
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
}