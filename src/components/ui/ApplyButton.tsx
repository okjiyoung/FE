"use client";

import { ButtonHTMLAttributes } from "react";

interface ApplyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ApplyButton({
  children,
  className = "",
  ...props
}: ApplyButtonProps) {
  return (
    <button
      type="button"
      className={`mt-auto flex h-[56px] w-full shrink-0 items-center justify-center rounded-[28px] bg-teum-ink text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-teum-white transition-opacity hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}