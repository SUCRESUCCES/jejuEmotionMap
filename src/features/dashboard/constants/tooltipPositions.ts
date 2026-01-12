// 각 지역별 툴팁 위치 데이터
export const REGION_TOOLTIP_POSITIONS: { [key: string]: { left: number; top: number } } = {
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

export const getTooltipPosition = (region: string) => {
  return REGION_TOOLTIP_POSITIONS[region] || { left: 500, top: 200 };
};
