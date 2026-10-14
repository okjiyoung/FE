"use client";

import { TermsItem } from "./TermsItem";

export interface TermsState {
  service: boolean;
  privacy: boolean;
  age: boolean;
  marketing: boolean;
}

interface TermsAgreementListProps {
  terms: TermsState;
  onToggleAll: () => void;
  onToggleItem: (key: keyof TermsState) => void;
  isAllChecked: boolean;
}

export function TermsAgreementList({
  terms,
  onToggleAll,
  onToggleItem,
  isAllChecked,
}: TermsAgreementListProps) {
  return (
    <div className="inline-flex flex-col items-start justify-center gap-[22px] w-full">
      {/* 전체 동의 */}
      <TermsItem
        label="전체 동의"
        checked={isAllChecked}
        onToggle={onToggleAll}
        showArrow={false}
      />

      <div className="h-[1.2px] w-[254px] bg-[#ECEEF0]" />

      <TermsItem
        label="[필수] 서비스 이용약관 동의"
        checked={terms.service}
        onToggle={() => onToggleItem("service")}
        onDetailClick={() => {}}
      />
      <TermsItem
        label="[필수] 개인정보 처리방침 동의"
        checked={terms.privacy}
        onToggle={() => onToggleItem("privacy")}
        onDetailClick={() => {}}
      />
      <TermsItem
        label="[필수] 만 14세 이상입니다"
        checked={terms.age}
        onToggle={() => onToggleItem("age")}
        onDetailClick={() => {}}
      />
      <TermsItem
        label="[선택] 마케팅 정보 수신 동의"
        checked={terms.marketing}
        onToggle={() => onToggleItem("marketing")}
        onDetailClick={() => {}}
      />
    </div>
  );
}
