import React from 'react';
import { OpinionItem } from '../../data/reportLoader';
import { AlertCircle } from 'lucide-react';

interface IssueAnalysisProps {
  positive: OpinionItem[];
  negative: OpinionItem[];
  neutral?: OpinionItem[];
  totalPositive: number;
  totalNegative: number;
  totalNeutral?: number;
}

export default function IssueAnalysis({
  positive,
  negative,
  neutral,
  totalPositive,
  totalNegative,
  totalNeutral,
}: IssueAnalysisProps) {
  return (
    <div>
      {/* 헤더 */}
      <h2 className="text-[24px] font-bold flex items-center gap-[8px] text-[#455A64] mb-[20px]">
        <AlertCircle className="w-6 h-6 text-[#00BFA5]" />
        주요 이슈 분석
      </h2>

      {/* 긍정적 의견 */}
      <div className="bg-white rounded-[16px] p-[32px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)] mb-[20px]">
        <div 
          className="text-[18px] font-bold mb-[20px] pb-[12px]"
          style={{ color: '#059669', borderBottom: '2px solid #059669' }}
        >
          긍정적 의견 ({totalPositive}건)
        </div>
        
        <div className="flex flex-col gap-[24px]">
          {positive.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-[8px] mb-[12px]">
                <h3 className="text-[16px] font-bold" style={{ color: '#059669' }}>
                  {idx + 1}. {item.category} ({item.count}건)
                </h3>
              </div>
              {item.description && (
                <p className="text-[13px] text-[#6B7280] mb-[12px] pl-[20px] leading-[170%]">
                  {item.description}
                </p>
              )}
              {item.comments && item.comments.length > 0 && (
                <div className="flex flex-col gap-[8px] pl-[20px]">
                  {item.comments.map((comment, commentIdx) => (
                    <div key={commentIdx} className="flex items-start gap-[8px]">
                      <span className="text-[#90A4AE] shrink-0">•</span>
                      <p className="text-[14px] text-[#374151] leading-[170%]">
                        "{comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 부정적 의견 */}
      <div className="bg-white rounded-[16px] p-[32px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)] mt-[20px] mb-[20px]">
        <div 
          className="text-[18px] font-bold mb-[20px] pb-[12px]"
          style={{ color: '#dc2626', borderBottom: '2px solid #dc2626' }}
        >
          부정적 의견 ({totalNegative}건)
        </div>
        
        <div className="flex flex-col gap-[24px]">
          {negative.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-[8px] mb-[12px]">
                <h3 className="text-[16px] font-bold" style={{ color: '#dc2626' }}>
                  {idx + 1}. {item.category} ({item.count}건)
                </h3>
                {item.severity && (
                  <span 
                    className="text-[12px] px-[8px] py-[2px] rounded-full font-bold"
                    style={{ 
                      backgroundColor: item.severity === 'high' || item.severity === '심각' ? '#FEE2E2' : item.severity === 'medium' || item.severity === '중간' ? '#FEF3C7' : '#E0E7FF',
                      color: item.severity === 'high' || item.severity === '심각' ? '#DC2626' : item.severity === 'medium' || item.severity === '중간' ? '#D97706' : '#6366F1'
                    }}
                  >
                    {item.severity === 'high' ? '심각' : item.severity === 'medium' ? '중간' : item.severity === 'low' ? '낮음' : item.severity}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-[13px] text-[#6B7280] mb-[12px] pl-[20px] leading-[170%]">
                  {item.description}
                </p>
              )}
              {item.comments && item.comments.length > 0 && (
                <div className="flex flex-col gap-[8px] pl-[20px]">
                  {item.comments.map((comment, commentIdx) => (
                    <div key={commentIdx} className="flex items-start gap-[8px]">
                      <span className="text-[#90A4AE] shrink-0">•</span>
                      <p className="text-[14px] text-[#374151] leading-[170%]">
                        "{comment}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 중립적 의견 (있는 경우만) */}
      {neutral && neutral.length > 0 && (
        <div className="bg-white rounded-[16px] p-[32px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)] mt-[20px]">
          <div 
            className="text-[18px] font-bold mb-[20px] pb-[12px]"
            style={{ color: '#6B7280', borderBottom: '2px solid #6B7280' }}
          >
            중립적 의견 ({totalNeutral}건)
          </div>
          
          <div className="flex flex-col gap-[24px]">
            {neutral.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <h3 className="text-[16px] font-bold" style={{ color: '#6B7280' }}>
                    {idx + 1}. {item.category} ({item.count}건)
                  </h3>
                </div>
                {item.description && (
                  <p className="text-[13px] text-[#6B7280] mb-[12px] pl-[20px] leading-[170%]">
                    {item.description}
                  </p>
                )}
                {item.comments && item.comments.length > 0 && (
                  <div className="flex flex-col gap-[8px] pl-[20px]">
                    {item.comments.map((comment, commentIdx) => (
                      <div key={commentIdx} className="flex items-start gap-[8px]">
                        <span className="text-[#90A4AE] shrink-0">•</span>
                        <p className="text-[14px] text-[#374151] leading-[170%]">
                          "{comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}








