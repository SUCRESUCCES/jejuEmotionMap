/**
 * SSI (Social Stress Index) 레벨 및 색상 유틸리티 함수
 */

export type SSILevel = 'safe' | 'good' | 'caution' | 'warning' | 'danger';

export interface SSILevelInfo {
  level: SSILevel;
  levelKo: string;
  min: number;
  max: number;
}

/**
 * SSI 점수에 따른 레벨 정보 반환
 */
export function getSSILevel(ssi: number): SSILevelInfo {
  if (ssi < 0.3) {
    return { level: 'safe', levelKo: '안정', min: 0.0, max: 0.3 };
  } else if (ssi < 0.4) {
    return { level: 'good', levelKo: '양호', min: 0.3, max: 0.4 };
  } else if (ssi < 0.5) {
    return { level: 'caution', levelKo: '주의', min: 0.4, max: 0.5 };
  } else if (ssi < 0.6) {
    return { level: 'warning', levelKo: '경고', min: 0.5, max: 0.6 };
  } else {
    return { level: 'danger', levelKo: '위험', min: 0.6, max: 1.0 };
  }
}

/**
 * SSI 점수를 포맷팅하여 반환 (소수점 3자리)
 */
export function formatSSI(ssi: number): string {
  return ssi.toFixed(3);
}

/**
 * SSI 점수에 따른 폴리곤 색상 (fill + stroke) 반환
 */
export function getSSIPolygonColors(ssi: number): {
  fill: string;
  stroke: string;
} {
  const levelInfo = getSSILevel(ssi);
  
  const colorMap: Record<SSILevel, { fill: string; stroke: string }> = {
    safe: { fill: '#AAF3DB', stroke: '#0F9166' },
    good: { fill: '#DFFBB4', stroke: '#5A9008' },
    caution: { fill: '#FEE5A1', stroke: '#DC7D00' },
    warning: { fill: '#F9CCB5', stroke: '#E34E04' },
    danger: { fill: '#FFBEBE', stroke: '#EB1F1F' },
  };
  
  return colorMap[levelInfo.level];
}








