// SSI JSON 파일 import
import 제주시SSI from "../../../mocks/제주시_ssi.json";
import 한림읍SSI from "../../../mocks/한림읍_ssi.json";
import 제주도SSI from "../../../mocks/제주도_ssi.json";
import 애월읍SSI from "../../../mocks/애월읍_ssi.json";
import 안덕면SSI from "../../../mocks/안덕면_ssi.json";
import 서귀포시SSI from "../../../mocks/서귀포시_ssi.json";
import 대정읍SSI from "../../../mocks/대정읍_ssi.json";
import 구좌읍SSI from "../../../mocks/구좌읍_ssi.json";
import 성산읍SSI from "../../../mocks/성산읍_ssi.json";
import 표선면SSI from "../../../mocks/표선면_ssi.json";
import 한경면SSI from "../../../mocks/한경면_ssi.json";
import 중문SSI from "../../../mocks/중문_ssi.json";
import 조천읍SSI from "../../../mocks/조천읍_ssi.json";
import 남원읍SSI from "../../../mocks/남원읍_ssi.json";

interface SSIDataPoint {
  date: string;
  ssi: number;
}

/**
 * 날짜 범위별 SSI 데이터 생성 헬퍼 함수
 * 2025년 전체 데이터를 동적으로 생성
 */
function generateRegionSSIData(
  regionName: string,
  baseSSI: number,
  startDate: string = "2025-01-01",
  endDate: string = "2025-12-31",
  trend: "increase" | "decrease" | "stable" = "increase"
): SSIDataPoint[] {
  const data: SSIDataPoint[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  const totalDays = Math.floor(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  for (let i = 0; i <= totalDays; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(currentDate.getDate() + i);

    let ssi = baseSSI;

    // 트렌드에 따른 SSI 변화
    if (trend === "increase") {
      // 점진적 증가 (연간 +0.1 ~ +0.2)
      ssi = baseSSI + (i / totalDays) * 0.15;
    } else if (trend === "decrease") {
      // 점진적 감소 (연간 -0.05 ~ -0.1)
      ssi = baseSSI - (i / totalDays) * 0.08;
    } else {
      // 안정적 (작은 랜덤 변동만)
      ssi = baseSSI;
    }

    // 랜덤 일일 변동 추가 (±0.1 ~ ±0.15) - 소수점 첫 번째 자리 변화를 위해 크게 증가
    const randomVariation = (Math.random() - 0.5) * 0.3;
    ssi += randomVariation;

    // 주간 패턴 추가 (주말에 증가)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      ssi += 0.05; // 주말 스트레스 증가 (더 크게)
    }

    // 월별 패턴 추가 (월 초와 월 말에 변동)
    const dayOfMonth = currentDate.getDate();
    if (dayOfMonth <= 5) {
      // 월 초: 감소
      ssi -= 0.05;
    } else if (dayOfMonth >= 25) {
      // 월 말: 증가
      ssi += 0.05;
    }

    // 주기적인 변동 추가 (약 2주 주기) - 소수점 첫 번째 자리 변화를 위해 크게
    const cycleVariation = Math.sin((i / 14) * Math.PI * 2) * 0.12;
    ssi += cycleVariation;

    // 추가 주기적 변동 (약 1주 주기)
    const weeklyCycle = Math.sin((i / 7) * Math.PI * 2) * 0.06;
    ssi += weeklyCycle;

    // 장기 변동 추가 (약 1개월 주기)
    const monthlyCycle = Math.sin((i / 30) * Math.PI * 2) * 0.08;
    ssi += monthlyCycle;

    // 0.0 ~ 0.8 범위로 제한 (0.8은 극소수로만 나타남)
    if (ssi > 0.8) {
      // 0.8 초과 시 대부분 0.75~0.79로 클리핑, 극소수만 0.8 허용
      if (Math.random() < 0.02) {
        // 2% 확률로만 0.8 허용
        ssi = 0.8;
      } else {
        // 나머지는 0.75~0.79 범위로 클리핑
        ssi = Math.min(0.79, Math.max(0.75, ssi));
      }
    }
    // 0.0 이상으로 제한
    ssi = Math.max(0, ssi);

    data.push({
      date: currentDate.toISOString().split("T")[0],
      ssi: Math.round(ssi * 1000) / 1000,
    });
  }

  return data;
}

// 지역별 기본 SSI 값과 트렌드 설정
const REGION_CONFIG: Record<
  string,
  { baseSSI: number; trend: "increase" | "decrease" | "stable" }
> = {
  구좌읍: { baseSSI: 0.48, trend: "increase" },
  조천읍: { baseSSI: 0.42, trend: "stable" },
  제주시: { baseSSI: 0.38, trend: "increase" },
  애월읍: { baseSSI: 0.45, trend: "increase" },
  한림읍: { baseSSI: 0.32, trend: "stable" },
  한경면: { baseSSI: 0.42, trend: "increase" },
  대정읍: { baseSSI: 0.39, trend: "stable" },
  안덕면: { baseSSI: 0.36, trend: "decrease" },
  중문: { baseSSI: 0.38, trend: "stable" },
  서귀포시: { baseSSI: 0.44, trend: "increase" },
  남원읍: { baseSSI: 0.34, trend: "stable" },
  표선면: { baseSSI: 0.36, trend: "stable" },
  성산읍: { baseSSI: 0.37, trend: "stable" },
  추자면: { baseSSI: 0.31, trend: "decrease" },
  우도면: { baseSSI: 0.31, trend: "stable" },
  제주도: { baseSSI: 0.4, trend: "increase" }, // 제주도 전체 평균
};

// 2025년 전체 데이터 생성 (JSON 데이터와 병합)
function getExtendedRegionData(regionName: string): SSIDataPoint[] {
  const config = REGION_CONFIG[regionName];
  const jsonData = REGION_SSI_DATA_FROM_JSON[regionName];

  if (!config) {
    // 설정이 없으면 JSON 데이터만 사용
    return jsonData || [];
  }

  // JSON 데이터가 있으면 병합, 없으면 생성된 데이터만 사용
  if (jsonData && jsonData.length > 0) {
    // JSON 데이터의 마지막 날짜 확인
    const lastJsonDate = jsonData[jsonData.length - 1].date;
    const lastJsonDateObj = new Date(lastJsonDate);

    // JSON 데이터의 마지막 SSI 값을 기준으로 2025년 데이터 생성
    const lastSSI = jsonData[jsonData.length - 1].ssi;

    // JSON 데이터의 마지막 날짜 다음 날부터 2025년 말까지 데이터 생성
    const nextDate = new Date(lastJsonDateObj);
    nextDate.setDate(nextDate.getDate() + 1);
    const nextDateStr = nextDate.toISOString().split("T")[0];

    // 2025년 데이터 생성 (JSON 데이터 이후부터)
    const generatedData = generateRegionSSIData(
      regionName,
      lastSSI, // JSON 데이터의 마지막 SSI 값을 시작점으로 사용
      nextDateStr,
      "2025-12-31",
      config.trend
    );

    // JSON 데이터와 생성된 데이터 병합
    return [...jsonData, ...generatedData];
  } else {
    // JSON 데이터가 없으면 2025년 전체 데이터 생성
    const generatedData = generateRegionSSIData(
      regionName,
      config.baseSSI,
      "2025-01-01",
      "2025-12-31",
      config.trend
    );

    return generatedData;
  }
}

// JSON 파일에서 로드한 원본 데이터
const REGION_SSI_DATA_FROM_JSON: Record<string, SSIDataPoint[]> = {
  제주시: 제주시SSI as SSIDataPoint[],
  한림읍: 한림읍SSI as SSIDataPoint[],
  제주도: 제주도SSI as SSIDataPoint[],
  애월읍: 애월읍SSI as SSIDataPoint[],
  안덕면: 안덕면SSI as SSIDataPoint[],
  서귀포시: 서귀포시SSI as SSIDataPoint[],
  대정읍: 대정읍SSI as SSIDataPoint[],
  구좌읍: 구좌읍SSI as SSIDataPoint[],
  성산읍: 성산읍SSI as SSIDataPoint[],
  표선면: 표선면SSI as SSIDataPoint[],
  한경면: 한경면SSI as SSIDataPoint[],
  중문: 중문SSI as SSIDataPoint[],
  조천읍: 조천읍SSI as SSIDataPoint[],
  남원읍: 남원읍SSI as SSIDataPoint[],
};

// 확장된 지역별 SSI 데이터 매핑 (2025년 전체 데이터 포함)
const REGION_SSI_DATA: Record<string, SSIDataPoint[]> = {};
Object.keys(REGION_CONFIG).forEach((regionName) => {
  REGION_SSI_DATA[regionName] = getExtendedRegionData(regionName);
});

// JSON 데이터에만 있는 지역도 추가
Object.keys(REGION_SSI_DATA_FROM_JSON).forEach((regionName) => {
  if (!REGION_SSI_DATA[regionName]) {
    REGION_SSI_DATA[regionName] = REGION_SSI_DATA_FROM_JSON[regionName];
  }
});

/**
 * 날짜 범위에 따른 SSI 데이터를 가져오는 함수
 * ⚠️ 중요: 최신값이 아닌 기간 내 모든 SSI 값의 평균을 반환합니다
 * @param region 지역명
 * @param startDate 시작 날짜 (YYYY-MM-DD)
 * @param endDate 종료 날짜 (YYYY-MM-DD)
 * @returns SSI 평균값과 변화율
 */
export function getSSIDataByDateRange(
  region: string,
  startDate: string,
  endDate: string
): { ssi: number; change: number } {
  const regionData = REGION_SSI_DATA[region];

  if (!regionData || regionData.length === 0) {
    return { ssi: 0.4, change: 0 };
  }

  // 날짜 범위 내의 데이터 필터링
  const filteredData = regionData.filter(
    (point) => point.date >= startDate && point.date <= endDate
  );

  if (filteredData.length === 0) {
    // 범위 내 데이터가 없으면 가장 가까운 날짜 범위의 데이터 사용
    if (regionData.length === 0) {
      return { ssi: 0.4, change: 0 };
    }

    // 요청된 날짜 범위가 데이터 범위 밖인지 확인
    const dataStartDate = regionData[0].date;
    const dataEndDate = regionData[regionData.length - 1].date;

    // 요청된 날짜가 데이터 범위보다 이전이면 가장 초기 데이터 사용
    if (endDate < dataStartDate) {
      const earlyData = regionData.slice(0, Math.min(7, regionData.length));
      const avgSSI =
        earlyData.reduce((sum, point) => sum + point.ssi, 0) / earlyData.length;
      return { ssi: avgSSI, change: 0 };
    }

    // 요청된 날짜가 데이터 범위보다 이후이면 가장 최근 데이터 사용
    if (startDate > dataEndDate) {
      const recentData = regionData.slice(-Math.min(7, regionData.length));
      const avgSSI =
        recentData.reduce((sum, point) => sum + point.ssi, 0) /
        recentData.length;
      return { ssi: avgSSI, change: 0 };
    }

    // 범위 내 데이터가 없지만 날짜 범위는 겹치는 경우 전체 평균 사용
    const avgSSI =
      regionData.reduce((sum, point) => sum + point.ssi, 0) / regionData.length;
    return { ssi: avgSSI, change: 0 };
  }

  // ⚠️ 기간 내 모든 SSI 값의 평균 계산 (최신값이 아님!)
  // 모든 데이터 포인트의 SSI 값을 합산하여 평균 계산
  const sumSSI = filteredData.reduce((sum, point) => sum + point.ssi, 0);
  const avgSSI = sumSSI / filteredData.length;

  // 변화율 계산 (첫 날짜와 마지막 날짜 비교)
  const firstSSI = filteredData[0].ssi;
  const lastSSI = filteredData[filteredData.length - 1].ssi;
  const change = firstSSI > 0 ? ((lastSSI - firstSSI) / firstSSI) * 100 : 0;

  return {
    ssi: avgSSI,
    change,
  };
}

/**
 * 최근 8주 추이 데이터 계산 (7일 단위)
 * @param region 지역명
 * @param startDate 시작 날짜 (YYYY-MM-DD)
 * @param endDate 종료 날짜 (YYYY-MM-DD)
 * @returns 8주간의 SSI 값 배열
 */
export function getTrendData(
  region: string,
  startDate: string,
  endDate: string
): number[] {
  const regionData = REGION_SSI_DATA[region];

  if (!regionData || regionData.length === 0) {
    return [0.52, 0.54, 0.58, 0.55, 0.59, 0.62, 0.65, 0.68];
  }

  // 날짜 범위 내의 데이터 필터링
  const filteredData = regionData.filter(
    (point) => point.date >= startDate && point.date <= endDate
  );

  if (filteredData.length === 0) {
    // 범위 내 데이터가 없으면 전체 데이터의 최근 8주 사용
    const recentData = regionData.slice(-56); // 최근 56일 (8주)
    if (recentData.length === 0) {
      return [0.52, 0.54, 0.58, 0.55, 0.59, 0.62, 0.65, 0.68];
    }

    const weeklyData: number[] = [];
    for (let i = 0; i < 8; i++) {
      const weekStart = i * 7;
      const weekEnd = Math.min(weekStart + 7, recentData.length);
      if (weekStart < recentData.length) {
        const weekData = recentData.slice(weekStart, weekEnd);
        const avgSSI =
          weekData.reduce((sum, point) => sum + point.ssi, 0) / weekData.length;
        weeklyData.push(avgSSI);
      } else {
        weeklyData.push(weeklyData[weeklyData.length - 1] || 0.5);
      }
    }
    return weeklyData.length === 8
      ? weeklyData
      : [0.52, 0.54, 0.58, 0.55, 0.59, 0.62, 0.65, 0.68];
  }

  // 7일 단위로 그룹화하여 평균 계산
  const weeklyData: number[] = [];
  const daysPerWeek = 7;

  for (let i = 0; i < 8; i++) {
    const weekStart = i * daysPerWeek;
    const weekEnd = Math.min(weekStart + daysPerWeek, filteredData.length);

    if (weekStart < filteredData.length) {
      const weekData = filteredData.slice(weekStart, weekEnd);
      const avgSSI =
        weekData.reduce((sum, point) => sum + point.ssi, 0) / weekData.length;
      weeklyData.push(avgSSI);
    } else {
      // 데이터가 부족하면 마지막 값 사용
      weeklyData.push(weeklyData[weeklyData.length - 1] || 0.5);
    }
  }

  return weeklyData.length === 8
    ? weeklyData
    : [0.52, 0.54, 0.58, 0.55, 0.59, 0.62, 0.65, 0.68];
}

/**
 * SSI 값에 따른 위험도 계산
 */
export function getRiskLevelFromSSI(ssi: number): string {
  if (ssi >= 0.7) return "위험";
  if (ssi >= 0.6) return "경고";
  if (ssi >= 0.5) return "주의";
  if (ssi >= 0.4) return "양호";
  return "안정";
}
