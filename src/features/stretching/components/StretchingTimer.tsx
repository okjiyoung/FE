import Image from "next/image";

interface StretchingTimerProps {
  formattedTime: string;
  progressRatio: number;
  imageUrl?: string;
  alt?: string;
}

export function StretchingTimer({
  formattedTime,
  progressRatio,
  imageUrl,
  alt,
}: StretchingTimerProps) {
  const radius = 125.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-[267px] w-[267px] items-center justify-center">
        <svg
          className="h-full w-full -rotate-90 transform"
          viewBox="0 0 267 267"
        >
          <circle
            cx="133.5"
            cy="133.5"
            r={radius}
            fill="none"
            stroke="#ECEEF0"
            strokeWidth="8"
          />
          <circle
            cx="133.5"
            cy="133.5"
            r={radius}
            fill="none"
            stroke="#A394F5"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-linear"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={alt ?? "스트레칭 동작"}
              width={200}
              height={200}
              className="h-[200px] w-[200px] object-contain"
              unoptimized
            />
          ) : (
            <span className="font-pretendard text-[20px] font-bold text-teum-ink">
              일러스트
            </span>
          )}
        </div>
      </div>

      <div className="mt-[18px] w-full text-center font-pretendard text-[64px] font-bold leading-[93px] tracking-[-1.28px] text-teum-ink">
        {formattedTime}
      </div>
    </div>
  );
}
