// 워치 연결은 OS 레벨(삼성 헬스) 수동 설정이라 백엔드에 저장할 상태가 없음 -
// 기기 로컬에만 "가이드를 완료했다"는 표시를 남겨 재방문 시 유지되게 함.
const WATCH_CONNECTED_KEY = "teumjit_watch_connected";

export function getWatchConnected(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(WATCH_CONNECTED_KEY) === "true";
}

export function setWatchConnected(connected: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(WATCH_CONNECTED_KEY, String(connected));
}
