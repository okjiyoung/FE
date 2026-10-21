"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { StretchingProgress } from "@/features/stretching/components/StretchingProgress";
import { StretchingTimer } from "@/features/stretching/components/StretchingTimer";
import { StretchingControls } from "@/features/stretching/components/StretchingControls";
import { StretchingResponse } from "@/features/stretching/api/stretching";
import {
  clearStretchingPlan,
  readStretchingPlan,
} from "@/features/stretching/stretchingPlan";
import {
  getStretchingImages,
  resolveStretchingImageUrl,
} from "@/features/stretching/api/stretchingImages";
import { saveStretchingHistory } from "@/features/stretching/api/stretchingHistory";
import { getMyInfo } from "@/features/auth/api/user";

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function StretchingPage() {
  const router = useRouter();

  const [plan] = useState<StretchingResponse[] | null>(() =>
    readStretchingPlan(),
  );
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [remainingSeconds, setRemainingSeconds] = useState(
    () => plan?.[0]?.durationSeconds ?? 0,
  );
  const [imagesByName, setImagesByName] = useState<Record<string, string>>(
    {},
  );

  const hasPlan = !!plan && plan.length > 0;

  useEffect(() => {
    getStretchingImages()
      .then((images) => {
        setImagesByName(
          Object.fromEntries(
            images.map((img) => [
              img.stretchingName,
              resolveStretchingImageUrl(img.imageUrl),
            ]),
          ),
        );
      })
      .catch(() => {
        // 이미지 목록을 못 가져와도 타이머 자체는 정상 동작해야 하므로 무시함
      });
  }, []);

  useEffect(() => {
    if (!hasPlan) {
      router.replace("/routine/recommend");
    }
  }, [hasPlan, router]);

  const totalSteps = plan?.length ?? 0;
  const current = plan?.[currentStep - 1];

  // 단계가 바뀌면 그 단계의 전체 시간으로 리셋함 (렌더 중 상태 조정 패턴)
  const [prevStep, setPrevStep] = useState(currentStep);
  if (currentStep !== prevStep) {
    setPrevStep(currentStep);
    if (current) setRemainingSeconds(current.durationSeconds);
  }

  // 재생 중일 때만 1초마다 감소시키고, 0이 되면 다음 단계(또는 완료)로 넘어감
  useEffect(() => {
    if (!isPlaying || !current) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          getMyInfo()
            .then((me) =>
              saveStretchingHistory(me.id, {
                stretchingName: current.name,
                durationSeconds: current.durationSeconds,
              }),
            )
            .catch(() => {});

          if (currentStep < totalSteps) {
            setCurrentStep((step) => step + 1);
          } else {
            router.push("/routine/complete");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentStep, current, totalSteps, router]);

  if (!plan || plan.length === 0 || !current) return null;

  const progressRatio =
    current.durationSeconds > 0
      ? (current.durationSeconds - remainingSeconds) / current.durationSeconds
      : 0;

  const handleExit = () => {
    clearStretchingPlan();
    router.push("/");
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push("/routine/complete");
    }
  };

  return (
    <main className="flex w-full flex-col items-start gap-[20px] p-[24px]">
      <Header title="스트레칭" onExit={handleExit} />

      <StretchingProgress currentStep={currentStep} totalSteps={totalSteps} />

      <div className="flex w-full flex-col items-center gap-[5px]">
        <div className="flex items-center justify-center rounded-[12px] bg-[#ECEEF0] px-[12px] py-[4px] font-pretendard text-[15px] font-medium leading-[19px] tracking-[-0.3px] text-[#838A95]">
          {current.area}
        </div>

        <h1 className="w-full text-center font-pretendard text-[24px] font-bold leading-[35px] tracking-[-0.48px] text-teum-ink">
          {current.name}
        </h1>

        <p className="whitespace-pre-line text-center font-pretendard text-[15px] font-normal leading-[22px] tracking-[-0.3px] text-teum-muted">
          {current.description}
        </p>
      </div>

      <div className="mt-[18px] flex w-full justify-center">
        <StretchingTimer
          formattedTime={formatSeconds(remainingSeconds)}
          progressRatio={progressRatio}
          imageUrl={imagesByName[current.name]}
          alt={current.name}
        />
      </div>

      <div className="mt-[20px] flex w-full justify-center">
        <StretchingControls
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </main>
  );
}
