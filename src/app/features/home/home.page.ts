import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarCardComponent } from '../../shared/components/car-card/car-card.component';
import { Car } from '../../shared/interfaces/car.interface';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, CarCardComponent],
})
export class HomePage implements OnInit {
  featuredCars: Car[] = [];
  searchQuery = '';

  topBrands = [
    { name: 'Tesla', routeCategory: 'Electric' },
    { name: 'BMW', routeCategory: 'Luxury' },
    { name: 'Mercedes', routeCategory: 'Sedan' },
    { name: 'Toyota', routeCategory: 'Sports' },
    { name: 'Hyundai', routeCategory: 'SUV' },
  ];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.featuredCars = [
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
        gallery: [
          'https://i.pinimg.com/1200x/01/be/62/01be62895c6e398135414725e7bf4dac.jpg'
        ],
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
        gallery: [
          'https://i.pinimg.com/1200x/07/91/97/079197f4d399b83687019efd8d3cd71a.jpg'
        ],
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
        gallery: [
          'https://i.pinimg.com/736x/df/11/fe/df11fe697b8b69fe09150aa299d38c96.jpg'
        ],
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
      },
      {
        id: '4',
        slug: 'audi-r8',
        brand: 'Audi',
        model: 'R8',
        year: 2023,
        category: 'Luxury',
        bodyType: 'Coupe',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'AWD',
        engine: '5.2L V10',
        horsepower: 562,
        torque: '550 Nm',
        rangeKm: 460,
        topSpeedKph: 324,
        zeroToHundred: '3.4s',
        seats: 2,
        doors: 2,
        colorOptions: ['Daytona Gray', 'Mythos Black'],
        price: 158000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.9,
        reviewCount: 340,
        thumbnail: 'https://i.pinimg.com/1200x/ea/7b/a4/ea7ba43df3077a467f45141ef14828ed.jpg',
        gallery: [
          'https://i.pinimg.com/1200x/ea/7b/a4/ea7ba43df3077a467f45141ef14828ed.jpg'
        ],
        shortDescription: 'A naturally aspirated V10 supercar with everyday usability.',
        longDescription: 'The Audi R8 combines exotic design, quattro confidence, and a thrilling V10 engine for a refined supercar experience.',
        specifications: {
          dimensions: { lengthMm: 4429, widthMm: 1940, heightMm: 1236, wheelbaseMm: 2650, groundClearanceMm: 105 },
          performance: { horsepower: 562, torque: '550 Nm', topSpeedKph: 324, accelerationZeroToHundred: '3.4s' },
          efficiency: { fuelConsumption: '13.1 L/100km', batteryCapacity: 'N/A', rangeKm: 460 },
          safety: ['ABS', 'Airbags', 'Traction control', 'Parking sensors'],
          comfort: ['Nappa leather seats', 'Automatic climate control'],
          technology: ['Virtual cockpit', 'Bang & Olufsen audio', 'Navigation']
        }
      }
    ];
  }

  onSearch() {
    this.router.navigate(['/search-results'], {
      queryParams: { q: this.searchQuery?.trim() || '' },
    });
  }

  onSearchInput(event: any) {
    this.searchQuery = event.target.value || '';
  }

  onCategorySelect(category: any) {
    this.router.navigate(['/tabs/shop'], {
      queryParams: { category: category.name }
    });
  }

  onBrandSelect(brand: { name: string; routeCategory: string }) {
    this.router.navigate(['/tabs/shop'], {
      queryParams: {
        brand: brand.name,
        category: brand.routeCategory
      }
    });
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
        await this.showToast(`${car.brand} ${car.model} removed from favorites`);
        return;
      }

      await this.storageService.addToFavorites(car);
      await this.showToast(`${car.brand} ${car.model} added to favorites`);
    } catch (error) {
      console.error('Error toggling favorite:', error);
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

  goToShop() {
    this.router.navigate(['/tabs/shop']);
  }

  goToFavorites() {
    this.router.navigate(['/tabs/favorites']);
  }

  goToCart() {
    this.router.navigate(['/tabs/cart']);
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