"use client";

import React, { useState } from "react";
import { ConnectionMainSheet } from "./ConnectionMainSheet";
import { HomeRegisterSheet } from "./HomeRegisterSheet";
import { HomeMapConfirmSheet } from "./HomeMapContirmSheet";
import { HomeAddressSearchSheet } from "./HomeaddressSearchSheet";
import { WatchConnectGuideSheet } from "./WatchConnectGuide";
import { SamsungHealthGuideSheet } from "./SamsungHealGuideSheet";

interface ConnectionFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchConnected: () => void;
}

export function ConnectionFlowModal({
  isOpen,
  onClose,
  onWatchConnected,
}: ConnectionFlowModalProps) {
  const [step, setStep] = useState<number>(1);
  const [isHomeRegistered, setIsHomeRegistered] = useState<boolean>(false);
  const [isWatchConnected, setIsWatchConnected] = useState<boolean>(false);

  if (!isOpen) return null;

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
    setIsHomeRegistered(true);
    setStep(1);
  };

  const handleCompleteWatch = () => {
    setIsWatchConnected(true);
    setStep(1);
    onClose();
    onWatchConnected();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50">
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
      {step === 6 && (
        <WatchConnectGuideSheet onNext={() => setStep(7)} />
      )}
      {step === 7 && (
        <SamsungHealthGuideSheet onComplete={handleCompleteWatch} />
      )}
    </div>
  );
}