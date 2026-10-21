"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useBottomSheetTransition } from "@/hooks/useBottomSheetTransition";

interface CustomTimeBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (minutes: number) => void;
  initialMinutes?: number;
}

export function CustomTimeBottomSheet({
  isOpen,
  onClose,
  onConfirm,
  initialMinutes = 3,
}: CustomTimeBottomSheetProps) {
  const [tempMinutes, setTempMinutes] = useState<number>(initialMinutes);
  const { shouldRender, isVisible } = useBottomSheetTransition(isOpen);

  if (!shouldRender) return null;

  const handleDecrease = () => {
    setTempMinutes((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setTempMinutes((prev) => Math.min(30, prev + 1));
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`inline-flex w-full max-w-[420px] flex-col items-center gap-[25px] rounded-t-[32px] border-t-1.5 border-[#ECEEF0] bg-white p-[12px_24px_40px_24px] shadow-[0_-2px_20px_0_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="h-[4px] w-[53px] rounded-full bg-[#BDC5CE]" />

        <div className="flex flex-col items-center gap-[6px]">
          <h3 className="text-center font-pretendard text-[18px] font-bold tracking-[-0.36px] text-teum-ink">
            원하는 시간을 설정해주세요
          </h3>
          <p className="w-full text-center font-pretendard text-[13px] font-normal tracking-[-0.26px] text-[#838A95]">
            1분부터 30분까지 선택할 수 있어요
          </p>
        </div>

        <div className="flex items-center justify-center gap-[36px]">
          <button
            type="button"
            onClick={handleDecrease}
            className="flex h-[56px] w-[56px] items-center justify-center rounded-[28px] bg-[#ECE8FC] transition-transform active:scale-95 cursor-pointer"
          >
            <Image
              src="/icons/minus.svg"
              alt="감소"
              width={33.75}
              height={33.75}
            />
          </button>

          <span className="font-pretendard text-[28px] font-bold leading-[20px] tracking-[-0.56px] text-[#20211F]">
            {tempMinutes}분
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            className="flex h-[56px] w-[56px] items-center justify-center rounded-[28px] bg-[#ECE8FC] transition-transform active:scale-95 cursor-pointer"
          >
            <Image
              src="/icons/plus.svg"
              alt="증가"
              width={33.75}
              height={33.75}
            />
          </button>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            onConfirm(tempMinutes);
            onClose();
          }}
        >
          설정하기
        </Button>
      </div>
    </div>
  );
}
