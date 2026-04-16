import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonChip,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonSpinner,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  filterOutline,
  gridOutline,
  listOutline,
  chevronDownOutline,
  closeCircle,
  carOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';
import { Car } from '../../../shared/interfaces/car.interface';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-shop',
  template: `
    <ion-content class="shop-content">
      <div class="shop-container">
        <!-- Header with Search and Filters -->
        <div class="shop-header">
          <ion-searchbar
            [(ngModel)]="searchQuery"
            placeholder="Search cars..."
            (ionInput)="onSearch($event)"
            class="shop-search"
          ></ion-searchbar>

          <div class="filter-row">
            <ion-button fill="outline" (click)="openFilters()" class="filter-btn">
              <ion-icon name="filter-outline" slot="start"></ion-icon>
              Filters
            </ion-button>

            <ion-segment [(ngModel)]="viewMode" class="view-toggle">
              <ion-segment-button value="grid">
                <ion-icon name="grid-outline"></ion-icon>
              </ion-segment-button>
              <ion-segment-button value="list">
                <ion-icon name="list-outline"></ion-icon>
              </ion-segment-button>
            </ion-segment>
          </div>
        </div>

        <!-- Active Filters -->
        <div class="active-filters" *ngIf="activeFilters.length > 0">
          <ion-chip
            *ngFor="let filter of activeFilters"
            (click)="removeFilter(filter)"
            class="filter-chip"
          >
            {{ filter.label }}
            <ion-icon name="close-circle" (click)="removeFilter(filter)"></ion-icon>
          </ion-chip>
        </div>

        <!-- Results Header -->
        <div class="results-header">
          <span class="results-count">{{ filteredCars.length }} cars found</span>
          <ion-button fill="clear" (click)="openSortOptions()" class="sort-btn">
            Sort: {{ selectedSort }}
            <ion-icon name="chevron-down-outline"></ion-icon>
          </ion-button>
        </div>

        <!-- Loading -->
        <div class="loading-section" *ngIf="isLoading">
          <ion-spinner name="crescent"></ion-spinner>
          <p>Loading cars...</p>
        </div>

        <!-- Cars Grid/List -->
        <div class="cars-container" [ngClass]="viewMode" *ngIf="!isLoading && filteredCars.length > 0">
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-md="6" size-lg="4" *ngFor="let car of filteredCars">
                <app-car-card
  [car]="car"
  (viewDetails)="onViewCarDetails($event)"
  (toggleFavorite)="onToggleFavorite($event)"
  (addToCart)="onAddToCart($event)"
></app-car-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="!isLoading && filteredCars.length === 0">
          <ion-icon name="car-outline" class="empty-icon"></ion-icon>
          <h3>No cars found</h3>
          <p>Try adjusting your search or filters</p>
          <ion-button (click)="clearFilters()">Clear Filters</ion-button>
        </div>
      </div>
    </ion-content>
  `,
  styles: [],
  standalone: true,
  imports: [
    IonContent,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonChip,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonSpinner,
    CommonModule,
    FormsModule,
    CarCardComponent,
  ],
})
export class ShopPage implements OnInit {
  private router = inject(Router);
  private storageService = inject(StorageService);

  cars: Car[] = [];
  filteredCars: Car[] = [];
  viewMode: 'grid' | 'list' = 'grid';
  selectedSort = 'Price: Low to High';
  activeFilters: any[] = [];
  searchQuery = '';
  isLoading = false;

  constructor() {
    addIcons({
      filterOutline,
      gridOutline,
      listOutline,
      chevronDownOutline,
      closeCircle,
      carOutline,
    });
  }

  async ngOnInit() {
    await this.loadCars();
  }

  async loadCars() {
    try {
      this.isLoading = true;
      this.cars = await this.storageService.getCars();
      this.filteredCars = [...this.cars];
      this.applySorting();
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      this.isLoading = false;
    }
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value || '';
    this.performSearch();
  }

  performSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredCars = [...this.cars];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCars = this.cars.filter(car =>
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.shortDescription.toLowerCase().includes(query) ||
        car.category.toLowerCase().includes(query)
      );
    }
    this.applySorting();
  }

  applySorting() {
    this.filteredCars.sort((a, b) => {
      switch (this.selectedSort) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Rating':
          return b.rating - a.rating;
        case 'Newest':
        default:
          return b.id.localeCompare(a.id);
      }
    });
  }

  openFilters() {
    // In a real app, this would open a filter modal
    console.log('Open filters modal');
  }

  openSortOptions() {
    // In a real app, this would open a sort action sheet
    const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Rating', 'Newest'];
    const currentIndex = sortOptions.indexOf(this.selectedSort);
    this.selectedSort = sortOptions[(currentIndex + 1) % sortOptions.length];
    this.applySorting();
  }

  removeFilter(filter: any) {
    this.activeFilters = this.activeFilters.filter(f => f !== filter);
    // Re-apply filters
  }

  clearFilters() {
    this.activeFilters = [];
    this.searchQuery = '';
    this.filteredCars = [...this.cars];
    this.applySorting();
  }

 onViewCarDetails(car: Car) {
  this.router.navigate(['/car', car.id]);
}

  async onToggleFavorite(car: Car) {
    try {
      const favorites = await this.storageService.getFavorites();
      const isFavorite = favorites.some(fav => fav.id === car.id);

      if (isFavorite) {
        await this.storageService.removeFromFavorites(car.id);
      } else {
        await this.storageService.addToFavorites(car);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  async onAddToCart(car: Car) {
    try {
      const cartItem = {
        id: Date.now(),
        car: car,
        quantity: 1,
        addedAt: new Date(),
      };
      await this.storageService.addToCart(cartItem);
      // Could show a toast here
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
}