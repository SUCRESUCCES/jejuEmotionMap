import React from 'react';

export interface ReportHeaderProps {
  startDate: string;
  endDate: string;
  tempStartDate: string;
  tempEndDate: string;
  onTempStartDateChange: (date: string) => void;
  onTempEndDateChange: (date: string) => void;
  onSearch: () => void;
}

export const ReportHeader: React.FC<ReportHeaderProps> = ({
  startDate,
  endDate,
  tempStartDate,
  tempEndDate,
  onTempStartDateChange,
  onTempEndDateChange,
  onSearch,
}) => {
  return (
    <div className="bg-white rounded-[20px] shadow-lg p-[32px]">
      <div className="flex items-center justify-between mb-[24px]">
        <div>
          <h1 className="text-[32px] font-bold text-[#263238] mb-[8px]">
            지역 분석 리포트
          </h1>
          <p className="text-[16px] text-[#78909C]">
            데이터 기간: {startDate} ~ {endDate}
          </p>
        </div>
        
        <div className="flex items-center gap-[16px]">
          <input
            type="date"
            value={tempStartDate}
            onChange={(e) => onTempStartDateChange(e.target.value)}
            className="px-[16px] py-[10px] border border-gray-300 rounded-[10px] text-[14px]"
          />
          <span className="text-gray-400">~</span>
          <input
            type="date"
            value={tempEndDate}
            onChange={(e) => onTempEndDateChange(e.target.value)}
            className="px-[16px] py-[10px] border border-gray-300 rounded-[10px] text-[14px]"
          />
          <button
            onClick={onSearch}
            className="bg-[#00BFA5] hover:bg-[#00ACC1] text-white px-[24px] py-[10px] rounded-[10px] font-medium transition-colors"
          >
            조회
          </button>
        </div>
      </div>
    </div>
  );
};
