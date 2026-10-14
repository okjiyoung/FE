interface RoutineCompleteSummaryProps {
  durationMinutes?: number;
  actionCount?: number;
  description?: string;
}

export function RoutineCompleteSummary({
  durationMinutes = 3,
  actionCount = 5,
  description = "목, 어깨, 허리 스트레칭 완료",
}: RoutineCompleteSummaryProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[4px] rounded-[24px] bg-teum-lime p-[24px]">
      <span className="w-[294px] font-pretendard text-[24px] font-bold leading-[35px] tracking-[-0.48px] text-teum-ink">
        {durationMinutes}분 · {actionCount}개 동작
      </span>
      <span className="font-pretendard text-[13px] font-normal leading-[19px] tracking-[-0.26px] text-teum-ink">
        {description}
      </span>
    </div>
  );
}
