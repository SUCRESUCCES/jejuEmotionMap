import React from 'react';
import svgPaths from '../../../../shared/utils/svg-5fq1vtsmqv';

interface WeatherDisplayProps {
  temperature: string;
  time: string;
  date: string;
}

function Text1({ time }: { time: string }) {
  return (
    <div className="h-[24.506px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24.506px] left-[97.5px] not-italic text-[#7f8c8d] text-[16.337px] text-nowrap text-right top-0 tracking-[-0.1755px] translate-x-[-100%]">{time}</p>
    </div>
  );
}

function Container11({ date }: { date: string }) {
  return (
    <div className="h-[24.506px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24.506px] left-[99.14px] not-italic text-[#7f8c8d] text-[16.337px] text-nowrap text-right top-0 tracking-[-0.1755px] translate-x-[-100%]">{date}</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[23.339px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p308f300} id="Vector" stroke="var(--stroke-0, #00A3E0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.94491" />
        </g>
      </svg>
    </div>
  );
}

function Text2({ temperature }: { temperature: string }) {
  return (
    <div className="h-[28.007px] relative shrink-0 w-[32.62px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28.007px] left-[33px] not-italic text-[#2c3e50] text-[18.671px] text-nowrap text-right top-[-0.58px] tracking-[-0.3647px] translate-x-[-100%]">{temperature}</p>
      </div>
    </div>
  );
}

function Container12({ temperature }: { temperature: string }) {
  return (
    <div className="content-stretch flex gap-[9.336px] h-[28.007px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <Text2 temperature={temperature} />
    </div>
  );
}

export default function WeatherDisplay({
  temperature,
  time,
  date,
}: WeatherDisplayProps) {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4.668px] h-[86.354px] items-start left-[1561px] top-[48px] w-[97.859px]" data-name="Container">
      <Text1 time={time} />
      <Container11 date={date} />
      <Container12 temperature={temperature} />
    </div>
  );
}
