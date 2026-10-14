"use client";

import { useState } from "react";
import { SignupHeader } from "@/features/auth/components/SignupHeader";
import { EmailInputField } from "@/features/auth/components/EmailInputField";
import { EmailValidationMessage } from "@/features/auth/components/EmailValidationMessage";

export default function SignupEmailPage() {
  const [email, setEmail] = useState("");

  const isValidEmail = email.includes("@") && email.includes(".");

  const handleClear = () => {
    setEmail("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidEmail) {
      // 인증번호 받기 로직 수행
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-start bg-white px-[24px] pt-[13px] pb-[53px]">
      <SignupHeader />

      <div className="mt-[47px] flex flex-col gap-[8px] w-full">
        <h1 className="text-[28px] font-bold leading-normal text-[#3C3F45] font-pretendard">
          이메일로 시작해요
        </h1>
        <p className="text-[16px] font-medium leading-[26px] text-[#616670] font-pretendard">
          회원가입에 사용할 이메일을 입력해주세요
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-[42px] flex flex-col w-full flex-1"
      >
        <EmailInputField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onClear={handleClear}
        />

        <EmailValidationMessage isValid={isValidEmail} />

        <button
          type="submit"
          disabled={!isValidEmail}
          className={`mt-auto flex h-[54px] w-full items-center justify-center rounded-[28px] font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-white transition-colors ${
            isValidEmail
              ? "cursor-pointer bg-teum-ink hover:opacity-90"
              : "cursor-not-allowed bg-[#BDC5CE]"
          }`}
        >
          인증번호 받기
        </button>
      </form>
    </main>
  );
}
