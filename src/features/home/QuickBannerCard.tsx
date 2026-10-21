"use client";

import Image from "next/image";
import { Card } from "@/components/ui/Card";

interface QuickBannerCardProps {
  minutes?: number;
  completedCount?: number;
  onClick?: () => void;
}

export function QuickBannerCard({
  minutes = 8,
  completedCount = 3,
  onClick,
}: QuickBannerCardProps) {
  return (
    <Card
      bgColor="bg-teum-lime"
      className="relative flex w-[342px] cursor-pointer flex-col items-start gap-[4px] overflow-hidden rounded-[24px] p-[20px] transition-transform hover:opacity-95 active:scale-[0.99]"
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <span className="w-[224px] text-[14px] font-bold leading-[19px] tracking-[-0.28px] text-teum-ink">
        오늘의 스트레칭
      </span>

      <div className="flex items-center gap-[8px]">
        <span className="text-[22px] font-bold leading-[29px] tracking-[-0.44px] text-teum-ink">
          {minutes}분
        </span>
        <span className="text-[14px] font-medium leading-normal tracking-[-0.28px] text-[#3C3F45]">
          | {completedCount}회 완료
        </span>
      </div>

      <div className="absolute right-[7px] bottom-[-27px] pointer-events-none">
        <Image
          src="/icons/today_stretching.svg"
          alt="오늘의 스트레칭 캐릭터"
          width={128}
          height={129}
          className="aspect-[128/129]"
        />
      </div>
    </Card>
  );
}
