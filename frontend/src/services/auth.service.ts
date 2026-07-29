import api from "../api/axios";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth";

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    "/auth/login",
    payload
  );

  return data;
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    "/auth/register",
    payload
  );

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};