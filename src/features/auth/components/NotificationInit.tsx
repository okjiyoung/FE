"use client";

import { useEffect } from "react";
import { requestNotificationPermission } from "@/services/notifications";

export function NotificationInit() {
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return null;
}
