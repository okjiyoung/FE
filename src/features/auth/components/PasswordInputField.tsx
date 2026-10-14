"use client";

import Image from "next/image";
import { useState, InputHTMLAttributes } from "react";

interface PasswordInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

export function PasswordInputField({
  isError = false,
  className = "",
  ...props
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`relative flex h-[50px] w-[340px] items-center rounded-[8px] border bg-white pl-[16px] pr-[16px] ${
        isError ? "border-[#DF5757]" : "border-[#ECEEF0]"
      }`}
    >
      <input
        type={showPassword ? "text" : "password"}
        className={`flex-1 bg-transparent text-[15px] font-medium text-teum-ink placeholder-[#99A0AE] outline-none font-pretendard ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="flex shrink-0 cursor-pointer items-center justify-center text-gray-400 hover:text-gray-600"
        aria-label="비밀번호 표시 전환"
      >
        <Image
          src={showPassword ? "/icons/eye-on.svg" : "/icons/eye-off.svg"}
          alt="비밀번호 표시"
          width={19}
          height={19}
        />
      </button>
    </div>
  );
}
