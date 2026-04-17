import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';
import { Car } from '../../../shared/interfaces/car.interface';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-favorites',
  template: `
    <ion-content [fullscreen]="true" class="favorites-page">
      <div class="favorites-shell">
        <div class="hero-section">
          <div class="hero-text">
            <p class="eyebrow">Saved Collection</p>
            <h1 class="page-title">My Favorites</h1>
            <p class="subtitle">
              Keep track of the cars you love and quickly add them to your cart.
            </p>
          </div>

          <div class="hero-stat">
            <span class="stat-number">{{ favoriteCars.length }}</span>
            <span class="stat-label">Saved Cars</span>
          </div>
        </div>

        <div class="favorites-toolbar" *ngIf="favoriteCars.length > 0">
          <div class="toolbar-info">
            <h3>Your shortlist</h3>
            <p>Tap a car to view details or move it to your cart.</p>
          </div>

          <ion-button fill="outline" routerLink="/tabs/shop" class="shop-link-btn">
            <ion-icon name="search-outline" slot="start"></ion-icon>
            Browse More Cars
          </ion-button>
        </div>

        <div class="favorites-grid" *ngIf="favoriteCars.length > 0">
          <app-car-card
  *ngFor="let car of favoriteCars"
  [car]="car"
  (viewDetails)="onViewCarDetails($event)"
  (toggleFavorite)="onToggleFavorite($event)"
  (addToCart)="onAddToCart($event)"
></app-car-card>
        </div>

        <div class="empty-state" *ngIf="favoriteCars.length === 0">
          <div class="empty-icon-wrap">
            <ion-icon name="heart-outline" class="empty-icon"></ion-icon>
          </div>
          <h3>No favorites yet</h3>
          <p>Start browsing and save cars you like for quick access later.</p>

          <div class="empty-actions">
            <ion-button routerLink="/tabs/shop" class="browse-btn">
              <ion-icon name="search-outline" slot="start"></ion-icon>
              Browse Cars
            </ion-button>

            <ion-button fill="outline" routerLink="/tabs/home" class="home-btn">
              Go to Home
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .favorites-page {
      --background: linear-gradient(180deg, #0f172a 0%, #111827 26%, #f8fafc 26%, #f8fafc 100%);
    }

    .favorites-shell {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px 16px 40px;
    }

    .hero-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 20px;
      padding: 8px 4px 28px;
      color: #fff;
      flex-wrap: wrap;
    }

    .eyebrow {
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      opacity: 0.8;
    }

    .page-title {
      margin: 0;
      font-size: 32px;
      font-weight: 800;
      line-height: 1.1;
    }

    .subtitle {
      margin: 10px 0 0;
      max-width: 650px;
      color: rgba(255,255,255,0.82);
      font-size: 15px;
      line-height: 1.5;
    }

    .hero-stat {
      min-width: 150px;
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 22px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .stat-number {
      font-size: 34px;
      font-weight: 800;
      line-height: 1;
    }

    .stat-label {
      margin-top: 6px;
      font-size: 13px;
      color: rgba(255,255,255,0.78);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .favorites-toolbar {
      margin-top: 4px;
      margin-bottom: 20px;
      background: rgba(255,255,255,0.9);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      padding: 18px 20px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }

    .toolbar-info h3 {
      margin: 0 0 4px;
      font-size: 20px;
      color: #0f172a;
    }

    .toolbar-info p {
      margin: 0;
      color: #64748b;
      font-size: 14px;
    }

    .shop-link-btn {
      --border-radius: 16px;
    }

    .favorites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 18px;
    }

    .empty-state {
      background: white;
      border-radius: 28px;
      padding: 56px 24px;
      text-align: center;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    }

    .empty-icon-wrap {
      width: 84px;
      height: 84px;
      margin: 0 auto 18px;
      border-radius: 50%;
      background: #fee2e2;
      color: #ef4444;
      display: grid;
      place-items: center;
    }

    .empty-icon {
      font-size: 38px;
    }

    .empty-state h3 {
      margin: 0 0 8px;
      font-size: 24px;
      color: #0f172a;
    }

    .empty-state p {
      margin: 0 auto 22px;
      color: #64748b;
      max-width: 480px;
      line-height: 1.5;
    }

    .empty-actions {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .browse-btn,
    .home-btn {
      --border-radius: 18px;
      min-height: 48px;
      font-weight: 700;
    }

    @media (max-width: 640px) {
      .page-title {
        font-size: 28px;
      }

      .hero-stat {
        width: 100%;
        align-items: flex-start;
      }
    }
  `],
  standalone: true,
  imports: [CommonModule, IonicModule, CarCardComponent],
})
export class FavoritesPage implements OnInit {
  favoriteCars: Car[] = [];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private toastController: ToastController,
  ) {}

  async ngOnInit() {
    await this.loadFavorites();
  }

  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  async loadFavorites() {
    try {
      this.favoriteCars = await this.storageService.getFavorites();
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }

  onViewCarDetails(car: Car) {
  this.router.navigate(['/car', car.id]);
}

  async onToggleFavorite(car: Car) {
    try {
      await this.storageService.removeFromFavorites(car.id);
      await this.loadFavorites();
      await this.showToast(`${car.brand} ${car.model} removed from favorites`);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  }

  async onAddToCart(car: Car) {
    try {
      await this.storageService.addToCart({
        id: Date.now(),
        car,
        quantity: 1,
        addedAt: new Date(),
      });

      await this.showToast(`${car.brand} ${car.model} added to cart`);
      await this.router.navigate(['/tabs/cart']);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1800,
      position: 'bottom',
    });
    await toast.present();
  }
}