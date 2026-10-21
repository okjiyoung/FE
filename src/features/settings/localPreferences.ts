// 추천 알림 / 권한 관리는 저장할 백엔드 API가 없어(Swagger에 해당 엔드포인트 없음)
// 기기 로컬에만 저장함 - 다른 기기와는 동기화되지 않음.
const RECOMMEND_NOTIFICATION_KEY = "teumjit_recommend_notification";
const PERMISSION_MANAGEMENT_KEY = "teumjit_permission_management";

function readFlag(key: string, fallback: boolean): boolean {
  if (typeof window === "undefined") return fallback;
  const raw = localStorage.getItem(key);
  return raw === null ? fallback : raw === "true";
}

function writeFlag(key: string, value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, String(value));
}

export function getRecommendNotification(): boolean {
  return readFlag(RECOMMEND_NOTIFICATION_KEY, true);
}

export function setRecommendNotification(value: boolean): void {
  writeFlag(RECOMMEND_NOTIFICATION_KEY, value);
}

export function getPermissionManagement(): boolean {
  return readFlag(PERMISSION_MANAGEMENT_KEY, true);
}

export function setPermissionManagement(value: boolean): void {
  writeFlag(PERMISSION_MANAGEMENT_KEY, value);
}
