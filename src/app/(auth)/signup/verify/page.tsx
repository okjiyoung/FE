"use client";

import { Suspense, useState, useRef, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SignupHeader } from "@/features/auth/components/SignupHeader";
import { AuthErrorToast } from "@/features/auth/components/AuthErrorToast";
import { VerificationCodeInputs } from "@/features/auth/components/VerificationCodeInputs";
import { TimerAndResend } from "@/features/auth/components/TimerAndResend";
import {
  sendEmailVerificationCode,
  verifyEmailVerificationCode,
} from "@/features/auth/api/emailVerification";
import { useApiRequest } from "@/hooks/useApiRequest";

function VerifyCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const verifyRequest = useApiRequest(verifyEmailVerificationCode);
  const resendRequest = useApiRequest(sendEmailVerificationCode);

  const handleChangeCode = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // 숫자만 허용

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isComplete = code.every((digit) => digit.length === 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete || verifyRequest.isLoading) return;

    const result = await verifyRequest.execute(email, code.join(""));
    if (result !== null) {
      router.push(`/signup/info?email=${encodeURIComponent(email)}`);
    }
  };

  const handleResend = () => {
    if (resendRequest.isLoading) return;
    resendRequest.execute(email);
  };

  const errorMessage = verifyRequest.error ?? resendRequest.error;

  return (
    <main className="flex min-h-screen w-full flex-col items-start bg-white px-[24px] pt-[13px] pb-[53px]">
      {errorMessage && (
        <div className="mb-[20px] w-full flex justify-center">
          <AuthErrorToast message={errorMessage} />
        </div>
      )}

      <SignupHeader />

      <div className="mt-[47px] flex flex-col gap-[8px] w-full">
        <h1 className="font-pretendard text-[28px] font-bold text-[#3C3F45]">
          인증번호를 입력해주세요
        </h1>
        <p className="font-pretendard text-[16px] font-medium leading-[26px] text-[#616670]">
          {email}으로 보냈어요
        </p>
      </div>

      <div className="mt-[54px] w-full">
        <VerificationCodeInputs
          code={code}
          onChangeCode={handleChangeCode}
          onKeyDown={handleKeyDown}
          inputRefs={inputRefs}
        />
      </div>

      <div className="mt-[12.6px] w-full">
        <TimerAndResend timeLeft="02:48" onResend={handleResend} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-auto w-full flex justify-center"
      >
        <button
          type="submit"
          disabled={!isComplete || verifyRequest.isLoading}
          className={`flex h-[54px] w-[340px] items-center justify-center rounded-[28px] font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-white transition-colors ${
            isComplete && !verifyRequest.isLoading
              ? "cursor-pointer bg-teum-ink hover:opacity-90"
              : "cursor-not-allowed bg-[#BDC5CE]"
          }`}
        >
          {verifyRequest.isLoading ? "확인 중..." : "인증하기"}
        </button>
      </form>
    </main>
  );
}

export default function VerifyCodePage() {
  return (
    <Suspense fallback={null}>
      <VerifyCodeContent />
    </Suspense>
  );
}
