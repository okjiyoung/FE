"use client";

import { useState } from "react";
import HistoryHeader from "@/features/history/components/HistoryHeader";
import CalendarSection from "@/features/history/components/CalendarSection";
import DailySummaryCard from "@/features/history/components/DailySummaryCard";
import DailyLogList from "@/features/history/components/DailyLogList";

export default function HistoryPage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1~12

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

  return (
    <main className="flex min-h-full flex-col items-start gap-[12px] w-full p-[24px] bg-teum-bg">
      <HistoryHeader
        currentYearMonth={`${year}년 ${month}월`}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarSection year={year} month={month} />
      <DailySummaryCard />
      <DailyLogList />
    </main>
  );
}
