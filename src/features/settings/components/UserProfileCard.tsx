interface UserProfileCardProps {
  nickname: string;
  email: string;
}

export function UserProfileCard({ nickname, email }: UserProfileCardProps) {
  return (
    <div className="flex w-full flex-col items-start gap-[8px] rounded-[24px] bg-[#ECEEF0] p-[24px]">
      <h2 className="text-[24px] font-bold leading-[35px] tracking-[-0.48px] text-teum-ink">
        {nickname}님
      </h2>
      <p className="text-[13px] font-normal leading-[19px] tracking-[-0.26px] text-teum-ink">
        {email}
      </p>
    </div>
  );
}
