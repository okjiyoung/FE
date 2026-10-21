"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfileCard } from "@/features/settings/components/UserProfileCard";
import { SettingItemCard } from "@/features/settings/components/SettingItemCard";
import { Toggle } from "@/components/ui/Toggle";
import { getMyInfo } from "@/features/auth/api/user";
import { getUserProfile } from "@/features/settings/api/userProfile";
import { clearAuthToken } from "@/services/authToken";
import { ApiError } from "@/services/apiClient";
import { getWatchConnected } from "@/features/home/connectionPreferences";
import {
  getPermissionManagement,
  getRecommendNotification,
  setPermissionManagement as persistPermissionManagement,
  setRecommendNotification as persistRecommendNotification,
} from "@/features/settings/localPreferences";

export default function SettingsPage() {
  const router = useRouter();
  const [recommendNotification, setRecommendNotification] = useState(true);
  const [permissionManagement, setPermissionManagement] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [nickname, setNickname] = useState("회원");
  const [isHomeRegistered, setIsHomeRegistered] = useState(false);
  const [isWatchConnected, setIsWatchConnected] = useState(false);

  useEffect(() => {
    setRecommendNotification(getRecommendNotification());
    setPermissionManagement(getPermissionManagement());
    setIsWatchConnected(getWatchConnected());

    getMyInfo()
      .then((info) => {
        setEmail(info.userId);
        return getUserProfile(info.id);
      })
      .then((profile) => {
        setNickname(profile.nickname);
        setIsHomeRegistered(!!profile.homeAddress);
      })
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
        }
        // 프로필 조회 실패(아직 프로필이 없는 유저 등)는 닉네임 플레이스홀더를 유지함
      });
  }, [router]);

  const handleToggleRecommendNotification = (value: boolean) => {
    setRecommendNotification(value);
    persistRecommendNotification(value);
  };

  const handleTogglePermissionManagement = (value: boolean) => {
    setPermissionManagement(value);
    persistPermissionManagement(value);
  };

  const handleLogout = () => {
    clearAuthToken();
    router.push("/login");
  };

  return (
    <div className="flex min-h-[844px] w-[390px] flex-1 flex-col items-start gap-[20px] rounded-[32px] bg-teum-bg p-[24px]">
      {/* 헤더 */}
      <h1 className="text-[28px] font-bold leading-[41px] tracking-[-0.56px] text-teum-ink">
        설정
      </h1>

      {/* 사용자 정보 카드 */}
      <UserProfileCard nickname={nickname} email={email ?? ""} />

      {/* 섹션 라벨 */}
      <span className="text-[13px] font-medium leading-[19px] tracking-[-0.26px] text-teum-text-sub">
        내 상황과 연결
      </span>

      {/* 설정 항목 리스트 */}
      <div className="flex flex-col gap-[8px]">
        <SettingItemCard
          label="집 등록 및 위치"
          value={isHomeRegistered ? "등록됨" : "미등록"}
        />
        <SettingItemCard
          label="워치 연결"
          value={isWatchConnected ? "연결됨" : "미연결"}
        />
        <SettingItemCard
          label="추천 알림"
          rightElement={
            <Toggle
              checked={recommendNotification}
              onChange={handleToggleRecommendNotification}
            />
          }
        />
        <SettingItemCard
          label="권한 관리"
          rightElement={
            <Toggle
              checked={permissionManagement}
              onChange={handleTogglePermissionManagement}
            />
          }
        />
      </div>

      {/* 로그아웃 버튼 */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex cursor-pointer w-[342px] items-center justify-center rounded-[18px] bg-[#CED4DB] px-[20px] py-[12px] text-[15px] font-medium leading-[22px] tracking-[-0.3px] text-teum-ink transition-colors hover:bg-[#BAC1C9]"
      >
        로그아웃
      </button>
    </div>
  );
}
