import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-card class="car-card">
      <div class="car-image-container" (click)="onViewDetails()">
        <img [src]="car.thumbnail" [alt]="car.brand + ' ' + car.model" class="car-image" />

        <ion-badge *ngIf="car.featured" class="featured-badge" color="tertiary">
          Featured
        </ion-badge>

        <ion-badge class="stock-badge" [color]="getStockColor()">
          {{ getStockLabel() }}
        </ion-badge>

        <ion-button
          *ngIf="showFavoriteButton"
          fill="solid"
          size="small"
          class="favorite-btn"
          (click)="onToggleFavorite($event)"
        >
          <ion-icon [name]="isFavorite ? 'heart' : 'heart-outline'" color="danger"></ion-icon>
        </ion-button>
      </div>

      <ion-card-header (click)="onViewDetails()">
        <ion-card-title class="car-title">
          {{ car.brand }} {{ car.model }}
        </ion-card-title>
        <ion-card-subtitle class="car-subtitle">
          {{ car.year }} • {{ car.bodyType }} • {{ car.category }}
        </ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <div class="car-details" (click)="onViewDetails()">
          <div class="price-section">
            <span class="price">\${{ car.price | number }}</span>
            <span class="currency">{{ car.currency }}</span>
          </div>

          <div class="specs-preview">
            <span class="spec">{{ car.horsepower }} HP</span>
            <span class="spec">{{ car.fuelType }}</span>
            <span class="spec">{{ car.transmission }}</span>
          </div>

          <div class="rating-section">
            <ion-icon name="star" color="warning"></ion-icon>
            <span class="rating">{{ car.rating }}</span>
            <span class="reviews">({{ car.reviewCount }})</span>
          </div>

          <p class="short-description">
            {{ car.shortDescription }}
          </p>
        </div>

        <div class="card-actions">
          <ion-button
            expand="block"
            fill="outline"
            class="details-btn"
            (click)="onViewDetails()"
          >
            View Details
          </ion-button>

          <ion-button
            *ngIf="showAddToCartButton"
            expand="block"
            color="primary"
            class="cart-btn"
            (click)="onAddToCart($event)"
            [disabled]="car.stockStatus === 'sold-out'"
          >
            <ion-icon name="bag-add-outline" slot="start"></ion-icon>
            {{ car.stockStatus === 'sold-out' ? 'Sold Out' : 'Add to Cart' }}
          </ion-button>
        </div>
      </ion-card-content>
    </ion-card>
  `,
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {
  @Input() car!: Car;
  @Input() showFavoriteButton = true;
  @Input() showAddToCartButton = true;
  @Input() isFavorite = false;

  @Output() viewDetails = new EventEmitter<Car>();
  @Output() toggleFavorite = new EventEmitter<Car>();
  @Output() addToCart = new EventEmitter<Car>();

  onViewDetails() {
    this.viewDetails.emit(this.car);
  }

  onToggleFavorite(event: Event) {
    event.stopPropagation();
    this.toggleFavorite.emit(this.car);
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCart.emit(this.car);
  }

  getStockColor(): string {
    switch (this.car.stockStatus) {
      case 'in-stock':
        return 'success';
      case 'low-stock':
        return 'warning';
      case 'sold-out':
        return 'danger';
      case 'pre-order':
        return 'primary';
      default:
        return 'medium';
    }
  }

  getStockLabel(): string {
    switch (this.car.stockStatus) {
      case 'in-stock':
        return 'In Stock';
      case 'low-stock':
        return 'Low Stock';
      case 'sold-out':
        return 'Sold Out';
      case 'pre-order':
        return 'Pre-Order';
      default:
        return 'Available';
    }
  }
}