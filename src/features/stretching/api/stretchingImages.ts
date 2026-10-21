import { apiClient } from "@/services/apiClient";
import { API_BASE_URL } from "@/services/config";

export interface StretchingImageResponse {
  id: number;
  stretchingName: string;
  category: string;
  imageUrl: string;
}

// category 쿼리는 문서상 아직 백엔드에 구현 안 됨 - 넘겨도 필터링 안 될 수 있음
export function getStretchingImages(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiClient.get<StretchingImageResponse[]>(
    `/api/stretching-images${query}`
  );
}

export function getStretchingImage(id: number) {
  return apiClient.get<StretchingImageResponse>(`/api/stretching-images/${id}`);
}

// imageUrl이 "/images/..." 같은 상대 경로로 내려와서 백엔드 서버 주소를 붙여줌
export function resolveStretchingImageUrl(imageUrl: string): string {
  if (/^https?:\/\//.test(imageUrl)) return imageUrl;
  return `${API_BASE_URL}${imageUrl}`;
}
