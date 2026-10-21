"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { TimeSelectionCard } from "@/features/home/TimeSelectionCard";
import { QuickBannerCard } from "@/features/home/QuickBannerCard";
import { RecentStretchingCard } from "@/features/home/RecentStretchingCard";
import { ConnectionBanner } from "@/features/home/components/ConnectionBanner";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="mx-auto flex h-[844px] w-[390px] flex-col items-start gap-[20px] rounded-[32px] bg-teum-bg p-[24px]">
      <header className="flex w-[342px] items-center justify-between pt-[24px]">
        <div className="flex items-center">
          <Image
            src="/icons/logo-teumjit.svg"
            alt="틈짓 로고"
            width={89.023}
            height={43.117}
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => router.push("/settings")}
          className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center p-0"
          aria-label="설정"
        >
          <Image src="/icons/settings.svg" alt="설정" width={24} height={24} />
        </button>
      </header>

      <ConnectionBanner />
      <TimeSelectionCard />
      <QuickBannerCard />
      <RecentStretchingCard />
    </main>
  );
}
