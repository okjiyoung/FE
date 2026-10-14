"use client";

import Image from "next/image";

export function SignupCompleteContent() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center text-center w-full">
        <h1 className="font-pretendard text-[28px] font-bold text-[#3C3F45]">
          가입이 완료됐어요!
        </h1>
        <p className="mt-[8px] font-pretendard text-[16px] font-medium leading-[24px] text-[#616670] whitespace-pre-line">
          이제 틈짓과 함께 일상 속 짧은 틈을{"\n"}가볍게 채워보세요
        </p>
      </div>

      <div className="mt-[44px] flex justify-center">
        <Image
          src="/icons/signup-complete.svg"
          alt="가입 완료 일러스트"
          width={195}
          height={273}
          priority
        />
      </div>
    </div>
  );
}
