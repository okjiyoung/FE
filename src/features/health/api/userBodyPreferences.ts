import { apiClient } from "@/services/apiClient";

export interface UserBodyPreferenceRequest {
  userId: number;
  preferenceType: string;
  bodyArea: string;
}

export interface UserBodyPreferenceResponse {
  id: number;
  preferenceType: string;
  bodyArea: string;
}

export function createUserBodyPreference(request: UserBodyPreferenceRequest) {
  return apiClient.post<UserBodyPreferenceResponse>(
    "/api/userBodyPreferences",
    request
  );
}

export function getUserBodyPreferences(userId: number) {
  return apiClient.get<UserBodyPreferenceResponse[]>(
    `/api/userBodyPreferences/${userId}`
  );
}

export function getUserBodyPreferencesByType(
  userId: number,
  preferenceType: string
) {
  return apiClient.get<UserBodyPreferenceResponse[]>(
    `/api/userBodyPreferences/${userId}/type/${preferenceType}`
  );
}

export function deleteUserBodyPreference(id: number) {
  return apiClient.delete<string>(`/api/userBodyPreferences/${id}`);
}

const PREFER_TYPE = "PREFER";

// 선택된 신체 부위를 PREFER로 동기화함.
// - 같은 (userId, bodyArea)는 preferenceType이 달라도 중복으로 처리되어 서버가 500을
//   내므로(예: AVOID로 이미 등록된 부위를 PREFER로 다시 등록하면 500), 생성 전 "모든
//   타입"의 기존 등록 여부를 확인해서 이미 다른 타입으로 등록된 부위는 건드리지 않음
//   (그 부위를 지우고 다시 만드는 건 다른 타입의 데이터를 임의로 삭제하는 것이라 하지 않음).
// - 삭제는 우리가 등록한 PREFER 항목 중 더 이상 선택되지 않은 것만 대상으로 함.
export async function syncPreferredBodyAreas(
  userId: number,
  bodyParts: string[]
): Promise<void> {
  const [preferEntries, allEntries] = await Promise.all([
    getUserBodyPreferencesByType(userId, PREFER_TYPE),
    getUserBodyPreferences(userId),
  ]);

  const selected = new Set(bodyParts);
  const toDelete = preferEntries.filter((p) => !selected.has(p.bodyArea));

  const occupiedAreas = new Set(allEntries.map((p) => p.bodyArea));
  const toCreate = bodyParts.filter((area) => !occupiedAreas.has(area));

  await Promise.all([
    ...toDelete.map((p) => deleteUserBodyPreference(p.id)),
    ...toCreate.map((area) =>
      createUserBodyPreference({
        userId,
        preferenceType: PREFER_TYPE,
        bodyArea: area,
      })
    ),
  ]);
}
