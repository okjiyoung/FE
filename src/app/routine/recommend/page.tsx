"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { RoutineSummaryCard } from "@/features/routine/components/RoutineSummaryCard";
import { RoutineItem } from "@/features/routine/components/RoutineItem";
import {
  getAllStretchings,
  StretchingResponse,
} from "@/features/stretching/api/stretching";
import { saveStretchingPlan } from "@/features/stretching/stretchingPlan";

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}초`;

  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest === 0 ? `${minutes}분` : `${minutes}분 ${rest}초`;
}

export default function RecommendRoutinePage() {
  const router = useRouter();
  const [stretchings, setStretchings] = useState<StretchingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllStretchings()
      .then(setStretchings)
      .catch(() => setError("루틴을 불러오지 못했어요."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleStartRoutine = () => {
    if (stretchings.length === 0) return;

    saveStretchingPlan(stretchings);
    router.push("/stretching");
  };

  return (
    <div className="flex h-full min-h-screen w-[390px] flex-col items-start gap-[20px] bg-[#F7F7F8] px-[24px] pb-[24px]">
      <Header title="추천 루틴" />
      <h1 className="w-[342px] text-[28px] font-bold leading-[41px] tracking-[-0.56px] text-teum-ink">
        지금의 나에게,
        <br />
        3분이면 충분해요.
      </h1>
      <RoutineSummaryCard
        targetParts="목, 어깨"
        tags={["집", "서 있음", "한 손 만 가능"]}
        description="손을 쓰지 않고 제자리에서"
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
