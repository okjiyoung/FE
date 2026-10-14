"use client";

import Image from "next/image";

interface EmailValidationMessageProps {
  isValid: boolean;
}

export function EmailValidationMessage({
  isValid,
}: EmailValidationMessageProps) {
  if (!isValid) return null;

  return (
    <div className="mt-[9px] inline-flex items-center gap-[7px]">
      <Image src="/icons/check-circle.svg" alt="성공" width={18} height={18} />
      <span className="text-[14px] font-semibold text-[#8A79E8] font-pretendard">
        사용 가능한 이메일이에요
      </span>
    </div>
  );
}
