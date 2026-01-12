import svgPaths from "../../shared/utils/svg-5fq1vtsmqv";
import imgVector from "figma:asset/6f45711041117bd80b7104f70704abeee8a37bec.png";
import React, { useState, useEffect } from "react";
// 새로운 리팩토링된 컴포넌트들
import DateRangePicker from './components/Header/DateRangePicker';
import ChartCard from './components/Charts/ChartCard';
import WeatherDisplay from './components/WeatherInfo/WeatherDisplay';
import { useWeatherData } from './hooks/useWeatherData';
import dashboardApi, { RegionSSI, ChartData, RegionDetail } from '../../shared/services/dashboardApi';
import { getSSIDataByDateRange } from './constants/ssiMockData';
import { getSSIPolygonColors, getSSILevel, formatSSI } from '../../utils/ssiLevel';
import {
  Group12,
  GroupBackgroundImageAndText,
  GroupBackgroundImageAndText1,
  GroupBackgroundImageAndText2,
  GroupBackgroundImageAndText3,
  GroupBackgroundImageAndText4,
  VectorBackgroundImage,
  VectorBackgroundImage1,
  GroupBackgroundImage,
  IconBackgroundImage,
  TextBackgroundImageAndText,
  ContainerBackgroundImageAndText,
} from '../../pages/Depth1';

// 재사용 가능한 HoverBox 컴포넌트
function HoverBox({ 
  className, 
  onMouseEnter, 
  onMouseLeave, 
  dataName 
}: { 
  className?: string; 
  onMouseEnter?: () => void; 
  onMouseLeave?: () => void;
  dataName: string;
}) {
  return (
    <div className={className} data-name={dataName} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="absolute bg-[rgba(217,217,217,0)] inset-0" data-name={dataName} />
    </div>
  );
}

// 지역별 HoverBox 컴포넌트들 (간단한 버전)
function UdoHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_우도면" />;
}

function ChujaHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_추자면" />;
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
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_서귀포시" />;
}

function JungmunHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_중문" />;
}

function AndeokHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_안덕면" />;
}

function DaejeongHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_대정읍" />;
}

function HangyeongHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_한경면" />;
}

function HallimHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_한림읍" />;
}

function AewolHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_애월읍" />;
}

function JejuCityHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_제주시" />;
}

function JocheonHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_조천읍" />;
}

function GujwaHoverBox({ className, onMouseEnter, onMouseLeave }: { className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) {
  return <HoverBox className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} dataName="박스_구좌읍" />;
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

function UdoPolygon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <div className="absolute inset-[42.02%_67.84%_0_0]" data-name="우도">
      <div className="absolute inset-[-42.7%_-61.15%_-42.7%_-58.72%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 87">
          <g id="ì°ë">
            <g filter="url(#filter0_ddiiif_34_484)" id="ì°ë_2">
              <path d={svgPaths.p1298d680} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1298d680} stroke={stroke} strokeWidth="4" />
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

function UdoRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  
  return (
    <div className="absolute h-[80.785px] left-[971.49px] top-[59px] w-[105.9px]" data-name="우도면">
      <UdoPolygon fill={colors.fill} stroke={colors.stroke} />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[0_8.5%_80.19%_32.96%] leading-[normal] not-italic text-[21.992px] text-black text-center">우도면</p>
      <div className="absolute inset-[66.84%_18.89%_4.69%_44.29%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[70.56%_25.5%_9.64%_49.95%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[32.18%_0_33.16%_26.35%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function DaejeongMainPolygon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <div className="absolute inset-[0_0_39.75%_0]" data-name="대정읍">
      <div className="absolute inset-[-12.33%_-12.42%_-11.84%_-12.42%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 202 210">
          <g id="ëì ì">
            <g filter="url(#filter0_ddiiif_34_487)" id="ëì ì_2">
              <path d={svgPaths.p2af11500} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p2af11500} stroke={stroke} strokeWidth="4" />
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

function GapadoPolygon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <div className="absolute inset-[72.91%_12.78%_20.76%_75.33%]" data-name="가파도">
      <div className="absolute inset-[-112.73%_-104.38%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 58">
          <g id="ê°íë">
            <g filter="url(#filter0_ddiiif_34_511)" id="ê°íë_2">
              <path d={svgPaths.p44a4ab0} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p44a4ab0} stroke={stroke} strokeWidth="4" />
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

function MaradoPolygon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <div className="absolute inset-[94.18%_21.15%_0_76.65%]" data-name="마라도">
      <div className="absolute inset-[-127.61%_-563.67%_-122.54%_-563.67%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 58">
          <g id="ë§ë¼ë">
            <g filter="url(#filter0_ddiiif_34_492)" id="ë§ë¼ë_2">
              <path d={svgPaths.p3ac43b00} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p3ac43b00} stroke={stroke} strokeWidth="4" />
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

function DaejeongRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  
  return (
    <div className="absolute h-[280.306px] left-[38.32px] top-[408.03px] w-[161.087px]" data-name="대정읍">
      <DaejeongMainPolygon fill={colors.fill} stroke={colors.stroke} />
      <GapadoPolygon fill={colors.fill} stroke={colors.stroke} />
      <MaradoPolygon fill={colors.fill} stroke={colors.stroke} />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[16.4%_12.43%_74.32%_37.29%] leading-[normal] not-italic text-[21.992px] text-black text-center">대정읍</p>
      <div className="absolute inset-[35.31%_18.63%_56.49%_57.16%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[36.38%_22.98%_57.91%_60.88%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[26.03%_12.43%_63.98%_39.15%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function SeongsanRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[205.794px] left-[812.53px] top-[156.11px] w-[173.151px]" data-name="성산읍">
      <div className="absolute inset-[-9.72%_-11.55%_-10.12%_-11.55%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 214 247">
          <g id="ì±ì°ì">
            <g filter="url(#filter0_ddiiif_34_526)" id="ì±ì°ì_2">
              <path d={svgPaths.p298af400} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p298af400} stroke={colors.stroke} strokeWidth="4" />
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
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[38.34%_34.24%_48.06%_20.71%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
      <div className="absolute inset-[52.91%_45.22%_35.91%_32.26%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[54.37%_49.26%_37.85%_35.73%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
    </div>
  );
}

function JejuCityRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[247.663px] left-[332.82px] top-[75.92px] w-[273.919px]" data-name="제주시">
      <div className="absolute inset-[-8.41%_-7.3%_-8.08%_-7.3%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 314 289">
          <g id="ì ì£¼ì">
            <g filter="url(#filter0_ddiiif_34_523)" id="ì ì£¼ì_2">
              <path d={svgPaths.p3d504380} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p3d504380} stroke={colors.stroke} strokeWidth="4" />
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
      <div className="absolute inset-[62.62%_39.92%_28.09%_45.84%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[63.83%_42.47%_29.71%_48.03%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[49.29%_32.25%_39.4%_39.27%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function SeogwipoRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[190.182px] left-[463.39px] top-[323.58px] w-[124.186px]" data-name="서귀포시">
      <div className="absolute inset-[-10.52%_-16.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 165 231">
          <g id="ìê·í¬ì">
            <g filter="url(#filter0_ddiiif_34_538)" id="ìê·í¬ì_2">
              <path d={svgPaths.p94cc300} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p94cc300} stroke={colors.stroke} strokeWidth="4" />
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
      <div className="absolute inset-[69.63%_33.97%_18.28%_34.63%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[71.21%_39.61%_20.38%_39.46%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[52.8%_22.7%_32.48%_14.49%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function HangyeongMainPolygon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <div className="absolute inset-[0_0_0_21.62%]" data-name="한경면">
      <div className="absolute inset-[-16.1%_-13.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 185 165">
          <g id="íê²½ë©´">
            <g filter="url(#filter0_ddiiif_34_535)" id="íê²½ë©´_2">
              <path d={svgPaths.p1c0a400} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1c0a400} stroke={stroke} strokeWidth="4" />
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

function ChagwiBiyangPolygon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <div className="absolute inset-[60.57%_86.1%_23.43%_0]" data-name="Component 1">
      <div className="absolute inset-[-100.65%_-78.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 66 60">
          <g id="Component 1">
            <g filter="url(#filter0_ddiiif_34_507)" id="ì°¨ê·ë2">
              <path d={svgPaths.p4a8400} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p4a8400} stroke={stroke} strokeWidth="4" />
            </g>
            <g filter="url(#filter1_ddiiif_34_507)" id="ì°¨ê·ë1">
              <path d={svgPaths.p164f6400} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p164f6400} stroke={stroke} strokeWidth="4" />
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

function HangyeongRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[124.186px] left-0 top-[319.32px] w-[183.796px]" data-name="한경면">
      <HangyeongMainPolygon fill={colors.fill} stroke={colors.stroke} />
      <ChagwiBiyangPolygon fill={colors.fill} stroke={colors.stroke} />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[25.51%_18.17%_59.19%_27.96%] leading-[normal] not-italic text-[21.992px] text-black text-center">한경면</p>
      <div className="absolute inset-[67.38%_31.78%_14.1%_47%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[69.8%_35.59%_17.32%_50.27%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[47.25%_24.16%_30.2%_33.4%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function AewolRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[206.504px] left-[190.89px] top-[144.75px] w-[275.339px]" data-name="애월읍">
      <div className="absolute inset-[-9.69%_-7.26%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 316 247">
          <g id="ì ìì">
            <g filter="url(#filter0_ddiiif_34_517)" id="ì ìì_2">
              <path d={svgPaths.p35b9f700} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p35b9f700} stroke={colors.stroke} strokeWidth="4" />
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
      <div className="absolute inset-[67.92%_55.51%_20.95%_30.33%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[69.37%_58.05%_22.88%_32.51%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[52.42%_50.42%_34.02%_21.25%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function NamwonRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[213.6px] left-[491.07px] top-[279.58px] w-[288.822px]" data-name="남원읍">
      <div className="absolute inset-[-9.36%_-6.92%_-9.75%_-7.21%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 330 255">
          <g id="ë¨ìì">
            <g filter="url(#filter0_ddiiif_34_498)" id="ë¨ìì_2">
              <path d={svgPaths.p28f50180} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p28f50180} stroke={colors.stroke} strokeWidth="4" />
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
      <div className="absolute inset-[59.65%_39.64%_29.58%_46.85%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[61.06%_42.07%_31.45%_48.93%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[46.54%_33.41%_40.35%_39.58%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function ChujaIslandsPolygon({ fill, stroke }: { fill: string; stroke: string }) {
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
              <path d={svgPaths.p3df5b200} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p3df5b200} stroke={stroke} strokeWidth="4" />
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

function ChujaRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[82.305px] left-[96.39px] top-0 w-[157.658px]" data-name="추자면">
      <ChujaIslandsPolygon fill={colors.fill} stroke={colors.stroke} />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[0_54.92%_80.54%_4.44%] leading-[normal] not-italic text-[21.992px] text-black text-center">추자면</p>
      <div className="absolute inset-[64.39%_63.21%_7.66%_12.05%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[68.04%_67.65%_12.52%_15.86%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[30.37%_50.53%_35.61%_0] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function PyoseonRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[202.956px] left-[625.19px] top-[213.59px] w-[241.986px]" data-name="표선면">
      <div className="absolute inset-[-9.85%_-8.61%_-9.85%_-8.26%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 283 243">
          <g id="íì ë©´">
            <g filter="url(#filter0_ddiiif_34_504)" id="íì ë©´_2">
              <path d={svgPaths.p1b740780} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1b740780} stroke={colors.stroke} strokeWidth="4" />
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
      <div className="absolute inset-[63.76%_26.36%_24.9%_57.53%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[65.24%_29.25%_26.87%_60%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[48.49%_20.16%_37.71%_47.61%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function JocheonRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[263.275px] left-[508.81px] top-[46.11px] w-[210.052px]" data-name="조천읍">
      <div className="absolute inset-[-7.91%_-9.52%_-7.6%_-9.92%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 251 305">
          <g id="ì¡°ì²ì">
            <g filter="url(#filter0_ddiiif_34_532)" id="ì¡°ì²ì_2">
              <path d={svgPaths.p180cb880} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p180cb880} stroke={colors.stroke} strokeWidth="4" />
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
      <div className="absolute inset-[54.65%_21.65%_36.61%_59.79%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[55.79%_24.98%_38.13%_62.64%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[42.88%_13.55%_46.49%_49.31%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function GujwaRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[208.633px] left-[682.67px] top-[29.79px] w-[254.759px]" data-name="구좌읍">
      <div className="absolute inset-[-9.59%_-7.85%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 295 249">
          <g id="êµ¬ì¢ì">
            <g filter="url(#filter0_ddiiif_34_529)" id="êµ¬ì¢ì_2">
              <path d={svgPaths.pbbff400} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.pbbff400} stroke={colors.stroke} strokeWidth="4" />
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
      <div className="absolute inset-[55.22%_49.08%_33.75%_35.61%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[56.66%_51.83%_35.67%_37.97%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[40.36%_42.01%_46.22%_27.37%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
    </div>
  );
}

function JungmunRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[203.665px] left-[275.34px] top-[327.84px] w-[205.794px]" data-name="중문">
      <div className="absolute inset-[-9.82%_-9.72%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 246 244">
          <g id="ì¤ë¬¸">
            <g filter="url(#filter0_ddiiif_34_514)" id="ì¤ë¬¸_2">
              <path d={svgPaths.paf1d000} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.paf1d000} stroke={colors.stroke} strokeWidth="4" />
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
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[50.16%_25.14%_41.98%_35.01%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
      <div className="absolute inset-[67.35%_37.78%_21.36%_43.27%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[68.82%_41.18%_23.32%_46.19%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
    </div>
  );
}

function AndeokRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[188.763px] left-[172.44px] top-[346.29px] w-[179.538px]" data-name="안덕면">
      <div className="absolute inset-[-11.03%_-11.14%_-10.6%_-11.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 220 230">
          <g id="ìëë©´">
            <g filter="url(#filter0_ddiiif_34_495)" id="ìëë©´_2">
              <path d={svgPaths.pf8f8400} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.pf8f8400} stroke={colors.stroke} strokeWidth="4" />
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
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[45.94%_40.99%_45.59%_13.34%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
      <div className="absolute inset-[62.89%_53.24%_24.93%_25.04%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[64.48%_57.14%_27.05%_28.38%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
    </div>
  );
}

function BiyangdoPolygon({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <div className="absolute inset-[31.58%_85.88%_60.53%_8.78%]" data-name="비양도">
      <div className="absolute inset-[-148.75%_-191.25%_-151.99%_-191.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 52">
          <g id="ë¹ìë">
            <g filter="url(#filter0_ddiiif_34_501)" id="ë¹ìë_2">
              <path d={svgPaths.p1bda1fc0} fill={fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1bda1fc0} stroke={stroke} strokeWidth="2" />
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

function HallimRegion({ ssi }: { ssi: number }) {
  const colors = getSSIPolygonColors(ssi);
  const levelInfo = getSSILevel(ssi);
  return (
    <div className="absolute h-[161.797px] left-[91.54px] top-[212.88px] w-[185.924px]" data-name="한림읍">
      <div className="absolute inset-[-12.36%_-10.76%_-12.36%_-11.2%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 227 202">
          <g id="íë¦¼ì">
            <g filter="url(#filter0_ddiiif_34_520)" id="íë¦¼ì_2">
              <path d={svgPaths.p1d71cf0} fill={colors.fill} fillOpacity="0.9" style={{ mixBlendMode: "plus-lighter" }} />
              <path d={svgPaths.p1d71cf0} stroke={colors.stroke} strokeWidth="4" />
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
      <BiyangdoPolygon fill={colors.fill} stroke={colors.stroke} />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold inset-[37.78%_40.11%_45.72%_24.47%] leading-[normal] not-italic text-[21.992px] text-black text-center">한림읍</p>
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold inset-[54.47%_35%_35.65%_20.89%] leading-[normal] not-italic text-[21.992px] text-center" style={{ color: colors.stroke }}>{formatSSI(ssi)}</p>
      <div className="absolute inset-[71.15%_44.68%_14.63%_34.34%] rounded-[10px]" style={{ backgroundColor: colors.stroke }} />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium inset-[73.01%_48.45%_17.1%_37.57%] leading-[normal] not-italic text-[14px] text-center text-white">{levelInfo.levelKo}</p>
    </div>
  );
}

function Frame({ 
  onNavigateToDepth2, 
  regionData, 
  startDate, 
  endDate 
}: { 
  onNavigateToDepth2?: (region: string) => void;
  regionData: RegionSSI[];
  startDate: string;
  endDate: string;
}) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [regionDetail, setRegionDetail] = useState<RegionDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // 날짜가 변경되면 기존 상세 정보 초기화 (새로운 날짜 범위로 다시 로드)
  useEffect(() => {
    setRegionDetail(null);
    setHoveredRegion(null);
  }, [startDate, endDate]);

  // 지역명으로 SSI 찾기 (number 반환)
  // ⚠️ 중요: 최신값이 아닌 기간 내 모든 SSI 값의 평균을 반환합니다
  // 항상 날짜 범위에 맞는 SSI 평균값을 직접 계산 (Depth2와 동일한 방식)
  // 이렇게 하면 날짜 범위가 변경될 때마다 자동으로 업데이트됨
  const getRegionSSI = (regionName: string): number => {
    try {
      // getSSIDataByDateRange는 기간 내 모든 SSI 값의 평균을 반환 (최신값 아님!)
      const { ssi } = getSSIDataByDateRange(regionName, startDate, endDate);
      return ssi; // 평균값 반환
    } catch (error) {
      // regionData에서 폴백 시도 (이것도 평균값이어야 함)
      const data = regionData.find(r => r.지역명 === regionName);
      if (data?.ssi) {
        return data.ssi;
      }
      // 최종 폴백
      return 0.400;
    }
  };

  const handleMouseEnter = async (region: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredRegion(region);
    
    // 지역 상세 정보 로드
    setLoadingDetail(true);
    try {
      const detail = await dashboardApi.getRegionDetail(region, startDate, endDate);
      setRegionDetail(detail);
    } catch (err) {
      console.error('지역 상세 정보 로드 실패:', err);
      setRegionDetail(null);
    } finally {
      setLoadingDetail(false);
    }
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

  // 툴팁 렌더링 함수
  const renderTooltip = () => {
    if (!hoveredRegion) return null;
    
    const position = getTooltipPosition(hoveredRegion);
    const detail = regionDetail;
    // regionDetail의 SSI를 우선 사용 (날짜 범위 반영된 평균값), 없으면 직접 계산
    const ssi = detail?.ssi ?? getRegionSSI(hoveredRegion);
    const colors = getSSIPolygonColors(ssi);
    // regionDetail의 위험도를 우선 사용, 없으면 SSI로 계산
    const levelInfo = detail?.위험도 
      ? { levelKo: detail.위험도, level: getSSILevel(ssi).level }
      : getSSILevel(ssi);
    
    return (
      <div 
        key={hoveredRegion}
        className="absolute z-[9998]"
        style={{
          left: `${position.left}px`,
          top: `${position.top}px`,
          transform: 'translateX(-50%)',
          zIndex: 9998
        }}
        onMouseEnter={handleTooltipMouseEnter}
        onMouseLeave={handleTooltipMouseLeave}
      >
        <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-[299px] p-[22px] pb-[26px] cursor-pointer">
          <div className="relative">
            {/* 지역명 */}
            <h3 className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[21.99px] text-black text-center mb-[14px]">
              {detail?.지역명 || hoveredRegion}
            </h3>
            
            {/* SSI 지수와 위험도 배지 */}
            <div className="flex items-center justify-between mb-[14px]">
              <p className="font-['Inter:Bold',sans-serif] font-bold text-[28px]" style={{ color: colors.stroke }}>
                {formatSSI(ssi)}
              </p>
              <div className="flex items-center gap-2">
                <div className="rounded-[10px] px-3 py-1" style={{ backgroundColor: colors.stroke }}>
                  <p className="font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium text-[14px] text-white">
                    {levelInfo.levelKo}
                  </p>
                </div>
              </div>
            </div>
            
            {/* 핵심 키워드 */}
            {detail && detail.키워드 && detail.키워드.length > 0 && (
              <div className="mb-[17px]">
                <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-black mb-[11px]">핵심 키워드</p>
                <div className="flex gap-[7px] flex-wrap">
                  {detail.키워드.map((keyword, index) => (
                    <div key={index} className="bg-white rounded-[10px] px-[10px] py-[6px] border border-[#f3f3f3]">
                      <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#00a3e0]">
                        #{keyword}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 리포트 요약 */}
            {detail && detail.요약 && (
              <div className="mb-[23px]">
                <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[16px] text-black mb-[11px]">리포트 요약</p>
                <div className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-black leading-relaxed">
                  <p>{detail.요약}</p>
                </div>
              </div>
            )}
            
            {loadingDetail && (
              <div className="mb-[23px] text-center">
                <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal text-[14px] text-[#7f8c8d]">
                  로딩 중...
                </p>
              </div>
            )}
            
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
  };

  return (
    <div className="absolute h-[688.333px] left-[73px] top-[303px] w-[1077.392px]">
      <UdoRegion ssi={getRegionSSI("우도면")} />
      <DaejeongRegion ssi={getRegionSSI("대정읍")} />
      <SeongsanRegion ssi={getRegionSSI("성산읍")} />
      <JejuCityRegion ssi={getRegionSSI("제주시")} />
      <SeogwipoRegion ssi={getRegionSSI("서귀포시")} />
      <HangyeongRegion ssi={getRegionSSI("한경면")} />
      <AewolRegion ssi={getRegionSSI("애월읍")} />
      <NamwonRegion ssi={getRegionSSI("남원읍")} />
      <ChujaRegion ssi={getRegionSSI("추자면")} />
      <PyoseonRegion ssi={getRegionSSI("표선면")} />
      <JocheonRegion ssi={getRegionSSI("조천읍")} />
      <GujwaRegion ssi={getRegionSSI("구좌읍")} />
      <JungmunRegion ssi={getRegionSSI("중문")} />
      <AndeokRegion ssi={getRegionSSI("안덕면")} />
      <HallimRegion ssi={getRegionSSI("한림읍")} />
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
      {renderTooltip()}
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
  // 날씨 데이터
  const { weatherData } = useWeatherData();
  
  // API 데이터 상태
  const [regionData, setRegionData] = useState<RegionSSI[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로드 함수
  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 병렬로 API 호출 (목 데이터 사용)
      const [regions, jejuChart, jejuSiChart, seogwipoChart] = await Promise.all([
        dashboardApi.getRegionSSI(startDate, endDate),
        dashboardApi.getChartData('all', startDate, endDate),
        dashboardApi.getChartData('jeju', startDate, endDate),
        dashboardApi.getChartData('seogwipo', startDate, endDate),
      ]);
      
      setRegionData(regions);
      setChartData({
        jeju_do: jejuChart.jeju_do,
        jeju_si: jejuSiChart.jeju_si,
        seogwipo: seogwipoChart.seogwipo,
      });
    } catch (err) {
      console.error('❌ 데이터 로드 실패:', err);
      setError('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 초기 로드 및 날짜 변경 시 재로드
  useEffect(() => {
    loadData();
  }, [startDate, endDate]);

  // 지역별 최신 SSI 값 가져오기 (실제 JSON 데이터에서)
  const getRegionSSI = (region: string): string => {
    try {
      const { ssi } = getSSIDataByDateRange(region, startDate, endDate);
      return ssi.toFixed(3);
    } catch (error) {
      // 차트 데이터의 평균으로 대체
      if (region === '제주시' && chartData?.jeju_si) {
        const sum = chartData.jeju_si.reduce((acc, val) => acc + val, 0);
        return (sum / chartData.jeju_si.length).toFixed(3);
      } else if (region === '서귀포시' && chartData?.seogwipo) {
        const sum = chartData.seogwipo.reduce((acc, val) => acc + val, 0);
        return (sum / chartData.seogwipo.length).toFixed(3);
      } else if (region === '제주도' && chartData?.jeju_do) {
        const sum = chartData.jeju_do.reduce((acc, val) => acc + val, 0);
        return (sum / chartData.jeju_do.length).toFixed(3);
      }
      return "0.000";
    }
  };

  // 차트 데이터에서 변화율 계산
  const getChangeRate = (data: number[]): string => {
    if (!data || data.length < 2) return "0.0%";
    const first = data[0];
    const last = data[data.length - 1];
    const change = ((last - first) / first) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  };

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
        ssi={getRegionSSI('제주도')}
        change={chartData ? getChangeRate(chartData.jeju_do) : "0.0%"}
        chartData={chartData?.jeju_do}
        position={{ left: 1260, top: 165 }}
        onNavigateToDepth2={onNavigateToDepth2}
        dateRange={{ start: startDate, end: endDate }}
      />
      
      <ChartCard
        title="제주시 SSI 추이"
        region="제주시"
        ssi={getRegionSSI('제주시')}
        change={chartData ? getChangeRate(chartData.jeju_si) : "0.0%"}
        chartData={chartData?.jeju_si}
        position={{ left: 1260, top: 461 }}
        onNavigateToDepth2={onNavigateToDepth2}
        dateRange={{ start: startDate, end: endDate }}
      />
      
      <ChartCard
        title="서귀포시 SSI 추이"
        region="서귀포시"
        ssi={getRegionSSI('서귀포시')}
        change={chartData ? getChangeRate(chartData.seogwipo) : "0.0%"}
        chartData={chartData?.seogwipo}
        position={{ left: 1260, top: 760 }}
        onNavigateToDepth2={onNavigateToDepth2}
        dateRange={{ start: startDate, end: endDate }}
      />
      
      <WeatherDisplay
        temperature={weatherData?.temperature || '--°C'}
        time={weatherData?.time || '--시 --분 --초'}
        date={weatherData?.date || '---- -- --'}
      />
      
      <Frame 
        onNavigateToDepth2={onNavigateToDepth2} 
        regionData={regionData}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}