import React from 'react';
import svgPaths from '../../../../shared/utils/svg-5fq1vtsmqv';

interface ChartCardProps {
  title: string;
  region: string;
  ssi: string;
  change: string;
  chartData?: number[];
  position: {
    left: number;
    top: number;
  };
  onNavigateToDepth2?: (region: string) => void;
  dateRange?: { start: string; end: string };
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage>
      <path d={svgPaths.pa1bcac0} id="Vector" stroke="var(--stroke-0, #0F9166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p2f7f3780} id="Vector_2" stroke="var(--stroke-0, #0F9166)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function TextBackgroundImageAndText({ text }: { text: string }) {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[#0f9166] text-[14px] text-nowrap top-0 tracking-[-0.1504px]">{text}</p>
      </div>
    </div>
  );
}

function ContainerBackgroundImageAndText({ text }: { text: string }) {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[94.711px]">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-0 not-italic text-[#e34e04] text-[36px] text-nowrap top-[0.5px] tracking-[0.3691px]">{text}</p>
    </div>
  );
}

// LineChart 컴포넌트 - 실제 데이터를 받아서 렌더링
function LineChart({ chartData, dateRange }: { chartData?: number[]; dateRange?: { start: string; end: string } }) {
  // 차트 데이터가 없으면 기본 SVG 렌더링
  if (!chartData || chartData.length === 0) {
    return (
      <div className="h-[140px] relative shrink-0 w-full" data-name="LineChart">
        <div className="absolute h-[140px] left-0 overflow-clip top-0 w-[360px]" data-name="is">
          {/* 기본 그리드만 표시 */}
          <div className="absolute bottom-[12.28%] contents left-[9.31%] right-[-0.05%] top-3/4" data-name="Group">
            <div className="absolute bottom-1/4 left-[12.5%] right-[1.39%] top-3/4">
              <div className="absolute inset-[-0.5px_0]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 310 1">
                  <path d="M0 0.5H310" id="Vector" stroke="var(--stroke-0, #E8F4F8)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute contents inset-[0.82%_87.5%_20.78%_3.61%]" data-name="Group">
            <div className="absolute bottom-1/4 left-[12.5%] right-[87.5%] top-[3.57%]">
              <div className="absolute inset-[0_-0.5px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 100">
                  <path d="M0.5 0V100" id="Vector" stroke="var(--stroke-0, #E8F4F8)" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute inset-[10.92%_0.28%_42.55%_11.39%] flex items-center justify-center">
            <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#7f8c8d]">데이터 없음</p>
          </div>
        </div>
      </div>
    );
  }

  // 날짜 레이블 생성 (dateRange 기반, 항상 7개)
  const dateLabels = (() => {
    if (!dateRange || !dateRange.start || !dateRange.end) {
      // dateRange가 없으면 기본 동작 (현재 날짜 기준, 최대 7개)
      const numLabels = Math.min(chartData.length, 7);
      return Array.from({ length: numLabels }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (numLabels - 1 - index));
        return `${date.getMonth() + 1}/${date.getDate()}`;
      });
    }
    
    // dateRange 기반으로 날짜 생성 (항상 7개)
    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);
    const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const numLabels = 7;
    
    return Array.from({ length: numLabels }, (_, index) => {
      const date = new Date(startDate);
      if (numLabels > 1) {
        // 시작일부터 종료일까지 균등하게 분배
        date.setDate(date.getDate() + Math.round((daysDiff / (numLabels - 1)) * index));
      }
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });
  })();

  // 차트 데이터를 날짜 레이블 개수에 맞춰 샘플링 (7개)
  const numDataPoints = dateLabels.length;
  const sampledChartData = (() => {
    if (chartData.length <= numDataPoints) {
      return chartData;
    }
    // 원본 데이터에서 균등하게 샘플링
    return Array.from({ length: numDataPoints }, (_, index) => {
      const ratio = numDataPoints > 1 ? index / (numDataPoints - 1) : 0;
      const sourceIndex = Math.round(ratio * (chartData.length - 1));
      return chartData[sourceIndex];
    });
  })();

  // ===== 동적 Y축 스케일 계산 =====
  
  // 1. 실제 데이터의 최소/최대값 계산
  const dataMin = Math.min(...sampledChartData);
  const dataMax = Math.max(...sampledChartData);
  const dataRange = dataMax - dataMin;
  
  // 2. Y축 범위 결정 (데이터 기반 + 여유 공간)
  let yAxisMin: number;
  let yAxisMax: number;
  
  if (dataRange < 0.05) {
    // 변화가 매우 작은 경우 (예: 0.520 ~ 0.530)
    // 평균값 기준 ±0.05 범위 표시
    const dataMean = (dataMin + dataMax) / 2;
    yAxisMin = Math.max(0, dataMean - 0.05);
    yAxisMax = Math.min(1, dataMean + 0.05);
  } else if (dataRange < 0.1) {
    // 변화가 작은 경우 (예: 0.500 ~ 0.580)
    // 데이터 범위의 20% 여유 공간 추가
    const padding = dataRange * 0.2;
    yAxisMin = Math.max(0, dataMin - padding);
    yAxisMax = Math.min(1, dataMax + padding);
  } else {
    // 변화가 큰 경우
    // 데이터 범위의 10% 여유 공간 추가
    const padding = dataRange * 0.1;
    yAxisMin = Math.max(0, dataMin - padding);
    yAxisMax = Math.min(1, dataMax + padding);
  }
  
  // Y축 범위가 너무 좁으면 최소 0.1 범위 보장
  if (yAxisMax - yAxisMin < 0.1) {
    const center = (yAxisMin + yAxisMax) / 2;
    yAxisMin = Math.max(0, center - 0.05);
    yAxisMax = Math.min(1, center + 0.05);
  }
  
  const yAxisRange = yAxisMax - yAxisMin;
  
  // 3. 정규화 (동적 스케일 적용)
  const normalizedData = sampledChartData.map(val => {
    return (val - yAxisMin) / yAxisRange;
  });

  // 4. Y축 레이블 계산 (4개: 최소, 1/3, 2/3, 최대)
  const yAxisLabels = [
    yAxisMax.toFixed(3),                           // 상단 (최대)
    ((yAxisMin + yAxisRange * 2/3)).toFixed(3),    // 상위 2/3
    ((yAxisMin + yAxisRange * 1/3)).toFixed(3),    // 하위 1/3
    yAxisMin.toFixed(3),                           // 하단 (최소)
  ];

  // 차트 높이와 너비
  const chartHeight = 68;
  const chartWidth = 320;
  const padding = 20;
  const plotHeight = chartHeight - padding * 2;
  const plotWidth = chartWidth - padding * 2;

  // 점 좌표 계산 (7개 포인트)
  const points = normalizedData.map((val, index) => {
    const x = padding + (index / (normalizedData.length - 1 || 1)) * plotWidth;
    const y = padding + (1 - val) * plotHeight;
    return { x, y };
  });

  // 라인 경로 생성
  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="h-[140px] relative shrink-0 w-full" data-name="LineChart">
      <div className="absolute h-[140px] left-0 overflow-clip top-0 w-[360px]" data-name="is">
        {/* 차트 그리드 및 라인 - 기존 Group8, Group11, GroupBackgroundImage 구조 */}
        <div className="absolute bottom-[12.28%] contents left-[9.31%] right-[-0.05%] top-3/4" data-name="Group">
          <div className="absolute bottom-1/4 left-[12.5%] right-[1.39%] top-3/4">
            <div className="absolute inset-[-0.5px_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 310 1">
                <path d="M0 0.5H310" id="Vector" stroke="var(--stroke-0, #E8F4F8)" />
              </svg>
            </div>
          </div>
          <div className="absolute contents inset-[78.44%_-0.05%_12.28%_9.31%]" data-name="Group">
            {dateLabels.map((label, index) => {
              // 각 날짜 레이블의 위치를 동적으로 계산
              // 전체 너비를 레이블 개수에 맞춰 균등 분배
              const numLabels = dateLabels.length;
              if (numLabels === 0) return null;
              
              // 시작 위치와 끝 위치 (기존 디자인 기준)
              const startLeft = 9.31;
              const endLeft = 92.83;
              const startRight = 84.31;
              const endRight = -0.05;
              
              // 각 레이블의 위치 계산
              const ratio = numLabels > 1 ? index / (numLabels - 1) : 0;
              const left = `${startLeft + (endLeft - startLeft) * ratio}%`;
              const right = `${startRight - (startRight - endRight) * ratio}%`;
              
              return (
                <div key={index} className="absolute contents" style={{ top: '78.44%', bottom: '12.28%', left, right }} data-name="Group">
                  <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap" style={{ top: '78.44%', bottom: '12.28%', left, right }}>{label}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute contents inset-[0.82%_87.5%_20.78%_3.61%]" data-name="Group">
          <div className="absolute bottom-1/4 left-[12.5%] right-[87.5%] top-[3.57%]">
            <div className="absolute inset-[0_-0.5px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1 100">
                <path d="M0.5 0V100" id="Vector" stroke="var(--stroke-0, #E8F4F8)" />
              </svg>
            </div>
          </div>
          <div className="absolute contents inset-[0.82%_89.72%_20.78%_3.61%]" data-name="Group">
            {/* 최대값 (상단) */}
            <div className="absolute contents inset-[0.82%_89.72%_89.89%_3.61%]">
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.82%_89.72%_89.89%_3.61%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">{yAxisLabels[0]}</p>
            </div>
            {/* 2/3 지점 */}
            <div className="absolute contents inset-[29.12%_89.72%_61.6%_5.56%]" data-name="Group">
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[29.12%_89.72%_61.6%_5.56%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">{yAxisLabels[1]}</p>
            </div>
            {/* 1/3 지점 */}
            <div className="absolute contents inset-[49.52%_89.72%_41.19%_3.61%]">
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[49.52%_89.72%_41.19%_3.61%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">{yAxisLabels[2]}</p>
            </div>
            {/* 최소값 (하단) */}
            <div className="absolute contents inset-[69.93%_89.72%_20.78%_3.61%]">
              <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[69.93%_89.72%_20.78%_3.61%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">{yAxisLabels[3]}</p>
            </div>
          </div>
        </div>
        {/* 실제 차트 라인 */}
        <div className="absolute inset-[10.92%_0.28%_42.55%_11.39%]">
          <div className="absolute inset-[-1.54%_-0.31%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
              <g id="Group">
                <path d={pathData} id="Vector" stroke="var(--stroke-0, #00A3E0)" strokeWidth="2" fill="none" />
                {/* 데이터 포인트 */}
                {points.map((point, index) => (
                  <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="var(--fill-0, #00A3E0)"
                    stroke="var(--stroke-0, #00A3E0)"
                    strokeWidth="2"
                  />
                ))}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChartCard({
  title,
  region,
  ssi,
  change,
  chartData,
  position,
  onNavigateToDepth2,
  dateRange,
}: ChartCardProps) {
  // 리포트 링크 텍스트 결정 (제주도는 "리포트 바로가기", 나머지는 "리포트 확인하기" 또는 "리포트 자세히 보기")
  const reportLinkText = region === "제주도" ? "리포트 바로가기 >" : region === "제주시" ? "리포트 바로가기 >" : "리포트 바로가기 >";

  return (
    <div
      className="absolute backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col gap-[16px] h-[268px] items-start pb-0 pt-[20px] px-[20px] rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] w-[400px]"
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
      data-name="hP"
    >
      {/* 헤더 영역 */}
      <div className="content-stretch flex flex-col gap-[12px] h-[72px] items-start relative shrink-0 w-full" data-name="Container">
        <div className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold h-[24px] leading-[24px] not-italic relative shrink-0 text-[#2c3e50] text-[16px] text-nowrap tracking-[-0.3125px] w-full" data-name="Heading 3">
          <p className="absolute left-0 top-[-0.5px]">{title}</p>
          <p
            className="absolute left-[360px] text-right top-0 translate-x-[-100%] cursor-pointer hover:text-[#00a3e0] transition-colors"
            onClick={() => onNavigateToDepth2?.(region)}
          >{reportLinkText}</p>
        </div>
        <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
          <ContainerBackgroundImageAndText text={ssi} />
        </div>
      </div>
      <LineChart chartData={chartData} dateRange={dateRange} />
    </div>
  );
}
