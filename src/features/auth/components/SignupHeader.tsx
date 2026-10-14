"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export function SignupHeader() {
  const router = useRouter();

  return (
    <header className="flex w-[341px] items-center justify-between ml-[15px]">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex cursor-pointer items-center justify-center p-0"
        aria-label="뒤로가기"
      >
        <Image
          src="/icons/chevron-left.svg"
          alt="뒤로가기"
          width={33}
          height={33}
        />
      </button>
    </header>
  );
}
