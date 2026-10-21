import { apiClient } from "@/services/apiClient";

export interface HealthDataRequest {
  userId: number;
  dataType: string;
  value: number;
  unit: string;
  measuredAt: string;
  source: string;
}

export interface HealthDataResponse {
  id: number;
  dataType: string;
  value: number;
  unit: string;
  measuredAt: string;
  source: string;
}

export interface InactiveResponse {
  inactive: boolean;
  inactiveMinutes: number;
}

export function createHealthData(request: HealthDataRequest) {
  return apiClient.post<HealthDataResponse>("/api/healthData", request);
}

export function getAllHealthData() {
  return apiClient.get<HealthDataResponse[]>("/api/healthData");
}

export function getHealthDataByUser(userId: number) {
  return apiClient.get<HealthDataResponse[]>(
    `/api/healthData/user/${userId}`
  );
}

export function checkInactive(userId: number) {
  return apiClient.get<InactiveResponse>(
    `/api/healthData/user/${userId}/inactive`
  );
}
