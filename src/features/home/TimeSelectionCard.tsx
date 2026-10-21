"use client";

import { useEffect, useState } from "react";
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
import { CustomTimeBottomSheet } from "@/features/home/components/CustomTimeBottomSheet"; // 경로에 맞게 조절해주세요
import {
  mapCodeToLocationLabel,
  mapDifficultyToLevel,
  mapLocationToCode,
  mapPostureToCode,
  mapRestrictionToConstraints,
  parseSelectedTimeToSeconds,
} from "@/features/home/situationCodes";
import { saveRecommendationInput } from "@/features/stretching/recommendationInput";
import { getMyInfo } from "@/features/auth/api/user";
import { getEnvironment } from "@/features/location/api/environment";
import { createLocationData } from "@/features/location/api/locationData";

interface Situation {
  location: string;
  posture: string;
  restriction: string;
  bodyParts: string[];
}

export function TimeSelectionCard() {
  const router = useRouter();
  const [selectedTime, setSelectedTime] = useState<string>("3분");
  const [isCustomTime, setIsCustomTime] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("중간");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isCustomTimeSheetOpen, setIsCustomTimeSheetOpen] = useState(false);

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

  const handleCustomTimeConfirm = (minutes: number) => {
    setSelectedTime(`${minutes}분`);
    setIsCustomTime(true);
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("geolocation" in navigator)) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        getMyInfo()
          .then((me) =>
            getEnvironment(me.id, latitude, longitude).then((env) => {
              const detectedLocation = mapCodeToLocationLabel(env.environment);
              if (detectedLocation) {
                setSituation((prev) => ({
                  ...prev,
                  location: detectedLocation,
                }));
              }

              createLocationData({
                userId: me.id,
                latitude,
                longitude,
                measuredAt: new Date().toISOString(),
              }).catch(() => {});
            }),
          )
          .catch(() => {});
      },
      () => {},
      { timeout: 5000 },
    );
  }, []);

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

        <div className="flex gap-[6px]">
          {timeOptions.map((time) => (
            <Button
              key={time}
              variant={
                !isCustomTime && selectedTime === time ? "active" : "outline"
              }
              onClick={() => {
                setIsCustomTime(false);
                setSelectedTime(time);
              }}
            >
              {time}
            </Button>
          ))}
        </div>

        {isCustomTime ? (
          <div className="flex w-[302px] h-[42px] px-[14px] py-[10px] justify-between items-center rounded-[14px] border border-[rgba(255,255,255,0.55)] bg-[#DDF688]">
            <div className="flex items-center gap-[8px]">
              <Image
                src="/icons/time.svg"
                alt="시계"
                width={18}
                height={18}
                className="text-[#20211F]"
              />
              <span className="font-pretendard text-[13px] font-semibold leading-[19px] tracking-[-0.26px] text-[#20211F]">
                {selectedTime}으로 설정됨
              </span>
            </div>
            <div className="flex items-center gap-[8px]">
              <div className="h-[22px] w-[0px] border-l-[1.5px] border-[#B8D162]" />
              <button
                type="button"
                onClick={() => setIsCustomTimeSheetOpen(true)}
                className="font-pretendard text-[13px] font-medium leading-[19px] tracking-[-0.26px] text-[#7F943C] cursor-pointer"
              >
                변경
              </button>
            </div>
          </div>
        ) : (
          <Button
            variant="secondary"
            className="gap-[8px]"
            onClick={() => setIsCustomTimeSheetOpen(true)}
          >
            <Image src="/icons/time.svg" alt="시계" width={18} height={18} />
            <span>원하는 시간 직접 설정</span>
          </Button>
        )}

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

          <div className="flex items-center gap-[4px] overflow-x-auto">
            {currentTags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>

        <Button variant="primary" onClick={handleStartStretching}>
          스트레칭 시작하기
        </Button>
      </Card>

      <SituationBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        initialLocation={situation.location}
        onApply={handleApplySituation}
      />

      <CustomTimeBottomSheet
        isOpen={isCustomTimeSheetOpen}
        onClose={() => setIsCustomTimeSheetOpen(false)}
        onConfirm={handleCustomTimeConfirm}
        initialMinutes={parseInt(selectedTime, 10) || 3}
      />
    </>
  );
}
