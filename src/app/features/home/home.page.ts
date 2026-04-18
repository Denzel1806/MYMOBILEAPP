
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  searchOutline,
  heartOutline,
  cartOutline,
  arrowForwardOutline,
  star,
  flashOutline,
  diamondOutline,
  speedometerOutline,
  sparklesOutline,
} from 'ionicons/icons';

import { CarCardComponent } from '../../shared/components/car-card/car-card.component';
import { Car } from '../../shared/interfaces/car.interface';
import { StorageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, CarCardComponent],
})
export class HomePage implements OnInit {
  featuredCars: Car[] = [];
  searchQuery = '';
  favoriteIds = new Set<string>();

  topBrands = [
    { name: 'Tesla', routeCategory: 'Electric' },
    { name: 'BMW', routeCategory: 'Luxury' },
    { name: 'Mercedes-Benz', routeCategory: 'SUV' },
    { name: 'Toyota', routeCategory: 'Sports' },
    { name: 'Porsche', routeCategory: 'Sports' },
    { name: 'Audi', routeCategory: 'Luxury' },
    { name: 'Hyundai', routeCategory: 'Electric' },
    { name: 'Ferrari', routeCategory: 'Luxury' },
    { name: 'Lamborghini', routeCategory: 'Sports' },
  ];

  quickCategories = [
    { name: 'Electric', icon: 'flash-outline' },
    { name: 'Luxury', icon: 'diamond-outline' },
    { name: 'Sports', icon: 'speedometer-outline' },
    { name: 'SUV', icon: 'sparkles-outline' },
  ];

  stats = [
    { label: 'Premium Cars', value: '250+' },
    { label: 'Top Brands', value: '40+' },
    { label: 'Happy Buyers', value: '12k+' },
  ];

  constructor(
    private router: Router,
    private storageService: StorageService,
    private toastController: ToastController,
  ) {
    addIcons({
      searchOutline,
      heartOutline,
      cartOutline,
      arrowForwardOutline,
      star,
      flashOutline,
      diamondOutline,
      speedometerOutline,
      sparklesOutline,
    });
  }

  async ngOnInit() {
    await this.loadHomeData();
  }

  async ionViewWillEnter() {
    await this.loadFavorites();
  }

  async loadHomeData() {
    this.seedFeaturedCars();
    // Save cars to storage so shop page can access them
    await this.storageService.setCars(this.featuredCars);
    await this.loadFavorites();
  }

  async loadFavorites() {
    try {
      const favorites = await this.storageService.getFavorites();
      this.favoriteIds = new Set(favorites.map((car) => String(car.id)));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }

  seedFeaturedCars() {
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
      },
      {
        id: '5',
        slug: 'mercedes-benz-g63',
        brand: 'Mercedes-Benz',
        model: 'G63 AMG',
        year: 2024,
        category: 'SUV',
        bodyType: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'AWD',
        engine: '4.0L Twin-Turbo V8',
        horsepower: 577,
        torque: '850 Nm',
        rangeKm: 480,
        topSpeedKph: 220,
        zeroToHundred: '4.5s',
        seats: 5,
        doors: 5,
        colorOptions: ['Obsidian Black', 'G Manufaktur Arabian Grey'],
        price: 180000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.8,
        reviewCount: 520,
        thumbnail: 'https://i.pinimg.com/736x/41/c4/5f/41c45f2a7b0be400e5c3d7dbb5236b87.jpg',
        gallery: [
          'https://i.pinimg.com/736x/41/c4/5f/41c45f2a7b0be400e5c3d7dbb5236b87.jpg'
        ],
        shortDescription: 'The iconic luxury off-road SUV with AMG power.',
        longDescription: 'The Mercedes-Benz G63 AMG combines legendary G-Class capability with handcrafted AMG performance, luxury amenities, and unmistakable presence.',
        specifications: {
          dimensions: { lengthMm: 4870, widthMm: 1984, heightMm: 1980, wheelbaseMm: 2890, groundClearanceMm: 241 },
          performance: { horsepower: 577, torque: '850 Nm', topSpeedKph: 220, accelerationZeroToHundred: '4.5s' },
          efficiency: { fuelConsumption: '14.5 L/100km', batteryCapacity: 'N/A', rangeKm: 480 },
          safety: ['Active brake assist', 'Attention assist', 'Blind spot assist', '360° camera'],
          comfort: ['AMG Performance seats', 'Burmester surround sound', 'Ambient lighting'],
          technology: ['MBUX infotainment', 'Wireless charging', 'Apple CarPlay', 'Android Auto']
        }
      },
      {
        id: '6',
        slug: 'porsche-911-carrera',
        brand: 'Porsche',
        model: '911 Carrera S',
        year: 2024,
        category: 'Sports',
        bodyType: 'Coupe',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'RWD',
        engine: '3.0L Twin-Turbo Flat-6',
        horsepower: 443,
        torque: '530 Nm',
        rangeKm: 550,
        topSpeedKph: 308,
        zeroToHundred: '3.5s',
        seats: 4,
        doors: 2,
        colorOptions: ['Guards Red', 'Gentian Blue', 'White'],
        price: 135000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.9,
        reviewCount: 780,
        thumbnail: 'https://i.pinimg.com/736x/53/ea/9e/53ea9e8716b29e38f5adccec1e96b5a0.jpg',
        gallery: [
          'https://i.pinimg.com/736x/53/ea/9e/53ea9e8716b29e38f5adccec1e96b5a0.jpg'
        ],
        shortDescription: 'The timeless sports car icon with everyday usability.',
        longDescription: 'The Porsche 911 Carrera S continues the legacy with twin-turbo power, precise handling, and everyday comfort in an unmistakable silhouette.',
        specifications: {
          dimensions: { lengthMm: 4519, widthMm: 1852, heightMm: 1300, wheelbaseMm: 2450, groundClearanceMm: 120 },
          performance: { horsepower: 443, torque: '530 Nm', topSpeedKph: 308, accelerationZeroToHundred: '3.5s' },
          efficiency: { fuelConsumption: '9.7 L/100km', batteryCapacity: 'N/A', rangeKm: 550 },
          safety: ['Porsche Stability Management', 'Lane keeping assist', 'Night Vision Assist'],
          comfort: ['Sport seats Plus', 'BOSE Surround Sound', 'Panoramic roof'],
          technology: ['Porsche Communication Management', 'Track Precision App', 'Wireless Apple CarPlay']
        }
      },
      {
        id: '7',
        slug: 'hyundai-ioniq-5',
        brand: 'Hyundai',
        model: 'IONIQ 5',
        year: 2024,
        category: 'Electric',
        bodyType: 'SUV',
        transmission: 'Automatic',
        fuelType: 'Electric',
        drivetrain: 'AWD',
        engine: 'Dual Electric Motors',
        horsepower: 320,
        torque: '605 Nm',
        rangeKm: 430,
        topSpeedKph: 185,
        zeroToHundred: '5.1s',
        seats: 5,
        doors: 5,
        colorOptions: ['Gravity Gold', 'Lucid Blue', 'Digital Teal'],
        price: 52000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.7,
        reviewCount: 920,
        thumbnail: 'https://i.pinimg.com/736x/8b/25/24/8b25245f6e63548a7a8084052a2a0d4e.jpg',
        gallery: [
          'https://i.pinimg.com/736x/8b/25/24/8b25245f6e63548a7a8084052a2a0d4e.jpg'
        ],
        shortDescription: 'Futuristic electric crossover with ultra-fast charging.',
        longDescription: 'The Hyundai IONIQ 5 combines retro-futuristic design, 800V ultra-fast charging, spacious interior, and impressive electric range in a versatile package.',
        specifications: {
          dimensions: { lengthMm: 4635, widthMm: 1890, heightMm: 1605, wheelbaseMm: 3000, groundClearanceMm: 160 },
          performance: { horsepower: 320, torque: '605 Nm', topSpeedKph: 185, accelerationZeroToHundred: '5.1s' },
          efficiency: { fuelConsumption: 'N/A', batteryCapacity: '77.4 kWh', rangeKm: 430 },
          safety: ['Highway Driving Assist', 'Smart Cruise Control', 'Blind-spot View Monitor'],
          comfort: ['Relaxation seats', 'Vision roof', 'Dual-zone climate control'],
          technology: ['12.3-inch digital cluster', 'AR Head-up display', 'V2L (Vehicle to Load)']
        }
      },
      {
        id: '8',
        slug: 'ferrari-roma',
        brand: 'Ferrari',
        model: 'Roma',
        year: 2024,
        category: 'Luxury',
        bodyType: 'Coupe',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'RWD',
        engine: '3.9L Twin-Turbo V8',
        horsepower: 612,
        torque: '760 Nm',
        rangeKm: 520,
        topSpeedKph: 320,
        zeroToHundred: '3.4s',
        seats: 2,
        doors: 2,
        colorOptions: ['Rosso Corsa', 'Giallo Modena', 'Nero'],
        price: 245000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 5.0,
        reviewCount: 280,
        thumbnail: 'https://i.pinimg.com/736x/67/d4/d2/67d4d2a30a5e97e3f27b7e6c6968f8c0.jpg',
        gallery: [
          'https://i.pinimg.com/736x/67/d4/d2/67d4d2a30a5e97e3f27b7e6c6968f8c0.jpg'
        ],
        shortDescription: 'Elegant Italian grand tourer with timeless style.',
        longDescription: 'The Ferrari Roma embodies La Dolce Vita with sleek lines, intoxicating V8 power, and refined grand touring comfort in a contemporary package.',
        specifications: {
          dimensions: { lengthMm: 4656, widthMm: 1974, heightMm: 1301, wheelbaseMm: 2670, groundClearanceMm: 120 },
          performance: { horsepower: 612, torque: '760 Nm', topSpeedKph: 320, accelerationZeroToHundred: '3.4s' },
          efficiency: { fuelConsumption: '11.8 L/100km', batteryCapacity: 'N/A', rangeKm: 520 },
          safety: ['Ferrari Stability Control', 'F1-Trac', 'Carbon ceramic brakes'],
          comfort: ['Racing seats', 'JBL Professional audio', 'Climate control'],
          technology: ['Ferrari Cockpit', '8.4-inch touchscreen', 'Apple CarPlay', 'Race telemetry']
        }
      },
      {
        id: '9',
        slug: 'lamborghini-huracan',
        brand: 'Lamborghini',
        model: 'Huracán EVO',
        year: 2024,
        category: 'Sports',
        bodyType: 'Coupe',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'AWD',
        engine: '5.2L V10',
        horsepower: 631,
        torque: '565 Nm',
        rangeKm: 450,
        topSpeedKph: 325,
        zeroToHundred: '2.9s',
        seats: 2,
        doors: 2,
        colorOptions: ['Verde Mantis', 'Arancio Borealis', 'Bianco Monocerus'],
        price: 290000,
        currency: 'USD',
        stockStatus: 'in-stock',
        featured: true,
        rating: 4.9,
        reviewCount: 420,
        thumbnail: 'https://i.pinimg.com/736x/43/9e/f5/439ef51c6db5d9f3f5e5c17fc7c34c01.jpg',
        gallery: [
          'https://i.pinimg.com/736x/43/9e/f5/439ef51c6db5d9f3f5e5c17fc7c34c01.jpg'
        ],
        shortDescription: 'Raging bull supercar with extreme performance.',
        longDescription: 'The Lamborghini Huracán EVO delivers breathtaking V10 power, razor-sharp handling, and aggressive Italian styling that commands attention everywhere.',
        specifications: {
          dimensions: { lengthMm: 4520, widthMm: 1933, heightMm: 1165, wheelbaseMm: 2620, groundClearanceMm: 135 },
          performance: { horsepower: 631, torque: '565 Nm', topSpeedKph: 325, accelerationZeroToHundred: '2.9s' },
          efficiency: { fuelConsumption: '14.7 L/100km', batteryCapacity: 'N/A', rangeKm: 450 },
          safety: ['LDVI (Lamborghini Dinamica Veicolo Integrata)', 'Magneto rheological suspension', 'Ceramic brakes'],
          comfort: ['Sport seats', 'Premium leather', 'Dual-zone climate'],
          technology: ['Lamborghini Infotainment System', 'Apple CarPlay', 'Telemetry system', 'Alcantara interior']
        }
      }
    ];
  }

  onSearch() {
    const trimmedQuery = this.searchQuery?.trim() || '';
    this.router.navigate(['/search'], {
      queryParams: { q: trimmedQuery },
    });
  }

  onSearchInput(event: Event | CustomEvent) {
    const value =
      (event as CustomEvent)?.detail?.value ??
      (event.target as HTMLInputElement)?.value ??
      '';

    this.searchQuery = value;
  }

  onCategorySelect(category: { name: string }) {
    this.router.navigate(['/tabs/shop'], {
      queryParams: { category: category.name },
      queryParamsHandling: 'merge'
    });
  }

  onBrandSelect(brand: { name: string; routeCategory: string }) {
    this.router.navigate(['/tabs/shop'], {
      queryParams: {
        brand: brand.name,
        category: brand.routeCategory
      },
      queryParamsHandling: 'merge'
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
      const carId = String(car.id);

      if (this.favoriteIds.has(carId)) {
        await this.storageService.removeFromFavorites(carId);
        this.favoriteIds.delete(carId);
        this.favoriteIds = new Set(this.favoriteIds);
        await this.showToast(`${car.brand} ${car.model} removed from favorites`);
        return;
      }

      await this.storageService.addToFavorites(car);
      this.favoriteIds.add(carId);
      this.favoriteIds = new Set(this.favoriteIds);
      await this.showToast(`${car.brand} ${car.model} added to favorites`);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      await this.showToast('Could not update favorites');
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
        await this.storageService.addToCart({
          id: Date.now(),
          car,
          quantity: 1,
          addedAt: new Date(),
        });
      }

      await this.showToast(`${car.brand} ${car.model} added to cart`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      await this.showToast('Could not add item to cart');
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