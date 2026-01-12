/**
 * 기상청 단기예보 API 서비스
 * 공공데이터포털: https://www.data.go.kr/
 * API 문서: https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084
 */

// 제주도 좌표 (제주시 기준 - 기상청 격자 좌표)
// 제주시: nx=52, ny=38
const JEJU_NX = 52;
const JEJU_NY = 38;

// API 키 직접 설정 (여기에 API 키를 입력하세요)
const WEATHER_API_KEY = '8jj6mNV38UbKiZEQymnOP4fMzsT8HVwXNdqIDX72dLxZU9GeUP8yOzaHWCMF5Pus%2FS1dcgrcjgF9rC1ijG2kmw%3D%3D';

// 개발 환경에서는 프록시 사용, 프로덕션에서는 직접 호출
const WEATHER_API_BASE_URL = import.meta.env.DEV 
  ? '/api/weather'
  : 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0';

export interface WeatherData {
  temperature: string; // 온도 (°C)
  time: string; // 시간 (HH시 mm분 ss초)
  date: string; // 날짜 (YYYY-MM-DD)
}

/**
 * 현재 날짜와 시간을 포맷팅
 */
function getCurrentDateTime() {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = now.getHours(); // number 타입
  const minutes = now.getMinutes(); // number 타입
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(now.getSeconds()).padStart(2, '0');
  
  // base_time 계산 (초단기실황은 매시간 30분에 생성)
  const { baseDate, baseTime } = getBaseDateTime(now);
  
  return {
    date: `${year}-${month}-${day}`,
    time: `${hoursStr}시 ${minutesStr}분 ${secondsStr}초`,
    baseDate,
    baseTime,
  };
}

/**
 * 기상청 API의 base_date와 base_time 계산
 * 초단기실황 API는 매시간 30분에 생성되므로, 현재 시간에서 가장 가까운 이전 시간대를 반환
 * 예: 현재가 14:25면 -> 13:30 데이터 사용 (base_time: 1300, base_date: 오늘)
 * 예: 현재가 14:35면 -> 14:30 데이터 사용 (base_time: 1400, base_date: 오늘)
 * 예: 현재가 00:25면 -> 23:30 데이터 사용 (base_time: 2300, base_date: 어제)
 */
function getBaseDateTime(date: Date): { baseDate: string; baseTime: string } {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  // 초단기실황 API는 매시간 30분에 생성됩니다
  // 하지만 base_time은 정각 시간을 사용합니다
  // 예: 15:00~15:29 -> 14:30에 생성된 데이터 (base_time: 1400)
  // 예: 15:30~15:59 -> 15:30에 생성된 데이터 (base_time: 1500)
  if (minutes < 30) {
    hours = hours - 1;
    // 자정 이전이면 전날로 이동
    if (hours < 0) {
      hours = 23;
      // 전날 날짜 계산
      const prevDay = new Date(date);
      prevDay.setDate(prevDay.getDate() - 1);
      const prevYear = prevDay.getFullYear();
      const prevMonth = String(prevDay.getMonth() + 1).padStart(2, '0');
      const prevDayStr = String(prevDay.getDate()).padStart(2, '0');
      return {
        baseDate: `${prevYear}${prevMonth}${prevDayStr}`,
        baseTime: String(hours).padStart(2, '0') + '00',
      };
    }
  }
  
  // base_time은 정각 시간 (예: 1400, 1500)
  return {
    baseDate: `${year}${month}${day}`,
    baseTime: String(hours).padStart(2, '0') + '00',
  };
}

/**
 * 기상청 초단기실황 API 호출
 */
async function fetchUltraSrtNcst(baseDate: string, baseTime: string): Promise<number | null> {
  // API 키 확인
  const apiKey = WEATHER_API_KEY;
  
  // API 키가 없거나 기본값인 경우 체크
  if (!apiKey || apiKey.trim() === '' || apiKey === '여기에_API_키를_입력하세요') {
    console.warn('⚠️ 기상청 API 키가 설정되지 않았습니다. weatherApi.ts 파일에서 WEATHER_API_KEY를 설정하세요.');
    return null;
  }

  try {
    const apiUrl = `${WEATHER_API_BASE_URL}/getUltraSrtNcst`;
    const url = import.meta.env.DEV 
      ? new URL(apiUrl, window.location.origin)
      : new URL(apiUrl);
    
    // 기상청 API는 serviceKey를 URL 인코딩된 형태로 받습니다
    // 공공데이터포털에서 발급받은 키는 이미 인코딩되어 있으므로,
    // URLSearchParams.append()가 자동으로 인코딩하기 전에 디코딩해야 합니다
    // 그래야 URLSearchParams가 한 번만 인코딩하게 됩니다
    const decodedApiKey = decodeURIComponent(apiKey);
    url.searchParams.append('serviceKey', decodedApiKey);
    url.searchParams.append('pageNo', '1');
    url.searchParams.append('numOfRows', '10');
    url.searchParams.append('dataType', 'JSON');
    url.searchParams.append('base_date', baseDate);
    url.searchParams.append('base_time', baseTime);
    url.searchParams.append('nx', String(JEJU_NX));
    url.searchParams.append('ny', String(JEJU_NY));
    
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ 기상청 API 호출 실패:', response.status, errorText);
      throw new Error(`기상청 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    
    // API 응답 구조 확인
    if (data.response?.header?.resultCode !== '00') {
      const resultMsg = data.response?.header?.resultMsg || '알 수 없는 오류';
      console.error('❌ 기상청 API 오류:', resultMsg);
      throw new Error(`기상청 API 오류: ${resultMsg}`);
    }

    // 온도 데이터 찾기 (T1H: 기온)
    const items = data.response?.body?.items?.item || [];
    const temperatureItem = items.find((item: any) => item.category === 'T1H');
    
    if (temperatureItem && temperatureItem.obsrValue) {
      const temp = parseFloat(temperatureItem.obsrValue);
      // 유효한 온도 범위 체크 (-50 ~ 50도)
      if (!isNaN(temp) && temp >= -50 && temp <= 50) {
        return temp;
      }
    }

    return null;
  } catch (error) {
    console.error('❌ 기상청 API 호출 중 오류:', error instanceof Error ? error.message : error);
    return null;
  }
}

/**
 * 날씨 데이터 가져오기
 */
export async function fetchWeatherData(): Promise<WeatherData> {
  const { date, time, baseDate, baseTime } = getCurrentDateTime();
  
  // API 키 확인
  const apiKey = WEATHER_API_KEY;
  
  // API 키가 없거나 기본값인 경우 체크
  if (!apiKey || apiKey.trim() === '' || apiKey === '여기에_API_키를_입력하세요') {
    return {
      temperature: '--°C',
      time,
      date,
    };
  }

  const temperature = await fetchUltraSrtNcst(baseDate, baseTime);
  
  return {
    temperature: temperature !== null ? `${Math.round(temperature)}°C` : '--°C',
    time,
    date,
  };
}

