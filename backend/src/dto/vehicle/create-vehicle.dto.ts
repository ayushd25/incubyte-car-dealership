export interface CreateVehicleDto {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  vin: string;

  category: string;
  quantity: number;
}