"use client";

import { useRouter } from "next/navigation";
import { SignupHeader } from "@/features/auth/components/SignupHeader";
import { SignupCompleteContent } from "@/features/auth/components/SignupCompleteContent";

export default function SignupCompletePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/");
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-start bg-white px-[24px] pt-[13px] pb-[53px]">
      <SignupHeader />

      <div className="mt-[46px] w-full flex flex-col items-center flex-1">
        <SignupCompleteContent />
      </div>

      <div className="w-full flex justify-center mt-auto">
        <button
          type="button"
          onClick={handleStart}
          className="flex h-[54px] w-[340px] cursor-pointer items-center justify-center rounded-[28px] bg-teum-ink font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-white transition-opacity hover:opacity-90"
        >
          시작하기
        </button>
      </div>
    </main>
  );
}
