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

  const hasPlan = !!plan && plan.length > 0;

  useEffect(() => {
    if (!hasPlan) {
      router.replace("/routine/recommend");
    }
  }, [hasPlan, router]);

  if (!plan || plan.length === 0) return null;

  const totalSteps = plan.length;
  const current = plan[currentStep - 1];

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
          formattedTime={formatSeconds(current.durationSeconds)}
          progressRatio={0.5}
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
