"use client";

interface DailySummaryProps {
  totalMinutes?: number;
  summaryText?: string;
}

export default function DailySummaryCard({
  totalMinutes = 0,
  summaryText = "아직 오늘의 기록이 없어요",
}: DailySummaryProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full p-[20px] bg-teum-lime rounded-[20px]">
      <h2 className="w-[302px] text-[20px] font-bold leading-normal tracking-[-0.4px] text-teum-ink font-pretendard">
        오늘 {totalMinutes}분을 움직였어요
      </h2>
      <p className="text-[12px] font-normal leading-[17px] tracking-[-0.24px] text-teum-ink font-pretendard">
        {summaryText}
      </p>
    </div>
  );
}
