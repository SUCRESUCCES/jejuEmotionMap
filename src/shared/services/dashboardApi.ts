import axios from 'axios';
import { mockDashboardData } from './mockDashboardData';
import { supabaseService } from './supabaseService';

// 환경 변수에서 API URL 가져오기 (나중에 실제 API 사용 시)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 타입 정의
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

// 데이터 소스 선택 (환경 변수로 제어)
// 'mock' | 'supabase' | 'api'
const DATA_SOURCE = import.meta.env.VITE_DATA_SOURCE || 'mock';
const USE_MOCK_DATA = DATA_SOURCE === 'mock';
const USE_SUPABASE = DATA_SOURCE === 'supabase';

// API 함수들
export const dashboardApi = {
  // 지역별 SSI 지수 조회
  getRegionSSI: async (startDate: string, endDate: string): Promise<RegionSSI[]> => {
    if (USE_MOCK_DATA) {
      // 목 데이터 사용 (지연 시간 시뮬레이션)
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDashboardData.getRegionSSI(startDate, endDate);
    }
    
    if (USE_SUPABASE) {
      // Supabase에서 데이터 가져오기
      try {
        return await supabaseService.getRegionSSI(startDate, endDate);
      } catch (error) {
        console.error('Supabase error, falling back to mock data:', error);
        // 에러 시 mock 데이터로 폴백
        return mockDashboardData.getRegionSSI(startDate, endDate);
      }
    }
    
    // 실제 API 호출 (나중에 사용)
    const response = await api.get('/dashboard/map', {
      params: { startDate, endDate }
    });
    return response.data.data;
  },

  // 차트 SSI 추이 조회
  getChartData: async (
    range: 'all' | 'jeju' | 'seogwipo',
    startDate: string,
    endDate: string
  ): Promise<ChartData> => {
    if (USE_MOCK_DATA) {
      // 목 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockDashboardData.getChartData(range, startDate, endDate);
    }
    
    if (USE_SUPABASE) {
      // Supabase에서 데이터 가져오기
      try {
        return await supabaseService.getChartData(range, startDate, endDate);
      } catch (error) {
        console.error('Supabase error, falling back to mock data:', error);
        // 에러 시 mock 데이터로 폴백
        return mockDashboardData.getChartData(range, startDate, endDate);
      }
    }
    
    // 실제 API 호출 (나중에 사용)
    const response = await api.get('/dashboard/chart', {
      params: { range, startDate, endDate }
    });
    return response.data;
  },

  // 지역 상세 정보 조회
  getRegionDetail: async (
    local: string,
    startDate: string,
    endDate: string
  ): Promise<RegionDetail> => {
    if (USE_MOCK_DATA) {
      // 목 데이터 사용
      await new Promise(resolve => setTimeout(resolve, 200));
      return mockDashboardData.getRegionDetail(local, startDate, endDate);
    }
    
    if (USE_SUPABASE) {
      // Supabase에서 데이터 가져오기
      try {
        return await supabaseService.getRegionDetail(local, startDate, endDate);
      } catch (error) {
        console.error('Supabase error, falling back to mock data:', error);
        // 에러 시 mock 데이터로 폴백
        return mockDashboardData.getRegionDetail(local, startDate, endDate);
      }
    }
    
    // 실제 API 호출 (나중에 사용)
    const response = await api.get('/dashboard/summation', {
      params: { local, startDate, endDate }
    });
    return response.data;
  },
};

export default dashboardApi;

