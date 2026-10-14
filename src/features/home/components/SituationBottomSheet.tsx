"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ApplyButton } from "@/components/ui/ApplyButton";

interface SituationBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (selectedData: {
    location: string;
    posture: string;
    restriction: string;
    bodyParts: string[];
  }) => void;
}

export function SituationBottomSheet({
  isOpen,
  onClose,
  onApply,
}: SituationBottomSheetProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("집");
  const [selectedPosture, setSelectedPosture] = useState<string>("서 있음");
  const [selectedRestriction, setSelectedRestriction] =
    useState<string>("한 손만 가능");
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>([
    "얼굴",
    "목",
    "어깨",
    "허리",
  ]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const locations = ["집", "회사", "학교", "지하철", "기타"];
  const postures = ["상관없음", "앉아 있음", "서 있음", "걷는 중"];
  const restrictions = [
    "상관없음",
    "한 손만 가능",
    "큰 동작 X",
    "티 나지 않게",
  ];
  const bodyParts = [
    "얼굴",
    "팔",
    "목",
    "어깨",
    "허리",
    "다리",
    "골반",
    "등",
    "발",
  ];

  const toggleBodyPart = (part: string) => {
    setSelectedBodyParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part],
    );
  };

  const handleApply = () => {
    onApply?.({
      location: selectedLocation,
      posture: selectedPosture,
      restriction: selectedRestriction,
      bodyParts: selectedBodyParts,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex h-[592px] w-[390px] flex-col items-start gap-[12px] rounded-t-[32px] bg-teum-white p-[32px_24px_24px_24px]">
        <div className="absolute left-1/2 top-[12px] h-[4px] w-[36px] -translate-x-1/2 rounded-[2px] bg-[#E2E2E2]" />

        <div className="flex w-full items-start justify-between">
          <h2 className="text-[24px] font-bold leading-[35px] tracking-[-0.48px] text-teum-ink">
            지금 상황에 맞게
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer p-1"
          >
            <Image src="/icons/close.svg" alt="닫기" width={24} height={24} />
          </button>
        </div>

        <p className="w-[342px] text-[13px] font-normal leading-[19px] tracking-[-0.26px] text-teum-muted">
          장소는 자동으로 찾았어요.
          <br />
          자세와 움직일 공간을 확인해 주세요.
        </p>

        {/* 장소 선택 */}
        <div className="flex w-[342px] items-start gap-[6px]">
          {locations.map((loc) => {
            const isSelected = selectedLocation === loc;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => setSelectedLocation(loc)}
                className={`flex h-[44px] flex-1 cursor-pointer items-center justify-center rounded-[22px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] ${
                  isSelected
                    ? "bg-[#DDF688] text-[#20211F]"
                    : "border border-teum-line bg-teum-white text-teum-ink"
                }`}
              >
                {loc}
              </button>
            );
          })}
        </div>

        {/* 현재 자세 */}
        <div className="flex flex-col gap-[12px]">
          <span className="text-[14px] font-bold leading-[20px] tracking-[-0.28px] text-teum-ink">
            현재 자세
          </span>
          <div className="flex w-[342px] items-start gap-[6px]">
            {postures.map((posture) => {
              const isSelected = selectedPosture === posture;
              return (
                <button
                  key={posture}
                  type="button"
                  onClick={() => setSelectedPosture(posture)}
                  className={`flex h-[44px] flex-1 cursor-pointer items-center justify-center rounded-[22px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] ${
                    isSelected
                      ? "bg-[#DDF688] text-[#20211F]"
                      : "border border-teum-line bg-teum-white text-teum-ink"
                  }`}
                >
                  {posture}
                </button>
              );
            })}
          </div>
        </div>

        {/* 동작 제약 */}
        <div className="flex flex-col gap-[12px]">
          <span className="text-[14px] font-bold leading-[20px] tracking-[-0.28px] text-teum-ink">
            동작 제약
          </span>
          <div className="flex w-[342px] items-start gap-[6px]">
            {restrictions.map((res) => {
              const isSelected = selectedRestriction === res;
              return (
                <button
                  key={res}
                  type="button"
                  onClick={() => setSelectedRestriction(res)}
                  className={`flex h-[44px] flex-1 cursor-pointer items-center justify-center rounded-[22px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] ${
                    isSelected
                      ? "bg-[#DDF688] text-[#20211F]"
                      : "border border-teum-line bg-teum-white text-teum-ink"
                  }`}
                >
                  {res}
                </button>
              );
            })}
          </div>
        </div>

        {/* 관리 부위 */}
        <div className="flex flex-col gap-[12px]">
          <span className="text-[14px] font-bold leading-[20px] tracking-[-0.28px] text-teum-ink">
            관리 부위
          </span>
          <div className="flex w-[342px] flex-wrap items-start align-content-start gap-[6px]">
            {bodyParts.map((part) => {
              const isSelected = selectedBodyParts.includes(part);
              return (
                <button
                  key={part}
                  type="button"
                  onClick={() => toggleBodyPart(part)}
                  className={`flex h-[44px] w-[63.6px] cursor-pointer items-center justify-center rounded-[22px] text-[14px] font-medium leading-[20px] tracking-[-0.28px] ${
                    isSelected
                      ? "bg-[#DDF688] text-[#20211F]"
                      : "border border-teum-line bg-teum-white text-teum-ink"
                  }`}
                >
                  {part}
                </button>
              );
            })}
          </div>
        </div>

        {/* 적용하기 컴포넌트 */}
        <ApplyButton onClick={handleApply}>이 상황으로 적용하기</ApplyButton>
      </div>
    </div>
  );
}
