"use client";

const DAYS_OF_WEEK = ["월", "화", "수", "목", "금", "토", "일"];

const CALENDAR_DAYS = [
  { day: null, level: 0 },
  { day: 1, level: 0 },
  { day: 2, level: 0 },
  { day: 3, level: 0 },
  { day: 4, level: 0 },
  { day: 5, level: 0 },
  { day: 6, level: 0 },
  { day: 7, level: 0 },
  { day: 8, level: 0 },
  { day: 9, level: 3 }, // 10분 이상 (#8A79E8)
  { day: 10, level: 1 }, // 1~5분 (#EBE7FF)
  { day: 11, level: 2 }, // 5~10분 (#BEB3FF)
  { day: 12, level: 0 },
  { day: 13, level: 0 },
  { day: 14, level: 0 },
  { day: 15, level: 0 },
  { day: 16, level: 0 },
  { day: 17, level: 0 },
  { day: 18, level: 0 },
  { day: 19, level: 0 },
  { day: 20, level: 0 },
  { day: 21, level: 0 },
  { day: 22, level: 0 },
  { day: 23, level: 0 },
  { day: 24, level: 0 },
  { day: 25, level: 0 },
  { day: 26, level: 0 },
  { day: 27, level: 0 },
  { day: 28, level: 0 },
  { day: 29, level: 0 },
  { day: 30, level: 0 },
];

export default function CalendarSection() {
  const getBgColor = (level: number) => {
    switch (level) {
      case 1:
        return "bg-[#EBE7FF] text-teum-ink font-medium";
      case 2:
        return "bg-[#BEB3FF] text-teum-ink font-medium";
      case 3:
        return "bg-[#8A79E8] text-teum-ink font-medium"; // 텍스트 색상을 검정(text-teum-ink)으로 변경
      default:
        return "text-teum-ink font-medium";
    }
  };

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
        {CALENDAR_DAYS.map((item, idx) => (
          <div
            key={idx}
            className="w-[40px] h-[40px] flex items-center justify-center"
          >
            {item.day !== null && (
              <div
                className={`w-[36px] h-[36px] rounded-full flex items-center justify-center text-[14px] font-pretendard transition-colors ${getBgColor(
                  item.level,
                )}`}
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
