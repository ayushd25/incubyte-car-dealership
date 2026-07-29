import api from "../api/axios";
import type { VehicleResponse } from "../types/vehicle";

export const getVehicles = async (
  params?: Record<string, string>
): Promise<VehicleResponse> => {
  const { data } = await api.get("/vehicles", {
    params,
  });

  return data;
};

export const purchaseVehicle = async (id: string) => {
  const { data } = await api.post(`/vehicles/${id}/purchase`);

  return data;
};

export const deleteVehicle = async (id: string) => {
  const { data } = await api.delete(`/vehicles/${id}`);

  return data;
};

export const restockVehicle = async (
  id: string,
  quantity: number
) => {
  const { data } = await api.patch(`/vehicles/${id}/restock`, {
    quantity,
  });

  return data;
};