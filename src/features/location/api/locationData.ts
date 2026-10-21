import { apiClient } from "@/services/apiClient";

export interface LocationDataRequest {
  userId: number;
  latitude: number;
  longitude: number;
  measuredAt: string;
}

export interface LocationDataResponse {
  id: number;
  latitude: number;
  longitude: number;
  measuredAt: string;
}

export function createLocationData(request: LocationDataRequest) {
  return apiClient.post<LocationDataResponse>("/api/locationData", request);
}

export function getAllLocationData() {
  return apiClient.get<LocationDataResponse[]>("/api/locationData");
}

export function getLocationDataByUser(userId: number) {
  return apiClient.get<LocationDataResponse[]>(
    `/api/locationData/user/${userId}`
  );
}
