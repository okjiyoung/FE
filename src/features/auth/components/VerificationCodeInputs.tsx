"use client";

import { useRef, ChangeEvent, KeyboardEvent } from "react";

interface VerificationCodeInputsProps {
  code: string[];
  onChangeCode: (index: number, value: string) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export function VerificationCodeInputs({
  code,
  onChangeCode,
  onKeyDown,
  inputRefs,
}: VerificationCodeInputsProps) {
  return (
    <div className="flex items-center gap-[4px]">
      {code.map((digit, index) => {
        const isFilled = digit.length > 0;
        return (
          <div
            key={index}
            className={`flex h-[64.397px] w-[53.357px] flex-col items-center justify-center rounded-[11.039px] p-[15.885px_19.856px] transition-colors ${
              isFilled ? "bg-[#ECE8FC]" : "bg-[#ECEEF0]"
            }`}
          >
            <input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => onChangeCode(index, e.target.value)}
              onKeyDown={(e) => onKeyDown(index, e)}
              className="w-full bg-transparent text-center font-pretendard text-[27.798px] font-bold text-[#3C3F45] outline-none"
            />
          </div>
        );
      })}
    </div>
  );
}
