"use client";

export interface LogItem {
  id: string;
  time: string;
  content: string;
  duration: string;
}

export default function DailyLogList({
  logs = [],
}: {
  logs?: LogItem[];
}) {
  return (
    <section className="flex flex-col gap-[12px] w-full">
      <h3 className="text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-teum-ink font-pretendard">
        오늘의 기록
      </h3>

      {logs.length === 0 && (
        <p className="text-[14px] font-medium text-teum-muted font-pretendard">
          아직 기록이 없어요
        </p>
      )}

      <div className="flex flex-col gap-[8px] w-full">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex justify-between items-center w-full p-[12px] bg-white rounded-[12px]"
          >
            <div className="flex items-center">
              <span className="w-[45px] text-[14px] font-medium leading-[30px] tracking-[-0.28px] text-gray-500 font-pretendard">
                {log.time}
              </span>
              <span className="ml-[12px] text-[14px] font-medium leading-[30px] tracking-[-0.28px] text-teum-ink font-pretendard">
                {log.content}
              </span>
            </div>
            <span className="text-[14px] font-semibold leading-[30px] tracking-[-0.28px] text-teum-purple font-pretendard">
              {log.duration}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
