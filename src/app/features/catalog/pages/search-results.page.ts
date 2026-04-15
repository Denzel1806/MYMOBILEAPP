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
  IonSearchbar,
  IonIcon,
  IonButton,
  IonChip,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonSpinner,
  IonBadge,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  filterOutline,
  optionsOutline,
  star,
  starOutline,
} from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { Car } from '../../../shared/interfaces/car.interface';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';

@Component({
  selector: 'app-search-results',
  template: `
    <ion-header [translucent]="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/shop"></ion-back-button>
        </ion-buttons>
        <ion-title>Search Results</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content [fullscreen]="true">
      <div class="search-results-content">
        <!-- Search Bar -->
        <div class="search-section">
          <ion-searchbar
            [(ngModel)]="searchQuery"
            (ionInput)="onSearchInput($event)"
            placeholder="Search cars, brands, models..."
            class="search-bar"
          ></ion-searchbar>
        </div>

        <!-- Filters -->
        <div class="filters-section">
          <div class="active-filters" *ngIf="activeFilters.length > 0">
            <ion-chip
              *ngFor="let filter of activeFilters"
              color="primary"
              (click)="removeFilter(filter)"
            >
              <ion-label>{{ filter.label }}</ion-label>
              <ion-icon name="close-circle" slot="end"></ion-icon>
            </ion-chip>
          </div>

          <ion-button fill="outline" (click)="openFilters()" class="filter-btn">
            <ion-icon name="filter-outline" slot="start"></ion-icon>
            Filters
            <ion-badge *ngIf="activeFilters.length > 0" color="primary">
              {{ activeFilters.length }}
            </ion-badge>
          </ion-button>
        </div>

        <!-- Results Header -->
        <div class="results-header">
          <div class="results-count">
            <ion-text *ngIf="filteredCars.length > 0">
              {{ filteredCars.length }} car{{ filteredCars.length !== 1 ? 's' : '' }} found
            </ion-text>
            <ion-text *ngIf="filteredCars.length === 0 && !isLoading">
              No cars found
            </ion-text>
          </div>

          <ion-button fill="clear" (click)="toggleSort()" class="sort-btn">
            <ion-icon name="options-outline" slot="start"></ion-icon>
            {{ sortBy === 'price-low' ? 'Price: Low to High' :
               sortBy === 'price-high' ? 'Price: High to Low' :
               sortBy === 'rating' ? 'Highest Rated' : 'Newest' }}
          </ion-button>
        </div>

        <!-- Loading -->
        <div class="loading-section" *ngIf="isLoading">
          <ion-spinner name="crescent"></ion-spinner>
          <p>Searching...</p>
        </div>

        <!-- Results Grid -->
        <div class="results-grid" *ngIf="!isLoading && filteredCars.length > 0">
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-md="6" size-lg="4" *ngFor="let car of filteredCars">
                <app-car-card [car]="car" (cardClick)="onCarClick(car)"></app-car-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <!-- No Results -->
        <div class="no-results" *ngIf="!isLoading && filteredCars.length === 0 && searchQuery">
          <div class="no-results-content">
            <ion-icon name="search-outline" size="large"></ion-icon>
            <h3>No cars found</h3>
            <p>Try adjusting your search or filters</p>
            <ion-button fill="outline" (click)="clearSearch()">
              Clear Search
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
    IonSearchbar,
    IonIcon,
    IonButton,
    IonChip,
    IonText,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonSpinner,
    IonBadge,
    IonLabel,
    CommonModule,
    FormsModule,
    CarCardComponent,
  ],
})
export class SearchResultsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private storageService = inject(StorageService);

  searchQuery = '';
  isLoading = false;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating' = 'newest';
  activeFilters: any[] = [];

  allCars: Car[] = [];
  filteredCars: Car[] = [];

  constructor() {
    addIcons({
      searchOutline,
      filterOutline,
      optionsOutline,
      star,
      starOutline,
    });
  }

  async ngOnInit() {
    // Get search query from route params
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.performSearch();
    });

    await this.loadCars();
  }

  async loadCars() {
    try {
      this.allCars = await this.storageService.getCars();
      this.performSearch();
    } catch (error) {
      console.error('Error loading cars:', error);
    }
  }

  onSearchInput(event: any) {
    this.searchQuery = event.target.value || '';
    this.performSearch();
  }

  performSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredCars = [...this.allCars];
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredCars = this.allCars.filter(car =>
        (car.brand + ' ' + car.model).toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.shortDescription.toLowerCase().includes(query) ||
        car.longDescription.toLowerCase().includes(query)
      );
    }

    this.applySorting();
  }

  applySorting() {
    this.filteredCars.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return b.id.localeCompare(a.id); // String comparison for IDs
      }
    });
  }

  toggleSort() {
    const sortOptions: typeof this.sortBy[] = ['newest', 'price-low', 'price-high', 'rating'];
    const currentIndex = sortOptions.indexOf(this.sortBy);
    this.sortBy = sortOptions[(currentIndex + 1) % sortOptions.length];
    this.applySorting();
  }

  openFilters() {
    // In a real app, this would open a filter modal
    console.log('Open filters modal');
  }

  removeFilter(filter: any) {
    this.activeFilters = this.activeFilters.filter(f => f !== filter);
    // Re-apply filters
  }

  onCarClick(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  clearSearch() {
    this.searchQuery = '';
    this.filteredCars = [...this.allCars];
    this.applySorting();
  }
}