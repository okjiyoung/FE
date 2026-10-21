"use client";

import Image from "next/image";

interface TimerAndResendProps {
  timeLeft: string; 
  onResend: () => void;
}

export function TimerAndResend({ timeLeft, onResend }: TimerAndResendProps) {
  return (
    <div className="flex w-[340px] items-center justify-between">
      <div className="flex items-center gap-[4px]">
        <Image src="/icons/clock.svg" alt="clock" width={18} height={18} />
        <span className="font-pretendard text-[14px] font-semibold text-[#8A79E8]">
          남은 시간 {timeLeft}
        </span>
      </div>

      <button
        type="button"
        onClick={onResend}
        className="cursor-pointer font-pretendard text-[14px] font-medium text-[#616670] underline decoration-solid underline-offset-auto hover:text-[#3C3F45]"
      >
        인증번호 재전송
      </button>
    </div>
  );
}
