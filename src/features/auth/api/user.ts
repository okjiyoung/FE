import { apiClient } from "@/services/apiClient";

export interface LoginResponse {
  message: string;
  id: number;
  userId: string;
  token: string;
}

export interface MyInfoResponse {
  id: number;
  userId: string;
}

export interface UserResponse {
  id: number;
  userId: string;
}

export function signUp(userId: string, password: string) {
  return apiClient.post<string>("/api/users", { userId, password });
}

export function login(userId: string, password: string) {
  return apiClient.post<LoginResponse>("/api/users/login", {
    userId,
    password,
  });
}

export function getMyInfo() {
  return apiClient.get<MyInfoResponse>("/api/users/me");
}

export function getAllUsers() {
  return apiClient.get<UserResponse[]>("/api/users");
}
