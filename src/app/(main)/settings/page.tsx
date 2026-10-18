"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfileCard } from "@/features/settings/components/UserProfileCard";
import { SettingItemCard } from "@/features/settings/components/SettingItemCard";
import { Toggle } from "@/components/ui/Toggle";
import { getMyInfo } from "@/features/auth/api/user";
import { clearAuthToken } from "@/services/authToken";

export default function SettingsPage() {
  const router = useRouter();
  const [recommendNotification, setRecommendNotification] = useState(true);
  const [permissionManagement, setPermissionManagement] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    getMyInfo()
      .then((info) => setEmail(info.userId))
      .catch(() => router.replace("/login"));
  }, [router]);

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
      <UserProfileCard nickname="회원" email={email ?? ""} />

      {/* 섹션 라벨 */}
      <span className="text-[13px] font-medium leading-[19px] tracking-[-0.26px] text-teum-text-sub">
        내 상황과 연결
      </span>

      {/* 설정 항목 리스트 */}
      <div className="flex flex-col gap-[8px]">
        <SettingItemCard label="집 등록 및 위치" value="등록됨" />
        <SettingItemCard label="워치 연결" value="연결됨" />
        <SettingItemCard
          label="추천 알림"
          rightElement={
            <Toggle
              checked={recommendNotification}
              onChange={setRecommendNotification}
            />
          }
        />
        <SettingItemCard
          label="권한 관리"
          rightElement={
            <Toggle
              checked={permissionManagement}
              onChange={setPermissionManagement}
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
