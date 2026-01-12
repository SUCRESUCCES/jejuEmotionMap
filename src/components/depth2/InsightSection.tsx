import React from 'react';
import { Finding, Pattern } from '../../data/reportLoader';

interface InsightSectionProps {
  overview: {
    totalPosts: number;
    analyzedPosts: number;
    summaryText: string;
  };
  findings: Finding[];
  patterns?: Pattern[];
  additionalInsights?: {
    title: string;
    items: string[];
  }[];
}

export default function InsightSection({
  overview,
  findings,
  patterns,
  additionalInsights,
}: InsightSectionProps) {
  return (
    <div>
      {/* 헤더 */}
      <h2 className="text-[24px] font-bold flex items-center gap-[8px] text-[#455A64] mb-[20px]">
        <svg className="w-6 h-6 text-[#00BFA5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        데이터 해석 및 인사이트
      </h2>

      <div className="bg-white rounded-[16px] p-[40px] border border-[#E0E7E9] shadow-[0px_4px_20px_0px_rgba(0,188,212,0.05)]">
        {/* 전체 데이터 개관 */}
        <div className="mb-[32px]">
          <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
            전체 데이터 개관
          </h3>
          <p className="text-[14px] text-[#455A64] leading-[170%]">
            {overview.summaryText}
          </p>
        </div>

        {/* 주요 발견사항 */}
        <div className="mb-[32px]">
          <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
            주요 발견사항
          </h3>
          
          {findings.map((finding, idx) => (
            <div key={idx} className="mb-[24px]">
              <h4 className="text-[16px] font-bold text-[#374151] mb-[12px]">
                {idx + 1}. {finding.title}
              </h4>
              
              <div className="pl-[20px]">
                {finding.dataCount > 0 && (
                  <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">
                    데이터: {finding.dataCount}건의 게시글에서 {finding.title} 관련 언급
                  </p>
                )}
                {finding.context && (
                  <p className="text-[14px] text-[#455A64] leading-[170%] mb-[8px]">
                    맥락: {finding.context}
                  </p>
                )}
                <p className="text-[14px] text-[#455A64] leading-[170%] mb-[12px]">
                  해석: {finding.interpretation}
                </p>
                {finding.opinions && finding.opinions.length > 0 && (
                  <div className="mb-[12px]">
                    <p className="text-[14px] font-bold text-[#90A4AE] mb-[8px]">주민 의견:</p>
                    <div className="flex flex-col gap-[6px]">
                      {finding.opinions.map((opinion, opinionIdx) => (
                        <div key={opinionIdx} className="flex items-start gap-[8px]">
                          <span className="text-[#00BFA5] shrink-0">•</span>
                          <p className="text-[13px] text-[#6b7280] leading-[170%]">
                            "{opinion}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 관찰된 패턴 */}
        {patterns && patterns.length > 0 && (
          <div className="mb-[32px]">
            <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
              관찰된 패턴 (심층)
            </h3>
            
            {patterns.map((pattern, idx) => (
              <div key={idx} className="mb-[24px]">
                <h4 className="text-[16px] font-bold text-[#374151] mb-[12px]">
                  {pattern.title}
                </h4>
                
                <div className="pl-[20px]">
                  <p className="text-[14px] text-[#455A64] leading-[170%] mb-[8px]">
                    관찰: {pattern.observation}
                  </p>
                  <p className="text-[14px] text-[#455A64] leading-[170%]">
                    해석: {pattern.interpretation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 추가 인사이트 */}
        {additionalInsights && additionalInsights.length > 0 && (
          <div className="mt-[32px] pt-[32px] border-t border-[#E0E7E9]">
            {additionalInsights.map((insight, idx) => (
              <div key={idx} className="mb-[24px]">
                <h3 className="text-[18px] font-bold text-[#00BFA5] mb-[16px]">
                  {insight.title}
                </h3>
                <div className="pl-[20px]">
                  {insight.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-[8px] mb-[8px]">
                      <span className="text-[#00BFA5] shrink-0">→</span>
                      <p className="text-[14px] text-[#455A64] leading-[170%]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}








