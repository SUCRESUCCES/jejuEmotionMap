import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../../../shared/utils/supabase/info';
import { getSSIDataByDateRange, getTrendData, getRiskLevelFromSSI } from '../../../features/dashboard/constants/ssiMockData';
import { loadRegionDataFromJson } from '../../../utils/regionDataLoader';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Export RegionAnalysisData type
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
  // JSON 원본 데이터 (상세 인사이트 표시용)
  jsonData?: any;
}

export const useRegionData = (
  selectedRegion: string,
  startDate: string,
  endDate: string
) => {
  const [reportData, setReportData] = useState<RegionAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 1. 먼저 JSON 파일에서 데이터 로드 시도
        const jsonData = await loadRegionDataFromJson(selectedRegion, startDate, endDate);
        
        if (jsonData) {
          // JSON 데이터가 있으면 우선 사용
          setReportData(jsonData);
          setLoading(false);
          return;
        }

        // 2. JSON 데이터가 없으면 Supabase에서 리포트 데이터 가져오기
        const { data, error: fetchError } = await supabase
          .from('regions_analysis')
          .select('*')
          .eq('region_name', selectedRegion);

        if (fetchError) {
          console.error('Error fetching region data:', fetchError);
          setError(fetchError);
        }

        // JSON 파일에서 SSI 데이터 가져오기
        const ssiInfo = getSSIDataByDateRange(selectedRegion, startDate, endDate);
        const trendData = getTrendData(selectedRegion, startDate, endDate);
        
        if (data && data.length > 0) {
          // Supabase 데이터가 있으면 SSI 값과 trend_data를 JSON에서 가져온 값으로 업데이트
          const updatedData: RegionAnalysisData = {
            ...data[0],
            ssi_score: ssiInfo.ssi,
            risk_level: getRiskLevelFromSSI(ssiInfo.ssi),
            trend_data: trendData,
          };
          setReportData(updatedData);
        } else {
          // Supabase 데이터가 없으면 null 반환 (기본 데이터 사용)
          setReportData(null);
        }
      } catch (err) {
        console.error('Error:', err);
        setError(err as Error);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRegion) {
      fetchData();
    }
  }, [selectedRegion, startDate, endDate]);

  return { reportData, loading, error };
};
