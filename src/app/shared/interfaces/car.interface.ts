export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  bodyType: string;
  transmission: string;
  fuelType: string;
  drivetrain: string;
  engine: string;
  horsepower: number;
  torque: string;
  rangeKm: number | null;
  topSpeedKph: number | null;
  zeroToHundred: string | null;
  seats: number;
  doors: number;
  colorOptions: string[];
  price: number;
  currency: string;
  stockStatus: 'in-stock' | 'low-stock' | 'sold-out' | 'pre-order';
  featured: boolean;
  rating: number;
  reviewCount: number;
  thumbnail: string;
  gallery: string[];
  shortDescription: string;
  longDescription: string;
  specifications: {
    dimensions: {
      lengthMm: number;
      widthMm: number;
      heightMm: number;
      wheelbaseMm: number;
      groundClearanceMm: number;
    };
    performance: {
      horsepower: number;
      torque: string;
      topSpeedKph: number;
      accelerationZeroToHundred: string;
    };
    efficiency: {
      fuelConsumption: string;
      batteryCapacity: string | null;
      rangeKm: number | null;
    };
    safety: string[];
    comfort: string[];
    technology: string[];
  };
}