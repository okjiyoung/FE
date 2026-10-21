"use client";

const DAYS_OF_WEEK = ["월", "화", "수", "목", "금", "토", "일"];

interface CalendarDay {
  day: number;
  level: number;
}

interface CalendarSectionProps {
  year: number;
  month: number; // 1~12
  // 날짜(일)별 스트레칭 강도(0~3). 백엔드 기록 API 연동 전까지는 비어있어서 전부 레벨 0으로 표시됨
  levelsByDay?: Record<number, number>;
}

export default function CalendarSection({
  year,
  month,
  levelsByDay = {},
}: CalendarSectionProps) {
  const getBgColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#EBE7FF] text-teum-ink font-medium";
      case 2:
        return "bg-[#BEB3FF] text-teum-ink font-medium";
      case 3:
        return "bg-[#8A79E8] text-teum-ink font-medium";
      default:
        return "text-teum-ink font-medium";
    }
  };

  const daysInMonth = new Date(year, month, 0).getDate();
  // JS getDay()는 일=0~토=6이라, 요일 헤더 순서(월~일)에 맞춰 월=0~일=6으로 보정함
  const firstWeekday = (new Date(year, month - 1, 1).getDay() + 6) % 7;

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() + 1 === month;
  const todayDate = today.getDate();

  const cells: (CalendarDay | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      level: levelsByDay[i + 1] ?? 0,
    })),
  ];

  return (
    <section className="flex flex-col gap-[12px] p-[16px] w-full bg-white rounded-[24px]">
      {/* 요일 표시 */}
      <div className="grid grid-cols-7 w-full text-center">
        {DAYS_OF_WEEK.map((day, idx) => (
          <span
            key={day}
            className={`w-[40px] text-[14px] leading-[36px] tracking-[-0.28px] font-medium text-center font-pretendard ${
              idx === 6 ? "text-[#838A95]" : "text-teum-ink"
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-[4px] justify-items-center w-full">
        {cells.map((item, idx) => (
          <div
            key={idx}
            className="w-[40px] h-[40px] flex items-center justify-center"
          >
            {item && (
              <div
                className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[14px] font-pretendard transition-colors ${getBgColor(
                  item.level,
                )} ${
                  isCurrentMonth && item.day === todayDate
                    ? "ring-2 ring-[#8A79E8]"
                    : ""
                }`}
              >
                {item.day}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 범례 (Legend) */}
      <div className="flex justify-between items-center w-full pt-[4px]">
        <span className="text-[12px] leading-[17px] tracking-[-0.24px] text-teum-ink font-normal font-pretendard">
          하루 스트레칭 시간
        </span>
        <div className="flex items-center gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="7.5" cy="7.5" r="7.5" fill="#EBE7FF" />
            </svg>
            <span className="text-[12px] leading-[17px] tracking-[-0.24px] text-teum-ink font-pretendard">
              1~5분
            </span>
          </div>

          <div className="flex items-center gap-[4px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="7.5" cy="7.5" r="7.5" fill="#BEB3FF" />
            </svg>
            <span className="text-[12px] leading-[17px] tracking-[-0.24px] text-teum-ink font-pretendard">
              5~10분
            </span>
          </div>

          <div className="flex items-center gap-[4px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="7.5" cy="7.5" r="7.5" fill="#8A79E8" />
            </svg>
            <span className="text-[12px] leading-[17px] tracking-[-0.24px] text-teum-ink font-pretendard">
              10분 이상
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
