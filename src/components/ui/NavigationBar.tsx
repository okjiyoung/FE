"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationBarProps {
  isOpen?: boolean;
}

export function NavigationBar({ isOpen = false }: NavigationBarProps) {
  const pathname = usePathname();

  if (isOpen) return null;

  const tabs = [
    { id: "home", label: "홈", href: "/", icon: "/icons/Nav.home.icon.svg" },
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
    <nav className="absolute bottom-0 inset-x-0 flex w-full h-[80px] px-[28px] pb-[12px] justify-between items-center bg-teum-white shrink-0 z-40">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex w-[80px] h-[56px] flex-col justify-center items-center gap-[4px] shrink-0 transition-all ${
              isActive ? "rounded-[20px] bg-[#ECE8FC]" : ""
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
