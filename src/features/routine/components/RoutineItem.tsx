interface RoutineItemProps {
  step: string;
  title: string;
  duration: string;
}

export function RoutineItem({ step, title, duration }: RoutineItemProps) {
  return (
    <div className="flex h-[64px] w-full items-center gap-[16px] rounded-[18px] bg-teum-white px-[16px]">
      <span className="text-[14px] font-bold leading-[20px] tracking-[-0.28px] text-teum-muted">
        {step}
      </span>
      <span className="w-[226px] shrink-0 text-[15px] font-medium leading-[22px] tracking-[-0.3px] text-teum-ink">
        {title}
      </span>
      <span className="ml-auto text-[15px] font-normal leading-[19px] tracking-[-0.3px] text-teum-muted">
        {duration}
      </span>
    </div>
  );
}
