"use client";

import Image from "next/image";

interface ToastProps {
  isVisible: boolean;
  message: string;
  subMessage: string;
}

export function Toast({ isVisible, message, subMessage }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-[20px] left-1/2 z-50 -translate-x-1/2 transition-all">
      <div className="inline-flex items-center rounded-[12px] border border-[#A394F5] bg-[#ECE8FC] py-[15px] pr-[26.5px] pl-[26px]">
        <Image src="/icons/watch.svg" alt="워치" width={17.5} height={26.25} />
        <div className="ml-[16px] flex flex-col gap-[4px]">
          <span className="font-pretendard text-[16px] font-medium tracking-[-0.32px] text-[#20211F]">
            {message}
          </span>
          <span className="font-pretendard text-[13px] font-medium tracking-[-0.26px] text-[#8A79E8]">
            {subMessage}
          </span>
        </div>
      </div>
    </div>
  );
}
