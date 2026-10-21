"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectionFlowModal } from "./ConnectionFlowModal";
import { Toast } from "@/components/ui/Toast";
import { getMyInfo } from "@/features/auth/api/user";
import { getUserProfile } from "@/features/settings/api/userProfile";
import {
  getWatchConnected,
  setWatchConnected,
} from "@/features/home/connectionPreferences";

export function ConnectionBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isHomeRegistered, setIsHomeRegistered] = useState(false);
  const [isWatchConnected, setIsWatchConnected] = useState(false);

  useEffect(() => {
    setIsWatchConnected(getWatchConnected());

    getMyInfo()
      .then((me) => getUserProfile(me.id))
      .then((profile) => {
        if (profile.homeAddress) setIsHomeRegistered(true);
      })
      .catch(() => {
        // 아직 프로필이 없는 신규 유저 등 - 미등록 상태로 유지
      });
  }, []);

  const handleCompleteWatch = () => {
    setWatchConnected(true);
    setIsWatchConnected(true);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  if (isHomeRegistered && isWatchConnected) {
    return null;
  }

  return (
    <>
      <Toast
        isVisible={showToast}
        message="워치 연결했어요!"
        subMessage="움직임이 적은 시간이 이어지면 스트레칭 알림을 보내드릴게요"
      />

      <div className="relative mt-[20px] flex w-[342px] items-center justify-between rounded-[24px] bg-[#ECE8FC] px-[20px] py-[14px]">
        <div className="flex flex-col gap-[4px] z-10">
          <span className="font-pretendard text-[14px] font-bold tracking-[-0.28px] text-teum-ink">
            연결하면 자동으로 입력돼요
          </span>
          <span className="font-pretendard text-[13px] font-medium tracking-[-0.26px] text-teum-ink">
            집 위치 · 갤럭시 워치
          </span>
        </div>

        <div className="absolute top-[27.88px] left-[154px] z-0 pointer-events-none">
          <Image
            src="/icons/watchbanner.svg"
            alt="워치 배너"
            width={105}
            height={52.5}
          />
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="relative z-10 flex cursor-pointer items-center justify-center gap-[10px] rounded-[20px] bg-[#20211F] px-[16px] py-[8px] transition-transform active:scale-95"
        >
          <span className="font-pretendard text-[14px] font-bold tracking-[-0.28px] text-[#F9F9F9]">
            연결하기
          </span>
        </button>
      </div>

      <ConnectionFlowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isHomeRegistered={isHomeRegistered}
        isWatchConnected={isWatchConnected}
        onCompleteHome={() => setIsHomeRegistered(true)}
        onCompleteWatch={handleCompleteWatch}
      />
    </>
  );
}
