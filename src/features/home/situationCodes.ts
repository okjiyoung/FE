import { Difficulty } from "@/features/home/components/DifficultyDropdown";

// GET /api/stretching-difficulties 실데이터로 검증된 백엔드 enum 값만 매핑함.
// "걷는 중"은 백엔드 POSTURE에 대응값이 없어(LYING/PRONE/SITTING/STANDING만 존재)
// 의도적으로 매핑하지 않음 - mapPostureToCode가 undefined를 반환해 요청에서 생략되고,
// "상관없음"과 동일하게 자세 필터 없이 추천을 정상적으로 받아옴.

const LOCATION_CODES: Record<string, string> = {
  집: "HOME",
  회사: "OFFICE",
  학교: "SCHOOL",
  기타: "OTHER",
  지하철: "OTHER",
};

const POSTURE_CODES: Record<string, string> = {
  "앉아 있음": "SITTING",
  "서 있음": "STANDING",
};

const RESTRICTION_CODES: Record<string, string[]> = {
  "한 손만 가능": ["ONE_HAND"],
  "큰 동작 X": ["NO_LARGE_MOVEMENT"],
  "티 나지 않게": ["UNNOTICEABLE"],
};

const DIFFICULTY_LEVELS: Record<Difficulty, number> = {
  쉬움: 0,
  중간: 1,
  어려움: 2,
};

export function mapLocationToCode(location: string): string | undefined {
  return LOCATION_CODES[location];
}

export function mapCodeToLocationLabel(code: string): string | undefined {
  return Object.entries(LOCATION_CODES).find(([, v]) => v === code)?.[0];
}

export function mapPostureToCode(posture: string): string | undefined {
  return POSTURE_CODES[posture];
}

export function mapRestrictionToConstraints(restriction: string): string[] {
  return RESTRICTION_CODES[restriction] ?? [];
}

export function mapDifficultyToLevel(difficulty: Difficulty): number {
  return DIFFICULTY_LEVELS[difficulty];
}

export function parseSelectedTimeToSeconds(time: string): number {
  const minutes = parseInt(time, 10);
  return Number.isFinite(minutes) ? minutes * 60 : 180;
}
