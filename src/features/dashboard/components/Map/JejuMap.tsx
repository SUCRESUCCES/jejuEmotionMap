import React, { useState, useRef } from 'react';
import RegionPolygon from './RegionPolygon';
import RegionTooltip from './RegionTooltip';
import { REGIONS, REGION_POSITIONS, TOOLTIP_POSITIONS, getRegionData } from '../../constants/regionData';
import { Position } from './types';

interface JejuMapProps {
  onNavigateToReport?: (region: string) => void;
}

export default function JejuMap({ onNavigateToReport }: JejuMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  return (
    <div className="absolute h-[688.333px] left-[73px] top-[303px] w-[1077.392px]">
      {/* 배경 지도 이미지는 부모 컴포넌트에서 처리 */}
      
      {/* 지역 폴리곤 렌더링 */}
      {REGIONS.map((regionData) => {
        const position = REGION_POSITIONS[regionData.name];
        if (!position) return null;

        return (
          <RegionPolygon
            key={regionData.name}
            region={regionData.name}
            position={position}
            ssi={regionData.ssi}
            level={regionData.level}
            onMouseEnter={() => handleMouseEnter(regionData.name)}
            onMouseLeave={handleMouseLeave}
            onClick={() => onNavigateToReport?.(regionData.name)}
          />
        );
      })}

      {/* 툴팁 표시 */}
      {hoveredRegion && (() => {
        const regionData = getRegionData(hoveredRegion);
        if (!regionData) return null;

        const tooltipPosition = TOOLTIP_POSITIONS[hoveredRegion];
        if (!tooltipPosition) return null;

        return (
          <div
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
          >
            <RegionTooltip
              region={regionData.name}
              ssi={regionData.ssi}
              level={regionData.level}
              change={regionData.change}
              keywords={regionData.keywords}
              summary={regionData.summary}
              position={tooltipPosition}
              onNavigate={onNavigateToReport}
            />
          </div>
        );
      })()}
    </div>
  );
}


