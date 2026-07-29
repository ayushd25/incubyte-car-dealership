export interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  color: string;
  vin: string;
  quantity: number;
  status: "available" | "reserved" | "sold";
}

export interface VehicleResponse {
  success: boolean;
  message?: string;
  data: Vehicle[];
}