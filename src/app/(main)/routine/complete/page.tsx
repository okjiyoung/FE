"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { RoutineCompleteSummary } from "@/features/routine/components/RoutineCompleteSummary";
import { StretchingResponse } from "@/features/stretching/api/stretching";
import {
  clearStretchingPlan,
  readStretchingPlan,
} from "@/features/stretching/stretchingPlan";
import { getMyInfo } from "@/features/auth/api/user";
import { createFavoriteStretching } from "@/features/favorites/api/favoriteStretching";
import { ApiError } from "@/services/apiClient";

export default function RoutineCompletePage() {
  const router = useRouter();

  const [plan] = useState<StretchingResponse[] | null>(() =>
    readStretchingPlan()
  );
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteError, setFavoriteError] = useState<string | null>(null);

  const hasPlan = !!plan && plan.length > 0;

  useEffect(() => {
    if (!hasPlan) {
      router.replace("/");
    }
  }, [hasPlan, router]);

  if (!plan || plan.length === 0) return null;

  const totalSeconds = plan.reduce((sum, s) => sum + s.durationSeconds, 0);
  const durationMinutes = Math.max(1, Math.round(totalSeconds / 60));
  const actionCount = plan.length;
  const areas = Array.from(new Set(plan.map((s) => s.area)));
  const description = `${areas.join(", ")} 스트레칭 완료`;

  const handleFavorite = async () => {
    if (isFavoriting || isFavorited) return;

    setIsFavoriting(true);
    setFavoriteError(null);

    try {
      const me = await getMyInfo();
      await createFavoriteStretching(
        me.id,
        plan.map((s) => s.id)
      );
      setIsFavorited(true);
    } catch (err) {
      setFavoriteError(
        err instanceof ApiError ? err.message : "즐겨찾기 저장에 실패했어요."
      );
    } finally {
      setIsFavoriting(false);
    }
  };

  const handleGoHome = () => {
    clearStretchingPlan();
    router.push("/");
  };

  const handleViewHistory = () => {
    clearStretchingPlan();
    router.push("/history");
  };

  return (
    <main className="flex min-h-screen w-[390px] flex-col items-start gap-[20px] p-[24px]">
      <Header title="루틴 완료" />

      <div className="flex w-full justify-center">
        <Image
          src="/icons/routinecomplete.svg"
          alt="루틴 완료"
          width={237}
          height={211}
          priority
          className="h-auto w-auto"
        />
      </div>

      <h1 className="w-[342px] text-center font-pretendard text-[30px] font-bold leading-[44px] tracking-[-0.6px] text-teum-ink">
        {durationMinutes}분의 틈,
        <br />잘 사용하셨어요.
      </h1>

      <p className="-mt-[20px] w-[342px] text-center font-pretendard text-[14px] font-normal leading-[20px] tracking-[-0.28px] text-teum-muted">
        짧은 움직임이 쌓여 가벼운 하루가 돼요.
      </p>

      <RoutineCompleteSummary
        durationMinutes={durationMinutes}
        actionCount={actionCount}
        description={description}
      />

      {favoriteError && (
        <p className="font-pretendard text-[14px] font-medium text-[#DF5757]">
          {favoriteError}
        </p>
      )}

      <button
        type="button"
        onClick={handleFavorite}
        disabled={isFavoriting || isFavorited}
        className="flex h-[56px] w-[342px] cursor-pointer items-center justify-center rounded-[28px] bg-teum-tag-bg font-pretendard text-[16px] font-semibold leading-[23px] tracking-[-0.32px] text-teum-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isFavorited
          ? "즐겨찾기에 저장됨"
          : isFavoriting
            ? "저장 중..."
            : "♡  즐겨찾기에 저장"}
      </button>

      <div className="flex w-[390px] -mx-[24px] flex-col items-center gap-[12px] border-t border-[#ECEEF0] px-[24px] pt-[24px]">
        <ApplyButton onClick={handleGoHome}>홈으로 돌아가기</ApplyButton>

        <button
          type="button"
          onClick={handleViewHistory}
          className="w-[342px] cursor-pointer text-center font-pretendard text-[13px] font-medium leading-[19px] tracking-[-0.26px] text-teum-muted"
        >
          오늘 기록 보기
        </button>
      </div>
    </main>
  );
}
