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
  IonBadge,
} from '@ionic/angular/standalone';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  filterOutline,
  gridOutline,
  listOutline,
  chevronDownOutline,
  closeCircle,
  carOutline,
  sparklesOutline,
  pricetagOutline,
  starOutline,
  refreshOutline,
  searchOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { CarCardComponent } from '../../../shared/components/car-card/car-card.component';
import { Car } from '../../../shared/interfaces/car.interface';
import { StorageService } from '../../../core/services/storage.service';

type SortOption = 'Price: Low to High' | 'Price: High to Low' | 'Rating' | 'Newest';

interface ActiveFilter {
  key: 'category' | 'rating';
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-shop',
  template: `
    <ion-content class="shop-content">
      <div class="shop-container">
        <div class="hero-card">
          <div>
            <p class="eyebrow">Find your next ride</p>
            <h1>Premium cars, smarter browsing</h1>
            <p class="hero-copy">
              Search by brand, model, category, or description and quickly switch between curated filters.
            </p>
          </div>
          <ion-badge color="primary">{{ filteredCars.length }} available</ion-badge>
        </div>

        <div class="shop-header glass-card">
          <ion-searchbar
            [(ngModel)]="searchQuery"
            placeholder="Search cars, brands, models..."
            (ionInput)="onSearch($event)"
            (keyup.enter)="goToSearchResults()"
            show-clear-button="focus"
            class="shop-search"
          ></ion-searchbar>

          <div class="filter-row">
            <ion-button fill="solid" (click)="openFilters()" class="filter-btn">
              <ion-icon name="filter-outline" slot="start"></ion-icon>
              Filters
              <ion-badge *ngIf="activeFilters.length > 0" color="light">
                {{ activeFilters.length }}
              </ion-badge>
            </ion-button>

            <ion-button fill="outline" (click)="openSortOptions()" class="sort-chip-btn">
              <ion-icon name="chevron-down-outline" slot="start"></ion-icon>
              {{ selectedSort }}
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

        <div class="quick-actions">
          <ion-button fill="clear" size="small" (click)="applyQuickFilter('SUV')">
            <ion-icon name="sparkles-outline" slot="start"></ion-icon>
            SUVs
          </ion-button>

          <ion-button fill="clear" size="small" (click)="applyQuickFilter('Sedan')">
            <ion-icon name="pricetag-outline" slot="start"></ion-icon>
            Sedans
          </ion-button>

          <ion-button fill="clear" size="small" (click)="applyMinimumRating(4.5)">
            <ion-icon name="star-outline" slot="start"></ion-icon>
            Top rated
          </ion-button>

          <ion-button fill="clear" size="small" (click)="clearFilters()">
            <ion-icon name="refresh-outline" slot="start"></ion-icon>
            Reset
          </ion-button>

          <ion-button fill="clear" size="small" (click)="goToSearchResults()">
            <ion-icon name="search-outline" slot="start"></ion-icon>
            Full search
          </ion-button>
        </div>

        <div class="active-filters" *ngIf="activeFilters.length > 0">
          <ion-chip
            *ngFor="let filter of activeFilters"
            (click)="removeFilter(filter)"
            class="filter-chip"
          >
            {{ filter.label }}
            <ion-icon name="close-circle"></ion-icon>
          </ion-chip>
        </div>

        <div class="results-header">
          <div>
            <span class="results-count">{{ filteredCars.length }} cars found</span>
            <p class="results-caption">Browse, compare, favorite, and open full details.</p>
          </div>

          <ion-button
            fill="clear"
            (click)="clearFilters()"
            class="clear-btn"
            *ngIf="searchQuery || activeFilters.length"
          >
            Clear all
          </ion-button>
        </div>

        <div class="loading-section" *ngIf="isLoading">
          <ion-spinner name="crescent"></ion-spinner>
          <p>Loading cars...</p>
        </div>

        <div class="cars-container" [ngClass]="viewMode" *ngIf="!isLoading && filteredCars.length > 0">
          <ion-grid>
            <ion-row>
              <ion-col
                [size]="'12'"
                [sizeMd]="viewMode === 'grid' ? '6' : '12'"
                [sizeLg]="viewMode === 'grid' ? '4' : '12'"
                *ngFor="let car of filteredCars"
              >
                <app-car-card
                  [car]="car"
                  [isFavorite]="isFavorite(car)"
                  (viewDetails)="onViewCarDetails($event)"
                  (toggleFavorite)="onToggleFavorite($event)"
                  (addToCart)="onAddToCart($event)"
                ></app-car-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <div class="empty-state glass-card" *ngIf="!isLoading && filteredCars.length === 0">
          <ion-icon name="car-outline" class="empty-icon"></ion-icon>
          <h3>No cars found</h3>
          <p>Try adjusting your search, changing the sort, or clearing active filters.</p>
          <div class="empty-actions">
            <ion-button (click)="clearFilters()">Clear Filters</ion-button>
            <ion-button fill="outline" (click)="goToSearchResults()">Search Page</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  `,
  standalone: true,
  styles: [],
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
    IonBadge,
    CommonModule,
    FormsModule,
    CarCardComponent,
  ],
})
export class ShopPage implements OnInit {
  private router = inject(Router);
  private storageService = inject(StorageService);
  private actionSheetController = inject(ActionSheetController);
  private toastController = inject(ToastController);

  cars: Car[] = [];
  filteredCars: Car[] = [];
  favoriteIds = new Set<string>();

  viewMode: 'grid' | 'list' = 'grid';
  selectedSort: SortOption = 'Price: Low to High';
  activeFilters: ActiveFilter[] = [];
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
      sparklesOutline,
      pricetagOutline,
      starOutline,
      refreshOutline,
      searchOutline,
    });
  }

  async ngOnInit() {
    await this.loadInitialData();
  }

  async loadInitialData() {
    try {
      this.isLoading = true;
      let cars = await this.storageService.getCars();

      // If no cars in storage, seed with default cars
      if (!cars || cars.length === 0) {
        cars = this.getDefaultCars();
        await this.storageService.setCars(cars);
      }

      const favorites = await this.storageService.getFavorites();

      this.cars = cars;
      this.favoriteIds = new Set(favorites.map((car) => String(car.id)));
      this.applyFiltersAndSearch();
    } catch (error) {
      console.error('Error loading shop data:', error);
      await this.presentToast('Unable to load cars right now.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private getDefaultCars(): Car[] {
    // Return the same cars from home page
    return [
      {
        id: '1',
        slug: 'tesla-model-3',
        brand: 'Tesla',
        model: 'Model 3',
        year: 2024,
        category: 'Electric',
        bodyType: 'Sedan',
        transmission: 'Automatic',
        fuelType: 'Electric',
        drivetrain: 'RWD',
        engine: 'Electric Motor',
        horsepower: 283,
        torque: '420 Nm',
        rangeKm: 491,
        topSpeedKph: 225,
        zeroToHundred: '5.8s',
        seats: 5,
        doors: 4,
        colorOptions: ['Pearl White', 'Deep Blue'],
        price: 45000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.8,
        reviewCount: 1250,
        thumbnail: 'https://i.pinimg.com/1200x/01/be/62/01be62895c6e398135414725e7bf4dac.jpg',
        gallery: ['https://i.pinimg.com/1200x/01/be/62/01be62895c6e398135414725e7bf4dac.jpg'],
        shortDescription: 'The Tesla Model 3 is a compact executive electric sedan.',
        longDescription: 'The Tesla Model 3 offers excellent range, quick acceleration, minimalist design, and advanced driver assistance features for daily driving and long-distance travel.',
        specifications: {
          dimensions: { lengthMm: 4694, widthMm: 1849, heightMm: 1443, wheelbaseMm: 2875, groundClearanceMm: 140 },
          performance: { horsepower: 283, torque: '420 Nm', topSpeedKph: 225, accelerationZeroToHundred: '5.8s' },
          efficiency: { fuelConsumption: 'N/A', batteryCapacity: '60 kWh', rangeKm: 491 },
          safety: ['5-star NHTSA rating', 'Lane keeping assist', 'Automatic emergency braking'],
          comfort: ['Premium audio', 'Heated seats', 'Dual-zone climate control'],
          technology: ['15-inch touchscreen', 'Navigation', 'Bluetooth', 'Autopilot']
        }
      },
      {
        id: '2',
        slug: 'bmw-m4-competition',
        brand: 'BMW',
        model: 'M4 Competition',
        year: 2024,
        category: 'Luxury',
        bodyType: 'Coupe',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'AWD',
        engine: '3.0L Twin-Turbo Inline-6',
        horsepower: 503,
        torque: '650 Nm',
        rangeKm: 540,
        topSpeedKph: 290,
        zeroToHundred: '3.5s',
        seats: 4,
        doors: 2,
        colorOptions: ['Black Sapphire', 'Isle of Man Green'],
        price: 79000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.9,
        reviewCount: 860,
        thumbnail: 'https://i.pinimg.com/1200x/07/91/97/079197f4d399b83687019efd8d3cd71a.jpg',
        gallery: ['https://i.pinimg.com/1200x/07/91/97/079197f4d399b83687019efd8d3cd71a.jpg'],
        shortDescription: 'A high-performance luxury coupe with aggressive styling.',
        longDescription: 'The BMW M4 Competition blends track-ready power, premium comfort, and advanced cabin technology in a bold performance coupe package.',
        specifications: {
          dimensions: { lengthMm: 4794, widthMm: 1887, heightMm: 1393, wheelbaseMm: 2857, groundClearanceMm: 120 },
          performance: { horsepower: 503, torque: '650 Nm', topSpeedKph: 290, accelerationZeroToHundred: '3.5s' },
          efficiency: { fuelConsumption: '10.1 L/100km', batteryCapacity: 'N/A', rangeKm: 540 },
          safety: ['Adaptive cruise control', 'Lane departure warning', 'ABS', 'Airbags'],
          comfort: ['Merino leather seats', 'Heated front seats', 'Ambient lighting'],
          technology: ['Curved display', 'Apple CarPlay', 'Android Auto', 'Parking assistant']
        }
      },
      {
        id: '3',
        slug: 'toyota-supra',
        brand: 'Toyota',
        model: 'GR Supra',
        year: 2024,
        category: 'Sports',
        bodyType: 'Coupe',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'RWD',
        engine: '3.0L Turbo Inline-6',
        horsepower: 382,
        torque: '500 Nm',
        rangeKm: 520,
        topSpeedKph: 250,
        zeroToHundred: '4.1s',
        seats: 2,
        doors: 2,
        colorOptions: ['Renaissance Red', 'Matte White'],
        price: 56000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.7,
        reviewCount: 610,
        thumbnail: 'https://i.pinimg.com/736x/df/11/fe/df11fe697b8b69fe09150aa299d38c96.jpg',
        gallery: ['https://i.pinimg.com/736x/df/11/fe/df11fe697b8b69fe09150aa299d38c96.jpg'],
        shortDescription: 'A modern sports coupe with iconic Supra DNA.',
        longDescription: 'The Toyota GR Supra delivers sharp handling, turbocharged performance, and unmistakable coupe styling for enthusiasts.',
        specifications: {
          dimensions: { lengthMm: 4380, widthMm: 1865, heightMm: 1290, wheelbaseMm: 2470, groundClearanceMm: 119 },
          performance: { horsepower: 382, torque: '500 Nm', topSpeedKph: 250, accelerationZeroToHundred: '4.1s' },
          efficiency: { fuelConsumption: '8.1 L/100km', batteryCapacity: 'N/A', rangeKm: 520 },
          safety: ['Blind spot monitor', 'ABS', 'Airbags', 'Rear cross traffic alert'],
          comfort: ['Sport seats', 'Dual-zone AC', 'Leather trim'],
          technology: ['8.8-inch infotainment', 'Navigation', 'Bluetooth', 'Wireless charging']
        }
      }
    ];
  }

  onSearch(event: Event | CustomEvent) {
    const value =
      (event as CustomEvent)?.detail?.value ??
      (event.target as HTMLInputElement)?.value ??
      '';

    this.searchQuery = value;
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch() {
    const query = this.searchQuery.trim().toLowerCase();

    this.filteredCars = this.cars.filter((car) => {
      const matchesSearch =
        !query ||
        [
          car.brand,
          car.model,
          car.shortDescription,
          car.longDescription,
          car.category,
          car.bodyType,
          car.fuelType,
          car.transmission,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));

      const selectedCategory = this.getFilterValue('category');
      const selectedRating = this.getFilterValue('rating');

      const matchesCategory = selectedCategory
        ? String(car.category).toLowerCase() === String(selectedCategory).toLowerCase()
        : true;

      const matchesRating = selectedRating
        ? Number(car.rating) >= Number(selectedRating)
        : true;

      return matchesSearch && matchesCategory && matchesRating;
    });

    this.applySorting();
  }

  applySorting() {
    this.filteredCars = [...this.filteredCars].sort((a, b) => {
      switch (this.selectedSort) {
        case 'Price: Low to High':
          return a.price - b.price;
        case 'Price: High to Low':
          return b.price - a.price;
        case 'Rating':
          return b.rating - a.rating;
        case 'Newest':
        default:
          return String(b.id).localeCompare(String(a.id), undefined, {
            numeric: true,
            sensitivity: 'base',
          });
      }
    });
  }

  async openFilters() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Filter cars',
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
          handler: () => this.clearFilters(),
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  async openSortOptions() {
    const options: SortOption[] = [
      'Price: Low to High',
      'Price: High to Low',
      'Rating',
      'Newest',
    ];

    const buttons = [
      ...options.map((option) => ({
        text: option,
        handler: () => {
          this.selectedSort = option;
          this.applySorting();
        },
      })),
      {
        text: 'Cancel',
        role: 'cancel' as const,
      },
    ];

    const actionSheet = await this.actionSheetController.create({
      header: 'Sort cars',
      buttons,
    });

    await actionSheet.present();
  }

  applyQuickFilter(category: string) {
    this.setFilter({
      key: 'category',
      value: category,
      label: category,
    });
    this.applyFiltersAndSearch();
  }

  applyMinimumRating(rating: number) {
    this.setFilter({
      key: 'rating',
      value: rating,
      label: `${rating}+ stars`,
    });
    this.applyFiltersAndSearch();
  }

  setFilter(filter: ActiveFilter) {
    this.activeFilters = this.activeFilters.filter((item) => item.key !== filter.key);
    this.activeFilters = [...this.activeFilters, filter];
  }

  getFilterValue(key: ActiveFilter['key']) {
    return this.activeFilters.find((filter) => filter.key === key)?.value;
  }

  removeFilter(filter: ActiveFilter) {
    this.activeFilters = this.activeFilters.filter(
      (item) => !(item.key === filter.key && item.value === filter.value)
    );
    this.applyFiltersAndSearch();
  }

  clearFilters() {
    this.activeFilters = [];
    this.searchQuery = '';
    this.applyFiltersAndSearch();
  }

  goToSearchResults() {
    this.router.navigate(['/tabs/shop/search-results'], {
      queryParams: { q: this.searchQuery || '' },
    });
  }

  onViewCarDetails(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  isFavorite(car: Car): boolean {
    return this.favoriteIds.has(String(car.id));
  }

  async onToggleFavorite(car: Car) {
    try {
      const id = String(car.id);

      if (this.favoriteIds.has(id)) {
        await this.storageService.removeFromFavorites(id);
        this.favoriteIds.delete(id);
        await this.presentToast(`${car.brand} ${car.model} removed from favorites.`);
      } else {
        await this.storageService.addToFavorites(car);
        this.favoriteIds.add(id);
        await this.presentToast(`${car.brand} ${car.model} added to favorites.`);
      }

      this.favoriteIds = new Set(this.favoriteIds);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      await this.presentToast('Could not update favorites.', 'danger');
    }
  }

  async onAddToCart(car: Car) {
    try {
      const cart = await this.storageService.getCart();
      const existingItem = cart.find((item) => String(item.car.id) === String(car.id));

      if (existingItem) {
        existingItem.quantity += 1;
        await this.storageService.updateCartItem(existingItem);
      } else {
        const cartItem = {
          id: Date.now(),
          car,
          quantity: 1,
          addedAt: new Date(),
        };
        await this.storageService.addToCart(cartItem);
      }

      await this.presentToast(`${car.brand} ${car.model} added to cart.`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      await this.presentToast('Could not add this car to the cart.', 'danger');
    }
  }

  private async presentToast(
    message: string,
    color: 'success' | 'danger' = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 1800,
      position: 'bottom',
      color,
    });

    await toast.present();
  }
}