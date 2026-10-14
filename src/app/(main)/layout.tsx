"use client";

import { NavigationBar } from "@/components/ui/NavigationBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[390px] flex-col bg-teum-white">
      <div className="flex-1 pb-[80px] overflow-y-auto">{children}</div>

      <NavigationBar />
    </div>
  );
}
