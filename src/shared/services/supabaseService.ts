import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { RegionSSI, ChartData, RegionDetail } from './dashboardApi';

// Supabase 클라이언트 생성
const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// 지역명 매핑 (한글 <-> 영문)
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
  "제주도": "jeju-do", // 전체 제주도
};

// 영문 -> 한글 매핑
const REVERSE_REGION_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(REGION_NAME_MAP).map(([k, v]) => [v, k])
);

export const supabaseService = {
  /**
   * 지역별 SSI 지수 조회
   * Supabase 테이블에서 날짜 범위에 맞는 SSI 데이터를 가져옵니다.
   */
  async getRegionSSI(startDate: string, endDate: string): Promise<RegionSSI[]> {
    try {
      // Supabase에서 SSI 데이터 조회
      // 테이블 이름은 실제 데이터베이스 구조에 맞게 수정 필요
      const { data, error } = await supabase
        .from('ssi_data') // 실제 테이블 이름으로 변경 필요
        .select('region_name, ssi, date')
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching region SSI:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.warn('No SSI data found for date range:', startDate, endDate);
        return [];
      }

      // 지역별로 그룹화하고 최신 SSI 값 사용
      const regionMap = new Map<string, number>();
      data.forEach((item: any) => {
        const regionName = REVERSE_REGION_MAP[item.region_name] || item.region_name;
        // 최신 값으로 업데이트 (이미 날짜순 정렬됨)
        if (!regionMap.has(regionName)) {
          regionMap.set(regionName, item.ssi);
        }
      });

      // RegionSSI 형식으로 변환
      return Array.from(regionMap.entries()).map(([지역명, ssi]) => ({
        지역명,
        ssi,
      }));
    } catch (error) {
      console.error('Error in getRegionSSI:', error);
      throw error;
    }
  },

  /**
   * 차트 SSI 추이 조회
   * 날짜 범위에 따른 일별 SSI 추이 데이터를 가져옵니다.
   */
  async getChartData(
    range: 'all' | 'jeju' | 'seogwipo',
    startDate: string,
    endDate: string
  ): Promise<ChartData> {
    try {
      // 범위에 따른 지역 필터
      let regionFilter: string[] = [];
      if (range === 'all') {
        regionFilter = ['jeju-do'];
      } else if (range === 'jeju') {
        regionFilter = ['jeju-si'];
      } else if (range === 'seogwipo') {
        regionFilter = ['seogwipo-si'];
      }

      const { data, error } = await supabase
        .from('ssi_data') // 실제 테이블 이름으로 변경 필요
        .select('region_name, ssi, date')
        .in('region_name', regionFilter)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching chart data:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.warn('No chart data found');
        return {
          jeju_do: [],
          jeju_si: [],
          seogwipo: [],
        };
      }

      // 지역별로 데이터 그룹화
      const jejuDoData: number[] = [];
      const jejuSiData: number[] = [];
      const seogwipoData: number[] = [];

      data.forEach((item: any) => {
        const ssi = item.ssi;
        if (item.region_name === 'jeju-do') {
          jejuDoData.push(ssi);
        } else if (item.region_name === 'jeju-si') {
          jejuSiData.push(ssi);
        } else if (item.region_name === 'seogwipo-si') {
          seogwipoData.push(ssi);
        }
      });

      return {
        jeju_do: jejuDoData,
        jeju_si: jejuSiData,
        seogwipo: seogwipoData,
      };
    } catch (error) {
      console.error('Error in getChartData:', error);
      throw error;
    }
  },

  /**
   * 지역 상세 정보 조회
   * 특정 지역의 상세 분석 정보를 가져옵니다.
   */
  async getRegionDetail(
    local: string,
    startDate: string,
    endDate: string
  ): Promise<RegionDetail> {
    try {
      // 지역명 변환
      const regionName = REGION_NAME_MAP[local] || local;
      
      // regions_analysis 테이블에서 데이터 조회 (이미 사용 중인 테이블)
      const { data, error } = await supabase
        .from('regions_analysis')
        .select('*')
        .eq('region_name', regionName)
        .maybeSingle();

      if (error) {
        console.error('Error fetching region detail:', error);
        throw error;
      }

      if (!data) {
        // 데이터가 없으면 기본값 반환
        return {
          지역명: local,
          ssi: 0.4,
          변화율: '0.0%',
          위험도: '안정',
          키워드: [],
          요약: `${local} 지역의 데이터가 없습니다.`,
        };
      }

      // RegionDetail 형식으로 변환
      const ssi = data.ssi_score || 0.4;
      const riskLevel = data.risk_level || 'stable';
      
      // 위험도 한글 변환
      const riskLevelMap: Record<string, '안정' | '양호' | '주의' | '경고' | '위험'> = {
        'stable': '안정',
        'safe': '양호',
        'caution': '주의',
        'warning': '경고',
        'danger': '위험',
      };

      // 변화율 계산 (trend_data가 있으면 사용)
      let changeRate = '0.0%';
      if (data.trend_data && data.trend_data.length >= 2) {
        const first = data.trend_data[0];
        const last = data.trend_data[data.trend_data.length - 1];
        const change = ((last - first) / first) * 100;
        changeRate = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
      }

      // 키워드 추출 (negative_issues, positive_issues에서)
      const keywords: string[] = [];
      if (data.negative_issues) {
        data.negative_issues.forEach((issue: any) => {
          if (issue.keyword && !keywords.includes(issue.keyword)) {
            keywords.push(issue.keyword);
          }
        });
      }
      if (data.positive_issues) {
        data.positive_issues.forEach((issue: any) => {
          if (issue.keyword && !keywords.includes(issue.keyword)) {
            keywords.push(issue.keyword);
          }
        });
      }

      return {
        지역명: REVERSE_REGION_MAP[regionName] || local,
        ssi,
        변화율: changeRate,
        위험도: riskLevelMap[riskLevel] || '안정',
        키워드: keywords.length > 0 ? keywords : ['관광'],
        요약: data.insights?.[0]?.description || data.summary || `${local} 지역의 사회적 스트레스 지수 정보입니다.`,
      };
    } catch (error) {
      console.error('Error in getRegionDetail:', error);
      throw error;
    }
  },
};








