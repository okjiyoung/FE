"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TimeSelectionCard } from "@/features/home/TimeSelectionCard";
import { QuickBannerCard } from "@/features/home/QuickBannerCard";
import { RecentStretchingCard } from "@/features/home/RecentStretchingCard";
import { ConnectionBanner } from "@/features/home/components/ConnectionBanner";
import { InactiveNoticeCard } from "@/features/home/components/InactiveNoticeCard";
import { getMyInfo } from "@/features/auth/api/user";
import {
  getStretchingHistories,
  getTodayStretchingSummary,
} from "@/features/stretching/api/stretchingHistory";

function formatRecentTimeInfo(durationSeconds: number, completedAt: string) {
  const minutes = Math.max(1, Math.round(durationSeconds / 60));
  const date = new Date(completedAt);

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const dayLabel = isToday
    ? "오늘"
    : isYesterday
      ? "어제"
      : `${date.getMonth() + 1}월 ${date.getDate()}일`;

  const hours24 = date.getHours();
  const period = hours24 < 12 ? "오전" : "오후";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minuteStr = String(date.getMinutes()).padStart(2, "0");

  return `${minutes}분 · ${dayLabel} ${period} ${hours12}:${minuteStr}`;
}

export default function HomePage() {
  const router = useRouter();
  const [todaySummary, setTodaySummary] = useState<{
    minutes: number;
    completedCount: number;
  } | null>(null);
  const [recent, setRecent] = useState<{
    title: string;
    timeInfo: string;
  } | null>(null);

  useEffect(() => {
    getMyInfo()
      .then((me) => {
        getTodayStretchingSummary(me.id)
          .then((summary) =>
            setTodaySummary({
              minutes: summary.totalDurationMinutes,
              completedCount: summary.completedCount,
            }),
          )
          .catch(() => {
            // 오늘 기록이 없거나 조회 실패 시 기본값(0분/0회)으로 표시함
          });

        getStretchingHistories(me.id)
          .then((histories) => {
            const latest = histories[0];
            if (!latest) return;

            setRecent({
              title: latest.stretchingName,
              timeInfo: formatRecentTimeInfo(
                latest.durationSeconds,
                latest.completedAt,
              ),
            });
          })
          .catch(() => {
            // 기록이 없거나 조회 실패 시 카드의 기본 문구를 유지함
          });
      })
      .catch(() => {});
  }, []);

  return (
    <main className="mx-auto flex min-h-full w-[390px] flex-col items-start gap-[20px] rounded-[32px] bg-teum-bg p-[24px]">
      <header className="flex w-[342px] items-center justify-between pt-[24px]">
        <div className="flex items-center">
          <Image
            src="/icons/logo-teumjit.svg"
            alt="틈짓 로고"
            width={89.023}
            height={43.117}
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center p-0"
          aria-label="설정"
        >
          <Image src="/icons/settings.svg" alt="설정" width={24} height={24} />
        </button>
      </header>

      <ConnectionBanner />
      <InactiveNoticeCard />
      <TimeSelectionCard />
      <QuickBannerCard
        minutes={todaySummary?.minutes}
        completedCount={todaySummary?.completedCount}
        onClick={() => router.push("/history")}
      />
      <RecentStretchingCard
        title={recent?.title}
        timeInfo={recent?.timeInfo}
        onMoreClick={() => router.push("/history")}
      />
    </main>
  );
}
