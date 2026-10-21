"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HomeAddressSearchSheetProps {
  onRegister: () => void;
  onCancel: () => void;
}

export function HomeAddressSearchSheet({
  onRegister,
  onCancel,
}: HomeAddressSearchSheetProps) {
  return (
    <div className="relative flex w-[390px] h-[641px] flex-col items-center rounded-t-[32px] border-t-1.5 border-[#ECEEF0] bg-white p-[12px_24px_22px_24px] shadow-[0_-2px_20px_0_rgba(0,0,0,0.08)]">
      <div className="h-[4px] w-[53px] rounded-full bg-[#BDC5CE]" />

      <div className="mt-[20px] self-start ml-[4px] flex flex-col gap-[6px]">
        <h3 className="font-['Pretendard'] text-[18px] font-bold tracking-[-0.36px] text-teum-ink">
          집 주소 검색
        </h3>
        <p className="font-['Pretendard'] text-[13px] font-normal tracking-[-0.26px] text-[#838A95]">
          도로명, 건물명 또는 지번으로 검색해주세요
        </p>
      </div>

      <div className="mt-[20px] inline-flex w-[338px] items-center rounded-[24px] border border-[#ECEEF0] bg-[#F9F9F9] py-[13px] pr-[69px] pl-[18px] gap-[12px]">
        <Image src="/icons/search.svg" alt="검색" width={23} height={23} />
        <input
          type="text"
          placeholder="예) 보문로 34다길, 성신여대입구역"
          className="w-full bg-transparent font-['Pretendard'] text-[16px] font-normal tracking-[-0.32px] text-teum-ink placeholder-[#99A0AE] outline-none"
        />
      </div>

      <div className="mt-auto flex flex-col gap-[8px] w-full items-center">
        <Button variant="primary" onClick={onRegister}>
          등록하기
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-[44px] w-[302px] items-center justify-center font-['Pretendard'] text-[15px] font-medium text-[#616670] cursor-pointer"
        >
          취소
        </button>
      </div>
    </div>
  );
}
