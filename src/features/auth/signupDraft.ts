const SIGNUP_DRAFT_KEY = "signup_draft";

export interface SignupDraft {
  email: string;
  password: string;
  nickname: string;
}

export function saveSignupDraft(draft: SignupDraft): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SIGNUP_DRAFT_KEY, JSON.stringify(draft));
}

export function readSignupDraft(): SignupDraft | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(SIGNUP_DRAFT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SignupDraft;
  } catch {
    return null;
  }
}

export function clearSignupDraft(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SIGNUP_DRAFT_KEY);
}
