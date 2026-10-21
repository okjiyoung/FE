"use client";

import HistoryHeader from "@/features/history/components/HistoryHeader";
import CalendarSection from "@/features/history/components/CalendarSection";
import DailySummaryCard from "@/features/history/components/DailySummaryCard";
import DailyLogList from "@/features/history/components/DailyLogList";

export default function HistoryPage() {
  return (
    <main className="flex min-h-[844px] flex-col items-start gap-[12px] w-full p-[24px] bg-teum-bg">
      <HistoryHeader />
      <CalendarSection />
      <DailySummaryCard />
      <DailyLogList />
    </main>
  );
}
