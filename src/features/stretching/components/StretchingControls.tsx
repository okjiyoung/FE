import Image from "next/image";

interface StretchingControlsProps {
  isPlaying: boolean;
  onPrev?: () => void;
  onTogglePlay?: () => void;
  onNext?: () => void;
}

export function StretchingControls({
  isPlaying,
  onPrev,
  onTogglePlay,
  onNext,
}: StretchingControlsProps) {
  return (
    <div className="flex w-full items-center justify-center gap-[16px]">
      <button
        type="button"
        onClick={onPrev}
        className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[30px] bg-teum-tag-bg p-[16.364px] transition-opacity hover:opacity-80"
      >
        <Image
          src="/icons/skip-forward.svg"
          alt="이전"
          width={28}
          height={28}
          className="h-auto w-auto"
        />
      </button>

      <button
        type="button"
        onClick={onTogglePlay}
        className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[44px] bg-teum-ink p-[24px] transition-opacity hover:opacity-90"
      >
        <Image
          src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
          alt={isPlaying ? "일시정지" : "재생"}
          width={40}
          height={40}
          className="h-auto w-auto"
        />
      </button>

      <button
        type="button"
        onClick={onNext}
        className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[30px] bg-teum-tag-bg p-[16.364px] transition-opacity hover:opacity-80"
      >
        <Image
          src="/icons/skip-forward.svg"
          alt="다음"
          width={28}
          height={28}
          className="scale-x-[-1] h-auto w-auto"
        />
      </button>
    </div>
  );
}
