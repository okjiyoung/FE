"use client";

import { useEffect, useState } from "react";
import HistoryHeader from "@/features/history/components/HistoryHeader";
import CalendarSection from "@/features/history/components/CalendarSection";
import DailySummaryCard from "@/features/history/components/DailySummaryCard";
import DailyLogList, {
  LogItem,
} from "@/features/history/components/DailyLogList";
import { getMyInfo } from "@/features/auth/api/user";
import {
  getStretchingHistories,
  StretchingHistoryResponse,
} from "@/features/stretching/api/stretchingHistory";

function levelForMinutes(minutes: number): number {
  if (minutes >= 10) return 3;
  if (minutes >= 5) return 2;
  if (minutes >= 1) return 1;
  return 0;
}

function formatHHMM(date: Date): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes(),
  ).padStart(2, "0")}`;
}

export default function HistoryPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1~12
  const [histories, setHistories] = useState<StretchingHistoryResponse[]>([]);

  useEffect(() => {
    getMyInfo()
      .then((me) => getStretchingHistories(me.id))
      .then(setHistories)
      .catch(() => {
        // 기록 조회 실패 시 캘린더/요약은 빈 상태로 유지함
      });
  }, []);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear((prev) => prev - 1);
      setMonth(12);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear((prev) => prev + 1);
      setMonth(1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  // 달력에 표시 중인 연/월 기준으로 날짜별 합산 시간 -> 레벨 계산
  const secondsByDay: Record<number, number> = {};
  histories.forEach((h) => {
    const d = new Date(h.completedAt);
    if (d.getFullYear() === year && d.getMonth() + 1 === month) {
      secondsByDay[d.getDate()] =
        (secondsByDay[d.getDate()] ?? 0) + h.durationSeconds;
    }
  });
  const levelsByDay = Object.fromEntries(
    Object.entries(secondsByDay).map(([day, seconds]) => [
      day,
      levelForMinutes(seconds / 60),
    ]),
  );

  // 오늘 기록만 따로 모아서 요약/리스트에 사용함
  const todayHistories = histories
    .filter((h) => new Date(h.completedAt).toDateString() === today.toDateString())
    .sort(
      (a, b) =>
        new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime(),
    );

  const todayTotalMinutes = Math.round(
    todayHistories.reduce((sum, h) => sum + h.durationSeconds, 0) / 60,
  );

  const todaySummaryText =
    todayHistories.length > 0
      ? `${today.getMonth() + 1}월 ${today.getDate()}일 · 루틴 ${todayHistories.length}회`
      : undefined;

  const todayLogs: LogItem[] = todayHistories.map((h) => ({
    id: String(h.id),
    time: formatHHMM(new Date(h.completedAt)),
    content: h.stretchingName,
    duration: `${Math.max(1, Math.round(h.durationSeconds / 60))}분`,
  }));

  return (
    <main className="flex min-h-full flex-col items-start gap-[12px] w-full p-[24px] bg-teum-bg">
      <HistoryHeader
        currentYearMonth={`${year}년 ${month}월`}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarSection year={year} month={month} levelsByDay={levelsByDay} />
      <DailySummaryCard
        totalMinutes={todayTotalMinutes}
        summaryText={todaySummaryText}
      />
      <DailyLogList logs={todayLogs} />
    </main>
  );
}
