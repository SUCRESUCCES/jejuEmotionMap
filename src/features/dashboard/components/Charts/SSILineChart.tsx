import React from 'react';
import svgPaths from '../../constants/svg-paths';

interface SSILineChartProps {
  data?: Array<{ date: string; value: number }>;
  dateRange?: { start: string; end: string };
}

export default function SSILineChart({ data, dateRange }: SSILineChartProps) {
  // 차트 데이터가 없으면 기본 차트 렌더링
  return (
    <div className="h-[140px] relative shrink-0 w-full" data-name="LineChart">
      <div className="absolute h-[140px] left-0 overflow-clip top-0 w-[360px]" data-name="is">
        {/* 차트 그리드 및 라인 */}
        <div className="absolute contents inset-[78.44%_84.31%_12.28%_9.31%]" data-name="Group">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_84.31%_12.28%_9.31%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/4</p>
        </div>
        <div className="absolute contents inset-[78.44%_72%_12.28%_21.61%]" data-name="Group">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_72%_12.28%_21.61%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/5</p>
        </div>
        <div className="absolute contents inset-[78.44%_59.7%_12.28%_33.91%]" data-name="Group">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_59.7%_12.28%_33.91%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/6</p>
        </div>
        <div className="absolute contents inset-[78.44%_47.39%_12.28%_46.22%]" data-name="Group">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_47.39%_12.28%_46.22%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/7</p>
        </div>
        <div className="absolute contents inset-[78.44%_35.78%_12.28%_57.83%]" data-name="Group">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_35.78%_12.28%_57.83%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/8</p>
        </div>
        <div className="absolute contents inset-[78.44%_24.17%_12.28%_69.44%]" data-name="Group">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_24.17%_12.28%_69.44%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/9</p>
        </div>
        <div className="absolute contents inset-[78.44%_12.56%_12.28%_81.06%]" data-name="Group">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_12.56%_12.28%_81.06%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/10</p>
        </div>
        
        {/* Y축 라벨 */}
        <div className="absolute contents inset-[0.82%_89.72%_89.89%_3.61%]">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.82%_89.72%_89.89%_3.61%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">0.6</p>
        </div>
        <div className="absolute contents inset-[49.52%_89.72%_41.19%_3.61%]">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[49.52%_89.72%_41.19%_3.61%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">0.3</p>
        </div>
        <div className="absolute contents inset-[69.93%_89.72%_20.78%_3.61%]">
          <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[69.93%_89.72%_20.78%_3.61%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">0</p>
        </div>
        
        {/* 차트 라인 */}
        <div className="absolute inset-[10.92%_0.28%_42.55%_11.39%]">
          <div className="absolute inset-[-1.54%_-0.31%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 68">
              <g id="Group">
                <path d={svgPaths.p15df6b00} id="Vector" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                <g id="Group_2">
                  <path d={svgPaths.p276bae00} fill="var(--fill-0, #00A3E0)" id="Vector_2" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                  <path d={svgPaths.p3c33ae80} fill="var(--fill-0, #00A3E0)" id="Vector_3" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                  <path d={svgPaths.p12710570} fill="var(--fill-0, #00A3E0)" id="Vector_4" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                  <path d={svgPaths.p23402480} fill="var(--fill-0, #00A3E0)" id="Vector_5" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                  <path d={svgPaths.p3cace80} fill="var(--fill-0, #00A3E0)" id="Vector_6" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                  <path d={svgPaths.p63a74c0} fill="var(--fill-0, #00A3E0)" id="Vector_7" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                  <path d={svgPaths.pdbb300} fill="var(--fill-0, #00A3E0)" id="Vector_8" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                  <path d={svgPaths.p205cb200} fill="var(--fill-0, #00A3E0)" id="Vector_9" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" />
                </g>
              </g>
            </svg>
          </div>
        </div>
        
        {/* 그리드 라인 */}
        <div className="absolute bottom-1/4 left-[12.5%] right-[87.5%] top-[3.57%]">
          <div className="absolute inset-[0_-0.5px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 100">
              <path d="M0.5 0V100" id="Vector" stroke="var(--stroke-0, #E8F4F8)" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-[12.5%] right-[1.39%] top-3/4">
          <div className="absolute inset-[-0.5px_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 310 1">
              <path d="M0 0.5H310" id="Vector" stroke="var(--stroke-0, #E8F4F8)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}


