import { apiClient } from "@/services/apiClient";

export function sendEmailVerificationCode(email: string) {
  return apiClient.post<string>("/api/email-verifications/send", { email });
}

export function verifyEmailVerificationCode(email: string, code: string) {
  return apiClient.post<string>("/api/email-verifications/verify", {
    email,
    code,
  });
}
