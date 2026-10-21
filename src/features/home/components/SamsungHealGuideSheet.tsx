"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface SamsungHealthGuideSheetProps {
  onComplete: () => void;
}

export function SamsungHealthGuideSheet({
  onComplete,
}: SamsungHealthGuideSheetProps) {
  return (
    <div className="relative flex w-[390px] h-[547px] flex-col items-center rounded-t-[32px] border-t-1.5 border-[#ECEEF0] bg-white p-[12px_24px_22px_24px] shadow-[0_-2px_20px_0_rgba(0,0,0,0.08)]">
      <div className="h-[4px] w-[53px] rounded-full bg-[#BDC5CE]" />

      <div className="mt-[20px] self-start ml-[4px] flex flex-col gap-[6px]">
        <h3 className="font-pretendard text-[18px] font-bold tracking-[-0.36px] text-teum-ink">
          삼성 헬스에서 알림설정해주세요
        </h3>
        <p className="font-pretendard text-[13px] font-normal tracking-[-0.26px] text-[#838A95] leading-relaxed">
          삼성 헬스에 들어가, 화면 상단에 “워치 설정 &gt; 알림” 에 들어가
          <br />
          “두 기기에서 함께 알림 받기”를 클릭합니다
        </p>
      </div>

      <div className="mt-[40px]">
        <Image src="/icons/watch.svg" alt="워치" width={100} height={162} />
      </div>

      <div className="mt-auto flex flex-col gap-[8px] w-full items-center">
        <Button variant="primary" onClick={onComplete}>
          설정했어요
        </Button>
        <button
          type="button"
          onClick={onComplete}
          className="flex h-[56px] w-[302px] items-center justify-center rounded-[28px] border border-[#ECEEF0] bg-[#F9F9F9] font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-teum-ink cursor-pointer"
        >
          나중에 할게요
        </button>
      </div>
    </div>
  );
}
