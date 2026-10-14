interface RoutineSummaryCardProps {
  targetParts: string;
  tags: string[];
  description: string;
}

export function RoutineSummaryCard({
  targetParts,
  tags,
  description,
}: RoutineSummaryCardProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[8px] rounded-[24px] bg-[#C1B6FF] p-[20px]">
      <h3 className="text-[20px] font-bold leading-[29px] tracking-[-0.4px] text-teum-ink">
        {targetParts}
      </h3>
      <div className="flex w-[302px] flex-col text-[14px] font-normal leading-[19px] tracking-[-0.28px] text-teum-ink">
        <span>{tags.join(" · ")}</span>
        <span>{description}</span>
      </div>
    </div>
  );
}
