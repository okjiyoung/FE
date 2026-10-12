"use client";

import Image from "next/image";

interface LoginOptionsProps {
  isKeepLoggedIn: boolean;
  onToggleKeepLoggedIn: () => void;
  onFindPassword?: () => void;
}

export function LoginOptions({
  isKeepLoggedIn,
  onToggleKeepLoggedIn,
  onFindPassword,
}: LoginOptionsProps) {
  return (
    <div className="flex w-[328px] items-center justify-between">
      <button
        type="button"
        onClick={onToggleKeepLoggedIn}
        className="flex cursor-pointer items-center gap-[8px] text-[15px] font-medium text-[#3C3F45] font-pretendard"
      >
        <Image
          src={
            isKeepLoggedIn
              ? "/icons/Checkbox.svg"
              : "/icons/Checkbox-inactive.svg"
          }
          alt="체크박스"
          width={19}
          height={19}
        />
        로그인 상태 유지
      </button>

      <button
        type="button"
        onClick={onFindPassword}
        className="cursor-pointer text-[15px] font-medium text-[#3C3F45] font-pretendard hover:underline"
      >
        비밀번호 찾기
      </button>
    </div>
  );
}
