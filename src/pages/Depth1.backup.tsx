import svgPaths from "./svg-5fq1vtsmqv";
import imgVector from "figma:asset/6f45711041117bd80b7104f70704abeee8a37bec.png";
import React, { useState } from "react";
// 새로운 리팩토링된 컴포넌트들
import DateRangePicker from '../components/depth1/Header/DateRangePicker';
import ChartCard from '../components/depth1/Charts/ChartCard';
import WeatherDisplay from '../components/depth1/WeatherInfo/WeatherDisplay';

function UdoHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_우도면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_우도면" />
    </div>
  );
}

function ChujaHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_추자면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_추자면" />
    </div>
  );
}

function SeongsanHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_성산읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none h-[141.246px] rotate-[25.665deg] w-[89px]">
          <div className="relative size-full" data-name="박스_성산읍">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 142">
              <path d="M0 0H89V141.246H0V0Z" fill="var(--fill-0, #D9D9D9)" fillOpacity="0" id="ë°ì¤_ì±ì°ì" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function PyoseonHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_표선면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none h-[125px] rotate-[332.567deg] w-[89px]">
          <div className="relative size-full" data-name="박스_표선면">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 125">
              <path d="M0 0H89V125H0V0Z" fill="var(--fill-0, #D9D9D9)" fillOpacity="0" id="ë°ì¤_íì ë©´" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function NamwonHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_남원읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 147 125">
        <path d="M0 0H147V125H0V0Z" fill="var(--fill-0, #D9D9D9)" fillOpacity="0" id="ë°ì¤_ë¨ìì" />
      </svg>
    </div>
  );
}

function SeogwipoHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_서귀포시" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_서귀포시" />
    </div>
  );
}

function JungmunHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_중문" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_중문" />
    </div>
  );
}

function AndeokHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_안덕면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_안덕면" />
    </div>
  );
}

function DaejeongHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_대정읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_대정읍" />
    </div>
  );
}

function HangyeongHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_한경면" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_한경면" />
    </div>
  );
}

function HallimHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_한림읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_한림읍" />
    </div>
  );
}

function AewolHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_애월읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_애월읍" />
    </div>
  );
}

function JejuCityHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_제주시" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_제주시" />
    </div>
  );
}

function JocheonHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_조천읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_조천읍" />
    </div>
  );
}

function GujwaHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return (
    <div className={className} data-name="박스_구좌읍" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name="박스_구좌읍" />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute contents inset-[78.44%_59.15%_12.28%_33.08%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_59.15%_12.28%_33.08%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/14</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[78.44%_46.71%_12.28%_45.52%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_46.71%_12.28%_45.52%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/15</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[78.44%_34.54%_12.28%_57.68%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_34.54%_12.28%_57.68%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/16</p>
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents inset-[78.44%_22.24%_12.28%_69.98%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_22.24%_12.28%_69.98%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/17</p>
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[78.44%_-0.33%_12.28%_92.55%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_-0.33%_12.28%_92.55%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/19</p>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[78.44%_-0.33%_12.28%_8.47%]" data-name="Group">
      <Group12 />
      <GroupBackgroundImageAndText4 text="12/13" />
      <Group13 />
      <Group14 />
      <Group15 />
      <Group16 />
      <GroupBackgroundImageAndText text="12/18" />
      <Group17 />
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute bottom-[12.28%] contents left-[8.47%] right-[-0.33%] top-3/4" data-name="Group">
      <VectorBackgroundImage />
      <Group18 />
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[69.93%_89.72%_20.78%_3.89%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[69.93%_89.72%_20.78%_3.89%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">0.47</p>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[29.12%_89.72%_61.6%_3.89%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[29.12%_89.72%_61.6%_3.89%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">0.52</p>
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[0.82%_89.72%_20.78%_3.61%]" data-name="Group">
      <Group20 />
      <GroupBackgroundImageAndText2 text="0.49" />
      <Group21 />
      <GroupBackgroundImageAndText3 text="0.54" />
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[0.82%_87.5%_20.78%_3.61%]" data-name="Group">
      <VectorBackgroundImage1 />
      <Group22 />
    </div>
  );
}

function Is1() {
  return (
    <div className="absolute h-[140px] left-0 overflow-clip top-0 w-[360px]" data-name="is">
      <Group19 />
      <Group23 />
      <GroupBackgroundImage />
    </div>
  );
}

function LineChart1() {
  return (
    <div className="h-[140px] relative shrink-0 w-full" data-name="LineChart">
      <Is1 />
    </div>
  );
}

function HP1({ onNavigateToDepth2 }: { onNavigateToDepth2?: (region: string) => void }) {
  return (
    <div className="absolute backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col gap-[16px] h-[268px] items-start left-[1260px] pb-0 pt-[20px] px-[20px] rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[461px] w-[400px]" data-name="hP">
      <Container7 onNavigateToDepth2={onNavigateToDepth2} />
      <LineChart1 />
    </div>
  );
}

function Heading2({ onNavigateToDepth2 }: { onNavigateToDepth2?: (region: string) => void }) {
  return (
    <div className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold h-[24px] leading-[24px] not-italic relative shrink-0 text-[#2c3e50] text-[16px] text-nowrap tracking-[-0.3125px] w-full" data-name="Heading 3">
      <p className="absolute left-0 top-[-0.5px]">서귀포시 SSI 추이</p>
      <p 
        className="absolute left-[360px] text-right top-0 translate-x-[-100%] cursor-pointer hover:text-[#00a3e0] transition-colors" 
        onClick={() => onNavigateToDepth2?.("서귀포시")}
      >{`리포트 자세히 보기 >`}</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#e8f5e9] content-stretch flex gap-[4px] h-[29px] items-center left-[117px] px-[8px] py-0 rounded-[8px] top-[7px] w-[69.125px]" data-name="Container">
      <IconBackgroundImage />
      <TextBackgroundImageAndText text="2.8%" />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <ContainerBackgroundImageAndText text="0.490" />
      <Container8 />
    </div>
  );
}

function Container10({ onNavigateToDepth2 }: { onNavigateToDepth2?: (region: string) => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[72px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 onNavigateToDepth2={onNavigateToDepth2} />
      <Container9 />
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[78.44%_83.47%_12.28%_8.19%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_83.47%_12.28%_8.19%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/20</p>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[78.44%_58.87%_12.28%_32.8%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_58.87%_12.28%_32.8%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/22</p>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[78.44%_46.43%_12.28%_45.24%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_46.43%_12.28%_45.24%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/23</p>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[78.44%_34.27%_12.28%_57.4%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_34.27%_12.28%_57.4%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/24</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[78.44%_21.96%_12.28%_69.7%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_21.96%_12.28%_69.7%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/25</p>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[78.44%_9.52%_12.28%_82.14%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_9.52%_12.28%_82.14%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/26</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[78.44%_-0.61%_12.28%_92.55%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[78.44%_-0.61%_12.28%_92.55%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-center text-nowrap">12/27</p>
    </div>
  );
}

function Group31() {
  return (
    <div className="absolute contents inset-[78.44%_-0.61%_12.28%_8.19%]" data-name="Group">
      <Group24 />
      <GroupBackgroundImageAndText4 text="12/21" />
      <Group25 />
      <Group26 />
      <Group27 />
      <Group28 />
      <Group29 />
      <Group30 />
    </div>
  );
}

function Group32() {
  return (
    <div className="absolute bottom-[12.28%] contents left-[8.19%] right-[-0.61%] top-3/4" data-name="Group">
      <VectorBackgroundImage />
      <Group31 />
    </div>
  );
}

function Group33() {
  return (
    <div className="absolute contents inset-[29.12%_89.72%_61.6%_4.17%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[29.12%_89.72%_61.6%_4.17%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">0.51</p>
    </div>
  );
}

function Group34() {
  return (
    <div className="absolute contents inset-[0.82%_89.72%_89.89%_3.89%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[0.82%_89.72%_89.89%_3.89%] leading-[normal] not-italic text-[#7f8c8d] text-[11px] text-nowrap text-right">0.55</p>
    </div>
  );
}

function Group35() {
  return (
    <div className="absolute contents inset-[0.82%_89.72%_20.78%_3.61%]" data-name="Group">
      <GroupBackgroundImageAndText1 text="0.48" />
      <GroupBackgroundImageAndText2 text="0.49" />
      <Group33 />
      <Group34 />
    </div>
  );
}

function Group36() {
  return (
    <div className="absolute contents inset-[0.82%_87.5%_20.78%_3.61%]" data-name="Group">
      <VectorBackgroundImage1 />
      <Group35 />
    </div>
  );
}

function Is2() {
  return (
    <div className="absolute h-[140px] left-0 overflow-clip top-0 w-[360px]" data-name="is">
      <Group32 />
      <Group36 />
      <GroupBackgroundImage />
    </div>
  );
}

function LineChart2() {
  return (
    <div className="h-[140px] relative shrink-0 w-full" data-name="LineChart">
      <Is2 />
    </div>
  );
}

function HP2({ onNavigateToDepth2 }: { onNavigateToDepth2?: (region: string) => void }) {
  return (
    <div className="absolute backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] content-stretch flex flex-col gap-[16px] h-[268px] items-start left-[1260px] pb-0 pt-[20px] px-[20px] rounded-[20px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[760px] w-[400px]" data-name="hP">
      <Container10 onNavigateToDepth2={onNavigateToDepth2} />
      <LineChart2 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24.506px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[24.506px] left-[97.5px] not-italic text-[#7f8c8d] text-[16.337px] text-nowrap text-right top-0 tracking-[-0.1755px] translate-x-[-100%]">21시 37분 4초</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[24.506px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24.506px] left-[99.14px] not-italic text-[#7f8c8d] text-[16.337px] text-nowrap text-right top-0 tracking-[-0.1755px] translate-x-[-100%]">2025-12-15</p>
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

function Text2() {
  return (
    <div className="h-[28.007px] relative shrink-0 w-[32.62px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28.007px] left-[33px] not-italic text-[#2c3e50] text-[18.671px] text-nowrap text-right top-[-0.58px] tracking-[-0.3647px] translate-x-[-100%]">5°C</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[9.336px] h-[28.007px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Icon1 />
      <Text2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4.668px] h-[86.354px] items-start left-[1561px] top-[48px] w-[97.859px]" data-name="Container">
      <Text1 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function UdoPolygon() {
  return (
    <div className="absolute inset-[42.02%_67.84%_0_0]" data-name="우도">
      <div className="absolute inset-[-42.7%_-61.15%_-42.7%_-58.72%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 87">
          <g id="ì°ë">
            <g filter="url(#filter0_ddiiif_34_484)" id="ì°ë_2">
              <path d={svgPaths.p1298d680} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1298d680} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="86.8359" id="filter0_ddiiif_34_484" width="74.8909" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_484" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_484" mode="normal" result="effect2_dropShadow_34_484" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_484" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_484" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_484" mode="normal" result="effect4_innerShadow_34_484" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_484" mode="normal" result="effect5_innerShadow_34_484" />
              <feGaussianBlur result="effect6_foregroundBlur_34_484" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function UdoRegion() {
  return (
    <div className="absolute h-[80.785px] left-[971.49px] top-[59px] w-[105.9px]" data-name="우도면">
      <UdoPolygon />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[0_8.5%_80.19%_32.96%] leading-[normal] not-italic text-[21.992px] text-black text-center">우도면</p>
      <div className="absolute bg-[#0f9166] inset-[66.84%_18.89%_4.69%_44.29%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[70.56%_25.5%_9.64%_49.95%] leading-[normal] not-italic text-[14px] text-center text-white">안정</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[32.18%_0_33.16%_26.35%] leading-[normal] not-italic text-[#0f9166] text-[21.992px] text-center">0.315</p>
    </div>
  );
}

function DaejeongMainPolygon() {
  return (
    <div className="absolute inset-[0_0_39.75%_0]" data-name="대정읍">
      <div className="absolute inset-[-12.33%_-12.42%_-11.84%_-12.42%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 202 210">
          <g id="ëì ì">
            <g filter="url(#filter0_ddiiif_34_487)" id="ëì ì_2">
              <path d={svgPaths.p2af11500} fill="var(--fill-0, #FEE5A1)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p2af11500} stroke="var(--stroke-0, #B56B0A)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="209.722" id="filter0_ddiiif_34_487" width="201.087" x="0" y="-9.53674e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_487" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_487" mode="normal" result="effect2_dropShadow_34_487" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_487" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_487" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_487" mode="normal" result="effect4_innerShadow_34_487" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_487" mode="normal" result="effect5_innerShadow_34_487" />
              <feGaussianBlur result="effect6_foregroundBlur_34_487" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function GapadoPolygon() {
  return (
    <div className="absolute inset-[72.91%_12.78%_20.76%_75.33%]" data-name="가파도">
      <div className="absolute inset-[-112.73%_-104.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 58">
          <g id="ê°íë">
            <g filter="url(#filter0_ddiiif_34_511)" id="ê°íë_2">
              <path d={svgPaths.p44a4ab0} fill="var(--fill-0, #FEE5A1)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p44a4ab0} stroke="var(--stroke-0, #B56B0A)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="57.7409" id="filter0_ddiiif_34_511" width="59.1602" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_511" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_511" mode="normal" result="effect2_dropShadow_34_511" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_511" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_511" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_511" mode="normal" result="effect4_innerShadow_34_511" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_511" mode="normal" result="effect5_innerShadow_34_511" />
              <feGaussianBlur result="effect6_foregroundBlur_34_511" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function MaradoPolygon() {
  return (
    <div className="absolute inset-[94.18%_21.15%_0_76.65%]" data-name="마라도">
      <div className="absolute inset-[-127.61%_-563.67%_-122.54%_-563.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 58">
          <g id="ë§ë¼ë">
            <g filter="url(#filter0_ddiiif_34_492)" id="ë§ë¼ë_2">
              <path d={svgPaths.p3ac43b00} fill="var(--fill-0, #FEE5A1)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p3ac43b00} stroke="var(--stroke-0, #B56B0A)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="57.15" id="filter0_ddiiif_34_492" width="43.5482" x="0" y="-9.53674e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_492" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_492" mode="normal" result="effect2_dropShadow_34_492" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_492" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_492" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_492" mode="normal" result="effect4_innerShadow_34_492" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_492" mode="normal" result="effect5_innerShadow_34_492" />
              <feGaussianBlur result="effect6_foregroundBlur_34_492" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function DaejeongRegion() {
  return (
    <div className="absolute h-[280.306px] left-[38.32px] top-[408.03px] w-[161.087px]" data-name="대정읍">
      <DaejeongMainPolygon />
      <GapadoPolygon />
      <MaradoPolygon />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[16.4%_12.43%_74.32%_37.29%] leading-[normal] not-italic text-[21.992px] text-black text-center">대정읍</p>
      <div className="absolute bg-[#dc7d00] inset-[35.31%_18.63%_56.49%_57.16%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[36.38%_22.98%_57.91%_60.88%] leading-[normal] not-italic text-[14px] text-center text-white">주의</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[26.03%_12.43%_63.98%_39.15%] leading-[normal] not-italic text-[#dc7d00] text-[21.992px] text-center">0.411</p>
    </div>
  );
}

function SeongsanRegion() {
  return (
    <div className="absolute h-[205.794px] left-[812.53px] top-[156.11px] w-[173.151px]" data-name="성산읍">
      <div className="absolute inset-[-9.72%_-11.55%_-10.12%_-11.55%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 214 247">
          <g id="ì±ì°ì">
            <g filter="url(#filter0_ddiiif_34_526)" id="ì±ì°ì_2">
              <path d={svgPaths.p298af400} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p298af400} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="246.623" id="filter0_ddiiif_34_526" width="213.151" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_526" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_526" mode="normal" result="effect2_dropShadow_34_526" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_526" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_526" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_526" mode="normal" result="effect4_innerShadow_34_526" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_526" mode="normal" result="effect5_innerShadow_34_526" />
              <feGaussianBlur result="effect6_foregroundBlur_34_526" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[25.22%_34.82%_67.01%_22.44%] leading-[normal] not-italic text-[21.992px] text-black text-center">성산읍</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[38.34%_34.24%_48.06%_20.71%] leading-[normal] not-italic text-[#0f9166] text-[21.992px] text-center">0.385</p>
      <div className="absolute bg-[#0f9166] inset-[52.91%_45.22%_35.91%_32.26%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[54.37%_49.26%_37.85%_35.73%] leading-[normal] not-italic text-[14px] text-center text-white">안정</p>
    </div>
  );
}

function JejuCityRegion() {
  return (
    <div className="absolute h-[247.663px] left-[332.82px] top-[75.92px] w-[273.919px]" data-name="제주시">
      <div className="absolute inset-[-8.41%_-7.3%_-8.08%_-7.3%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314 289">
          <g id="ì ì£¼ì">
            <g filter="url(#filter0_ddiiif_34_523)" id="ì ì£¼ì_2">
              <path d={svgPaths.p3d504380} fill="var(--fill-0, #FEE5A1)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p3d504380} stroke="var(--stroke-0, #B56B0A)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="288.491" id="filter0_ddiiif_34_523" width="313.919" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_523" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_523" mode="normal" result="effect2_dropShadow_34_523" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_523" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_523" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_523" mode="normal" result="effect4_innerShadow_34_523" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_523" mode="normal" result="effect5_innerShadow_34_523" />
              <feGaussianBlur result="effect6_foregroundBlur_34_523" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[37.99%_33.49%_55.55%_41.83%] leading-[normal] not-italic text-[21.992px] text-black text-center">제주시</p>
      <div className="absolute bg-[#dc7d00] inset-[62.62%_39.92%_28.09%_45.84%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[63.83%_42.47%_29.71%_48.03%] leading-[normal] not-italic text-[14px] text-center text-white">주의</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[49.29%_32.25%_39.4%_39.27%] leading-[normal] not-italic text-[#dc7d00] text-[21.992px] text-center">0.420</p>
    </div>
  );
}

function SeogwipoRegion() {
  return (
    <div className="absolute h-[190.182px] left-[463.39px] top-[323.58px] w-[124.186px]" data-name="서귀포시">
      <div className="absolute inset-[-10.52%_-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 165 231">
          <g id="ìê·í¬ì">
            <g filter="url(#filter0_ddiiif_34_538)" id="ìê·í¬ì_2">
              <path d={svgPaths.p94cc300} fill="var(--fill-0, #F9CCB5)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p94cc300} stroke="var(--stroke-0, #E34E04)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="230.182" id="filter0_ddiiif_34_538" width="164.186" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_538" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_538" mode="normal" result="effect2_dropShadow_34_538" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_538" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_538" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_538" mode="normal" result="effect4_innerShadow_34_538" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_538" mode="normal" result="effect5_innerShadow_34_538" />
              <feGaussianBlur result="effect6_foregroundBlur_34_538" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[36.5%_16.26%_50.88%_0.8%] leading-[normal] not-italic text-[21.992px] text-black text-center">서귀포시</p>
      <div className="absolute bg-[#e34e04] inset-[69.63%_33.97%_18.28%_34.63%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[71.21%_39.61%_20.38%_39.46%] leading-[normal] not-italic text-[14px] text-center text-white">경고</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[52.8%_22.7%_32.48%_14.49%] leading-[normal] not-italic text-[#e34e04] text-[21.992px] text-center">0.476</p>
    </div>
  );
}

function HangyeongMainPolygon() {
  return (
    <div className="absolute inset-[0_0_0_21.62%]" data-name="한경면">
      <div className="absolute inset-[-16.1%_-13.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 185 165">
          <g id="íê²½ë©´">
            <g filter="url(#filter0_ddiiif_34_535)" id="íê²½ë©´_2">
              <path d={svgPaths.p1c0a400} fill="var(--fill-0, #F9CCB5)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1c0a400} stroke="var(--stroke-0, #E34E04)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="164.186" id="filter0_ddiiif_34_535" width="184.056" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_535" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_535" mode="normal" result="effect2_dropShadow_34_535" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_535" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_535" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_535" mode="normal" result="effect4_innerShadow_34_535" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_535" mode="normal" result="effect5_innerShadow_34_535" />
              <feGaussianBlur result="effect6_foregroundBlur_34_535" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ChagwiBiyangPolygon() {
  return (
    <div className="absolute inset-[60.57%_86.1%_23.43%_0]" data-name="Component 1">
      <div className="absolute inset-[-100.65%_-78.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 60">
          <g id="Component 1">
            <g filter="url(#filter0_ddiiif_34_507)" id="ì°¨ê·ë2">
              <path d={svgPaths.p4a8400} fill="var(--fill-0, #F9CCB5)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p4a8400} stroke="var(--stroke-0, #E34E04)" strokeWidth="4" />
            </g>
            <g filter="url(#filter1_ddiiif_34_507)" id="ì°¨ê·ë1">
              <path d={svgPaths.p164f6400} fill="var(--fill-0, #F9CCB5)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p164f6400} stroke="var(--stroke-0, #E34E04)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="57.8597" id="filter0_ddiiif_34_507" width="65.5469" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_507" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_507" mode="normal" result="effect2_dropShadow_34_507" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_507" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_507" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_507" mode="normal" result="effect4_innerShadow_34_507" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_507" mode="normal" result="effect5_innerShadow_34_507" />
              <feGaussianBlur result="effect6_foregroundBlur_34_507" stdDeviation="1" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="42.1289" id="filter1_ddiiif_34_507" width="42.8385" x="20.5795" y="17.7422">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_507" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_507" mode="normal" result="effect2_dropShadow_34_507" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_507" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_507" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_507" mode="normal" result="effect4_innerShadow_34_507" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_507" mode="normal" result="effect5_innerShadow_34_507" />
              <feGaussianBlur result="effect6_foregroundBlur_34_507" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function HangyeongRegion() {
  return (
    <div className="absolute h-[124.186px] left-0 top-[319.32px] w-[183.796px]" data-name="한경면">
      <HangyeongMainPolygon />
      <ChagwiBiyangPolygon />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[25.51%_18.17%_59.19%_27.96%] leading-[normal] not-italic text-[21.992px] text-black text-center">한경면</p>
      <div className="absolute bg-[#e34e04] inset-[67.38%_31.78%_14.1%_47%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[69.8%_35.59%_17.32%_50.27%] leading-[normal] not-italic text-[14px] text-center text-white">경고</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[47.25%_24.16%_30.2%_33.4%] leading-[normal] not-italic text-[#e34e04] text-[21.992px] text-center">0.456</p>
    </div>
  );
}

function AewolRegion() {
  return (
    <div className="absolute h-[206.504px] left-[190.89px] top-[144.75px] w-[275.339px]" data-name="애월읍">
      <div className="absolute inset-[-9.69%_-7.26%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 316 247">
          <g id="ì ìì">
            <g filter="url(#filter0_ddiiif_34_517)" id="ì ìì_2">
              <path d={svgPaths.p35b9f700} fill="var(--fill-0, #F9CCB5)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p35b9f700} stroke="var(--stroke-0, #E34E04)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="246.504" id="filter0_ddiiif_34_517" width="315.339" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_517" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_517" mode="normal" result="effect2_dropShadow_34_517" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_517" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_517" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_517" mode="normal" result="effect4_innerShadow_34_517" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_517" mode="normal" result="effect5_innerShadow_34_517" />
              <feGaussianBlur result="effect6_foregroundBlur_34_517" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[37.89%_53.43%_54.35%_23.95%] leading-[normal] not-italic text-[21.992px] text-black text-center">애월읍</p>
      <div className="absolute bg-[#e34e04] inset-[67.92%_55.51%_20.95%_30.33%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[69.37%_58.05%_22.88%_32.51%] leading-[normal] not-italic text-[14px] text-center text-white">경고</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[52.42%_50.42%_34.02%_21.25%] leading-[normal] not-italic text-[#e34e04] text-[21.992px] text-center">0.494</p>
    </div>
  );
}

function NamwonRegion() {
  return (
    <div className="absolute h-[213.6px] left-[491.07px] top-[279.58px] w-[288.822px]" data-name="남원읍">
      <div className="absolute inset-[-9.36%_-6.92%_-9.75%_-7.21%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 330 255">
          <g id="ë¨ìì">
            <g filter="url(#filter0_ddiiif_34_498)" id="ë¨ìì_2">
              <path d={svgPaths.p28f50180} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p28f50180} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="254.429" id="filter0_ddiiif_34_498" width="329.65" x="-2.38419e-07" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_498" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_498" mode="normal" result="effect2_dropShadow_34_498" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_498" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_498" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_498" mode="normal" result="effect4_innerShadow_34_498" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_498" mode="normal" result="effect5_innerShadow_34_498" />
              <feGaussianBlur result="effect6_foregroundBlur_34_498" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[31.09%_34.69%_58.91%_38.2%] leading-[normal] not-italic text-[21.992px] text-black text-center">남원읍</p>
      <div className="absolute bg-[#0f9166] inset-[59.65%_39.64%_29.58%_46.85%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[61.06%_42.07%_31.45%_48.93%] leading-[normal] not-italic text-[14px] text-center text-white">안정</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[46.54%_33.41%_40.35%_39.58%] leading-[normal] not-italic text-[#0f9166] text-[21.992px] text-center">0.358</p>
    </div>
  );
}

function ChujaIslandsPolygon() {
  return (
    <div className="absolute inset-[32.75%_0_0_54.99%]" data-name="Component 2">
      <div className="absolute inset-[-36.13%_-29.35%_-36.13%_-28.18%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 112 96">
          <g id="Component 2">
            <g filter="url(#filter0_ddiiif_34_480)" id="ì¶ìë2">
              <path d={svgPaths.p3af90c00} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p3af90c00} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
            <g filter="url(#filter1_ddiiif_34_480)" id="ì¶ìë1">
              <path d={svgPaths.p3df5b200} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p3df5b200} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="66.3753" id="filter0_ddiiif_34_480" width="61.9987" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_480" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_480" mode="normal" result="effect2_dropShadow_34_480" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_480" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_480" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_480" mode="normal" result="effect4_innerShadow_34_480" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_480" mode="normal" result="effect5_innerShadow_34_480" />
              <feGaussianBlur result="effect6_foregroundBlur_34_480" stdDeviation="1" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="76.1914" id="filter1_ddiiif_34_480" width="83.4066" x="28.3854" y="19.1602">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_480" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_480" mode="normal" result="effect2_dropShadow_34_480" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_480" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_480" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_480" mode="normal" result="effect4_innerShadow_34_480" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_480" mode="normal" result="effect5_innerShadow_34_480" />
              <feGaussianBlur result="effect6_foregroundBlur_34_480" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function ChujaRegion() {
  return (
    <div className="absolute h-[82.305px] left-[96.39px] top-0 w-[157.658px]" data-name="추자면">
      <ChujaIslandsPolygon />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[0_54.92%_80.54%_4.44%] leading-[normal] not-italic text-[21.992px] text-black text-center">추자면</p>
      <div className="absolute bg-[#0f9166] inset-[64.39%_63.21%_7.66%_12.05%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[68.04%_67.65%_12.52%_15.86%] leading-[normal] not-italic text-[14px] text-center text-white">안정</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[30.37%_50.53%_35.61%_0] leading-[normal] not-italic text-[#0f9166] text-[21.992px] text-center">0.298</p>
    </div>
  );
}

function PyoseonRegion() {
  return (
    <div className="absolute h-[202.956px] left-[625.19px] top-[213.59px] w-[241.986px]" data-name="표선면">
      <div className="absolute inset-[-9.85%_-8.61%_-9.85%_-8.26%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 283 243">
          <g id="íì ë©´">
            <g filter="url(#filter0_ddiiif_34_504)" id="íì ë©´_2">
              <path d={svgPaths.p1b740780} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1b740780} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="242.956" id="filter0_ddiiif_34_504" width="282.814" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_504" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_504" mode="normal" result="effect2_dropShadow_34_504" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_504" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_504" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_504" mode="normal" result="effect4_innerShadow_34_504" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_504" mode="normal" result="effect5_innerShadow_34_504" />
              <feGaussianBlur result="effect6_foregroundBlur_34_504" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[33.22%_25.53%_53.48%_43.06%] leading-[normal] not-italic text-[21.992px] text-black text-center">표선면</p>
      <div className="absolute bg-[#0f9166] inset-[63.76%_26.36%_24.9%_57.53%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[65.24%_29.25%_26.87%_60%] leading-[normal] not-italic text-[14px] text-center text-white">안정</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[48.49%_20.16%_37.71%_47.61%] leading-[normal] not-italic text-[#0f9166] text-[21.992px] text-center">0.371</p>
    </div>
  );
}

function JocheonRegion() {
  return (
    <div className="absolute h-[263.275px] left-[508.81px] top-[46.11px] w-[210.052px]" data-name="조천읍">
      <div className="absolute inset-[-7.91%_-9.52%_-7.6%_-9.92%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 251 305">
          <g id="ì¡°ì²ì">
            <g filter="url(#filter0_ddiiif_34_532)" id="ì¡°ì²ì_2">
              <path d={svgPaths.p180cb880} fill="var(--fill-0, #FEE5A1)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p180cb880} stroke="var(--stroke-0, #B56B0A)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="304.103" id="filter0_ddiiif_34_532" width="250.88" x="-2.38419e-07" y="-2.38419e-07">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_532" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_532" mode="normal" result="effect2_dropShadow_34_532" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_532" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_532" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_532" mode="normal" result="effect4_innerShadow_34_532" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_532" mode="normal" result="effect5_innerShadow_34_532" />
              <feGaussianBlur result="effect6_foregroundBlur_34_532" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[31.86%_11.17%_60.54%_47.41%] leading-[normal] not-italic text-[21.992px] text-black text-center">조천읍</p>
      <div className="absolute bg-[#dc7d00] inset-[54.65%_21.65%_36.61%_59.79%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[55.79%_24.98%_38.13%_62.64%] leading-[normal] not-italic text-[14px] text-center text-white">주의</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[42.88%_13.55%_46.49%_49.31%] leading-[normal] not-italic text-[#dc7d00] text-[21.992px] text-center">0.441</p>
    </div>
  );
}

function GujwaRegion() {
  return (
    <div className="absolute h-[208.633px] left-[682.67px] top-[29.79px] w-[254.759px]" data-name="구좌읍">
      <div className="absolute inset-[-9.59%_-7.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 295 249">
          <g id="êµ¬ì¢ì">
            <g filter="url(#filter0_ddiiif_34_529)" id="êµ¬ì¢ì_2">
              <path d={svgPaths.pbbff400} fill="var(--fill-0, #FFBEBE)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.pbbff400} stroke="var(--stroke-0, #EB1F1F)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="248.633" id="filter0_ddiiif_34_529" width="294.759" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_529" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_529" mode="normal" result="effect2_dropShadow_34_529" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_529" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_529" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_529" mode="normal" result="effect4_innerShadow_34_529" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_529" mode="normal" result="effect5_innerShadow_34_529" />
              <feGaussianBlur result="effect6_foregroundBlur_34_529" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[26.46%_42.81%_64.58%_28.55%] leading-[normal] not-italic text-[21.992px] text-black text-center">구좌읍</p>
      <div className="absolute bg-[#eb1f1f] inset-[55.22%_49.08%_33.75%_35.61%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[56.66%_51.83%_35.67%_37.97%] leading-[normal] not-italic text-[14px] text-center text-white">위험</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[40.36%_42.01%_46.22%_27.37%] leading-[normal] not-italic text-[#eb1f1f] text-[21.992px] text-center">0.543</p>
    </div>
  );
}

function JungmunRegion() {
  return (
    <div className="absolute h-[203.665px] left-[275.34px] top-[327.84px] w-[205.794px]" data-name="중문">
      <div className="absolute inset-[-9.82%_-9.72%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 246 244">
          <g id="ì¤ë¬¸">
            <g filter="url(#filter0_ddiiif_34_514)" id="ì¤ë¬¸_2">
              <path d={svgPaths.paf1d000} fill="var(--fill-0, #DFFBB4)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.paf1d000} stroke="var(--stroke-0, #5A9008)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="243.665" id="filter0_ddiiif_34_514" width="245.794" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_514" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_514" mode="normal" result="effect2_dropShadow_34_514" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_514" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_514" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_514" mode="normal" result="effect4_innerShadow_34_514" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_514" mode="normal" result="effect5_innerShadow_34_514" />
              <feGaussianBlur result="effect6_foregroundBlur_34_514" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[34.45%_31.43%_57.69%_41.33%] leading-[normal] not-italic text-[21.992px] text-black text-center">중문</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[50.16%_25.14%_41.98%_35.01%] leading-[normal] not-italic text-[#5a9008] text-[21.992px] text-center">0.401</p>
      <div className="absolute bg-[#5a9008] inset-[67.35%_37.78%_21.36%_43.27%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[68.82%_41.18%_23.32%_46.19%] leading-[normal] not-italic text-[14px] text-center text-white">양호</p>
    </div>
  );
}

function AndeokRegion() {
  return (
    <div className="absolute h-[188.763px] left-[172.44px] top-[346.29px] w-[179.538px]" data-name="안덕면">
      <div className="absolute inset-[-11.03%_-11.14%_-10.6%_-11.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 220 230">
          <g id="ìëë©´">
            <g filter="url(#filter0_ddiiif_34_495)" id="ìëë©´_2">
              <path d={svgPaths.pf8f8400} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.pf8f8400} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="229.591" id="filter0_ddiiif_34_495" width="219.538" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_495" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_495" mode="normal" result="effect2_dropShadow_34_495" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_495" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_495" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_495" mode="normal" result="effect4_innerShadow_34_495" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_495" mode="normal" result="effect5_innerShadow_34_495" />
              <feGaussianBlur result="effect6_foregroundBlur_34_495" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[28.98%_41.54%_62.54%_15.01%] leading-[normal] not-italic text-[21.992px] text-black text-center">안덕면</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[45.94%_40.99%_45.59%_13.34%] leading-[normal] not-italic text-[#0f9166] text-[21.992px] text-center">0.342</p>
      <div className="absolute bg-[#0f9166] inset-[62.89%_53.24%_24.93%_25.04%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[64.48%_57.14%_27.05%_28.38%] leading-[normal] not-italic text-[14px] text-center text-white">안정</p>
    </div>
  );
}

function BiyangdoPolygon() {
  return (
    <div className="absolute inset-[31.58%_85.88%_60.53%_8.78%]" data-name="비양도">
      <div className="absolute inset-[-148.75%_-191.25%_-151.99%_-191.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 52">
          <g id="ë¹ìë">
            <g filter="url(#filter0_ddiiif_34_501)" id="ë¹ìë_2">
              <path d={svgPaths.p1bda1fc0} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1bda1fc0} stroke="var(--stroke-0, #0F9166)" strokeWidth="2" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="51.1877" id="filter0_ddiiif_34_501" width="47.9349" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_501" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_501" mode="normal" result="effect2_dropShadow_34_501" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_501" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_501" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_501" mode="normal" result="effect4_innerShadow_34_501" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_501" mode="normal" result="effect5_innerShadow_34_501" />
              <feGaussianBlur result="effect6_foregroundBlur_34_501" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function HallimRegion() {
  return (
    <div className="absolute h-[161.797px] left-[91.54px] top-[212.88px] w-[185.924px]" data-name="한림읍">
      <div className="absolute inset-[-12.36%_-10.76%_-12.36%_-11.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 227 202">
          <g id="íë¦¼ì">
            <g filter="url(#filter0_ddiiif_34_520)" id="íë¦¼ì_2">
              <path d={svgPaths.p1d71cf0} fill="var(--fill-0, #AAF3DB)" fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1d71cf0} stroke="var(--stroke-0, #0F9166)" strokeWidth="4" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="201.797" id="filter0_ddiiif_34_520" width="226.753" x="4.76837e-07" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="3" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_34_520" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="9" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
              <feBlend in2="effect1_dropShadow_34_520" mode="normal" result="effect2_dropShadow_34_520" />
              <feBlend in="SourceGraphic" in2="effect2_dropShadow_34_520" mode="normal" result="shape" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="0.75" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
              <feBlend in2="shape" mode="normal" result="effect3_innerShadow_34_520" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="-1" />
              <feGaussianBlur stdDeviation="1.25" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0 0.6 0 0 0 0.4 0" />
              <feBlend in2="effect3_innerShadow_34_520" mode="normal" result="effect4_innerShadow_34_520" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
              <feBlend in2="effect4_innerShadow_34_520" mode="normal" result="effect5_innerShadow_34_520" />
              <feGaussianBlur result="effect6_foregroundBlur_34_520" stdDeviation="1" />
            </filter>
          </defs>
        </svg>
      </div>
      <BiyangdoPolygon />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[37.78%_40.11%_45.72%_24.47%] leading-[normal] not-italic text-[21.992px] text-black text-center">한림읍</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[54.47%_35%_35.65%_20.89%] leading-[normal] not-italic text-[#0f9166] text-[21.992px] text-center">0.329</p>
      <div className="absolute bg-[#0f9166] inset-[71.15%_44.68%_14.63%_34.34%] rounded-[10px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[73.01%_48.45%_17.1%_37.57%] leading-[normal] not-italic text-[14px] text-center text-white">안정</p>
    </div>
  );
}

function Frame({ onNavigateToDepth2 }: { onNavigateToDepth2?: (region: string) => void }) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (region: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredRegion(region);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredRegion(null);
    }, 100);
  };

  const handleTooltipMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    setHoveredRegion(null);
  };

  // 각 지역별 툴팁 위치 계산 (지역명 위쪽에 배치)
  const getTooltipPosition = (region: string) => {
    const positions: { [key: string]: { left: number; top: number } } = {
      "구좌읍": { left: 786, top: -250 },
      "조천읍": { left: 658, top: -200 },
      "제주시": { left: 476, top: -180 },
      "애월읍": { left: 301, top: -130 },
      "한림읍": { left: 170, top: -30 },
      "한경면": { left: 101, top: 45 },
      "대정읍": { left: 139, top: 142 },
      "안덕면": { left: 234, top: 75 },
      "중문": { left: 403, top: 68 },
      "서귀포시": { left: 516, top: 74 },
      "남원읍": { left: 646, top: 16 },
      "표선면": { left: 778, top: -58 },
      "성산읍": { left: 880, top: -131 },
      "추자면": { left: 181, top: -305 },
      "우도면": { left: 1015, top: -252 },
    };
    return positions[region] || { left: 500, top: 200 };
  };

  return (
    <div className="absolute h-[688.333px] left-[73px] top-[303px] w-[1077.392px]">
      <UdoRegion />
      <DaejeongRegion />
      <SeongsanRegion />
      <JejuCityRegion />
      <SeogwipoRegion />
      <HangyeongRegion />
      <AewolRegion />
      <NamwonRegion />
      <ChujaRegion />
      <PyoseonRegion />
      <JocheonRegion />
      <GujwaRegion />
      <JungmunRegion />
      <AndeokRegion />
      <HallimRegion />
      <GujwaHoverBox 
        className="absolute h-[120px] left-[724px] top-[66px] w-[124px]" 
        onMouseEnter={() => handleMouseEnter("구좌읍")}
        onMouseLeave={handleMouseLeave}
      />
      <JocheonHoverBox 
        className="absolute h-[126px] left-[611px] top-[109px] w-[94px]" 
        onMouseEnter={() => handleMouseEnter("조천읍")}
        onMouseLeave={handleMouseLeave}
      />
      <JejuCityHoverBox 
        className="absolute h-[146px] left-[385px] top-[130px] w-[182px]" 
        onMouseEnter={() => handleMouseEnter("제주시")}
        onMouseLeave={handleMouseLeave}
      />
      <AewolHoverBox 
        className="absolute h-[146px] left-[242px] top-[178px] w-[118px]" 
        onMouseEnter={() => handleMouseEnter("애월읍")}
        onMouseLeave={handleMouseLeave}
      />
      <HallimHoverBox 
        className="absolute h-[77px] left-[136px] top-[274px] w-[69px]" 
        onMouseEnter={() => handleMouseEnter("한림읍")}
        onMouseLeave={handleMouseLeave}
      />
      <HangyeongHoverBox 
        className="absolute h-[70px] left-[68px] top-[349px] w-[66px]" 
        onMouseEnter={() => handleMouseEnter("한경면")}
        onMouseLeave={handleMouseLeave}
      />
      <DaejeongHoverBox 
        className="absolute h-[86px] left-[104px] top-[446px] w-[71px]" 
        onMouseEnter={() => handleMouseEnter("대정읍")}
        onMouseLeave={handleMouseLeave}
      />
      <AndeokHoverBox 
        className="absolute h-[128px] left-[194px] top-[379px] w-[80px]" 
        onMouseEnter={() => handleMouseEnter("안덕면")}
        onMouseLeave={handleMouseLeave}
      />
      <JungmunHoverBox 
        className="absolute h-[130px] left-[343px] top-[372px] w-[120px]" 
        onMouseEnter={() => handleMouseEnter("중문")}
        onMouseLeave={handleMouseLeave}
      />
      <SeogwipoHoverBox 
        className="absolute h-[111px] left-[473px] top-[378px] w-[86px]" 
        onMouseEnter={() => handleMouseEnter("서귀포시")}
        onMouseLeave={handleMouseLeave}
      />
      <NamwonHoverBox 
        className="absolute h-[125px] left-[573px] top-[320px] w-[147px]" 
        onMouseEnter={() => handleMouseEnter("남원읍")}
        onMouseLeave={handleMouseLeave}
      />
      <PyoseonHoverBox 
        className="absolute h-[151.947px] left-[710.21px] top-[245.53px] w-[136.581px]" 
        onMouseEnter={() => handleMouseEnter("표선면")}
        onMouseLeave={handleMouseLeave}
      />
      <SeongsanHoverBox 
        className="absolute h-[165.857px] left-[810px] top-[172.36px] w-[141.394px]" 
        onMouseEnter={() => handleMouseEnter("성산읍")}
        onMouseLeave={handleMouseLeave}
      />
      <ChujaHoverBox 
        className="absolute h-[93px] left-[106px] top-[-1px] w-[151px]" 
        onMouseEnter={() => handleMouseEnter("추자면")}
        onMouseLeave={handleMouseLeave}
      />
      <UdoHoverBox 
        className="absolute h-[93px] left-[962px] top-[52px] w-[106px]" 
        onMouseEnter={() => handleMouseEnter("우도면")}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* 툴팁 표시 */}
      {hoveredRegion && (() => {
        const position = getTooltipPosition(hoveredRegion);
        return (
          <div 
            className="absolute z-50"
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
              transform: 'translateX(-50%)'
            }}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
          >
            <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[299px] p-[22px] pb-[26px] cursor-pointer">
            <div className="relative">
              {/* 지역명 */}
              <h3 className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[21.99px] text-black text-center mb-[14px]">{hoveredRegion}</h3>
              
              {/* SSI 지수와 위험도 배지 */}
              <div className="flex items-center justify-between mb-[14px]">
                <p className="font-['Inter:Bold',sans-serif] font-bold text-[28px] text-[#e34e04]">0.476</p>
                <div className="flex items-center gap-2">
                  <div className="bg-[#dedede] rounded-[10px] px-3 py-1">
                    <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium text-[14px] text-[#2c2c2c]">직전 7일 대비 1.2% ↓</p>
                  </div>
                  <div className="bg-[#e34e04] rounded-[10px] px-3 py-1">
                    <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium text-[14px] text-white">경고</p>
                  </div>
                </div>
              </div>
              
              {/* 핵심 키워드 */}
              <div className="mb-[17px]">
                <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-black mb-[11px]">핵심 키워드</p>
                <div className="flex gap-[7px]">
                  <div className="bg-white rounded-[10px] px-[10px] py-[6px] border border-[#f3f3f3]">
                    <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#00a3e0]">#관광</p>
                  </div>
                  <div className="bg-white rounded-[10px] px-[10px] py-[6px] border border-[#f3f3f3]">
                    <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#00a3e0]">#물가</p>
                  </div>
                  <div className="bg-white rounded-[10px] px-[10px] py-[6px] border border-[#f3f3f3]">
                    <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#00a3e0]">#중국인</p>
                  </div>
                </div>
              </div>
              
              {/* 리포트 요약 */}
              <div className="mb-[23px]">
                <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-black mb-[11px]">리포트 요약</p>
                <div className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-black leading-relaxed">
                  <p className="mb-[14px]">'애월읍' 지역에서는 관광객 증가에 따른 주차 문제, 쓰레기 문제 등 주민 불편 호소가 많았습니다.</p>
                  <p>중국인 관광객이 급증하며 관광 매너가 잘 지켜지지 않는다는 언급이 많았습니다.</p>
                </div>
              </div>
              
              {/* 상세보기 버튼 */}
              <div 
                className="bg-[#eef8fd] border border-[#f3f3f3] rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] py-[13px] text-center hover:bg-[#d9f2fd] transition-colors cursor-pointer"
                onClick={() => onNavigateToDepth2?.(hoveredRegion)}
              >
                <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[14px] text-[#00a3e0]">클릭하여 상세보기 &gt;</p>
              </div>
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
}

export default function Depth1Dashboard({ 
  onNavigateToDepth2,
  startDate,
  endDate,
  tempStartDate,
  tempEndDate,
  onTempStartDateChange,
  onTempEndDateChange,
  onSearch
}: { 
  onNavigateToDepth2?: (region: string) => void;
  startDate: string;
  endDate: string;
  tempStartDate: string;
  tempEndDate: string;
  onTempStartDateChange: (date: string) => void;
  onTempEndDateChange: (date: string) => void;
  onSearch: () => void;
}) {
  return (
    <div className="bg-white relative size-full" data-name="depth1_Dashboard_원본">
      <div className="absolute h-[1117px] left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1728px]" data-name="Vector">
        <img alt="" className="block max-w-none size-full" height="1117" src={imgVector} width="1728" />
      </div>
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[calc(50%-810px)] not-italic text-[#9ca3af] text-[24px] text-nowrap top-[99px] tracking-[-0.1504px]">Jeju Social Stress Monitoring System</p>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] left-[calc(50%-810px)] not-italic text-[32px] text-black text-nowrap top-[48px]">제주 사회적 스트레스 모니터링 시스템</p>
      
      {/* 새로운 리팩토링된 컴포넌트들 */}
      <DateRangePicker
        tempStartDate={tempStartDate}
        tempEndDate={tempEndDate}
        onTempStartDateChange={onTempStartDateChange}
        onTempEndDateChange={onTempEndDateChange}
        onSearch={onSearch}
      />
      
      <ChartCard
        title="제주도 SSI 추이"
        region="제주도"
        ssi="0.492"
        change="2.3%"
        position={{ left: 1260, top: 165 }}
        onNavigateToDepth2={onNavigateToDepth2}
      />
      
      <ChartCard
        title="제주시 SSI 추이"
        region="제주시"
        ssi="0.495"
        change="3.1%"
        position={{ left: 1260, top: 461 }}
        onNavigateToDepth2={onNavigateToDepth2}
      />
      
      <ChartCard
        title="서귀포시 SSI 추이"
        region="서귀포시"
        ssi="0.490"
        change="2.8%"
        position={{ left: 1260, top: 760 }}
        onNavigateToDepth2={onNavigateToDepth2}
      />
      
      <WeatherDisplay
        temperature="5°C"
        time="21시 37분 4초"
        date="2025-12-15"
      />
      
      <Frame onNavigateToDepth2={onNavigateToDepth2} />
    </div>
  );
}