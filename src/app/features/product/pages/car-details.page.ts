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
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  heartOutline,
  heart,
  shareOutline,
  star,
  starOutline,
  chevronBack,
  addOutline,
  removeOutline,
  speedometerOutline,
  calendarOutline,
  colorPaletteOutline,
  hardwareChipOutline,
  flashOutline,
  carSportOutline,
  pricetagOutline,
  bagHandleOutline,
} from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { Car } from '../../../shared/interfaces/car.interface';
import { CartItem } from '../../../shared/interfaces/cart-item.interface';

@Component({
  selector: 'app-car-details',
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
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    CommonModule,
    FormsModule,
  ],
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/shop"></ion-back-button>
        </ion-buttons>

        <ion-title>{{ car ? (car.brand + ' ' + car.model) : 'Car Details' }}</ion-title>

        <ion-buttons slot="end">
          <ion-button fill="clear" (click)="toggleFavorite()">
            <ion-icon [name]="isFavorite ? 'heart' : 'heart-outline'"></ion-icon>
          </ion-button>
          <ion-button fill="clear" (click)="shareCar()">
            <ion-icon name="share-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true" class="details-page">
      <div class="page-shell" *ngIf="car">
        <section class="hero-card">
          <div class="gallery-section">
            <div class="main-image">
              <img
                [src]="car.gallery?.[activeImageIndex] || car.thumbnail"
                [alt]="car.brand + ' ' + car.model"
              />
            </div>

            <div class="thumbnail-gallery" *ngIf="car.gallery?.length">
              <button
                type="button"
                class="thumbnail"
                *ngFor="let image of car.gallery; let i = index"
                [class.active]="i === activeImageIndex"
                (click)="setActiveImage(i)"
              >
                <img [src]="image" [alt]="car.brand + ' ' + car.model + ' ' + (i + 1)" />
              </button>
            </div>
          </div>

          <div class="info-section">
            <div class="top-meta">
              <div>
                <p class="eyebrow">{{ car.category }} • {{ car.bodyType }}</p>
                <h1 class="car-title">{{ car.brand }} {{ car.model }}</h1>

                <div class="rating">
                  <ion-icon name="star" *ngFor="let _ of getStars()"></ion-icon>
                  <ion-icon name="star-outline" *ngFor="let _ of getEmptyStars()"></ion-icon>
                  <span class="rating-text">{{ car.rating }} ({{ car.reviewCount }} reviews)</span>
                </div>
              </div>

              <div class="price-box">
                <div class="price">\${{ car.price | number }}</div>
                <div class="original-price" *ngIf="car.price > 0">
                  \${{ (car.price * 1.08) | number }}
                </div>
                <div class="stock" [class.in-stock]="car.stockStatus === 'in-stock'">
                  {{ car.stockStatus || 'Available' }}
                </div>
              </div>
            </div>

            <div class="spec-grid">
              <div class="spec-card">
                <ion-icon name="speedometer-outline"></ion-icon>
                <div class="spec-value">{{ car.rangeKm || 0 | number }} km</div>
                <div class="spec-label">Range</div>
              </div>

              <div class="spec-card">
                <ion-icon name="calendar-outline"></ion-icon>
                <div class="spec-value">{{ car.year }}</div>
                <div class="spec-label">Year</div>
              </div>

              <div class="spec-card">
                <ion-icon name="color-palette-outline"></ion-icon>
                <div class="spec-value">{{ car.colorOptions?.[0] || 'N/A' }}</div>
                <div class="spec-label">Color</div>
              </div>

              <div class="spec-card">
                <ion-icon name="hardware-chip-outline"></ion-icon>
                <div class="spec-value">{{ car.transmission }}</div>
                <div class="spec-label">Transmission</div>
              </div>

              <div class="spec-card">
                <ion-icon name="flash-outline"></ion-icon>
                <div class="spec-value">{{ car.horsepower || 0 }} HP</div>
                <div class="spec-label">Power</div>
              </div>

              <div class="spec-card">
                <ion-icon name="car-sport-outline"></ion-icon>
                <div class="spec-value">{{ car.zeroToHundred || 'N/A' }}</div>
                <div class="spec-label">0–100 km/h</div>
              </div>
            </div>

            <div class="description-card">
              <h3>Description</h3>
              <p>{{ car.longDescription }}</p>
            </div>

            <div class="features-card">
              <h3>Features</h3>
              <div class="features-grid">
                <ion-chip *ngFor="let feature of getFeatures()" color="primary" outline>
                  <ion-label>{{ feature }}</ion-label>
                </ion-chip>
              </div>
            </div>

            <div class="details-grid">
              <div class="detail-block">
                <h4>Performance</h4>
                <p><strong>Engine:</strong> {{ car.engine || 'N/A' }}</p>
                <p><strong>Horsepower:</strong> {{ car.horsepower || 0 }} HP</p>
                <p><strong>Torque:</strong> {{ car.torque || 'N/A' }}</p>
                <p><strong>Top Speed:</strong> {{ car.topSpeedKph || 0 }} km/h</p>
              </div>

              <div class="detail-block">
                <h4>Vehicle Info</h4>
                <p><strong>Fuel Type:</strong> {{ car.fuelType || 'N/A' }}</p>
                <p><strong>Drivetrain:</strong> {{ car.drivetrain || 'N/A' }}</p>
                <p><strong>Seats:</strong> {{ car.seats || 0 }}</p>
                <p><strong>Doors:</strong> {{ car.doors || 0 }}</p>
              </div>
            </div>

            <div class="purchase-card">
              <div class="quantity-selector">
                <ion-button fill="outline" (click)="decreaseQuantity()" [disabled]="quantity <= 1">
                  <ion-icon name="remove-outline"></ion-icon>
                </ion-button>

                <span class="quantity">{{ quantity }}</span>

                <ion-button fill="outline" (click)="increaseQuantity()">
                  <ion-icon name="add-outline"></ion-icon>
                </ion-button>
              </div>

              <div class="purchase-actions">
                <ion-button expand="block" size="large" class="add-btn" (click)="addToCart()">
                  <ion-icon name="bag-handle-outline" slot="start"></ion-icon>
                  Add to Cart - \${{ car.price * quantity | number }}
                </ion-button>

                <ion-button expand="block" size="large" fill="outline" class="buy-btn" (click)="buyNow()">
                  <ion-icon name="pricetag-outline" slot="start"></ion-icon>
                  Buy Now
                </ion-button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ion-content>
  `,
  styles: [`
    .details-page {
      --background: linear-gradient(180deg, #0f172a 0%, #111827 24%, #f8fafc 24%, #f8fafc 100%);
    }

    .page-shell {
      max-width: 1280px;
      margin: 0 auto;
      padding: 20px 16px 40px;
    }

    .hero-card {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 22px;
      align-items: start;
    }

    .gallery-section,
    .info-section {
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(12px);
      border-radius: 28px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
      overflow: hidden;
    }

    .gallery-section {
      padding: 18px;
      position: sticky;
      top: 16px;
    }

    .main-image img {
      width: 100%;
      height: 460px;
      object-fit: cover;
      border-radius: 22px;
      display: block;
      background: #e5e7eb;
    }

    .thumbnail-gallery {
      margin-top: 14px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(78px, 1fr));
      gap: 10px;
    }

    .thumbnail {
      border: 0;
      background: transparent;
      padding: 0;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      opacity: 0.75;
      transition: 0.2s ease;
    }

    .thumbnail.active {
      opacity: 1;
      outline: 3px solid #2563eb;
      outline-offset: 2px;
    }

    .thumbnail img {
      width: 100%;
      height: 78px;
      object-fit: cover;
      display: block;
      border-radius: 16px;
    }

    .info-section {
      padding: 22px;
    }

    .top-meta {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }

    .eyebrow {
      margin: 0 0 8px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 12px;
      color: #2563eb;
      font-weight: 700;
    }

    .car-title {
      margin: 0;
      font-size: 34px;
      line-height: 1.1;
      color: #0f172a;
      font-weight: 800;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 10px;
      flex-wrap: wrap;
      color: #f59e0b;
    }

    .rating-text {
      margin-left: 8px;
      color: #64748b;
      font-size: 14px;
    }

    .price-box {
      background: linear-gradient(135deg, #0f172a, #1e293b);
      color: white;
      padding: 18px;
      border-radius: 22px;
      min-width: 210px;
    }

    .price {
      font-size: 30px;
      font-weight: 800;
      line-height: 1;
    }

    .original-price {
      margin-top: 8px;
      text-decoration: line-through;
      color: rgba(255,255,255,0.6);
      font-size: 14px;
    }

    .stock {
      margin-top: 10px;
      display: inline-block;
      padding: 6px 10px;
      border-radius: 999px;
      background: rgba(255,255,255,0.12);
      font-size: 12px;
      text-transform: capitalize;
    }

    .in-stock {
      background: rgba(34,197,94,0.2);
      color: #86efac;
    }

    .spec-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 18px;
    }

    .spec-card {
      background: #f8fafc;
      border-radius: 20px;
      padding: 16px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }

    .spec-card ion-icon {
      font-size: 24px;
      color: #2563eb;
      margin-bottom: 10px;
    }

    .spec-value {
      font-weight: 800;
      color: #0f172a;
      font-size: 16px;
    }

    .spec-label {
      color: #64748b;
      font-size: 13px;
      margin-top: 4px;
    }

    .description-card,
    .features-card,
    .purchase-card,
    .detail-block {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 22px;
      padding: 18px;
    }

    .description-card,
    .features-card,
    .purchase-card {
      margin-bottom: 18px;
    }

    .description-card h3,
    .features-card h3,
    .detail-block h4 {
      margin: 0 0 12px;
      color: #0f172a;
    }

    .description-card p,
    .detail-block p {
      margin: 0 0 8px;
      color: #475569;
      line-height: 1.6;
    }

    .features-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-bottom: 18px;
    }

    .quantity-selector {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: #f8fafc;
      padding: 8px 12px;
      border-radius: 999px;
      margin-bottom: 16px;
    }

    .quantity {
      min-width: 24px;
      text-align: center;
      font-weight: 800;
      color: #0f172a;
    }

    .purchase-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .add-btn,
    .buy-btn {
      --border-radius: 18px;
      min-height: 54px;
      font-weight: 700;
    }

    @media (max-width: 980px) {
      .hero-card {
        grid-template-columns: 1fr;
      }

      .gallery-section {
        position: static;
      }
    }

    @media (max-width: 720px) {
      .spec-grid,
      .details-grid,
      .purchase-actions {
        grid-template-columns: 1fr;
      }

      .main-image img {
        height: 300px;
      }

      .car-title {
        font-size: 28px;
      }
    }
  `],
})
export class CarDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storageService = inject(StorageService);
  private toastController = inject(ToastController);

  car: Car | null = null;
  quantity = 1;
  activeImageIndex = 0;
  isFavorite = false;

  constructor() {
    addIcons({
      heartOutline,
      heart,
      shareOutline,
      star,
      starOutline,
      chevronBack,
      addOutline,
      removeOutline,
      speedometerOutline,
      calendarOutline,
      colorPaletteOutline,
      hardwareChipOutline,
      flashOutline,
      carSportOutline,
      pricetagOutline,
      bagHandleOutline,
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadCarDetails(id);
      await this.checkIfFavorite();
    }
  }

  async ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadCarDetails(id);
      await this.checkIfFavorite();
    }
  }

  async loadCarDetails(id: string) {
    try {
      const cars = await this.storageService.getCars();
      this.car = cars.find(c => c.id === id) || null;
      this.activeImageIndex = 0;

      if (!this.car) {
        this.showToast('Car not found');
        this.router.navigate(['/tabs/shop']);
      }
    } catch (error) {
      console.error('Error loading car details:', error);
      this.showToast('Error loading car details');
    }
  }

  async checkIfFavorite() {
    if (!this.car) return;

    try {
      const favorites = await this.storageService.getFavorites();
      this.isFavorite = favorites.some(fav => fav.id === this.car!.id);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  }

 async toggleFavorite() {
  if (!this.car) return;

  try {
    if (this.isFavorite) {
      await this.storageService.removeFromFavorites(this.car.id);
      this.isFavorite = false;
      await this.showToast('Removed from favorites');
    } else {
      await this.storageService.addToFavorites(this.car);
      this.isFavorite = true;
      await this.showToast('Added to favorites');
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    await this.showToast('Could not update favorites');
  }
}

async shareCar() {
  if (!this.car) return;

  const shareData = {
    title: `${this.car.brand} ${this.car.model}`,
    text: `Check out this ${this.car.brand} ${this.car.model} for $${this.car.price}`,
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(window.location.href);
    await this.showToast('Link copied to clipboard');
  }
}

setActiveImage(index: number) {
  this.activeImageIndex = index;
}

increaseQuantity() {
  this.quantity++;
}

decreaseQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}

async addToCart() {
  if (!this.car) return;

  try {
    const cartItem: CartItem = {
      id: Date.now(),
      car: this.car,
      quantity: this.quantity,
      addedAt: new Date(),
    };

    await this.storageService.addToCart(cartItem);
    await this.showToast(`Added ${this.quantity} ${this.car.brand} ${this.car.model}(s) to cart`);
    await this.router.navigate(['/tabs/cart']);
  } catch (error) {
    console.error('Error adding to cart:', error);
    await this.showToast('Error adding to cart');
  }
}

async buyNow() {
  if (!this.car) return;

  try {
    const cartItem: CartItem = {
      id: Date.now(),
      car: this.car,
      quantity: this.quantity,
      addedAt: new Date(),
    };

    await this.storageService.addToCart(cartItem);
    await this.showToast('Proceeding to checkout');
    await this.router.navigate(['/checkout']);
  } catch (error) {
    console.error('Error buying now:', error);
    await this.showToast('Error proceeding to checkout');
  }
}

goToCart() {
  this.router.navigate(['/tabs/cart']);
}

goToShop() {
  this.router.navigate(['/tabs/shop']);
}

goToFavorites() {
  this.router.navigate(['/tabs/favorites']);
}

getStars(): number[] {
  if (!this.car) return [];
  return Array(Math.floor(this.car.rating || 0)).fill(0);
}

getEmptyStars(): number[] {
  if (!this.car) return [];
  const rating = this.car.rating || 0;
  return Array(5 - Math.floor(rating)).fill(0);
}

getFeatures(): string[] {
  if (!this.car?.specifications) return [];

  return [
    ...(this.car.specifications.safety || []),
    ...(this.car.specifications.comfort || []),
    ...(this.car.specifications.technology || []),
  ];
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