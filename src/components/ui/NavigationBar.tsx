"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavigationBar() {
  const pathname = usePathname();

  const tabs = [
    {
      id: "home",
      label: "홈",
      href: "/",
      icon: "/icons/Nav.home.icon.svg",
    },
    {
      id: "favorites",
      label: "즐겨찾기",
      href: "/favorites",
      icon: "/icons/Nav.heart.icon.svg",
    },
    {
      id: "history",
      label: "기록",
      href: "/history",
      icon: "/icons/Nav.clock.icon.svg",
    },
  ];

  return (
    <nav className="absolute bottom-0 left-1/2 -translate-x-1/2 flex w-[390px] h-[80px] px-[28px] pb-[12px] justify-between items-center bg-teum-white shrink-0 z-50">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex w-[80px] h-[56px] flex-col justify-center items-center gap-[4px] shrink-0 transition-all ${
              isActive ? "rounded-[20px] bg-teum-tint" : ""
            }`}
          >
            <Image
              src={tab.icon}
              alt={tab.label}
              width={24}
              height={24}
              className="shrink-0"
            />
            <span
              className={`font-pretendard text-[11px] font-medium leading-[16px] tracking-[-0.22px] ${
                isActive ? "text-teum-ink font-semibold" : "text-teum-muted"
              }`}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
