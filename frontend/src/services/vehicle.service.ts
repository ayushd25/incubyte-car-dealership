import api from "../api/axios";
import type { VehicleResponse } from "../types/vehicle";

export const getVehicles = async (): Promise<VehicleResponse> => {
  const { data } = await api.get("/vehicles");
  return data;
};

export const purchaseVehicle = async (id: string) => {
  const { data } = await api.post(`/vehicles/${id}/purchase`);
  return data;
};