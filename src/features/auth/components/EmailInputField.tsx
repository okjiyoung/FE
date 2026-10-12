"use client";

import Image from "next/image";
import { ChangeEvent } from "react";

interface EmailInputFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export function EmailInputField({
  value,
  onChange,
  onClear,
}: EmailInputFieldProps) {
  return (
    <div className="relative flex h-[50px] w-[342px] items-center rounded-[8px] border border-[#ECEEF0] bg-white pl-[16px] pr-[16px]">
      <input
        type="email"
        placeholder="이메일 입력"
        value={value}
        onChange={onChange}
        className="flex-1 bg-transparent text-[15px] font-medium text-[#20211F] placeholder-[#99A0AE] outline-none font-pretendard"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="flex shrink-0 cursor-pointer items-center justify-center"
          aria-label="입력 내용 지우기"
        >
          <Image src="/icons/x-circle.svg" alt="삭제" width={19} height={19} />
        </button>
      )}
    </div>
  );
}
