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
  AlertController,
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
} from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { Car } from '../../../shared/interfaces/car.interface';
import { CartItem } from '../../../shared/interfaces/cart-item.interface';

@Component({
  selector: 'app-car-details',
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

    <ion-content [fullscreen]="true">
      <div class="car-details-content">
        <!-- Car Image Gallery -->
        <div class="image-gallery" *ngIf="car">
          <div class="main-image">
            <img [src]="car.thumbnail" [alt]="car.brand + ' ' + car.model" />
          </div>
          <div class="thumbnail-gallery" *ngIf="car.gallery.length > 1">
            <div
              class="thumbnail"
              *ngFor="let image of car.gallery; let i = index"
              [class.active]="i === activeImageIndex"
              (click)="setActiveImage(i)"
            >
              <img [src]="image" [alt]="car.brand + ' ' + car.model + ' ' + (i + 1)" />
            </div>
          </div>
        </div>

        <!-- Car Info -->
        <div class="car-info" *ngIf="car">
          <div class="header-section">
            <div class="title-section">
              <h1 class="car-title">{{ car.brand }} {{ car.model }}</h1>
              <div class="rating">
                <ion-icon name="star" *ngFor="let star of getStars()"></ion-icon>
                <ion-icon name="star-outline" *ngFor="let star of getEmptyStars()"></ion-icon>
                <span class="rating-text">{{ car.rating }} ({{ car.reviewCount }} reviews)</span>
              </div>
            </div>
            <div class="price-section">
              <div class="price">\${{ car.price | number }}</div>
              <div class="original-price" *ngIf="car.price > 0">
                \${{ (car.price * 1.08) | number }}
              </div>
            </div>
          </div>

          <!-- Key Specs -->
          <div class="specs-section">
            <ion-grid>
              <ion-row>
                <ion-col size="6" size-md="3">
                  <div class="spec-item">
                    <ion-icon name="speedometer-outline"></ion-icon>
                    <div class="spec-value">{{ car.rangeKm || 0 | number }} km</div>
                    <div class="spec-label">Range</div>
                  </div>
                </ion-col>
                <ion-col size="6" size-md="3">
                  <div class="spec-item">
                    <ion-icon name="calendar-outline"></ion-icon>
                    <div class="spec-value">{{ car.year }}</div>
                    <div class="spec-label">Year</div>
                  </div>
                </ion-col>
                <ion-col size="6" size-md="3">
                  <div class="spec-item">
                    <ion-icon name="color-palette-outline"></ion-icon>
                    <div class="spec-value">{{ car.colorOptions[0] || 'N/A' }}</div>
                    <div class="spec-label">Color</div>
                  </div>
                </ion-col>
                <ion-col size="6" size-md="3">
                  <div class="spec-item">
                    <ion-icon name="hardware-chip-outline"></ion-icon>
                    <div class="spec-value">{{ car.transmission }}</div>
                    <div class="spec-label">Transmission</div>
                  </div>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>

          <!-- Description -->
          <div class="description-section">
            <h3>Description</h3>
            <p>{{ car.longDescription }}</p>
          </div>

          <!-- Features -->
          <div class="features-section">
            <h3>Features</h3>
            <div class="features-grid">
              <ion-chip *ngFor="let feature of getFeatures()" color="primary" outline>
                <ion-label>{{ feature }}</ion-label>
              </ion-chip>
            </div>
          </div>

          <!-- Add to Cart Section -->
          <div class="cart-section">
            <div class="quantity-selector">
              <ion-button fill="outline" (click)="decreaseQuantity()" [disabled]="quantity <= 1">
                <ion-icon name="remove-outline"></ion-icon>
              </ion-button>
              <span class="quantity">{{ quantity }}</span>
              <ion-button fill="outline" (click)="increaseQuantity()">
                <ion-icon name="add-outline"></ion-icon>
              </ion-button>
            </div>
            <ion-button
              expand="block"
              size="large"
              (click)="addToCart()"
              class="add-to-cart-btn"
            >
              Add to Cart - \${{ (car.price * quantity) | number }}
            </ion-button>
          </div>
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
    IonChip,
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
    CommonModule,
    FormsModule,
  ],
})
export class CarDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storageService = inject(StorageService);
  private alertController = inject(AlertController);
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
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      await this.loadCarDetails(id);
      await this.checkIfFavorite();
    }
  }

  async loadCarDetails(id: string) {
    try {
      // In a real app, this would be an API call
      const cars = await this.storageService.getCars();
      this.car = cars.find(c => c.id === id) || null;
    } catch (error) {
      console.error('Error loading car details:', error);
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
        this.showToast('Removed from favorites');
      } else {
        await this.storageService.addToFavorites(this.car);
        this.isFavorite = true;
        this.showToast('Added to favorites');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  async shareCar() {
    if (!this.car) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: this.car.brand + ' ' + this.car.model,
          text: `Check out this ${this.car.brand} ${this.car.model} for $${this.car.price}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      this.showToast('Link copied to clipboard');
    }
  }

  setActiveImage(index: number) {
    this.activeImageIndex = index;
  }

  getStars(): number[] {
    return Array(Math.floor(this.car?.rating || 0)).fill(0);
  }

  getEmptyStars(): number[] {
    const rating = this.car?.rating || 0;
    return Array(5 - Math.floor(rating)).fill(0);
  }

  getFeatures(): string[] {
    if (!this.car) return [];

    return [
      ...this.car.specifications.safety,
      ...this.car.specifications.comfort,
      ...this.car.specifications.technology,
    ];
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
        id: Date.now(), // Simple ID generation
        car: this.car,
        quantity: this.quantity,
        addedAt: new Date(),
      };

      await this.storageService.addToCart(cartItem);
      this.showToast(`Added ${this.quantity} ${this.car.brand} ${this.car.model}(s) to cart`);
      this.router.navigate(['/tabs/cart']);
    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showToast('Error adding to cart');
    }
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