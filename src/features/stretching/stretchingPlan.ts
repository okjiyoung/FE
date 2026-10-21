import { StretchingResponse } from "./api/stretching";

const STRETCHING_PLAN_KEY = "stretching_plan";

export function saveStretchingPlan(plan: StretchingResponse[]): void {
  sessionStorage.setItem(STRETCHING_PLAN_KEY, JSON.stringify(plan));
}

export function readStretchingPlan(): StretchingResponse[] | null {
  const raw = sessionStorage.getItem(STRETCHING_PLAN_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StretchingResponse[];
  } catch {
    return null;
  }
}

export function clearStretchingPlan(): void {
  sessionStorage.removeItem(STRETCHING_PLAN_KEY);
}
