import { apiClient } from "@/services/apiClient";

export interface UserBodyPreferenceRequest {
  userId: number;
  preferenceType: string;
  bodyArea: string;
}

export interface UserBodyPreferenceResponse {
  id: number;
  preferenceType: string;
  bodyArea: string;
}

export function createUserBodyPreference(request: UserBodyPreferenceRequest) {
  return apiClient.post<UserBodyPreferenceResponse>(
    "/api/userBodyPreferences",
    request
  );
}

export function getUserBodyPreferences(userId: number) {
  return apiClient.get<UserBodyPreferenceResponse[]>(
    `/api/userBodyPreferences/${userId}`
  );
}

export function getUserBodyPreferencesByType(
  userId: number,
  preferenceType: string
) {
  return apiClient.get<UserBodyPreferenceResponse[]>(
    `/api/userBodyPreferences/${userId}/type/${preferenceType}`
  );
}
