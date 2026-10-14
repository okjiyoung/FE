"use client";

import { InputHTMLAttributes } from "react";

interface NicknameInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  currentLength: number;
  maxLength?: number;
}

export function NicknameInputField({
  isError = false,
  currentLength,
  maxLength = 10,
  className = "",
  ...props
}: NicknameInputFieldProps) {
  return (
    <div
      className={`relative flex h-[50px] w-[340px] items-center rounded-[8px] border bg-white pl-[16px] pr-[16px] ${
        isError ? "border-[#DF5757]" : "border-[#ECEEF0]"
      }`}
    >
      <input
        type="text"
        maxLength={maxLength}
        className={`flex-1 bg-transparent text-[15px] font-medium text-teum-ink placeholder-[#99A0AE] outline-none font-pretendard ${className}`}
        {...props}
      />
      <span className="shrink-0 font-pretendard text-[15px] font-medium text-[#99A0AE]">
        {currentLength}/{maxLength}
      </span>
    </div>
  );
}
