// 지역 분석 데이터 타입
export interface RegionAnalysisData {
  region_name: string;
  ssi_score: number;
  risk_level: string;
  total_posts: number;
  platform_distribution?: Array<{
    platform: string;
    count: number;
    color: string;
  }>;
  positive_issues: Array<{
    keyword: string;
    voices: string[];
    context?: string;
    related_issues?: string;
  }>;
  negative_issues: Array<{
    keyword: string;
    severity?: string;
    voices: string[];
    context?: string;
    related_issues?: string;
  }>;
  neutral_issues?: Array<{
    keyword: string;
    voices: string[];
    context?: string;
    related_issues?: string;
  }>;
  trend_data: number[];
  insights?: Array<{
    title: string;
    description: string;
    details?: string[];
  }>;
  jsonData?: any; // JSON 리포트 원본 데이터
}

// Depth2 페이지 Props
export interface Depth2PageProps {
  selectedRegion: string;
  onBack: () => void;
  startDate: string;
  endDate: string;
  tempStartDate: string;
  tempEndDate: string;
  onTempStartDateChange: (date: string) => void;
  onTempEndDateChange: (date: string) => void;
  onSearch: () => void;
}

// Depth2 리포트 Props
export interface Depth2ReportProps {
  startDate: string;
  endDate: string;
  tempStartDate: string;
  tempEndDate: string;
  onTempStartDateChange: (date: string) => void;
  onTempEndDateChange: (date: string) => void;
  onSearch: () => void;
  reportData: RegionAnalysisData | null;
  selectedRegion: string;
}
