import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Car } from '../../interfaces/car.interface';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <ion-card class="car-card" (click)="onViewDetails()">
      <div class="car-image-container">
        <img [src]="car.thumbnail" [alt]="car.brand + ' ' + car.model" class="car-image" />
        <ion-badge *ngIf="car.featured" class="featured-badge" color="tertiary">Featured</ion-badge>
        <ion-button
          *ngIf="showFavoriteButton"
          fill="clear"
          class="favorite-btn"
          (click)="onToggleFavorite($event)"
        >
          <ion-icon [name]="isFavorite ? 'heart' : 'heart-outline'" color="danger"></ion-icon>
        </ion-button>
      </div>

      <ion-card-header>
        <ion-card-title class="car-title">{{ car.brand }} {{ car.model }}</ion-card-title>
        <ion-card-subtitle class="car-subtitle">{{ car.year }} • {{ car.bodyType }}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <div class="car-details">
          <div class="price-section">
            <span class="price">\${{ car.price }}</span>
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
        </div>

        <div class="card-actions" *ngIf="showAddToCartButton">
          <ion-button
            expand="block"
            color="primary"
            (click)="onAddToCart($event)"
          >
            <ion-icon name="bag-add-outline" slot="start"></ion-icon>
            Add to Cart
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
}