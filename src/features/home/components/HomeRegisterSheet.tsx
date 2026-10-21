"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HomeRegisterSheetProps {
  onCurrentLocation: () => void;
  onManualInput: () => void;
}

export function HomeRegisterSheet({
  onCurrentLocation,
  onManualInput,
}: HomeRegisterSheetProps) {
  return (
    <div className="relative flex w-[390px] h-[344px] flex-col items-center rounded-t-[32px] border-t-1.5 border-[#ECEEF0] bg-white p-[12px_24px_22px_24px] shadow-[0_-2px_20px_0_rgba(0,0,0,0.08)]">
      <div className="h-[4px] w-[53px] rounded-full bg-[#BDC5CE]" />

      <div className="mt-[20px] self-start ml-[4px] flex flex-col gap-[6px]">
        <h3 className="font-pretendard text-[18px] font-bold tracking-[-0.36px] text-teum-ink">
          집 위치를 등록할까요?
        </h3>
        <p className="font-pretendard text-[13px] font-normal tracking-[-0.26px] text-[#838A95]">
          집에 도착했을 때 맞는 동작을 추천해요
        </p>
      </div>

      <div className="mt-[20px] flex h-[74px] w-[74px] items-center justify-center rounded-[37px] bg-[#ECE8FC]">
        <Image src="/icons/house.svg" alt="집" width={44} height={44} />
      </div>

      <div className="mt-[33px] flex flex-col gap-[8px] w-full items-center">
        <Button variant="primary" onClick={onCurrentLocation}>
          현재 위치로 등록
        </Button>
        <button
          type="button"
          onClick={onManualInput}
          className="flex h-[56px] w-[302px] items-center justify-center rounded-[28px] border border-[#ECEEF0] bg-[#F9F9F9] font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-teum-ink transition-colors cursor-pointer"
        >
          주소 직접 입력
        </button>
      </div>
    </div>
  );
}
