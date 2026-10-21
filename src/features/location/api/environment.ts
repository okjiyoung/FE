import { apiClient } from "@/services/apiClient";

export interface EnvironmentResponse {
  environment: string;
  distanceFromHome: number;
}

export function getEnvironment(
  userId: number,
  latitude: number,
  longitude: number
) {
  return apiClient.get<EnvironmentResponse>(
    `/api/environment/user/${userId}?latitude=${latitude}&longitude=${longitude}`
  );
}
