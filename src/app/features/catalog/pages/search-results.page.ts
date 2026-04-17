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
  IonSpinner,
  IonBadge,
  IonLabel,
} from '@ionic/angular/standalone';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  filterOutline,
  optionsOutline,
  star,
  starOutline,
  closeCircle,
  refreshOutline,
} from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../../core/services/storage.service';
import { Car } from '../../../shared/interfaces/car.interface';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';

type SortBy = 'newest' | 'price-low' | 'price-high' | 'rating';

interface ActiveFilter {
  key: 'category' | 'rating';
  label: string;
  value: string | number;
}

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
        <div class="hero-banner">
          <div>
            <p class="eyebrow">Search smarter</p>
            <h2>Compare results instantly</h2>
            <p>Use filters, quick sorting, and direct card actions to find the best match faster.</p>
          </div>
          <ion-badge color="primary">{{ filteredCars.length }} matches</ion-badge>
        </div>

        <div class="search-section glass-card">
          <ion-searchbar
            [(ngModel)]="searchQuery"
            (ionInput)="onSearchInput($event)"
            placeholder="Search cars, brands, models..."
            class="search-bar"
            show-clear-button="focus"
          ></ion-searchbar>

          <div class="toolbar-actions">
            <ion-button fill="solid" (click)="openFilters()" class="filter-btn">
              <ion-icon name="filter-outline" slot="start"></ion-icon>
              Filters
              <ion-badge *ngIf="activeFilters.length > 0" color="light">{{ activeFilters.length }}</ion-badge>
            </ion-button>

            <ion-button fill="outline" (click)="toggleSort()" class="sort-btn">
              <ion-icon name="options-outline" slot="start"></ion-icon>
              {{ sortLabel }}
            </ion-button>

            <ion-button fill="clear" (click)="resetAll()" class="reset-btn">
              <ion-icon name="refresh-outline" slot="start"></ion-icon>
              Reset
            </ion-button>
          </div>
        </div>

        <div class="filters-section">
          <div class="quick-filters">
            <ion-button fill="clear" size="small" (click)="applyQuickFilter('SUV')">SUV</ion-button>
            <ion-button fill="clear" size="small" (click)="applyQuickFilter('Sedan')">Sedan</ion-button>
            <ion-button fill="clear" size="small" (click)="applyMinimumRating(4.5)">4.5+ stars</ion-button>
          </div>

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
        </div>

        <div class="results-header">
          <div class="results-copy">
            <ion-text *ngIf="filteredCars.length > 0">
              {{ filteredCars.length }} car{{ filteredCars.length !== 1 ? 's' : '' }} found
            </ion-text>
            <ion-text *ngIf="filteredCars.length === 0 && !isLoading">
              No cars found
            </ion-text>
            <p *ngIf="!isLoading">Sorted by {{ sortLabel }}</p>
          </div>
        </div>

        <div class="loading-section" *ngIf="isLoading">
          <ion-spinner name="crescent"></ion-spinner>
          <p>Searching...</p>
        </div>

        <div class="results-grid" *ngIf="!isLoading && filteredCars.length > 0">
          <ion-grid>
            <ion-row>
              <ion-col size="12" size-md="6" size-lg="4" *ngFor="let car of filteredCars">
                <app-car-card [car]="car" (viewDetails)="onCarClick($event)"></app-car-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <div class="no-results glass-card" *ngIf="!isLoading && filteredCars.length === 0">
          <div class="no-results-content">
            <ion-icon name="search-outline" size="large"></ion-icon>
            <h3>No cars found</h3>
            <p>Try adjusting your search, switching the sort, or clearing your current filters.</p>
            <div class="empty-actions">
              <ion-button fill="outline" (click)="clearSearch()">
                Clear Search
              </ion-button>
              <ion-button (click)="resetAll()">
                Reset All
              </ion-button>
            </div>
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
  private actionSheetController = inject(ActionSheetController);
  private toastController = inject(ToastController);

  searchQuery = '';
  isLoading = false;
  sortBy: SortBy = 'newest';
  activeFilters: ActiveFilter[] = [];

  allCars: Car[] = [];
  filteredCars: Car[] = [];

  get sortLabel() {
    return this.sortBy === 'price-low'
      ? 'Price: Low to High'
      : this.sortBy === 'price-high'
      ? 'Price: High to Low'
      : this.sortBy === 'rating'
      ? 'Highest Rated'
      : 'Newest';
  }

  constructor() {
    addIcons({
      searchOutline,
      filterOutline,
      optionsOutline,
      star,
      starOutline,
      closeCircle,
      refreshOutline,
    });
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchQuery = params['q'] || '';
      this.applyFiltersAndSearch();
    });

    await this.loadCars();
  }

  async loadCars() {
    try {
      this.isLoading = true;
      this.allCars = await this.storageService.getCars();
      this.applyFiltersAndSearch();
    } catch (error) {
      console.error('Error loading cars:', error);
      await this.presentToast('Unable to load search results.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  onSearchInput(event: Event | CustomEvent) {
    const value = (event as CustomEvent)?.detail?.value ?? (event.target as HTMLInputElement)?.value ?? '';
    this.searchQuery = value;
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch() {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredCars = this.allCars.filter((car) => {
      const matchesSearch = !query || [
        car.brand,
        car.model,
        car.shortDescription,
        car.longDescription,
        car.category,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));

      const matchesCategory = this.getFilterValue('category')
        ? String(car.category).toLowerCase() === String(this.getFilterValue('category')).toLowerCase()
        : true;

      const matchesRating = this.getFilterValue('rating')
        ? Number(car.rating) >= Number(this.getFilterValue('rating'))
        : true;

      return matchesSearch && matchesCategory && matchesRating;
    });

    this.applySorting();
  }

  applySorting() {
    this.filteredCars = [...this.filteredCars].sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
        default:
          return String(b.id).localeCompare(String(a.id), undefined, { numeric: true, sensitivity: 'base' });
      }
    });
  }

  toggleSort() {
    const sortOptions: SortBy[] = ['newest', 'price-low', 'price-high', 'rating'];
    const currentIndex = sortOptions.indexOf(this.sortBy);
    this.sortBy = sortOptions[(currentIndex + 1) % sortOptions.length];
    this.applySorting();
  }

  async openFilters() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter results',
      buttons: [
        {
          text: 'SUV only',
          handler: () => this.applyQuickFilter('SUV'),
        },
        {
          text: 'Sedan only',
          handler: () => this.applyQuickFilter('Sedan'),
        },
        {
          text: 'Top rated (4.5+)',
          handler: () => this.applyMinimumRating(4.5),
        },
        {
          text: 'Clear filters',
          role: 'destructive',
          handler: () => this.clearActiveFilters(),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  applyQuickFilter(category: string) {
    this.setFilter({ key: 'category', value: category, label: category });
    this.applyFiltersAndSearch();
  }

  applyMinimumRating(rating: number) {
    this.setFilter({ key: 'rating', value: rating, label: `${rating}+ stars` });
    this.applyFiltersAndSearch();
  }

  setFilter(filter: ActiveFilter) {
    this.activeFilters = this.activeFilters.filter((item) => item.key !== filter.key);
    this.activeFilters = [...this.activeFilters, filter];
  }

  getFilterValue(key: ActiveFilter['key']) {
    return this.activeFilters.find((filter) => filter.key === key)?.value;
  }

  clearActiveFilters() {
    this.activeFilters = [];
    this.applyFiltersAndSearch();
  }

  removeFilter(filter: ActiveFilter) {
    this.activeFilters = this.activeFilters.filter((item) => !(item.key === filter.key && item.value === filter.value));
    this.applyFiltersAndSearch();
  }

  onCarClick(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  clearSearch() {
    this.searchQuery = '';
    this.applyFiltersAndSearch();
  }

  resetAll() {
    this.searchQuery = '';
    this.activeFilters = [];
    this.sortBy = 'newest';
    this.applyFiltersAndSearch();
  }

  private async presentToast(message: string, color: 'success' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 1800,
      position: 'bottom',
      color,
    });

    await toast.present();
  }
}