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

export interface StretchingHistoryResponse {
  id: number;
  stretchingName: string;
  durationSeconds: number;
  // 완료 시각 (한국 시간 기준, 예: "2026-10-22T08:30:00")
  completedAt: string;
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

// 완료 시각 기준 최신순으로 내려옴 (백엔드가 정렬해서 줌)
export function getStretchingHistories(userId: number) {
  return apiClient.get<StretchingHistoryResponse[]>(
    `/api/stretching-history/${userId}`
  );
}

export function getTodayStretchingSummary(userId: number) {
  return apiClient.get<TodayStretchingSummaryResponse>(
    `/api/stretching-history/${userId}/today`
  );
}
