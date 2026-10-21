import { apiClient } from "@/services/apiClient";

export interface FavoriteStretchingItem {
  id: number;
  name: string;
  area: string;
  description: string;
  level: number;
  durationSeconds: number;
  sequenceOrder: number;
}

export interface UserFavoriteStretchingResponse {
  id: number;
  userId: number;
  title: string;
  createdAt: string;
  stretchings: FavoriteStretchingItem[];
}

export function createFavoriteStretching(userId: number, stretchingIds: number[]) {
  return apiClient.post<UserFavoriteStretchingResponse>(
    "/api/userFavoriteStretchings",
    { userId, stretchingIds }
  );
}

export function getFavoriteStretchings(userId: number) {
  return apiClient.get<UserFavoriteStretchingResponse[]>(
    `/api/userFavoriteStretchings/${userId}`
  );
}
