import { apiClient } from "@/services/apiClient";

export interface StretchingResponse {
  id: number;
  name: string;
  level: number;
  area: string;
  description: string;
  durationSeconds: number;
}

export interface StretchingDifficultyResponse {
  id: number;
  stretchingId: number;
  difficultyType: string;
  difficulty: string;
}

export function getAllStretchings() {
  return apiClient.get<StretchingResponse[]>("/api/stretchings");
}

export function getStretching(id: number) {
  return apiClient.get<StretchingResponse>(`/api/stretchings/${id}`);
}

export function getAllStretchingDifficulties() {
  return apiClient.get<StretchingDifficultyResponse[]>(
    "/api/stretching-difficulties"
  );
}

export function getStretchingsByDifficulties(difficulties: string[]) {
  const query = difficulties
    .map((difficulty) => `difficulty=${encodeURIComponent(difficulty)}`)
    .join("&");
  return apiClient.get<StretchingResponse[]>(
    `/api/stretching-difficulties/stretchings?${query}`
  );
}

export function getStretchingDifficultiesByStretchingId(stretchingId: number) {
  return apiClient.get<StretchingDifficultyResponse[]>(
    `/api/stretching-difficulties/stretching/${stretchingId}`
  );
}
