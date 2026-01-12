import React from 'react';

export type RiskLevel = 'safe' | 'stable' | 'caution' | 'warning' | 'danger';

export interface RegionData {
  name: string;
  ssi: number;
  level: RiskLevel;
  change: number; // 변화율 (%)
  keywords: string[];
  summary: string;
}

export interface Position {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface RegionPolygonProps {
  region: string;
  position: Position;
  ssi?: number;
  level?: RiskLevel;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  className?: string;
  key?: React.Key;
}

export interface RegionTooltipProps {
  region: string;
  ssi: number;
  level: RiskLevel;
  change: number;
  keywords: string[];
  summary: string;
  position: { left: number; top: number };
  onNavigate?: (region: string) => void;
}


