import { RegionAnalysisData } from '../features/chat/hooks/useRegionData';
import { getSSIDataByDateRange, getTrendData, getRiskLevelFromSSI } from '../features/dashboard/constants/ssiMockData';

// 지역명을 JSON 파일명으로 매핑
const REGION_TO_FILE_MAP: Record<string, string> = {
  "제주시": "jejusi",
  "제주시 전체": "jejusi",
  "애월읍": "Aewol",
  "구좌읍": "Gujwa",
  "조천읍": "Jocheon",
  "한림읍": "Hallim",
  "한경면": "Hangyeong",
  "대정읍": "Daejeong",
  "안덕면": "Andeok",
  "중문": "Jungmun",
  "서귀포시": "Seogwipo",
  "서귀포시 전체": "Seogwipo",
  "남원읍": "Namwon",
  "표선면": "Pyoseon",
  "성산읍": "Seongsan",
};

// JSON 데이터 타입 정의
interface JsonIssue {
  number: string;
  title: string;
  description: string;
  sample_count?: number;
  severity?: string;
  keywords?: string[];
  sample_quotes?: string[];
}

interface JsonData {
  region_name: string;
  analysis_period: string;
  total_posts: number;
  주요_이슈_분석: {
    긍정이슈?: JsonIssue[];
    부정이슈?: JsonIssue[];
    중립이슈?: JsonIssue[];
  };
  데이터_해석_및_인사이트?: {
    전반적_평가?: {
      title: string;
      summary: string;
    };
    주요_발견사항?: Array<{
      number: string;
      title: string;
      content: string;
    }>;
    심층_분석?: Array<{
      section_title: string;
      analysis: string;
      key_data?: string[];
    }>;
    정신건강_우려사항?: {
      title: string;
      content: string;
    };
    데이터_한계?: {
      title: string;
      limitations?: string[];
      recommendation?: string;
    };
  };
}

/**
 * JSON 데이터를 RegionAnalysisData 형식으로 변환
 */
export function convertJsonToRegionData(
  jsonData: JsonData,
  startDate: string,
  endDate: string
): RegionAnalysisData {
  const ssiInfo = getSSIDataByDateRange(jsonData.region_name, startDate, endDate);
  const trendData = getTrendData(jsonData.region_name, startDate, endDate);

  // 긍정 이슈 변환
  const positive_issues = (jsonData.주요_이슈_분석.긍정이슈 || []).map((issue) => {
    // sample_quotes가 있으면 사용, 없으면 description을 voices로 사용
    const voices = issue.sample_quotes && issue.sample_quotes.length > 0 
      ? issue.sample_quotes 
      : [issue.description];
    
    return {
      keyword: issue.title,
      voices: voices,
      context: issue.description,
      sample_count: issue.sample_count,
    };
  });

  // 부정 이슈 변환
  const negative_issues = (jsonData.주요_이슈_분석.부정이슈 || []).map((issue) => {
    // sample_quotes가 있으면 사용, 없으면 description을 voices로 사용
    const voices = issue.sample_quotes && issue.sample_quotes.length > 0 
      ? issue.sample_quotes 
      : [issue.description];
    
    return {
      keyword: issue.title,
      severity: issue.severity === 'high' ? '심각' : issue.severity === 'medium' ? '중간' : issue.severity === 'low' ? '낮음' : undefined,
      voices: voices,
      context: issue.description,
      related_issues: issue.keywords?.join(', '),
      sample_count: issue.sample_count,
    };
  });

  // 중립 이슈 변환
  const neutral_issues = (jsonData.주요_이슈_분석.중립이슈 || []).map((issue) => ({
    keyword: issue.title,
    voices: [issue.description],
    context: issue.description,
    sample_count: issue.sample_count,
  }));

  // 인사이트 변환
  const insights = jsonData.데이터_해석_및_인사이트?.주요_발견사항?.map((finding) => ({
    title: finding.title,
    description: finding.content,
  })) || [];

  return {
    region_name: jsonData.region_name,
    ssi_score: ssiInfo.ssi,
    risk_level: getRiskLevelFromSSI(ssiInfo.ssi),
    total_posts: jsonData.total_posts,
    positive_issues,
    negative_issues,
    neutral_issues,
    trend_data: trendData,
    insights,
    // JSON의 상세 데이터를 저장 (컴포넌트에서 사용)
    jsonData: jsonData as any,
  };
}

/**
 * 지역명으로 JSON 파일을 로드하고 RegionAnalysisData로 변환
 */
export async function loadRegionDataFromJson(
  regionName: string,
  startDate: string,
  endDate: string
): Promise<RegionAnalysisData | null> {
  try {
    const fileName = REGION_TO_FILE_MAP[regionName];
    if (!fileName) {
      console.warn(`No JSON file mapping found for region: ${regionName}`);
      return null;
    }

    // JSON 파일 동적 import
    const jsonModule = await import(`../data/${fileName}.json`);
    const jsonData: JsonData = jsonModule.default || jsonModule;

    return convertJsonToRegionData(jsonData, startDate, endDate);
  } catch (error) {
    console.error(`Error loading JSON data for ${regionName}:`, error);
    return null;
  }
}

