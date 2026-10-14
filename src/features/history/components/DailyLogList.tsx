"use client";

export interface LogItem {
  id: string;
  time: string;
  content: string;
  duration: string;
}

const MOCK_LOGS: LogItem[] = [
  { id: "1", time: "08:30", content: "출근길, 목·어깨 풀기", duration: "3분" },
  { id: "2", time: "12:40", content: "점심 후 가볍게", duration: "3분" },
  { id: "3", time: "15:10", content: "목·어깨 가볍게", duration: "3분" },
];

export default function DailyLogList({
  logs = MOCK_LOGS,
}: {
  logs?: LogItem[];
}) {
  return (
    <section className="flex flex-col gap-[12px] w-full">
      <h3 className="text-[16px] font-bold leading-[23px] tracking-[-0.32px] text-teum-ink font-pretendard">
        오늘의 기록
      </h3>

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
