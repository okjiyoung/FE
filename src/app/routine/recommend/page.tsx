"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { RoutineSummaryCard } from "@/features/routine/components/RoutineSummaryCard";
import { RoutineItem } from "@/features/routine/components/RoutineItem";

export default function RecommendRoutinePage() {
  const router = useRouter();

  const routineList = [
    { id: 1, step: "01", title: "턱 당기기", duration: "30초" },
    { id: 2, step: "02", title: "어깨 내리기", duration: "30초" },
    { id: 3, step: "03", title: "견갑골 조이기", duration: "30초" },
    { id: 4, step: "04", title: "견갑골 조이기", duration: "30초" },
    { id: 5, step: "05", title: "견갑골 조이기", duration: "30초" },
  ];

  const handleStartRoutine = () => {
    router.push("/stretching");
  };

  return (
    <div className="flex h-full min-h-screen w-[390px] flex-col items-start gap-[20px] bg-[#F7F7F8] px-[24px] pb-[24px]">
      <Header title="추천 루틴" />
      <h1 className="w-[342px] text-[28px] font-bold leading-[41px] tracking-[-0.56px] text-teum-ink">
        지금의 나에게,
        <br />
        3분이면 충분해요.
      </h1>
      <RoutineSummaryCard
        targetParts="목, 어깨"
        tags={["집", "서 있음", "한 손 만 가능"]}
        description="손을 쓰지 않고 제자리에서"
      />
      <div className="flex w-[342px] flex-col items-start gap-[8px]">
        {routineList.map((item) => (
          <RoutineItem
            key={item.id}
            step={item.step}
            title={item.title}
            duration={item.duration}
          />
        ))}
      </div>
      <div className="mt-auto flex w-[390px] -translate-x-[24px] flex-col items-start gap-[12px] px-[24px]">
        <ApplyButton onClick={handleStartRoutine}>루틴 시작하기</ApplyButton>
      </div>
    </div>
  );
}
