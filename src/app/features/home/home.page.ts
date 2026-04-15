import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CarCardComponent } from '../../shared/components/car-card/car-card.component';
import { Car } from '../../shared/interfaces/car.interface';

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

  constructor(private router: Router) {}

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
        thumbnail: 'assets/images/cars/tesla-model-3-thumb.jpg',
        gallery: [],
        shortDescription: 'The Tesla Model 3 is a compact executive car.',
        longDescription: 'Full description...',
        specifications: {
          dimensions: { lengthMm: 4694, widthMm: 1849, heightMm: 1443, wheelbaseMm: 2875, groundClearanceMm: 140 },
          performance: { horsepower: 283, torque: '420 Nm', topSpeedKph: 225, accelerationZeroToHundred: '5.8s' },
          efficiency: { fuelConsumption: 'N/A', batteryCapacity: '60 kWh', rangeKm: 491 },
          safety: ['5-star NHTSA rating'],
          comfort: ['Premium audio'],
          technology: ['15-inch touchscreen']
        }
      }
    ];
  }

  onSearch() {
    this.router.navigate(['/search']);
  }

  onCategorySelect(category: any) {
    this.router.navigate(['/tabs/shop'], { queryParams: { category: category.name } });
  }

  onViewCarDetails(car: Car) {
    this.router.navigate(['/car', car.id]);
  }

  onToggleFavorite(car: Car) {
    // Handle favorite toggle
    console.log('Toggle favorite:', car);
  }

  onAddToCart(car: Car) {
    // Handle add to cart
    console.log('Add to cart:', car);
  }
}
