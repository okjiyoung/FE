"use client";

import { NavigationBar } from "@/components/ui/NavigationBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-[844px] w-[390px] flex-col bg-teum-white mx-auto overflow-hidden">
      <div className="flex-1 pb-[80px] overflow-y-auto">{children}</div>

      <NavigationBar />
    </div>
  );
}
