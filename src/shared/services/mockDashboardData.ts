// 목 데이터 - 나중에 실제 API로 전환 시 이 파일만 수정하면 됩니다

// JSON 데이터 파일 import
import HallimData from '../../data/Hallim.json';
import AewolData from '../../data/Aewol.json';
import JejusiData from '../../data/jejusi.json';
import GujwaData from '../../data/Gujwa.json';
import JocheonData from '../../data/Jocheon.json';
import HangyeongData from '../../data/Hangyeong.json';
import DaejeongData from '../../data/Daejeong.json';
import AndeokData from '../../data/Andeok.json';
import JungmunData from '../../data/Jungmun.json';
import SeogwipoData from '../../data/Seogwipo.json';
import NamwonData from '../../data/Namwon.json';
import PyoseonData from '../../data/Pyoseon.json';
import SeongsanData from '../../data/Seongsan.json';
import { getSSIDataByDateRange, getTrendData, getRiskLevelFromSSI } from '../../features/dashboard/constants/ssiMockData';

// 제주도 전체 데이터를 위한 지역 목록 (제주시와 서귀포시 포함)
const JEJU_DO_REGIONS = ['제주시', '서귀포시'];

export interface RegionSSI {
  지역명: string;
  ssi: number;
}

export interface ChartData {
  jeju_do: number[];
  jeju_si: number[];
  seogwipo: number[];
}

export interface RegionDetail {
  지역명: string;
  ssi: number;
  변화율: string;
  위험도: '안정' | '양호' | '주의' | '경고' | '위험';
  키워드: string[];
  요약: string;
}

// 지역명 매핑 (API의 지역명 형식과 프론트엔드 표시명 매핑)
const REGION_NAME_MAP: Record<string, string> = {
  "구좌읍": "gujwa-uep",
  "조천읍": "jocheon-uep",
  "제주시": "jeju-si",
  "애월읍": "aewol-uep",
  "한림읍": "hallim-uep",
  "한경면": "hangyeong-myeon",
  "대정읍": "daejeong-uep",
  "안덕면": "andeok-myeon",
  "중문": "jungmun",
  "서귀포시": "seogwipo-si",
  "남원읍": "namwon-uep",
  "표선면": "pyoseon-myeon",
  "성산읍": "seongsan-uep",
  "추자면": "chuja-myeon",
  "우도면": "udo-myeon",
};

// 지역별 기본 SSI 데이터
const REGION_SSI_DATA: RegionSSI[] = [
  { 지역명: "구좌읍", ssi: 0.543 },
  { 지역명: "조천읍", ssi: 0.441 },
  { 지역명: "제주시", ssi: 0.420 },
  { 지역명: "애월읍", ssi: 0.494 },
  { 지역명: "한림읍", ssi: 0.329 },
  { 지역명: "한경면", ssi: 0.456 },
  { 지역명: "대정읍", ssi: 0.411 },
  { 지역명: "안덕면", ssi: 0.342 },
  { 지역명: "중문", ssi: 0.401 },
  { 지역명: "서귀포시", ssi: 0.476 },
  { 지역명: "남원읍", ssi: 0.358 },
  { 지역명: "표선면", ssi: 0.371 },
  { 지역명: "성산읍", ssi: 0.385 },
  { 지역명: "추자면", ssi: 0.298 },
  { 지역명: "우도면", ssi: 0.315 },
];

// 지역별 상세 정보 데이터
const REGION_DETAIL_DATA: Record<string, Omit<RegionDetail, '지역명' | 'ssi'>> = {
  "구좌읍": {
    변화율: "+5.2%",
    위험도: "위험",
    키워드: ["관광객 급증", "교통 혼잡", "소음 문제"],
    요약: "관광객 증가로 인한 스트레스 증가. 주차 및 교통 혼잡 문제가 심화되고 있으며, 소음 민원이 지속적으로 발생하고 있습니다."
  },
  "조천읍": {
    변화율: "+1.1%",
    위험도: "주의",
    키워드: ["관광", "교통"],
    요약: "조천읍 지역의 사회적 스트레스 지수가 소폭 상승했습니다. 관광객 증가에 따른 교통 문제가 주요 원인으로 보입니다."
  },
  "제주시": {
    변화율: "+3.1%",
    위험도: "주의",
    키워드: ["관광", "교통", "주거"],
    요약: "제주시 지역의 SSI 지수가 증가했습니다. 관광객 증가와 함께 주거 환경 변화에 대한 우려가 증가하고 있습니다."
  },
  "애월읍": {
    변화율: "+2.3%",
    위험도: "경고",
    키워드: ["관광", "주차", "쓰레기"],
    요약: "애월읍 지역에서는 관광객 증가에 따른 주차 문제, 쓰레기 문제 등 주민 불편 호소가 많았습니다."
  },
  "한림읍": {
    변화율: "-0.5%",
    위험도: "안정",
    키워드: ["관광"],
    요약: "한림읍 지역의 사회적 스트레스 지수는 안정적인 수준을 유지하고 있습니다."
  },
  "한경면": {
    변화율: "+1.8%",
    위험도: "경고",
    키워드: ["관광"],
    요약: "한경면 지역의 SSI 지수가 소폭 상승했습니다."
  },
  "대정읍": {
    변화율: "+0.9%",
    위험도: "주의",
    키워드: ["관광"],
    요약: "대정읍 지역의 사회적 스트레스 지수 정보입니다."
  },
  "안덕면": {
    변화율: "-1.2%",
    위험도: "안정",
    키워드: ["관광"],
    요약: "안덕면 지역의 SSI 지수가 개선되었습니다."
  },
  "중문": {
    변화율: "+0.3%",
    위험도: "양호",
    키워드: ["관광"],
    요약: "중문 지역의 사회적 스트레스 지수는 양호한 수준입니다."
  },
  "서귀포시": {
    변화율: "+2.8%",
    위험도: "경고",
    키워드: ["관광", "물가"],
    요약: "서귀포시 지역의 SSI 지수가 상승했습니다. 관광객 증가와 물가 상승이 주요 원인으로 분석됩니다."
  },
  "남원읍": {
    변화율: "-0.8%",
    위험도: "안정",
    키워드: ["관광"],
    요약: "남원읍 지역의 사회적 스트레스 지수는 안정적입니다."
  },
  "표선면": {
    변화율: "+0.5%",
    위험도: "안정",
    키워드: ["관광"],
    요약: "표선면 지역의 SSI 지수는 안정적인 수준을 유지하고 있습니다."
  },
  "성산읍": {
    변화율: "+1.2%",
    위험도: "안정",
    키워드: ["관광"],
    요약: "성산읍 지역의 사회적 스트레스 지수 정보입니다."
  },
  "추자면": {
    변화율: "-0.3%",
    위험도: "안정",
    키워드: ["관광"],
    요약: "추자면 지역의 SSI 지수는 안정적인 수준입니다."
  },
  "우도면": {
    변화율: "+0.7%",
    위험도: "안정",
    키워드: ["관광"],
    요약: "우도면 지역의 사회적 스트레스 지수 정보입니다."
  },
};

// 날짜 범위에 따른 차트 데이터 생성 함수
function generateChartDataForRegion(
  region: '제주도' | '제주시' | '서귀포시',
  startDate: string,
  endDate: string
): number[] {
  // 날짜 범위 계산
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // 각 지역별 기본 SSI 값 (날짜에 따라 약간의 변동)
  const baseSSI: Record<string, number> = {
    '제주도': 0.492,
    '제주시': 0.420,
    '서귀포시': 0.476,
  };
  
  const baseValue = baseSSI[region] || 0.450;
  
  // 날짜별 데이터 생성 (날짜에 따라 일관된 변동)
  // 지역별로 다른 시드를 사용하여 각 지역마다 다른 패턴 생성
  const regionSeed = region.charCodeAt(0) * 1000 + region.charCodeAt(1) * 100;
  
  return Array.from({ length: Math.min(days, 30) }, (_, i) => {
    // 날짜 기반 시드로 일관된 변동 생성
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const dateSeed = date.getTime() % 10000;
    const combinedSeed = (regionSeed + dateSeed + i * 100) % 10000;
    
    // 더 큰 변동 생성 (±0.08 범위)
    const randomVariation = ((combinedSeed / 10000) - 0.5) * 0.16; // ±0.08 범위
    
    // 시간에 따른 약간의 트렌드 추가 (매우 작은 선형 트렌드)
    const trendFactor = (i / Math.max(days - 1, 1) - 0.5) * 0.02; // ±0.01 범위의 트렌드
    
    // 주기적인 변동 추가 (요일 효과 시뮬레이션)
    const dayOfWeek = date.getDay();
    const weeklyVariation = Math.sin((dayOfWeek / 7) * Math.PI * 2) * 0.02; // ±0.02 범위
    
    const totalVariation = randomVariation + trendFactor + weeklyVariation;
    return Math.max(0, Math.min(1, baseValue + totalVariation));
  });
}

// 간단한 시드 기반 의사 난수 생성 함수
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const mockDashboardData = {
  // 지역별 SSI 지수 조회 - 날짜 범위별 평균값 반환
  getRegionSSI: (startDate: string, endDate: string): RegionSSI[] => {
    // 실제 JSON 파일에서 SSI 데이터를 가져옵니다
    const result = REGION_SSI_DATA.map((region) => {
      try {
        // 실제 JSON 파일에서 날짜 범위에 맞는 SSI 평균값 가져오기
        const { ssi } = getSSIDataByDateRange(region.지역명, startDate, endDate);
        return {
          ...region,
          ssi: ssi, // 평균값
        };
      } catch (error) {
        // 오류 발생 시 기본값 사용
        return region;
      }
    });
    return result;
  },

  // 차트 SSI 추이 조회
  getChartData: (range: 'all' | 'jeju' | 'seogwipo', startDate: string, endDate: string): ChartData => {
    // 실제 JSON 파일에서 차트 데이터 가져오기
    try {
      // 제주시와 서귀포시는 실제 JSON 데이터에서 가져오기
      const jejuSiData = getTrendData('제주시', startDate, endDate);
      const seogwipoData = getTrendData('서귀포시', startDate, endDate);
      
      // 제주도는 제주시와 서귀포시의 평균으로 계산
      // 각 주차별로 평균 계산
      const jejuDoData = jejuSiData.map((_, index) => {
        if (index < seogwipoData.length) {
          return (jejuSiData[index] + seogwipoData[index]) / 2;
        }
        return jejuSiData[index];
      });
      
      return {
        jeju_do: jejuDoData,
        jeju_si: jejuSiData,
        seogwipo: seogwipoData,
      };
    } catch (error) {
      // 오류 발생 시 기본값 사용
      return {
        jeju_do: generateChartDataForRegion('제주도', startDate, endDate),
        jeju_si: generateChartDataForRegion('제주시', startDate, endDate),
        seogwipo: generateChartDataForRegion('서귀포시', startDate, endDate),
      };
    }
  },
  
  // 지역별 최신 SSI 값 조회 (차트 카드용)
  getRegionLatestSSI: (region: string, startDate: string, endDate: string): number => {
    try {
      const { ssi } = getSSIDataByDateRange(region, startDate, endDate);
      return ssi;
    } catch (error) {
      // 기본 데이터 찾기
      const baseData = REGION_SSI_DATA.find(r => r.지역명 === region);
      return baseData?.ssi || 0.400;
    }
  },

    // 지역명을 JSON 데이터로 매핑
  getRegionData: (regionName: string): any => {
    const regionDataMap: Record<string, any> = {
      "한림읍": HallimData,
      "애월읍": AewolData,
      "제주시": JejusiData,
      "구좌읍": GujwaData,
      "조천읍": JocheonData,
      "한경면": HangyeongData,
      "대정읍": DaejeongData,
      "안덕면": AndeokData,
      "중문": JungmunData,
      "서귀포시": SeogwipoData,
      "남원읍": NamwonData,
      "표선면": PyoseonData,
      "성산읍": SeongsanData,
    };
    return regionDataMap[regionName] || null;
  },

  // JSON 파일에서 키워드와 요약 추출
  extractKeywordsAndSummary: (data: any): { keywords: string[]; summary: string } => {
    const keywordsSet = new Set<string>();
    let summary = "";

    // 키워드 추출: 모든 이슈에서 keywords 수집
    if (data.주요_이슈_분석) {
      // 긍정이슈
      if (data.주요_이슈_분석.긍정이슈 && Array.isArray(data.주요_이슈_분석.긍정이슈)) {
        data.주요_이슈_분석.긍정이슈.forEach((issue: any) => {
          if (issue.keywords && Array.isArray(issue.keywords)) {
            issue.keywords.forEach((kw: string) => keywordsSet.add(kw));
          }
        });
      }
      // 부정이슈
      if (data.주요_이슈_분석.부정이슈 && Array.isArray(data.주요_이슈_분석.부정이슈)) {
        data.주요_이슈_분석.부정이슈.forEach((issue: any) => {
          if (issue.keywords && Array.isArray(issue.keywords)) {
            issue.keywords.forEach((kw: string) => keywordsSet.add(kw));
          }
        });
      }
      // 중립이슈
      if (data.주요_이슈_분석.중립이슈 && Array.isArray(data.주요_이슈_분석.중립이슈)) {
        data.주요_이슈_분석.중립이슈.forEach((issue: any) => {
          if (issue.keywords && Array.isArray(issue.keywords)) {
            issue.keywords.forEach((kw: string) => keywordsSet.add(kw));
          }
        });
      }
    }

    // 요약 추출
    if (data.데이터_해석_및_인사이트?.전반적_평가?.summary) {
      summary = data.데이터_해석_및_인사이트.전반적_평가.summary;
    }

    return {
      keywords: Array.from(keywordsSet).slice(0, 3), // 최대 3개로 제한
      summary: summary || ""
    };
  },

  // 지역 상세 정보 조회
  getRegionDetail: async (local: string, startDate: string, endDate: string): Promise<RegionDetail> => {
    // 지역명 매핑 (영문 -> 한글 또는 한글 -> 한글)
    // API는 영문 지역명을 사용하지만, 프론트엔드는 한글을 사용
    const regionName = Object.keys(REGION_NAME_MAP).find(
      key => REGION_NAME_MAP[key] === local
    ) || Object.values(REGION_NAME_MAP).find(value => value === local) 
    || local; // 한글이면 그대로 사용

    // 실제 JSON 파일에서 SSI 데이터 가져오기
    let calculatedSSI = 0.400;
    let change = 0;
    try {
      const { ssi, change: ssiChange } = getSSIDataByDateRange(regionName, startDate, endDate);
      calculatedSSI = ssi;
      change = ssiChange;
    } catch (error) {
      // 기본 데이터 찾기
      const baseData = REGION_SSI_DATA.find(r => r.지역명 === regionName);
      if (baseData) {
        calculatedSSI = baseData.ssi;
      }
    }
    
    // JSON 파일에서 데이터 로드 시도
    let keywords: string[] = [];
    let summary = "";
    
    try {
      const jsonData = mockDashboardData.getRegionData(regionName);
      if (jsonData) {
        const extracted = mockDashboardData.extractKeywordsAndSummary(jsonData);
        keywords = extracted.keywords;
        summary = extracted.summary;
      }
    } catch (error) {
      // JSON 데이터 추출 실패 시 빈 값 사용
    }

    // 위험도 계산 (실제 SSI 값 기반)
    const riskLevel = getRiskLevelFromSSI(calculatedSSI);
    
    // 변화율 텍스트 생성
    const changeText = change > 0 
      ? `+${change.toFixed(1)}%`
      : change < 0 
      ? `${change.toFixed(1)}%`
      : '0.0%';

    // JSON에서 데이터를 가져오지 못한 경우 기본 데이터 사용
    const detailData = REGION_DETAIL_DATA[regionName] || {
      변화율: changeText,
      위험도: riskLevel as '안정' | '양호' | '주의' | '경고' | '위험',
      키워드: keywords.length > 0 ? keywords : ["관광"],
      요약: summary || `${regionName} 지역의 사회적 스트레스 지수 정보입니다.`
    };

    // JSON에서 가져온 키워드와 요약이 있으면 우선 사용
    if (keywords.length > 0) {
      detailData.키워드 = keywords;
    }
    if (summary) {
      detailData.요약 = summary;
    }

    // 실제 계산된 SSI와 변화율, 위험도 사용
    detailData.변화율 = changeText;
    detailData.위험도 = riskLevel as '안정' | '양호' | '주의' | '경고' | '위험';

    return {
      지역명: regionName,
      ssi: calculatedSSI,
      ...detailData,
    };
  },
};

