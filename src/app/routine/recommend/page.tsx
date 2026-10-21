"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { RoutineSummaryCard } from "@/features/routine/components/RoutineSummaryCard";
import { RoutineItem } from "@/features/routine/components/RoutineItem";
import {
  getRecommendedStretchings,
  StretchingResponse,
} from "@/features/stretching/api/stretching";
import { getMyInfo } from "@/features/auth/api/user";
import { ApiError } from "@/services/apiClient";
import { saveStretchingPlan } from "@/features/stretching/stretchingPlan";
import {
  readRecommendationInput,
  RecommendationInput,
} from "@/features/stretching/recommendationInput";

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}초`;

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest === 0 ? `${minutes}분` : `${minutes}분 ${rest}초`;
}

export default function RecommendRoutinePage() {
  const router = useRouter();
  const [input] = useState<RecommendationInput | null>(() =>
    readRecommendationInput()
  );
  const [stretchings, setStretchings] = useState<StretchingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!input) {
      router.replace("/");
      return;
    }

    getMyInfo()
      .then((me) =>
        getRecommendedStretchings({
          userId: me.id,
          remainingTimeSeconds: input.remainingTimeSeconds,
          posture: input.posture,
          location: input.location,
          constraints: input.constraints,
          level: input.level,
        })
      )
      .then(setStretchings)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
          return;
        }
        setError("추천 루틴을 불러오지 못했어요.");
      })
      .finally(() => setIsLoading(false));
  }, [input, router]);

  const handleStartRoutine = () => {
    if (stretchings.length === 0) return;

    saveStretchingPlan(stretchings);
    router.push("/stretching");
  };

  if (!input) return null;

  const { display } = input;

  return (
    <div className="flex h-full min-h-screen w-[390px] flex-col items-start gap-[20px] bg-[#F7F7F8] px-[24px] pb-[24px]">
      <Header title="추천 루틴" />
      <h1 className="w-[342px] text-[28px] font-bold leading-[41px] tracking-[-0.56px] text-teum-ink">
        지금의 나에게,
        <br />
        딱 맞는 루틴이에요.
      </h1>
      <RoutineSummaryCard
        targetParts={display.bodyParts.join(", ")}
        tags={[display.location, display.posture, display.restriction]}
        description="지금 상황에 맞춰 골랐어요"
      />

      {error && (
        <p className="font-pretendard text-[14px] font-medium text-[#DF5757]">
          {error}
        </p>
      )}

      <div className="flex w-[342px] flex-col items-start gap-[8px]">
        {isLoading ? (
          <p className="font-pretendard text-[14px] text-teum-muted">
            불러오는 중...
          </p>
        ) : (
          stretchings.map((item, index) => (
            <RoutineItem
              key={item.id}
              step={String(index + 1).padStart(2, "0")}
              title={item.name}
              duration={formatDuration(item.durationSeconds)}
            />
          ))
        )}
      </div>
      <div className="mt-auto flex w-[390px] -translate-x-[24px] flex-col items-start gap-[12px] px-[24px]">
        <ApplyButton
          onClick={handleStartRoutine}
          disabled={stretchings.length === 0}
        >
          루틴 시작하기
        </ApplyButton>
      </div>
    </div>
  );
}
