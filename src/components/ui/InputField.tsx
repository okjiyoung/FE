"use client";

import Image from "next/image";
import { InputHTMLAttributes, ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  iconSrc: string;
  rightElement?: ReactNode;
}

export function InputField({
  iconSrc,
  rightElement,
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <div className="relative flex h-[50px] w-[341px] items-center gap-[8px] rounded-[8px] border border-[#ECEEF0] bg-white pl-[16px] pr-[16px]">
      <Image
        src={iconSrc}
        alt="icon"
        width={20}
        height={20}
        className="shrink-0"
      />
      <input
        className={`flex-1 bg-transparent text-[15px] font-medium text-teum-ink placeholder-[#99A0AE] outline-none font-pretendard ${className}`}
        {...props}
      />
      {rightElement && <div className="shrink-0 -mr-[4px]">{rightElement}</div>}
    </div>
  );
}
