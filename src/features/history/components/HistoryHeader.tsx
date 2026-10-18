"use client";

interface HistoryHeaderProps {
  currentYearMonth?: string;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
}

export default function HistoryHeader({
  currentYearMonth = "2026년 9월",
  onPrevMonth,
  onNextMonth,
}: HistoryHeaderProps) {
  return (
    <header className="flex flex-col gap-[12px] w-full">
      <h1 className="w-full text-[28px] font-bold leading-[41px] tracking-[-0.56px] text-teum-ink font-pretendard">
        내가 채운 틈
      </h1>

      <div className="flex justify-between items-center w-full">
        <span className="text-[18px] font-bold leading-[26px] tracking-[-0.36px] text-teum-ink font-pretendard">
          {currentYearMonth}
        </span>
        <div className="flex items-center gap-[16px] text-[22px] font-normal leading-[32px] tracking-[-0.44px] text-teum-ink font-pretendard">
          <button
            type="button"
            onClick={onPrevMonth}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="이전 달"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            className="cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="다음 달"
          >
            ›
          </button>
        </div>
      </div>
    </header>
  );
}
