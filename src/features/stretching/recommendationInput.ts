export interface RecommendationInput {
  remainingTimeSeconds: number;
  posture?: string;
  location?: string;
  constraints: string[];
  level: number;
  display: {
    location: string;
    posture: string;
    restriction: string;
    bodyParts: string[];
  };
}

const RECOMMENDATION_INPUT_KEY = "recommendation_input";

export function saveRecommendationInput(input: RecommendationInput): void {
  sessionStorage.setItem(RECOMMENDATION_INPUT_KEY, JSON.stringify(input));
}

export function readRecommendationInput(): RecommendationInput | null {
  const raw = sessionStorage.getItem(RECOMMENDATION_INPUT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as RecommendationInput;
  } catch {
    return null;
  }
}
