import React from 'react';

export interface RegionTooltipProps {
  region: string;
  position: { left: number; top: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onNavigateToDepth2?: (region: string) => void;
}

export const RegionTooltip: React.FC<RegionTooltipProps> = ({
  region,
  position,
  onMouseEnter,
  onMouseLeave,
  onNavigateToDepth2
}) => {
  return (
    <div 
      className="absolute z-[9998]"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        transform: 'translateX(-50%)',
        zIndex: 9998
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[299px] p-[22px] pb-[26px] cursor-pointer">
        <div className="relative">
          {/* 지역명 */}
          <h3 className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[21.99px] text-black text-center mb-[14px]">
            {region}
          </h3>
          
          {/* SSI 지수와 위험도 배지 */}
          <div className="flex items-center justify-between mb-[14px]">
            <p className="font-['Inter:Bold',sans-serif] font-bold text-[28px] text-[#e34e04]">
              0.476
            </p>
            <div className="flex items-center gap-2">
              <div className="bg-[#dedede] rounded-[10px] px-3 py-1">
                <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium text-[14px] text-[#2c2c2c]">
                  직전 7일 대비 1.2% ↓
                </p>
              </div>
              <div className="bg-[#e34e04] rounded-[10px] px-3 py-1">
                <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium text-[14px] text-white">
                  경고
                </p>
              </div>
            </div>
          </div>
          
          {/* 핵심 키워드 */}
          <div className="mb-[17px]">
            <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-black mb-[11px]">
              핵심 키워드
            </p>
            <div className="flex gap-[7px]">
              <div className="bg-white rounded-[10px] px-[10px] py-[6px] border border-[#f3f3f3]">
                <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#00a3e0]">
                  #관광
                </p>
              </div>
              <div className="bg-white rounded-[10px] px-[10px] py-[6px] border border-[#f3f3f3]">
                <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#00a3e0]">
                  #물가
                </p>
              </div>
              <div className="bg-white rounded-[10px] px-[10px] py-[6px] border border-[#f3f3f3]">
                <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#00a3e0]">
                  #중국인
                </p>
              </div>
            </div>
          </div>
          
          {/* 리포트 요약 */}
          <div className="mb-[23px]">
            <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-black mb-[11px]">
              리포트 요약
            </p>
            <div className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-black leading-relaxed">
              <p className="mb-[14px]">
                '{region}' 지역에서는 관광객 증가에 따른 주차 문제, 쓰레기 문제 등 주민 불편 호소가 많았습니다.
              </p>
              <p>
                중국인 관광객이 급증하며 관광 매너가 잘 지켜지지 않는다는 언급이 많았습니다.
              </p>
            </div>
          </div>
          
          {/* 상세보기 버튼 */}
          <div 
            className="bg-[#eef8fd] border border-[#f3f3f3] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] py-[13px] text-center hover:bg-[#d9f2fd] transition-colors cursor-pointer"
            onClick={() => onNavigateToDepth2?.(region)}
          >
            <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[14px] text-[#00a3e0]">
              클릭하여 상세보기 &gt;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
