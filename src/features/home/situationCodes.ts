import { Difficulty } from "@/features/home/components/DifficultyDropdown";

// 백엔드 enum 값이 swagger 예시(SITTING, OFFICE, ONE_HAND, NO_LARGE_MOVEMENT)에만 나와 있어서
// 명시되지 않은 값들(SCHOOL, SUBWAY, ETC, STANDING, WALKING, DISCREET)은 추정값임 - 실제 백엔드와 다르면 조정 필요

const LOCATION_CODES: Record<string, string> = {
  집: "HOME",
  회사: "OFFICE",
  학교: "SCHOOL",
  지하철: "SUBWAY",
  기타: "ETC",
};

const POSTURE_CODES: Record<string, string> = {
  "앉아 있음": "SITTING",
  "서 있음": "STANDING",
  "걷는 중": "WALKING",
};

const RESTRICTION_CODES: Record<string, string[]> = {
  "한 손만 가능": ["ONE_HAND"],
  "큰 동작 X": ["NO_LARGE_MOVEMENT"],
  "티 나지 않게": ["DISCREET"],
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
