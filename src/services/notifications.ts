import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";

// 네이티브 앱(Capacitor)에서는 LocalNotifications를, 일반 웹(안드로이드 크롬 등)에서는
// 표준 Notification API를 씀 - 둘 다 "앱/탭이 열려있는 동안" 포그라운드에서만 동작하고,
// 앱을 완전히 종료한 상태의 백그라운드 알림은 아님(그건 별도의 서버 푸시/백그라운드 작업이 필요함).
// 삼성 헬스의 "두 기기에서 함께 알림 받기"가 켜져있으면 폰에 뜬 이 알림이 워치로도 미러링됨.
export async function requestNotificationPermission(): Promise<void> {
  if (Capacitor.isNativePlatform()) {
    await LocalNotifications.requestPermissions();
    return;
  }

  if (typeof window !== "undefined" && "Notification" in window) {
    await Notification.requestPermission();
  }
}

export async function notifyInactive(inactiveMinutes: number): Promise<void> {
  const title = "스트레칭 할 시간이에요";
  const body = `${inactiveMinutes}분째 움직임이 없었어요. 잠깐 스트레칭 어때요?`;

  if (Capacitor.isNativePlatform()) {
    const { display } = await LocalNotifications.checkPermissions();
    if (display !== "granted") return;

    await LocalNotifications.schedule({
      notifications: [
        { id: 1, title, body, schedule: { at: new Date(Date.now() + 500) } },
      ],
    });
    return;
  }

  if (
    typeof window !== "undefined" &&
    "Notification" in window &&
    Notification.permission === "granted"
  ) {
    new Notification(title, { body });
  }
}
