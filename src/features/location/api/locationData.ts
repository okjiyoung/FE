import { apiClient } from "@/services/apiClient";

export interface LocationDataRequest {
  userId: number;
  latitude: number;
  longitude: number;
  measuredAt: string;
}

export interface LocationDataResponse {
  id: number;
  latitude: number;
  longitude: number;
  measuredAt: string;
}

export function createLocationData(request: LocationDataRequest) {
  return apiClient.post<LocationDataResponse>("/api/locationData", request);
}

export function getAllLocationData() {
  return apiClient.get<LocationDataResponse[]>("/api/locationData");
}

export function getLocationDataByUser(userId: number) {
  return apiClient.get<LocationDataResponse[]>(
    `/api/locationData/user/${userId}`
  );
}

// 응답 필드명이 정해져 있지 않아(스키마가 임의 key의 map) 실제 키는 확인 필요함
export interface AddressResponse {
  [key: string]: string;
}

export function getAddress(latitude: number, longitude: number) {
  return apiClient.get<AddressResponse>(
    `/api/locationData/address?latitude=${latitude}&longitude=${longitude}`
  );
}

export function pickDisplayAddress(address: AddressResponse): string {
  return (
    address.roadAddress ??
    address.address ??
    address.jibunAddress ??
    Object.values(address)[0] ??
    ""
  );
}
