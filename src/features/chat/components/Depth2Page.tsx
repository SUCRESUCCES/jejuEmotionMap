import Depth2Report from "../ChatPage";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../../shared/utils/supabase/info";

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface Depth2PageProps {
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

interface RegionAnalysisData {
  region_name: string;
  ssi_score: number;
  risk_level: string;
  total_posts: number;
  issues: Array<{
    category: string;
    severity: 'High' | 'Medium' | 'Low';
    summary: string;
    description: string;
    quote: string;
    count: number;
  }>;
  policies: Array<{
    priority: string;
    title: string;
    description: string;
  }>;
  trend_data: number[];
}

export default function Depth2Page({ 
  selectedRegion, 
  onBack, 
  startDate, 
  endDate,
  tempStartDate,
  tempEndDate,
  onTempStartDateChange,
  onTempEndDateChange,
  onSearch
}: Depth2PageProps) {
  const [reportData, setReportData] = useState<RegionAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('regions_analysis')
          .select('*')
          .eq('region_name', selectedRegion);

        if (error) {
          console.error('Error fetching region data:', error);
          // 에러 시 기본 데이터 사용
          setReportData(null);
        } else if (data && data.length > 0) {
          setReportData(data[0]);
        } else {
          // 데이터가 없으면 null (기본 데이터 사용)
          setReportData(null);
        }
      } catch (err) {
        console.error('Error:', err);
        setReportData(null);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRegion) {
      fetchData();
    }
  }, [selectedRegion, startDate, endDate]);

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="mx-auto max-w-[1440px] w-full px-4">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={onBack}
          className="fixed top-8 left-8 z-50 bg-white/90 hover:bg-white rounded-xl px-6 py-3 shadow-lg transition-all flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#00a3e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold text-[14px] text-[#00a3e0]">
            대시보드로 돌아가기
          </span>
        </button>
        
        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#00BFA5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-[16px] text-[#455A64]">데이터를 불러오는 중...</p>
            </div>
          </div>
        ) : (
          <Depth2Report 
            startDate={startDate} 
            endDate={endDate}
            tempStartDate={tempStartDate}
            tempEndDate={tempEndDate}
            onTempStartDateChange={onTempStartDateChange}
            onTempEndDateChange={onTempEndDateChange}
            onSearch={onSearch}
            reportData={reportData}
            selectedRegion={selectedRegion}
          />
        )}
      </div>
    </div>
  );
}