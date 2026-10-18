"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupHeader } from "@/features/auth/components/SignupHeader";
import { PasswordInputField } from "@/features/auth/components/PasswordInputField";
import { NicknameInputField } from "@/features/auth/components/NicknameInputField";
import { Button } from "@/components/ui/Button";

export default function SignupInfoPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const isPasswordInvalid = password.length > 0 && password.length < 8;
  const isPasswordMismatch =
    passwordConfirm.length > 0 && password !== passwordConfirm;
  const isNicknameDuplicate = nickname === "머무르";

  const isFormValid =
    password.length >= 8 &&
    password === passwordConfirm &&
    nickname.length >= 2 &&
    !isNicknameDuplicate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      router.push("/signup/terms");
    }
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-start bg-white px-[24px] pt-[13px] pb-[53px]">
      <SignupHeader />

      <div className="mt-[47px] flex flex-col gap-[8px] w-full">
        <h1 className="font-pretendard text-[28px] font-bold text-[#3C3F45]">
          가입정보를 입력해주세요
        </h1>
        <p className="font-pretendard text-[16px] font-medium leading-[26px] text-[#616670]">
          마지막 단계에요
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-[33px] flex flex-col w-full flex-1"
      >
        <div className="flex flex-col gap-[9px]">
          <label className="font-pretendard text-[15px] font-semibold text-[#3C3F45]">
            비밀번호
          </label>
          <PasswordInputField
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isError={isPasswordInvalid}
          />
          <p
            className={`font-pretendard text-[12px] font-medium leading-[16px] ${
              isPasswordInvalid ? "text-[#DF5757]" : "text-[#838A95]"
            }`}
          >
            영문, 숫자, 특수문자 중 2가지 이상을 포함하여
            <br />
            8~20자 사이로 입력해주세요
          </p>
        </div>

        <div className="mt-[24px] flex flex-col gap-[9px]">
          <label className="font-pretendard text-[15px] font-semibold text-[#3C3F45]">
            비밀번호 확인
          </label>
          <PasswordInputField
            placeholder="비밀번호 다시 입력"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            isError={isPasswordMismatch}
          />
          {isPasswordMismatch && (
            <span className="font-pretendard text-[12px] font-medium leading-[16px] text-[#DF5757]">
              비밀번호가 일치하지 않습니다
            </span>
          )}
        </div>

        <div className="mt-[24px] flex flex-col gap-[9px]">
          <label className="font-pretendard text-[15px] font-semibold text-[#3C3F45]">
            닉네임
          </label>
          <NicknameInputField
            placeholder="닉네임 입력 (2~10자)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            currentLength={nickname.length}
            isError={isNicknameDuplicate}
          />
          {isNicknameDuplicate && (
            <span className="font-pretendard text-[12px] font-medium text-[#DF5757]">
              이미 사용중인 닉네임이에요
            </span>
          )}
        </div>

        <div className="mt-auto flex justify-center w-full pt-[40px]">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`flex h-[54px] w-[340px] items-center justify-center rounded-[28px] font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-white transition-colors ${
              isFormValid
                ? "cursor-pointer bg-teum-ink hover:opacity-90"
                : "cursor-not-allowed bg-[#BDC5CE]"
            }`}
          >
            다음
          </button>
        </div>
      </form>
    </main>
  );
}
