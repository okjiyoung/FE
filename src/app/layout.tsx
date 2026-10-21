import type { Metadata } from "next";
import "./globals.css";
import { AuthGate } from "@/features/auth/components/AuthGate";

export const metadata: Metadata = {
  title: "틈짓",
  description: "작은 틈, 가벼운 몸. 틈새 스트레칭 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
