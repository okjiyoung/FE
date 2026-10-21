"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import {
  DifficultyDropdown,
  Difficulty,
} from "@/features/home/components/DifficultyDropdown";
import { SituationBottomSheet } from "@/features/home/components/SituationBottomSheet";
import {
  mapDifficultyToLevel,
  mapLocationToCode,
  mapPostureToCode,
  mapRestrictionToConstraints,
  parseSelectedTimeToSeconds,
} from "@/features/home/situationCodes";
import { saveRecommendationInput } from "@/features/stretching/recommendationInput";

interface Situation {
  location: string;
  posture: string;
  restriction: string;
  bodyParts: string[];
}

export function TimeSelectionCard() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<string>("3분");
  const [difficulty, setDifficulty] = useState<Difficulty>("중간");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [situation, setSituation] = useState<Situation>({
    location: "집",
    posture: "서 있음",
    restriction: "상관없음",
    bodyParts: ["목", "어깨", "허리"],
  });

  const timeOptions = ["1분", "3분", "5분", "10분"];
  const currentTags = [
    situation.location,
    situation.posture,
    ...situation.bodyParts,
  ];

  const handleApplySituation = (data: Situation) => {
    setSituation(data);
  };

  const handleStartStretching = () => {
    saveRecommendationInput({
      remainingTimeSeconds: parseSelectedTimeToSeconds(selectedTime),
      posture: mapPostureToCode(situation.posture),
      location: mapLocationToCode(situation.location),
      constraints: mapRestrictionToConstraints(situation.restriction),
      level: mapDifficultyToLevel(difficulty),
      display: situation,
    });
    router.push("/routine/recommend");
  };

  return (
    <>
      <Card bgColor="bg-teum-purple" className="flex flex-col gap-[12px]">
        <div className="flex w-full items-center justify-between">
          <h2 className="text-[22px] font-bold leading-normal tracking-[-0.44px] text-teum-ink">
            지금 몇 분 있어요?
          </h2>
          <DifficultyDropdown
            value={difficulty}
            onChange={(val) => setDifficulty(val)}
          />
        </div>

        {/* 시간 선택 */}
        <div className="flex gap-[6px]">
          {timeOptions.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? "active" : "outline"}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </Button>
          ))}
        </div>

        {/* 직접 설정 */}
        <Button variant="secondary" className="gap-[8px]">
          <Image src="/icons/time.svg" alt="시계" width={18} height={18} />
          <span>원하는 시간 직접 설정</span>
        </Button>

        {/* 현재 상황 박스 */}
        <div className="flex h-[92px] w-[302px] flex-col gap-[10px] rounded-[18px] bg-white/92 p-[14px_16px]">
          <div className="flex w-full items-center justify-between">
            <span className="text-[14px] font-bold leading-[17px] tracking-[-0.28px] text-teum-text-sub">
              현재 상황
            </span>
            <button
              type="button"
              onClick={() => setIsBottomSheetOpen(true)}
              className="flex cursor-pointer items-center gap-[4px]"
            >
              <span className="text-[14px] font-medium leading-[17px] tracking-[-0.28px] text-teum-ink">
                수정
              </span>
              <Image
                src="/icons/chevron-right.svg"
                alt="더보기"
                width={20}
                height={20}
              />
            </button>
          </div>

          {/* 태그 영역 */}
          <div className="flex items-center gap-[4px] overflow-x-auto">
            {currentTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>

        {/* 스트레칭 시작 */}
        <Button variant="primary" onClick={handleStartStretching}>
          스트레칭 시작하기
        </Button>
      </Card>

      {/* 상황 수정 바텀시트 모달 */}
      <SituationBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onApply={handleApplySituation}
      />
    </>
  );
}
