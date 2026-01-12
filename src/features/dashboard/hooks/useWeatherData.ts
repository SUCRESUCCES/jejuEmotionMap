import { useEffect, useState } from 'react';
import { fetchWeatherData, WeatherData } from '../../../shared/services/weatherApi';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchWeatherData();
        setWeatherData(data);
      } catch (err) {
        console.error('❌ 날씨 데이터 로드 실패:', err);
        setError(err as Error);
        // 에러 발생 시에도 기본 시간/날짜는 표시
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        setWeatherData({
          temperature: '--°C',
          time: `${hours}시 ${minutes}분 ${seconds}초`,
          date: `${year}-${month}-${day}`,
        });
      } finally {
        setLoading(false);
      }
    };

    // 초기 로드
    loadWeatherData();

    // 1분마다 시간 업데이트 (온도는 10분마다 갱신)
    const timeInterval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      setWeatherData((prev) => {
        if (prev) {
          return {
            ...prev,
            time: `${hours}시 ${minutes}분 ${seconds}초`,
          };
        }
        return prev;
      });
    }, 1000); // 1초마다 시간 업데이트

    // 10분마다 날씨 데이터 갱신
    const weatherInterval = setInterval(() => {
      loadWeatherData();
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  return { weatherData, loading, error };
};


