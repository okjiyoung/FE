"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { getMyInfo } from "@/features/auth/api/user";
import { checkInactive } from "@/features/health/api/healthData";

function formatInactiveDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}분째`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest === 0 ? `${hours}시간째` : `${hours}시간 ${rest}분째`;
}

export function InactiveNoticeCard() {
  const [inactiveMinutes, setInactiveMinutes] = useState<number | null>(null);

  useEffect(() => {
    getMyInfo()
      .then((me) => checkInactive(me.id))
      .then((result) => {
        if (result.inactive) setInactiveMinutes(result.inactiveMinutes);
      })
      .catch(() => {
        // 워치 미연결 등으로 조회 실패 시 배너를 표시하지 않음
      });
  }, []);

  if (inactiveMinutes === null) return null;

  return (
    <Card bgColor="bg-[#FFF4E0]" className="flex items-center gap-[12px]">
      <Image src="/icons/alert-circle.svg" alt="알림" width={24} height={24} />
      <p className="text-[14px] font-medium leading-[20px] tracking-[-0.28px] text-teum-ink">
        {formatInactiveDuration(inactiveMinutes)} 움직임이 없었어요. 잠깐
        스트레칭 어때요?
      </p>
    </Card>
  );
}
