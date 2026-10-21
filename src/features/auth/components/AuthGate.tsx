"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuthToken } from "@/services/authToken";

const PUBLIC_PATH_PREFIXES = ["/login", "/signup"];

function isPublicPath(pathname: string) {
  return PUBLIC_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const requiresAuth = !isPublicPath(pathname);
  const [isAuthorized, setIsAuthorized] = useState(!requiresAuth);

  useEffect(() => {
    if (!requiresAuth) return;

    // localStorage/sessionStorage 조회는 클라이언트 마운트 이후에만 가능해서 effect에서 확인함
    const timer = setTimeout(() => {
      if (!getAuthToken()) {
        setIsAuthorized(false);
        router.replace("/login");
        return;
      }

      setIsAuthorized(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [requiresAuth, pathname, router]);

  if (requiresAuth && !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
