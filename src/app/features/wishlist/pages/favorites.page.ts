import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';
import { Car } from '../../../shared/interfaces/car.interface';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-favorites',
  template: `
    <ion-content class="favorites-content">
      <div class="favorites-container">
        <div class="header">
          <h1 class="page-title">My Favorites</h1>
          <p class="subtitle">{{ favoriteCars.length }} saved cars</p>
        </div>

        <div class="favorites-grid" *ngIf="favoriteCars.length > 0">
          <app-car-card
            *ngFor="let car of favoriteCars"
            [car]="car"
            [isFavorite]="true"
            (viewDetails)="onViewCarDetails($event)"
            (toggleFavorite)="onToggleFavorite($event)"
            (addToCart)="onAddToCart($event)"
          ></app-car-card>
        </div>

        <div class="empty-state" *ngIf="favoriteCars.length === 0">
          <ion-icon name="heart-outline" class="empty-icon"></ion-icon>
          <h3>No favorites yet</h3>
          <p>Start browsing and save cars you like</p>
          <ion-button routerLink="/tabs/shop" class="browse-btn">
            <ion-icon name="search-outline" slot="start"></ion-icon>
            Browse Cars
          </ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CarCardComponent],
})
export class FavoritesPage implements OnInit {
  favoriteCars: Car[] = [];

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favoriteCars = await this.storageService.getFavorites();
  }

  onViewCarDetails(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  async onToggleFavorite(car: Car) {
    await this.storageService.removeFromFavorites(car.id);
    await this.loadFavorites();
  }

  async onAddToCart(car: Car) {
    await this.storageService.addToCart({
      id: Date.now(),
      car,
      quantity: 1,
      addedAt: new Date(),
    });
    await this.router.navigate(['/tabs/cart']);
  }
}