"use client";

import Image from "next/image";

interface AuthErrorToastProps {
  message?: string;
}

export function AuthErrorToast({
  message = "인증번호가 잘못되었습니다",
}: AuthErrorToastProps) {
  return (
    <div className="flex w-[340px] items-start gap-[17px] rounded-[12px] bg-[#FFD5D5] p-[17px_24px]">
      <Image
        src="/icons/alert-circle.svg"
        alt="에러"
        width={24}
        height={24}
        className="shrink-0"
      />
      <span className="font-pretendard text-[15px] font-medium text-[#3C3F45]">
        {message}
      </span>
    </div>
  );
}
