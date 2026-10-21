"use client";

import React, { useState } from "react";
import { ConnectionMainSheet } from "./ConnectionMainSheet";
import { HomeRegisterSheet } from "./HomeRegisterSheet";
import { HomeMapConfirmSheet } from "./HomeMapContirmSheet";
import { HomeAddressSearchSheet } from "./HomeaddressSearchSheet";
import { WatchConnectGuideSheet } from "./WatchConnectGuide";
import { SamsungHealthGuideSheet } from "./SamsungHealGuideSheet";
import { useBottomSheetTransition } from "@/hooks/useBottomSheetTransition";
import { getMyInfo } from "@/features/auth/api/user";
import {
  getUserProfile,
  updateUserProfile,
} from "@/features/settings/api/userProfile";

interface ConnectionFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  isHomeRegistered: boolean;
  isWatchConnected: boolean;
  onCompleteHome: () => void;
  onCompleteWatch: () => void;
}

export function ConnectionFlowModal({
  isOpen,
  onClose,
  isHomeRegistered,
  isWatchConnected,
  onCompleteHome,
  onCompleteWatch,
}: ConnectionFlowModalProps) {
  const [step, setStep] = useState<number>(1);
  const [homeCoords, setHomeCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isSavingHome, setIsSavingHome] = useState(false);
  const { shouldRender, isVisible } = useBottomSheetTransition(isOpen);

  if (!shouldRender) return null;

  const handleRequestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setHomeCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setStep(3);
        },
        () => setStep(3)
      );
    } else {
      setStep(3);
    }
  };

  const handleCompleteHome = (address?: string) => {
    if (isSavingHome) return;
    setIsSavingHome(true);

    getMyInfo()
      .then((me) =>
        getUserProfile(me.id).then((profile) =>
          updateUserProfile(me.id, {
            userId: me.id,
            email: profile.email,
            nickname: profile.nickname,
            homeAddress: address,
            homeLatitude: homeCoords?.latitude,
            homeLongitude: homeCoords?.longitude,
          })
        )
      )
      .catch(() => {
        // 저장 실패해도 집 등록 단계는 완료된 것으로 처리함 (연결 플로우는 로컬 UX 우선)
      })
      .finally(() => {
        setIsSavingHome(false);
        onCompleteHome();
        setStep(1);
      });
  };

  const handleCompleteWatch = () => {
    onCompleteWatch();
    setStep(1);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`relative z-10 flex w-full justify-center transition-transform duration-300 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {step === 1 && (
          <ConnectionMainSheet
            isHomeRegistered={isHomeRegistered}
            isWatchConnected={isWatchConnected}
            onOpenHomeStep={() => !isHomeRegistered && setStep(2)}
            onOpenWatchStep={() => !isWatchConnected && setStep(6)}
          />
        )}
        {step === 2 && (
          <HomeRegisterSheet
            onCurrentLocation={handleRequestLocation}
            onManualInput={() => setStep(4)}
          />
        )}
        {step === 3 && (
          <HomeMapConfirmSheet
            latitude={homeCoords?.latitude ?? null}
            longitude={homeCoords?.longitude ?? null}
            onConfirm={(address) => handleCompleteHome(address)}
            onCancel={() => setStep(1)}
          />
        )}
        {step === 4 && (
          <HomeAddressSearchSheet
            onRegister={() => handleCompleteHome()}
            onCancel={() => setStep(1)}
          />
        )}
        {step === 6 && <WatchConnectGuideSheet onNext={() => setStep(7)} />}
        {step === 7 && (
          <SamsungHealthGuideSheet onComplete={handleCompleteWatch} />
        )}
      </div>
    </div>
  );
}