import React from 'react';
import { TrendingUp } from 'lucide-react';

export interface DataOverviewProps {
  data: {
    region_name: string;
    ssi_score: number;
    risk_level: string;
    total_posts: number;
    platform_distribution?: Array<{
      platform: string;
      count: number;
      color: string;
    }>;
  };
  startDate: string;
  endDate: string;
}

const getRiskInfo = (riskLevel: string) => {
  const riskMap: { [key: string]: { label: string; color: string; bgColor: string } } = {
    '안정': { label: '안정', color: '#2196F3', bgColor: '#E3F2FD' },
    '양호': { label: '양호', color: '#4CAF50', bgColor: '#E8F5E9' },
    '주의': { label: '주의', color: '#FF9800', bgColor: '#FFF3E0' },
    '경고': { label: '경고', color: '#F44336', bgColor: '#FFEBEE' },
    '위험': { label: '위험', color: '#B71C1C', bgColor: '#FFCDD2' },
  };
  return riskMap[riskLevel] || riskMap['양호'];
};

export const DataOverview: React.FC<DataOverviewProps> = ({ data, startDate, endDate }) => {
  const riskInfo = getRiskInfo(data.risk_level);

  return (
    <div className="bg-white rounded-[20px] shadow-lg p-[32px]">
      <div className="flex items-center gap-[12px] mb-[24px]">
        <TrendingUp className="w-[28px] h-[28px] text-[#00BFA5]" />
        <h2 className="text-[24px] font-bold text-[#455A64]">
          {data.region_name} 데이터 개요
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-[20px]">
        <div className="bg-gradient-to-br from-[#E3F2FD] to-[#BBDEFB] rounded-[16px] p-[24px]">
          <p className="text-[14px] text-[#1976D2] mb-[8px] font-medium">SSI 지수</p>
          <p className="text-[36px] font-bold text-[#0D47A1]">{data.ssi_score.toFixed(2)}</p>
        </div>

        <div className="rounded-[16px] p-[24px]" style={{ backgroundColor: riskInfo.bgColor }}>
          <p className="text-[14px] mb-[8px] font-medium" style={{ color: riskInfo.color }}>
            위험도
          </p>
          <p className="text-[36px] font-bold" style={{ color: riskInfo.color }}>
            {riskInfo.label}
          </p>
        </div>

        <div className="bg-gradient-to-br from-[#F3E5F5] to-[#E1BEE7] rounded-[16px] p-[24px]">
          <p className="text-[14px] text-[#7B1FA2] mb-[8px] font-medium">분석 게시글</p>
          <p className="text-[36px] font-bold text-[#4A148C]">{data.total_posts}건</p>
        </div>

        <div className="bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB] rounded-[16px] p-[24px]">
          <p className="text-[14px] text-[#00695C] mb-[8px] font-medium">분석 기간</p>
          <p className="text-[16px] font-bold text-[#004D40]">
            {new Date(startDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })} ~{' '}
            {new Date(endDate).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      {data.platform_distribution && data.platform_distribution.length > 0 && (
        <div className="mt-[24px]">
          <h3 className="text-[16px] font-bold text-[#455A64] mb-[16px]">플랫폼별 분포</h3>
          <div className="flex gap-[12px] flex-wrap">
            {data.platform_distribution.map((platform, idx) => (
              <div
                key={idx}
                className="flex items-center gap-[8px] bg-gray-50 rounded-[10px] px-[16px] py-[10px]"
              >
                <div
                  className="w-[12px] h-[12px] rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-[14px] text-[#37474F] font-medium">
                  {platform.platform}
                </span>
                <span className="text-[14px] text-[#78909C]">({platform.count}건)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
