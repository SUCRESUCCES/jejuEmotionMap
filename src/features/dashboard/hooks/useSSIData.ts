import { useMemo } from 'react';
import { getSSIDataByDateRange } from '../constants/ssiMockData';

export interface SSIDataResult {
  ssi: string; // 포맷된 SSI 값 (예: "0.492")
  change: string; // 포맷된 변화율 (예: "2.3%")
}

/**
 * 기간별 SSI 데이터를 가져오는 hook
 * @param region 지역명 ('제주도', '제주시', '서귀포시')
 * @param startDate 시작 날짜 (YYYY-MM-DD)
 * @param endDate 종료 날짜 (YYYY-MM-DD)
 * @returns SSI 값과 변화율
 */
export const useSSIData = (
  region: string,
  startDate: string,
  endDate: string
): SSIDataResult => {
  const data = useMemo(() => {
    if (!startDate || !endDate) {
      // 날짜가 없으면 기본값 반환
      return {
        ssi: '0.490',
        change: '0%',
      };
    }

    const { ssi, change } = getSSIDataByDateRange(region, startDate, endDate);

    return {
      ssi: ssi.toFixed(3),
      change: change > 0 ? `${change.toFixed(1)}%` : `${Math.abs(change).toFixed(1)}%`,
    };
  }, [region, startDate, endDate]);

  return data;
};








