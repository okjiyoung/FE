"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface WatchConnectGuideSheetProps {
  onNext: () => void;
}

export function WatchConnectGuideSheet({
  onNext,
}: WatchConnectGuideSheetProps) {
  return (
    <div className="relative flex w-[390px] h-[547px] flex-col items-center rounded-t-[32px] border-t-1.5 border-[#ECEEF0] bg-white p-[12px_24px_22px_24px] shadow-[0_-2px_20px_0_rgba(0,0,0,0.08)]">
      <div className="h-[4px] w-[53px] rounded-full bg-[#BDC5CE]" />

      <div className="mt-[20px] self-start ml-[4px] flex flex-col gap-[6px]">
        <h3 className="font-pretendard text-[18px] font-bold tracking-[-0.36px] text-teum-ink">
          워치와 스마트폰을 연결해주세요
        </h3>
        <p className="font-pretendard text-[13px] font-normal tracking-[-0.26px] text-[#838A95]">
          먼저 블루투스로 워치와 스마트폰을 연결해주세요
        </p>
      </div>

      <div className="mt-[60px] inline-flex items-center gap-[8px]">
        <Image
          src="/icons/phone.svg"
          alt="스마트폰"
          width={70.5}
          height={133}
        />
        <div className="h-[4.6px] w-[4.6px] rounded-full bg-[#E4DFFC]" />
        <div className="h-[4.6px] w-[4.6px] rounded-full bg-[#E4DFFC]" />
        <div className="flex h-[60.1px] w-[60.1px] items-center justify-center rounded-[30px] bg-[#E4DFFC]">
          <Image
            src="/icons/bluetooth.svg"
            alt="블루투스"
            width={27.7}
            height={27.7}
          />
        </div>
        <div className="h-[4.6px] w-[4.6px] rounded-full bg-[#E4DFFC]" />
        <div className="h-[4.6px] w-[4.6px] rounded-full bg-[#E4DFFC]" />
        <Image src="/icons/watch.svg" alt="워치" width={74} height={111.7} />
      </div>

      <div className="mt-auto flex flex-col gap-[8px] w-full items-center">
        <Button variant="primary">블루투스 설정 열기</Button>
        <button
          type="button"
          onClick={onNext}
          className="flex h-[56px] w-[302px] items-center justify-center rounded-[28px] border border-[#ECEEF0] bg-[#F9F9F9] font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-teum-ink cursor-pointer"
        >
          연결했어요
        </button>
      </div>
    </div>
  );
}
