import Depth1Dashboard from "./features/dashboard/DashboardPage";
import Depth2Page from "./features/chat/components/Depth2Page";
import { useEffect, useState } from "react";
import imgVector from "figma:asset/6f45711041117bd80b7104f70704abeee8a37bec.png";

// 날짜를 YYYY-MM-DD 형식으로 변환하는 헬퍼 함수
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [scale, setScale] = useState(1);
  const [currentPage, setCurrentPage] = useState<"depth1" | "depth2">("depth1");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  
  // 확정된 날짜 (조회 버튼 클릭 후 적용) - 초기값: 현재 날짜의 7일 전과 현재 날짜
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    return formatDate(sevenDaysAgo);
  });
  const [endDate, setEndDate] = useState<string>(() => {
    const today = new Date();
    return formatDate(today);
  });
  
  // 임시 날짜 (사용자가 입력 중) - 초기값: 현재 날짜의 7일 전과 현재 날짜
  const [tempStartDate, setTempStartDate] = useState<string>(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    return formatDate(sevenDaysAgo);
  });
  const [tempEndDate, setTempEndDate] = useState<string>(() => {
    const today = new Date();
    return formatDate(today);
  });
  
  // 조회 버튼 클릭 시 임시 날짜를 확정 날짜로 적용
  const handleSearch = () => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / 1728;
      const scaleY = window.innerHeight / 1117;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () =>
      window.removeEventListener("resize", updateScale);
  }, []);

  const handleNavigateToDepth2 = (region: string) => {
    setSelectedRegion(region);
    setCurrentPage("depth2");
  };

  const handleBackToDepth1 = () => {
    setCurrentPage("depth1");
  };

  if (currentPage === "depth2") {
    return <Depth2Page 
      selectedRegion={selectedRegion} 
      onBack={handleBackToDepth1} 
      startDate={startDate} 
      endDate={endDate}
      tempStartDate={tempStartDate}
      tempEndDate={tempEndDate}
      onTempStartDateChange={setTempStartDate}
      onTempEndDateChange={setTempEndDate}
      onSearch={handleSearch}
    />;
  }

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      backgroundImage: `url(${imgVector})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div 
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          width: '1728px',
          height: '1117px',
          position: 'relative',
        }}
      >
        <Depth1Dashboard 
          onNavigateToDepth2={handleNavigateToDepth2} 
          startDate={startDate} 
          endDate={endDate}
          tempStartDate={tempStartDate}
          tempEndDate={tempEndDate}
          onTempStartDateChange={setTempStartDate}
          onTempEndDateChange={setTempEndDate}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
}