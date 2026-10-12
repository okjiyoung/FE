"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InputField } from "@/components/ui/InputField";
import { LoginOptions } from "@/features/auth/components/LoginOptions";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isKeepLoggedIn, setIsKeepLoggedIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직
  };

  return (
    <main className="flex min-h-screen w-[390px] flex-col items-center bg-white px-[24px] pt-[150px] pb-[40px] mx-auto overflow-hidden">
      <div className="flex justify-center">
        <Image
          src="/icons/teumjitlogo.svg"
          alt="틈짓 로고"
          width={142}
          height={68.773}
          priority
        />
      </div>

      <form
        onSubmit={handleLogin}
        className="mt-[39.23px] flex flex-col items-center gap-[12px] w-full"
      >
        <InputField
          type="text"
          placeholder="아이디"
          value={id}
          onChange={(e) => setId(e.target.value)}
          iconSrc="/icons/user.svg"
        />

        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          iconSrc="/icons/lock.svg"
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer pr-[16px] text-gray-400 hover:text-gray-600"
            >
              <Image
                src={showPassword ? "/icons/eye-on.svg" : "/icons/eye-off.svg"}
                alt="비밀번호 표시"
                width={20}
                height={20}
              />
            </button>
          }
        />

        <div className="mt-[6px]">
          <LoginOptions
            isKeepLoggedIn={isKeepLoggedIn}
            onToggleKeepLoggedIn={() => setIsKeepLoggedIn(!isKeepLoggedIn)}
            onFindPassword={() => {}}
          />
        </div>

        <button
          type="submit"
          className="mt-[28px] flex h-[54px] w-[340px] cursor-pointer items-center justify-center rounded-[28px] bg-teum-ink font-pretendard text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-teum-white transition-opacity hover:opacity-90"
        >
          시작하기
        </button>
      </form>

      <div className="mt-[32px] flex w-full items-center justify-center gap-[6px] self-stretch text-center font-pretendard text-[15px] font-medium text-[#3C3F45]">
        <span>계정이 없으신가요?</span>
        <Link
          href="/signup"
          className="font-semibold text-[#6F5DCF] hover:underline"
        >
          회원가입
        </Link>
      </div>
    </main>
  );
}
