import { RegionData, Position, RiskLevel } from '../components/Map/types';

export const REGIONS: RegionData[] = [
  {
    name: "구좌읍",
    ssi: 0.543,
    level: "danger",
    change: -1.2,
    keywords: ["관광", "물가", "중국인"],
    summary: "'애월읍' 지역에서는 관광객 증가에 따른 주차 문제, 쓰레기 문제 등 주민 불편 호소가 많았습니다.\n중국인 관광객이 급증하며 관광 매너가 잘 지켜지지 않는다는 언급이 많았습니다."
  },
  {
    name: "조천읍",
    ssi: 0.441,
    level: "caution",
    change: 0,
    keywords: ["관광", "교통"],
    summary: "조천읍 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "제주시",
    ssi: 0.420,
    level: "caution",
    change: 0,
    keywords: ["관광", "교통", "주거"],
    summary: "제주시 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "애월읍",
    ssi: 0.494,
    level: "warning",
    change: 0,
    keywords: ["관광", "주차", "쓰레기"],
    summary: "애월읍 지역에서는 관광객 증가에 따른 주차 문제, 쓰레기 문제 등 주민 불편 호소가 많았습니다."
  },
  {
    name: "한림읍",
    ssi: 0.329,
    level: "stable",
    change: 0,
    keywords: ["관광"],
    summary: "한림읍 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "한경면",
    ssi: 0.456,
    level: "warning",
    change: 0,
    keywords: ["관광"],
    summary: "한경면 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "대정읍",
    ssi: 0.411,
    level: "caution",
    change: 0,
    keywords: ["관광"],
    summary: "대정읍 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "안덕면",
    ssi: 0.342,
    level: "stable",
    change: 0,
    keywords: ["관광"],
    summary: "안덕면 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "중문",
    ssi: 0.401,
    level: "safe",
    change: 0,
    keywords: ["관광"],
    summary: "중문 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "서귀포시",
    ssi: 0.476,
    level: "warning",
    change: 0,
    keywords: ["관광", "물가"],
    summary: "서귀포시 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "남원읍",
    ssi: 0.358,
    level: "stable",
    change: 0,
    keywords: ["관광"],
    summary: "남원읍 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "표선면",
    ssi: 0.371,
    level: "stable",
    change: 0,
    keywords: ["관광"],
    summary: "표선면 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "성산읍",
    ssi: 0.385,
    level: "stable",
    change: 0,
    keywords: ["관광"],
    summary: "성산읍 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "추자면",
    ssi: 0.298,
    level: "stable",
    change: 0,
    keywords: ["관광"],
    summary: "추자면 지역의 사회적 스트레스 지수 정보입니다."
  },
  {
    name: "우도면",
    ssi: 0.315,
    level: "stable",
    change: 0,
    keywords: ["관광"],
    summary: "우도면 지역의 사회적 스트레스 지수 정보입니다."
  },
];

export const REGION_POSITIONS: Record<string, Position> = {
  "구좌읍": { left: 724, top: 66, width: 124, height: 120 },
  "조천읍": { left: 611, top: 109, width: 94, height: 126 },
  "제주시": { left: 385, top: 130, width: 182, height: 146 },
  "애월읍": { left: 242, top: 178, width: 118, height: 146 },
  "한림읍": { left: 136, top: 274, width: 69, height: 77 },
  "한경면": { left: 68, top: 349, width: 66, height: 70 },
  "대정읍": { left: 104, top: 446, width: 71, height: 86 },
  "안덕면": { left: 194, top: 379, width: 80, height: 128 },
  "중문": { left: 343, top: 372, width: 120, height: 130 },
  "서귀포시": { left: 473, top: 378, width: 86, height: 111 },
  "남원읍": { left: 573, top: 320, width: 147, height: 125 },
  "표선면": { left: 710.21, top: 245.53, width: 136.581, height: 151.947 },
  "성산읍": { left: 810, top: 172.36, width: 141.394, height: 165.857 },
  "추자면": { left: 106, top: -1, width: 151, height: 93 },
  "우도면": { left: 962, top: 52, width: 106, height: 93 },
};

export const TOOLTIP_POSITIONS: Record<string, { left: number; top: number }> = {
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

export const getRegionData = (name: string): RegionData | undefined => {
  return REGIONS.find(r => r.name === name);
};

export const getRiskLevelColor = (level: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    safe: '#5A9008',
    stable: '#0F9166',
    caution: '#DC7D00',
    warning: '#E34E04',
    danger: '#EB1F1F',
  };
  return colors[level];
};

export const getRiskLevelText = (level: RiskLevel): string => {
  const texts: Record<RiskLevel, string> = {
    safe: '양호',
    stable: '안정',
    caution: '주의',
    warning: '경고',
    danger: '위험',
  };
  return texts[level];
};

// Frame 컴포넌트에서 사용할 지역별 데이터를 가져오는 헬퍼 함수
export const getRegionDataForTooltip = (name: string) => {
  const region = getRegionData(name);
  if (!region) return null;
  
  const riskColor = getRiskLevelColor(region.level);
  const riskLevel = getRiskLevelText(region.level);
  const changeText = region.change > 0 
    ? `${region.change}% ↑` 
    : region.change < 0 
    ? `${Math.abs(region.change)}% ↓` 
    : '0%';
  
  return {
    regionName: region.name,
    ssi: region.ssi.toFixed(3),
    change: changeText,
    riskLevel,
    riskColor,
    keywords: region.keywords,
    summary: region.summary,
  };
};

