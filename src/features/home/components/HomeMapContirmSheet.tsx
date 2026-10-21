"use client";

import { Button } from "@/components/ui/Button";

interface HomeMapConfirmSheetProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function HomeMapConfirmSheet({
  onConfirm,
  onCancel,
}: HomeMapConfirmSheetProps) {
  return (
    <div className="relative flex w-[390px] h-[435px] flex-col items-center rounded-t-[32px] border-t-1.5 border-[#ECEEF0] bg-white p-[12px_24px_22px_24px] shadow-[0_-2px_20px_0_rgba(0,0,0,0.08)]">
      <div className="h-[4px] w-[53px] rounded-full bg-[#BDC5CE]" />

      <div className="mt-[20px] self-start ml-[4px] flex flex-col gap-[6px]">
        <h3 className="font-pretendard text-[18px] font-bold tracking-[-0.36px] text-teum-ink">
          이 위치가 집이 맞나요?
        </h3>
        <p className="font-pretendard text-[13px] font-normal tracking-[-0.26px] text-[#838A95]">
          지도에서 위치를 확인해주세요
        </p>
      </div>

      <div className="mt-[16px] flex h-[149px] w-[338px] items-center justify-center rounded-[12px] bg-[#ECEEF0]">
        <span className="text-[#838A95] text-[14px]">지도 표시 영역</span>
      </div>

      <p className="mt-[16px] self-start ml-[4px] font-pretendard text-[15px] font-semibold tracking-[-0.3px] text-[#20211F]">
        서울특별시 성북구 보문로 123길
      </p>

      <div className="mt-[20px] flex flex-col gap-[8px] w-full items-center">
        <Button variant="primary" onClick={onConfirm}>
          이 위치를 집으로 등록
        </Button>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-[44px] w-[302px] items-center justify-center font-pretendard text-[15px] font-medium text-[#616670] cursor-pointer"
        >
          취소
        </button>
      </div>
    </div>
  );
}
