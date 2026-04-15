import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home">
          <ion-icon name="home-outline"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="shop">
          <ion-icon name="storefront-outline"></ion-icon>
          <ion-label>Shop</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorites">
          <ion-icon name="heart-outline"></ion-icon>
          <ion-label>Favorites</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="cart">
          <ion-icon name="bag-outline"></ion-icon>
          <ion-label>Cart</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="account">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Account</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class TabsPage {
  constructor() {}
}