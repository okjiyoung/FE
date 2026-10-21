"use client";

import Image from "next/image";

interface ConnectionBannerProps {
  onConnect?: () => void;
}

export function ConnectionBanner({ onConnect }: ConnectionBannerProps) {
  return (
    <div className="relative mt-[20px] flex w-[342px] items-center justify-between rounded-[24px] bg-[#ECE8FC] px-[20px] py-[14px]">
      <div className="flex flex-col gap-[4px] z-10">
        <span className="font-pretendard text-[14px] font-bold tracking-[-0.28px] text-teum-ink">
          연결하면 자동으로 입력돼요
        </span>
        <span className="font-pretendard text-[13px] font-medium tracking-[-0.26px] text-teum-ink">
          집 위치 · 갤럭시 워치
        </span>
      </div>

      <div className="absolute top-[21.88px] left-[154px] z-0 pointer-events-none">
        <Image
          src="/icons/watchbanner.svg"
          alt="워치 배너"
          width={105}
          height={52.5}
        />
      </div>

      <button
        type="button"
        onClick={onConnect}
        className="relative z-10 flex cursor-pointer items-center justify-center gap-[10px] rounded-[20px] bg-[#20211F] px-[16px] py-[8px] transition-transform active:scale-95"
      >
        <span className="font-pretendard text-[14px] font-bold tracking-[-0.28px] text-[#F9F9F9]">
          연결하기
        </span>
      </button>
    </div>
  );
}
