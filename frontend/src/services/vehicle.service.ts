import api from "../api/axios";
import type { Vehicle, VehicleResponse } from "../types/vehicle";

export interface VehiclePayload {
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
}

export const getVehicles = async (
  params?: Record<string, string>
): Promise<VehicleResponse> => {
  const { data } = await api.get("/vehicles", {
    params,
  });

  return data;
};

export const getVehicle = async (id: string) => {
  const { data } = await api.get(`/vehicles/${id}`);
  return data;
};

export const createVehicle = async (
  payload: VehiclePayload
) => {
  const { data } = await api.post("/vehicles", payload);
  return data;
};

export const updateVehicle = async (
  id: string,
  payload: VehiclePayload
) => {
  const { data } = await api.put(
    `/vehicles/${id}`,
    payload
  );

  return data;
};

export const deleteVehicle = async (id: string) => {
  const { data } = await api.delete(`/vehicles/${id}`);
  return data;
};

export const purchaseVehicle = async (id: string) => {
  const { data } = await api.post(
    `/vehicles/${id}/purchase`
  );

  return data;
};

export const restockVehicle = async (
  id: string,
  quantity: number
) => {
  const { data } = await api.post(
    `/vehicles/${id}/restock`,
    {
      quantity,
    }
  );

  return data;
};