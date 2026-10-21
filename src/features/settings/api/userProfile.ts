import { apiClient } from "@/services/apiClient";

export interface UserProfileRequest {
  userId: number;
  email: string;
  nickname: string;
  homeAddress?: string;
  homeLatitude?: number;
  homeLongitude?: number;
}

export interface UserProfileResponse {
  id: number;
  email: string;
  nickname: string;
  homeAddress?: string;
  homeLatitude?: number;
  homeLongitude?: number;
}

export function createUserProfile(request: UserProfileRequest) {
  return apiClient.post<UserProfileResponse>("/api/userProfile", request);
}

export function getUserProfile(userId: number) {
  return apiClient.get<UserProfileResponse>(`/api/userProfile/${userId}`);
}

export function updateUserProfile(userId: number, request: UserProfileRequest) {
  return apiClient.put<UserProfileResponse>(
    `/api/userProfile/${userId}`,
    request
  );
}
