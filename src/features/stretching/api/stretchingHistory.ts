import { apiClient } from "@/services/apiClient";

export interface StretchingHistoryRequest {
  stretchingName: string;
  durationSeconds: number;
}

export interface TodayStretchingSummaryResponse {
  date: string;
  totalDurationSeconds: number;
  totalDurationMinutes: number;
  completedCount: number;
}

export function saveStretchingHistory(
  userId: number,
  request: StretchingHistoryRequest
) {
  return apiClient.post<unknown>(
    `/api/stretching-history/${userId}`,
    request
  );
}

export function getStretchingHistories(userId: number) {
  return apiClient.get<unknown[]>(`/api/stretching-history/${userId}`);
}

export function getTodayStretchingSummary(userId: number) {
  return apiClient.get<TodayStretchingSummaryResponse>(
    `/api/stretching-history/${userId}/today`
  );
}
