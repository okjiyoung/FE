"use client";

import React, { useState } from "react";
import { ConnectionMainSheet } from "./ConnectionMainSheet";
import { HomeRegisterSheet } from "./HomeRegisterSheet";
import { HomeMapConfirmSheet } from "./HomeMapContirmSheet";
import { HomeAddressSearchSheet } from "./HomeaddressSearchSheet";
import { WatchConnectGuideSheet } from "./WatchConnectGuide";
import { SamsungHealthGuideSheet } from "./SamsungHealGuideSheet";
import { useBottomSheetTransition } from "@/hooks/useBottomSheetTransition";

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
  const { shouldRender, isVisible } = useBottomSheetTransition(isOpen);

  if (!shouldRender) return null;

  const handleRequestLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setStep(3),
        () => setStep(3)
      );
    } else {
      setStep(3);
    }
  };

  const handleCompleteHome = () => {
    onCompleteHome();
    setStep(1);
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
            onConfirm={handleCompleteHome}
            onCancel={() => setStep(1)}
          />
        )}
        {step === 4 && (
          <HomeAddressSearchSheet
            onRegister={handleCompleteHome}
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