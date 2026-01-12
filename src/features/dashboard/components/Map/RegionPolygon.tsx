import React from 'react';
import { RegionPolygonProps } from './types';
import svgPaths from '../../constants/svg-paths';
import { getRiskLevelColor } from '../../constants/regionData';

// 지역별 SVG path 매핑
const REGION_SVG_PATHS: Record<string, string> = {
  "구좌읍": svgPaths.p1298d680,
  "조천읍": svgPaths.p1298d680,
  "제주시": svgPaths.p1298d680,
  "애월읍": svgPaths.p1298d680,
  "한림읍": svgPaths.p1298d680,
  "한경면": svgPaths.p1298d680,
  "대정읍": svgPaths.p1298d680,
  "안덕면": svgPaths.p1298d680,
  "중문": svgPaths.p1298d680,
  "서귀포시": svgPaths.p1298d680,
  "남원읍": svgPaths.p1298d680,
  "표선면": svgPaths.p1298d680,
  "성산읍": svgPaths.p1298d680,
  "추자면": svgPaths.p1298d680,
  "우도면": svgPaths.p1298d680,
};

export default function RegionPolygon({
  region,
  position,
  ssi,
  level = 'stable',
  onMouseEnter,
  onMouseLeave,
  onClick,
  className = '',
}: RegionPolygonProps) {
  const svgPath = REGION_SVG_PATHS[region] || svgPaths.p1298d680;
  const fillColor = level ? getRiskLevelColor(level) : '#AAF3DB';
  
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        height: `${position.height}px`,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="absolute inset-[-42.7%_-61.15%_-42.7%_-58.72%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 87">
          <g id={region}>
            <g filter="url(#filter0_ddiiif_34_484)" id={`${region}_2`}>
              <path
                d={svgPath}
                fill={fillColor}
                fillOpacity="0.9"
                style={{ mixBlendMode: "plus-lighter" }}
              />
              <path
                d={svgPath}
                stroke={fillColor}
                strokeWidth="4"
              />
            </g>
          </g>
        </svg>
      </div>
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[normal] not-italic text-[21.992px] text-black text-center">
        {region}
      </p>
    </div>
  );
}

