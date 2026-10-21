"use client";

import Image from "next/image";

interface ConnectionMainSheetProps {
  isHomeRegistered: boolean;
  isWatchConnected: boolean;
  onOpenHomeStep: () => void;
  onOpenWatchStep: () => void;
}

export function ConnectionMainSheet({
  isHomeRegistered,
  isWatchConnected,
  onOpenHomeStep,
  onOpenWatchStep,
}: ConnectionMainSheetProps) {
  return (
    <div className="relative flex w-[390px] h-[288px] flex-col rounded-t-[32px] border-t-1.5 border-[#ECEEF0] bg-white p-[12px_20px_22px_20px] shadow-[0_-2px_20px_0_rgba(0,0,0,0.08)]">
      <div className="mx-auto h-[4px] w-[53px] rounded-full bg-[#BDC5CE]" />

      <div className="mt-[20px] ml-[8px] flex flex-col gap-[6px]">
        <h3 className="font-pretendard text-[18px] font-bold tracking-[-0.36px] text-teum-ink">
          내 상황과 연결하기
        </h3>
        <p className="font-pretendard text-[13px] font-normal tracking-[-0.26px] text-[#838A95]">
          연결할 항목을 선택해주세요
        </p>
      </div>

      <div className="mt-[23px] flex flex-col gap-[8px]">
        <div
          onClick={onOpenHomeStep}
          className="flex w-[350px] items-center justify-between p-[16px] cursor-pointer"
        >
          <div className="flex items-center gap-[12px]">
            <Image src="/icons/house.svg" alt="집" width={28} height={28} />
            <span className="font-pretendard text-[16px] font-semibold tracking-[-0.32px] text-teum-ink">
              집 위치 등록
            </span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span
              className={`font-pretendard text-[15px] font-medium tracking-[-0.3px] ${
                isHomeRegistered ? "text-[#8A79E8]" : "text-[#616670]"
              }`}
            >
              {isHomeRegistered ? "등록됨" : "등록하기"}
            </span>
            <Image
              src="/icons/chevron-right.svg"
              alt="더보기"
              width={21}
              height={21}
            />
          </div>
        </div>

        <div
          onClick={onOpenWatchStep}
          className="flex w-[350px] items-center justify-between p-[16px] cursor-pointer"
        >
          <div className="flex items-center gap-[12px]">
            <Image src="/icons/watch.svg" alt="워치" width={28} height={28} />
            <span className="font-pretendard text-[16px] font-semibold tracking-[-0.32px] text-teum-ink">
              워치 연결
            </span>
          </div>
          <div className="flex items-center gap-[4px]">
            <span
              className={`font-pretendard text-[15px] font-medium tracking-[-0.3px] ${
                isWatchConnected ? "text-[#8A79E8]" : "text-[#616670]"
              }`}
            >
              {isWatchConnected ? "등록됨" : "등록하기"}
            </span>
            <Image
              src="/icons/chevron-right.svg"
              alt="더보기"
              width={21}
              height={21}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
