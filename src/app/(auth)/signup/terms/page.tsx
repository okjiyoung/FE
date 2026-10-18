"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupHeader } from "@/features/auth/components/SignupHeader";
import { AuthErrorToast } from "@/features/auth/components/AuthErrorToast";
import {
  TermsAgreementList,
  TermsState,
} from "@/features/auth/components/TermsAgreementList";
import { signUp, login } from "@/features/auth/api/user";
import { clearSignupDraft, readSignupDraft } from "@/features/auth/signupDraft";
import { setAuthToken } from "@/services/authToken";
import { ApiError } from "@/services/apiClient";

export default function TermsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [terms, setTerms] = useState<TermsState>({
    service: false,
    privacy: false,
    age: false,
    marketing: false,
  });

  const isRequiredAgreed = terms.service && terms.privacy && terms.age;

  const isAllChecked = Object.values(terms).every(Boolean);

  const handleToggleAll = () => {
    const nextState = !isAllChecked;
    setTerms({
      service: nextState,
      privacy: nextState,
      age: nextState,
      marketing: nextState,
    });
  };

  const handleToggleItem = (key: keyof TermsState) => {
    setTerms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRequiredAgreed || isSubmitting) return;

    const draft = readSignupDraft();
    if (!draft) {
      router.push("/signup/email");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await signUp(draft.email, draft.password);
      const loginResult = await login(draft.email, draft.password);
      setAuthToken(loginResult.token, true);
      clearSignupDraft();
      router.push("/signup/complete");
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : "회원가입에 실패했어요."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-start bg-white px-[24px] pt-[13px] pb-[53px]">
      <SignupHeader />

      <div className="mt-[47px] flex flex-col gap-[8px] w-full">
        <h1 className="font-pretendard text-[28px] font-bold text-[#3C3F45]">
          약관 동의
        </h1>
        <p className="font-pretendard text-[16px] font-medium leading-[26px] text-[#616670]">
          서비스 이용을 위해 약관에 동의해주세요
        </p>
      </div>

      <div className="mt-[47px] w-full">
        <TermsAgreementList
          terms={terms}
          onToggleAll={handleToggleAll}
          onToggleItem={handleToggleItem}
          isAllChecked={isAllChecked}
        />
      </div>

      {error && (
        <div className="mt-[20px] w-full flex justify-center">
          <AuthErrorToast message={error} />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-auto w-full flex justify-center"
      >
        <button
          type="submit"
          disabled={!isRequiredAgreed || isSubmitting}
          className={`flex h-[54px] w-[340px] items-center justify-center rounded-[28px] font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-white transition-colors ${
            isRequiredAgreed && !isSubmitting
              ? "cursor-pointer bg-teum-ink hover:opacity-90"
              : "cursor-not-allowed bg-[#BDC5CE]"
          }`}
        >
          {isSubmitting ? "가입 처리 중..." : "가입 완료하기"}
        </button>
      </form>
    </main>
  );
}
