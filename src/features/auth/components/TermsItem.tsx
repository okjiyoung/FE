"use client";

import Image from "next/image";

interface TermsItemProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
  onDetailClick?: () => void;
  showArrow?: boolean;
}

export function TermsItem({
  label,
  checked,
  onToggle,
  onDetailClick,
  showArrow = true,
}: TermsItemProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <button
        type="button"
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-[20px]"
      >
        <Image
          src={checked ? "/icons/Checkbox.svg" : "/icons/UnCheckbox.svg"}
          alt="체크박스"
          width={19}
          height={19}
          className="shrink-0"
        />
        <span className="font-pretendard text-[16px] font-medium leading-[26px] text-[#3C3F45]">
          {label}
        </span>
      </button>

      {showArrow && (
        <button
          type="button"
          onClick={onDetailClick}
          className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center"
          aria-label={`${label} 상세보기`}
        >
          <Image
            src="/icons/chevron-left.svg"
            alt="상세보기"
            width={25}
            height={25}
            className="scale-x-[-1]"
          />
        </button>
      )}
    </div>
  );
}
