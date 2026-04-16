import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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
  categories = [
    { name: 'Sedan', icon: 'car-outline', count: 25 },
    { name: 'SUV', icon: 'car-sport-outline', count: 18 },
    { name: 'Electric', icon: 'battery-charging-outline', count: 12 },
    { name: 'Luxury', icon: 'diamond-outline', count: 8 },
  ];

  constructor(
    private router: Router,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    // Mock featured cars - in real app, fetch from service
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
    thumbnail: 'https://i.pinimg.com/736x/47/27/45/472745f0b0413f4ec9ad58b6484f13d6.jpg',
    gallery: [
      'https://i.pinimg.com/736x/47/27/45/472745f0b0413f4ec9ad58b6484f13d6.jpg'
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
    thumbnail: 'https://i.pinimg.com/736x/c7/22/b7/c722b70cedb8637dbb83ca822c79a23b.jpg',
    gallery: [
      'https://i.pinimg.com/736x/c7/22/b7/c722b70cedb8637dbb83ca822c79a23b.jpg'
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
    thumbnail: 'https://i.pinimg.com/736x/39/7c/46/397c464903d6d19efcb3f9e1bb5aa9f6.jpg',
    gallery: [
      'https://i.pinimg.com/736x/39/7c/46/397c464903d6d19efcb3f9e1bb5aa9f6.jpg'
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
    slug: 'mercedes-c300',
    brand: 'Mercedes-Benz',
    model: 'C300',
    year: 2024,
    category: 'Sedan',
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'RWD',
    engine: '2.0L Turbo Inline-4',
    horsepower: 255,
    torque: '400 Nm',
    rangeKm: 650,
    topSpeedKph: 250,
    zeroToHundred: '6.0s',
    seats: 5,
    doors: 4,
    colorOptions: ['Polar White', 'Obsidian Black'],
    price: 48000,
    currency: 'USD',
    stockStatus: 'in-stock',
    featured: false,
    rating: 4.6,
    reviewCount: 910,
    thumbnail: 'https://i.pinimg.com/736x/3a/80/b8/3a80b81db6b7f7d345689d9355ecbe6a.jpg',
    gallery: [
      'https://i.pinimg.com/736x/3a/80/b8/3a80b81db6b7f7d345689d9355ecbe6a.jpg'
    ],
    shortDescription: 'A refined compact luxury sedan.',
    longDescription: 'The Mercedes-Benz C300 delivers a premium cabin, smooth ride, advanced driver aids, and executive styling.',
    specifications: {
      dimensions: { lengthMm: 4751, widthMm: 1820, heightMm: 1437, wheelbaseMm: 2865, groundClearanceMm: 130 },
      performance: { horsepower: 255, torque: '400 Nm', topSpeedKph: 250, accelerationZeroToHundred: '6.0s' },
      efficiency: { fuelConsumption: '6.9 L/100km', batteryCapacity: 'N/A', rangeKm: 650 },
      safety: ['Active brake assist', 'Blind spot assist', 'ABS', 'Airbags'],
      comfort: ['Leather seats', 'Panoramic sunroof', '64-color ambient lighting'],
      technology: ['12.3-inch cluster', '11.9-inch touchscreen', 'Wireless Apple CarPlay']
    }
  },
  {
    id: '6',
    slug: 'ford-mustang-gt',
    brand: 'Ford',
    model: 'Mustang GT',
    year: 2024,
    category: 'Sports',
    bodyType: 'Coupe',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    drivetrain: 'RWD',
    engine: '5.0L V8',
    horsepower: 480,
    torque: '567 Nm',
    rangeKm: 510,
    topSpeedKph: 250,
    zeroToHundred: '4.3s',
    seats: 4,
    doors: 2,
    colorOptions: ['Race Red', 'Shadow Black'],
    price: 43000,
    currency: 'USD',
    stockStatus: 'in-stock',
    featured: true,
    rating: 4.7,
    reviewCount: 1500,
    thumbnail: 'https://i.pinimg.com/736x/cf/4e/65/cf4e653ee3fbec0f1a6d81ad3217d749.jpg',
    gallery: [
      'https://i.pinimg.com/736x/cf/4e/65/cf4e653ee3fbec0f1a6d81ad3217d749.jpg'
    ],
    shortDescription: 'Classic American V8 performance with modern tech.',
    longDescription: 'The Ford Mustang GT continues the muscle car legacy with a powerful V8, sharp design, and engaging rear-wheel-drive dynamics.',
    specifications: {
      dimensions: { lengthMm: 4811, widthMm: 1916, heightMm: 1397, wheelbaseMm: 2720, groundClearanceMm: 138 },
      performance: { horsepower: 480, torque: '567 Nm', topSpeedKph: 250, accelerationZeroToHundred: '4.3s' },
      efficiency: { fuelConsumption: '12.4 L/100km', batteryCapacity: 'N/A', rangeKm: 510 },
      safety: ['ABS', 'Airbags', 'Lane keeping system', 'Pre-collision assist'],
      comfort: ['Dual-zone climate control', 'Sport seats'],
      technology: ['Digital cluster', 'SYNC 4', 'Apple CarPlay', 'Android Auto']
    }
  },
  {
    id: '7',
    slug: 'honda-civic-rs',
    brand: 'Honda',
    model: 'Civic RS',
    year: 2024,
    category: 'Sedan',
    bodyType: 'Sedan',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'FWD',
    engine: '1.5L Turbo Inline-4',
    horsepower: 176,
    torque: '240 Nm',
    rangeKm: 720,
    topSpeedKph: 200,
    zeroToHundred: '8.2s',
    seats: 5,
    doors: 4,
    colorOptions: ['White', 'Modern Steel'],
    price: 29000,
    currency: 'USD',
    stockStatus: 'in-stock',
    featured: false,
    rating: 4.5,
    reviewCount: 2000,
    thumbnail: 'https://i.pinimg.com/736x/95/7a/0f/957a0f2ae48cfbff7cd5fdcfdbb0cf34.jpg',
    gallery: [
      'https://i.pinimg.com/736x/95/7a/0f/957a0f2ae48cfbff7cd5fdcfdbb0cf34.jpg'
    ],
    shortDescription: 'A stylish and efficient everyday sedan.',
    longDescription: 'The Honda Civic RS offers sporty looks, impressive efficiency, modern cabin technology, and dependable daily usability.',
    specifications: {
      dimensions: { lengthMm: 4678, widthMm: 1802, heightMm: 1415, wheelbaseMm: 2735, groundClearanceMm: 134 },
      performance: { horsepower: 176, torque: '240 Nm', topSpeedKph: 200, accelerationZeroToHundred: '8.2s' },
      efficiency: { fuelConsumption: '6.1 L/100km', batteryCapacity: 'N/A', rangeKm: 720 },
      safety: ['Honda Sensing', 'ABS', 'Airbags', 'Lane keep assist'],
      comfort: ['Rear AC vents', 'Fabric seats', 'Automatic climate control'],
      technology: ['Digital instrument cluster', 'Apple CarPlay', 'Reverse camera']
    }
  },
  {
    id: '8',
    slug: 'hyundai-tucson',
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2024,
    category: 'SUV',
    bodyType: 'SUV',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'FWD',
    engine: '2.0L Inline-4',
    horsepower: 156,
    torque: '192 Nm',
    rangeKm: 680,
    topSpeedKph: 190,
    zeroToHundred: '10.5s',
    seats: 5,
    doors: 5,
    colorOptions: ['Titan Gray', 'Cream White'],
    price: 32000,
    currency: 'USD',
    stockStatus: 'in-stock',
    featured: false,
    rating: 4.4,
    reviewCount: 980,
    thumbnail: 'https://i.pinimg.com/736x/2c/7c/0d/2c7c0dbd1ca8103a17c4e0c79e59c6fe.jpg',
    gallery: [
      'https://i.pinimg.com/736x/2c/7c/0d/2c7c0dbd1ca8103a17c4e0c79e59c6fe.jpg'
    ],
    shortDescription: 'A practical SUV with bold styling and modern features.',
    longDescription: 'The Hyundai Tucson provides spacious seating, smooth ride quality, modern infotainment, and family-friendly practicality.',
    specifications: {
      dimensions: { lengthMm: 4630, widthMm: 1865, heightMm: 1665, wheelbaseMm: 2755, groundClearanceMm: 181 },
      performance: { horsepower: 156, torque: '192 Nm', topSpeedKph: 190, accelerationZeroToHundred: '10.5s' },
      efficiency: { fuelConsumption: '7.2 L/100km', batteryCapacity: 'N/A', rangeKm: 680 },
      safety: ['Forward collision assist', 'Lane follow assist', 'ABS', 'Airbags'],
      comfort: ['Leather seats', 'Panoramic roof', 'Dual-zone climate control'],
      technology: ['10.25-inch touchscreen', 'Wireless charging', 'Apple CarPlay']
    }
  },
  {
    id: '9',
    slug: 'chevrolet-camaro-ss',
    brand: 'Chevrolet',
    model: 'Camaro SS',
    year: 2023,
    category: 'Sports',
    bodyType: 'Coupe',
    transmission: 'Manual',
    fuelType: 'Gasoline',
    drivetrain: 'RWD',
    engine: '6.2L V8',
    horsepower: 455,
    torque: '617 Nm',
    rangeKm: 470,
    topSpeedKph: 265,
    zeroToHundred: '4.0s',
    seats: 4,
    doors: 2,
    colorOptions: ['Yellow', 'Black'],
    price: 44000,
    currency: 'USD',
    stockStatus: 'in-stock',
    featured: true,
    rating: 4.6,
    reviewCount: 740,
    thumbnail: 'https://i.pinimg.com/736x/79/6e/d8/796ed836fd870fb72991f078b0eb9335.jpg',
    gallery: [
      'https://i.pinimg.com/736x/79/6e/d8/796ed836fd870fb72991f078b0eb9335.jpg'
    ],
    shortDescription: 'A bold muscle car with strong V8 performance.',
    longDescription: 'The Camaro SS combines iconic muscle car styling, a naturally aspirated V8, and strong straight-line speed.',
    specifications: {
      dimensions: { lengthMm: 4784, widthMm: 1897, heightMm: 1348, wheelbaseMm: 2811, groundClearanceMm: 120 },
      performance: { horsepower: 455, torque: '617 Nm', topSpeedKph: 265, accelerationZeroToHundred: '4.0s' },
      efficiency: { fuelConsumption: '12.8 L/100km', batteryCapacity: 'N/A', rangeKm: 470 },
      safety: ['Rear vision camera', 'ABS', 'Airbags', 'Traction control'],
      comfort: ['Bose sound system', 'Sport seats', 'Dual-zone climate control'],
      technology: ['8-inch touchscreen', 'Apple CarPlay', 'Android Auto']
    }
  },
  {
    id: '10',
    slug: 'nissan-gtr',
    brand: 'Nissan',
    model: 'GT-R',
    year: 2024,
    category: 'Luxury',
    bodyType: 'Coupe',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'AWD',
    engine: '3.8L Twin-Turbo V6',
    horsepower: 565,
    torque: '633 Nm',
    rangeKm: 500,
    topSpeedKph: 315,
    zeroToHundred: '2.9s',
    seats: 4,
    doors: 2,
    colorOptions: ['Ultimate Silver', 'Pearl White'],
    price: 120000,
    currency: 'USD',
    stockStatus: 'in-stock',
    featured: true,
    rating: 4.9,
    reviewCount: 530,
    thumbnail: 'https://i.pinimg.com/736x/3f/ae/af/3faeaf96dd3e2f066ef6d4ee5b6c5f07.jpg',
    gallery: [
      'https://i.pinimg.com/736x/3f/ae/af/3faeaf96dd3e2f066ef6d4ee5b6c5f07.jpg'
    ],
    shortDescription: 'A legendary AWD performance coupe.',
    longDescription: 'The Nissan GT-R delivers brutal acceleration, advanced all-wheel-drive grip, and a long-standing performance icon reputation.',
    specifications: {
      dimensions: { lengthMm: 4710, widthMm: 1895, heightMm: 1370, wheelbaseMm: 2780, groundClearanceMm: 110 },
      performance: { horsepower: 565, torque: '633 Nm', topSpeedKph: 315, accelerationZeroToHundred: '2.9s' },
      efficiency: { fuelConsumption: '11.7 L/100km', batteryCapacity: 'N/A', rangeKm: 500 },
      safety: ['Vehicle dynamic control', 'ABS', 'Airbags', 'Traction control'],
      comfort: ['Leather-appointed seats', 'Dual-zone automatic climate control'],
      technology: ['8-inch display', 'Navigation', 'Bose premium audio', 'Bluetooth']
    }
  }
];
        

  onSearch() {
    this.router.navigate(['/search']);
  }

  onCategorySelect(category: any) {
    this.router.navigate(['/tabs/shop'], { queryParams: { category: category.name } });
  }

  onViewCarDetails(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  async onToggleFavorite(car: Car) {
    const favorites = await this.storageService.getFavorites();
    const isFavorite = favorites.some(fav => fav.id === car.id);

    if (isFavorite) {
      await this.storageService.removeFromFavorites(car.id);
      return;
    }

    await this.storageService.addToFavorites(car);
  }

  async onAddToCart(car: Car) {
    await this.storageService.addToCart({
      id: Date.now(),
      car,
      quantity: 1,
      addedAt: new Date(),
    });
    await this.router.navigate(['/tabs/cart']);
  }
}
