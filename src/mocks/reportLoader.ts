// JSON 파일 import (실제 파일명에 맞게)
import gujwaData from './Gujwa.json';
import jejusiData from './jejusi.json';
import seogwipoData from './Seogwipo.json';
import aewolData from './Aewol.json';
import jocheonData from './Jocheon.json';
import hallimData from './Hallim.json';
import hangyeongData from './Hangyeong.json';
import daejeongData from './Daejeong.json';
import andeokData from './Andeok.json';
import jungmunData from './Jungmun.json';
import namwonData from './Namwon.json';
import pyoseonData from './Pyoseon.json';
import seongsanData from './Seongsan.json';

// 타입 정의 (실제 JSON 구조에 맞게)
export interface OpinionItem {
  category: string;
  count: number;
  comments: string[];
  description?: string;
  severity?: string;
}

export interface Finding {
  title: string;
  dataCount: number;
  interpretation: string;
  context?: string;
  opinions?: string[];
}

export interface Pattern {
  title: string;
  observation: string;
  interpretation: string;
}

export interface RegionReport {
  region: string;
  // 주요 이슈 분석
  positive: OpinionItem[];
  negative: OpinionItem[];
  neutral?: OpinionItem[];
  totalPositive: number;
  totalNegative: number;
  totalNeutral?: number;
  
  // 데이터 해석 및 인사이트
  overview: {
    totalPosts: number;
    analyzedPosts: number;
    summaryText: string;
  };
  findings: Finding[];
  patterns?: Pattern[];
  additionalInsights?: {
    title: string;
    items: string[];
  }[];
}

// 기존 JSON 데이터 타입 (실제 구조)
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
  analysis_period?: string;
  total_posts: number;
  주요_이슈_분석?: {
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
  };
}

/**
 * JSON 데이터를 RegionReport 형식으로 변환
 */
function convertJsonToReport(jsonData: JsonData): RegionReport {
  // 긍정적 의견 변환
  const positive: OpinionItem[] = (jsonData.주요_이슈_분석?.긍정이슈 || []).map((issue) => ({
    category: issue.title,
    count: issue.sample_count || 0,
    comments: issue.sample_quotes || [issue.description],
    description: issue.description,
  }));

  // 부정적 의견 변환
  const negative: OpinionItem[] = (jsonData.주요_이슈_분석?.부정이슈 || []).map((issue) => ({
    category: issue.title,
    count: issue.sample_count || 0,
    comments: issue.sample_quotes || [issue.description],
    description: issue.description,
    severity: issue.severity,
  }));

  // 중립적 의견 변환
  const neutral: OpinionItem[] = (jsonData.주요_이슈_분석?.중립이슈 || []).map((issue) => ({
    category: issue.title,
    count: issue.sample_count || 0,
    comments: [issue.description],
    description: issue.description,
  }));

  // 총합 계산
  const totalPositive = positive.reduce((sum, item) => sum + item.count, 0);
  const totalNegative = negative.reduce((sum, item) => sum + item.count, 0);
  const totalNeutral = neutral.reduce((sum, item) => sum + item.count, 0);

  // 분석된 게시글 수 계산
  const analyzedPosts = totalPositive + totalNegative + (totalNeutral || 0);

  // 주요 발견사항 변환
  const findings: Finding[] = (jsonData.데이터_해석_및_인사이트?.주요_발견사항 || []).map((finding) => {
    // content에서 데이터 개수 추출 시도
    const countMatch = finding.content.match(/(\d+)건/);
    const dataCount = countMatch ? parseInt(countMatch[1], 10) : 0;
    
    return {
      title: finding.title,
      dataCount,
      interpretation: finding.content,
      context: finding.content,
    };
  });

  // 심층_분석을 패턴으로 변환
  const patterns: Pattern[] = (jsonData.데이터_해석_및_인사이트?.심층_분석 || []).map((analysis) => ({
    title: analysis.section_title,
    observation: analysis.analysis,
    interpretation: analysis.analysis,
  }));

  // Overview 생성
  const overviewText = jsonData.데이터_해석_및_인사이트?.전반적_평가?.summary || 
    `${jsonData.region_name} 관련 게시글 ${jsonData.total_posts}건 중 ${analyzedPosts}건에서 지역 생활과 관련된 의견이 확인되었습니다.`;

  return {
    region: jsonData.region_name,
    positive,
    negative,
    neutral: neutral.length > 0 ? neutral : undefined,
    totalPositive,
    totalNegative,
    totalNeutral: totalNeutral > 0 ? totalNeutral : undefined,
    overview: {
      totalPosts: jsonData.total_posts,
      analyzedPosts,
      summaryText: overviewText,
    },
    findings,
    patterns: patterns.length > 0 ? patterns : undefined,
  };
}

// 지역명 매핑
const regionMap: Record<string, JsonData> = {
  '제주시': jejusiData as JsonData,
  '제주시 전체': jejusiData as JsonData,  // 제주시 전체도 동일 데이터 사용
  '서귀포시': seogwipoData as JsonData,
  '서귀포시 전체': seogwipoData as JsonData,  // 서귀포시 전체도 동일 데이터 사용
  '구좌읍': gujwaData as JsonData,
  '조천읍': jocheonData as JsonData,
  '애월읍': aewolData as JsonData,
  '한림읍': hallimData as JsonData,
  '한경면': hangyeongData as JsonData,
  '대정읍': daejeongData as JsonData,
  '안덕면': andeokData as JsonData,
  '중문': jungmunData as JsonData,
  '남원읍': namwonData as JsonData,
  '표선면': pyoseonData as JsonData,
  '성산읍': seongsanData as JsonData,
};

// 초기화 시 JSON 파일 로드 확인 (모듈 로드 시 실행됨)
if (typeof window !== 'undefined') {
  console.log('📦 [reportLoader] 모듈 로드 완료!');
  console.log('  - 제주시:', jejusiData ? '✅' : '❌', jejusiData?.region_name || 'N/A');
  console.log('  - 구좌읍:', gujwaData ? '✅' : '❌', gujwaData?.region_name || 'N/A');
  console.log('  - regionMap 키:', Object.keys(regionMap).slice(0, 5).join(', '), '...');
}

/**
 * 지역명으로 리포트 데이터 가져오기
 */
export function getRegionReport(regionName: string): RegionReport | null {
  console.log(`🔍 getRegionReport 호출: regionName="${regionName}"`);
  console.log(`📋 사용 가능한 지역 키:`, Object.keys(regionMap));
  
  if (!regionName) {
    console.warn(`⚠️ 지역명이 제공되지 않았습니다.`);
    return null;
  }

  // 1. regionName이 정확히 매칭되는지 확인
  let data = regionMap[regionName];
  if (data) {
    console.log(`✅ 정확한 키 매칭 성공: "${regionName}"`);
  } else {
    console.log(`❌ 정확한 키 매칭 실패, region_name으로 검색 시도...`);
    
    // 2. 정확한 매칭이 없으면, region_name을 기준으로 찾기
    // 모든 JSON 데이터의 region_name을 확인
    for (const key in regionMap) {
      const jsonData = regionMap[key];
      const jsonRegionName = jsonData.region_name;
      
      console.log(`  비교: "${regionName}" vs "${jsonRegionName}"`);
      
      // 정확히 일치하거나, "전체"를 제거한 이름과 일치하는지 확인
      if (jsonRegionName === regionName || 
          jsonRegionName.replace(' 전체', '') === regionName ||
          jsonRegionName === `${regionName} 전체` ||
          regionName.replace(' 전체', '') === jsonRegionName.replace(' 전체', '')) {
        data = jsonData;
        console.log(`✅ region_name 매칭 성공: "${regionName}" -> "${jsonRegionName}"`);
        break;
      }
    }
  }
  
  if (!data) {
    console.warn(`⚠️ ${regionName} 리포트 데이터를 찾을 수 없습니다.`);
    console.warn(`📋 regionMap의 모든 region_name 목록:`, Object.values(regionMap).map(d => d.region_name));
    return null;
  }
  
  const report = convertJsonToReport(data);
  console.log(`✅ ${regionName} 리포트 로드 완료! (데이터 지역: ${report.region}, 긍정: ${report.totalPositive}, 부정: ${report.totalNegative})`);
  return report;
}

/**
 * 사용 가능한 지역 목록
 */
export function getAvailableRegions(): string[] {
  return Object.keys(regionMap);
}

