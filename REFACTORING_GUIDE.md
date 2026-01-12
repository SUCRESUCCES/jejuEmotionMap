# 대용량 컴포넌트 리팩토링 가이드

## 🎯 목표
- **Before**: Depth1.tsx (1,960줄), Depth2.tsx (928줄)
- **After**: 각 파일 100줄 이내, 재사용 가능한 작은 컴포넌트들

## 📊 문제점 분석

### Depth1.tsx (1,960줄)
```
- 79개의 함수/컴포넌트가 한 파일에
- 15개 지역 HoverBox 컴포넌트 (150줄)
- 40+개 SVG 폴리곤/지역 컴포넌트 (1,500줄)
- 20+개 UI Group 컴포넌트 (200줄)
- 메인 로직 (100줄)
```

### Depth2.tsx (928줄)
```
- 모든 UI 컴포넌트가 inline
- 데이터 fetching 로직 포함
- 채팅 로직 포함
- 리포트 UI 모두 한 파일에
```

## 🏗️ 새로운 폴더 구조

```
src/
├── features/
│   ├── dashboard/                    # 대시보드 기능
│   │   ├── components/
│   │   │   ├── Map/
│   │   │   │   ├── HoverBoxes/
│   │   │   │   │   └── index.tsx    # ✅ 15개 HoverBox (140줄)
│   │   │   │   ├── Polygons/
│   │   │   │   │   └── index.tsx    # 📦 폴리곤 컴포넌트들
│   │   │   │   ├── RegionTooltipCard.tsx  # ✅ 툴팁 (100줄)
│   │   │   │   └── JejuMapFrame.tsx        # 📦 지도 프레임
│   │   ├── constants/
│   │   │   └── tooltipPositions.ts  # ✅ 툴팁 위치 데이터
│   │   └── hooks/
│   │       └── useRegionHover.ts    # ✅ hover 로직 (40줄)
│   │
│   └── chat/                         # 채팅/리포트 기능
│       ├── components/
│       │   ├── Report/
│       │   │   ├── ReportHeader.tsx        # ✅ 헤더 (60줄)
│       │   │   ├── DataOverview.tsx        # ✅ 개요 (100줄)
│       │   │   └── SSITrendChart.tsx       # 📦 추세 차트
│       │   ├── Issues/
│       │   │   └── IssueList.tsx           # ✅ 이슈 목록 (100줄)
│       │   └── Chat/
│       │       └── ChatbotModal.tsx        # 📦 챗봇
│       └── hooks/
│           └── useRegionData.ts     # ✅ 데이터 fetching (85줄)
```

## ✅ 완료된 작업

### 1. Dashboard HoverBox 컴포넌트 분리 (150줄 → 140줄)
```tsx
// Before: Depth1.tsx 안에
function UdoHoverBox({ className, onMouseEnter, onMouseLeave }) { ... }
function ChujaHoverBox({ className, onMouseEnter, onMouseLeave }) { ... }
// ... 15개 컴포넌트

// After: src/features/dashboard/components/Map/HoverBoxes/index.tsx
export const UdoHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (...)
export const ChujaHoverBox = ({ className, onMouseEnter, onMouseLeave }: HoverBoxProps) => (...)
// 공통 타입으로 중복 제거
```

### 2. 지역 툴팁 컴포넌트 분리 (120줄)
```tsx
// src/features/dashboard/components/Map/RegionTooltipCard.tsx
export const RegionTooltip: React.FC<RegionTooltipProps> = ({
  region,
  position,
  onMouseEnter,
  onMouseLeave,
  onNavigateToDepth2
}) => (...)
```

### 3. 툴팁 위치 데이터 분리 (25줄)
```tsx
// src/features/dashboard/constants/tooltipPositions.ts
export const REGION_TOOLTIP_POSITIONS = {
  "구좌읍": { left: 786, top: -250 },
  // ...
};

export const getTooltipPosition = (region: string) => {
  return REGION_TOOLTIP_POSITIONS[region] || { left: 500, top: 200 };
};
```

### 4. Region Hover 커스텀 훅 (40줄)
```tsx
// src/features/dashboard/hooks/useRegionHover.ts
export const useRegionHover = () => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (region: string) => { ... };
  const handleMouseLeave = () => { ... };
  const handleTooltipMouseEnter = () => { ... };
  const handleTooltipMouseLeave = () => { ... };

  return {
    hoveredRegion,
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
  };
};
```

### 5. Depth2 리포트 컴포넌트 분리

#### ReportHeader.tsx (60줄)
```tsx
export const ReportHeader: React.FC<ReportHeaderProps> = ({
  startDate,
  endDate,
  tempStartDate,
  tempEndDate,
  onTempStartDateChange,
  onTempEndDateChange,
  onSearch,
}) => (...)
```

#### DataOverview.tsx (100줄)
```tsx
export const DataOverview: React.FC<DataOverviewProps> = ({ 
  data, 
  startDate, 
  endDate 
}) => (...)
```

#### IssueList.tsx (100줄)
```tsx
export const IssueItem: React.FC<IssueItemProps> = ({ ... }) => (...)
export const IssueList: React.FC<IssueListProps> = ({ ... }) => (...)
```

### 6. 데이터 Fetching 훅 분리 (85줄)
```tsx
// src/features/chat/hooks/useRegionData.ts
export const useRegionData = (
  selectedRegion: string,
  startDate: string,
  endDate: string
) => {
  const [reportData, setReportData] = useState<RegionAnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Supabase 데이터 fetching 로직
  }, [selectedRegion, startDate, endDate]);

  return { reportData, loading, error };
};
```

## 📦 추가로 해야 할 작업

### 1. 폴리곤 컴포넌트 분리 (남은 작업)
```bash
src/features/dashboard/components/Map/Polygons/
  ├── index.tsx              # 모든 폴리곤 export
  ├── UdoPolygon.tsx        # 우도 폴리곤
  ├── DaejeongPolygon.tsx   # 대정 폴리곤
  ├── SeongsanPolygon.tsx   # 성산 폴리곤
  └── ...                   # 나머지 지역들
```

### 2. 메인 페이지 단순화
```tsx
// src/features/dashboard/DashboardPage.tsx (목표: 100줄 이내)
import { useRegionHover } from './hooks/useRegionHover';
import { RegionTooltip } from './components/Map/RegionTooltipCard';
import { getTooltipPosition } from './constants/tooltipPositions';
import * as HoverBoxes from './components/Map/HoverBoxes';

export default function DashboardPage({ ... }) {
  const {
    hoveredRegion,
    handleMouseEnter,
    handleMouseLeave,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
  } = useRegionHover();

  return (
    <div className="dashboard-container">
      {/* 헤더 컴포넌트 */}
      <DateRangePicker {...dateProps} />
      
      {/* 차트 컴포넌트들 */}
      <ChartCard {...chartProps} />
      
      {/* 지도 프레임 */}
      <JejuMapFrame
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        hoveredRegion={hoveredRegion}
        onNavigateToDepth2={onNavigateToDepth2}
      />
      
      {/* 툴팁 */}
      {hoveredRegion && (
        <RegionTooltip
          region={hoveredRegion}
          position={getTooltipPosition(hoveredRegion)}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
          onNavigateToDepth2={onNavigateToDepth2}
        />
      )}
    </div>
  );
}
```

### 3. Depth2 페이지 단순화
```tsx
// src/features/chat/ChatPage.tsx (목표: 150줄 이내)
import { useRegionData } from './hooks/useRegionData';
import { ReportHeader } from './components/Report/ReportHeader';
import { DataOverview } from './components/Report/DataOverview';
import { IssueList } from './components/Issues/IssueList';

export default function ChatPage({ selectedRegion, ... }) {
  const { reportData, loading, error } = useRegionData(
    selectedRegion,
    startDate,
    endDate
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  const data = reportData || defaultData;

  return (
    <div className="chat-page">
      <ReportHeader {...headerProps} />
      <DataOverview data={data} startDate={startDate} endDate={endDate} />
      <SSITrendChart data={data} />
      
      <div className="issues-section">
        <IssueList
          title="긍정적 의견"
          issues={data.positive_issues}
          type="positive"
        />
        <IssueList
          title="부정적 의견"
          issues={data.negative_issues}
          type="negative"
        />
        <IssueList
          title="중립적 의견"
          issues={data.neutral_issues}
          type="neutral"
        />
      </div>

      <ChatbotButton />
    </div>
  );
}
```

## 💡 리팩토링 원칙

### 1. 단일 책임 원칙
```tsx
// ❌ 나쁜 예: 여러 책임
function BigComponent() {
  // 데이터 fetching
  // UI 렌더링
  // 비즈니스 로직
  // 이벤트 핸들링
}

// ✅ 좋은 예: 단일 책임
function DataFetcher() { /* 데이터만 */ }
function UIComponent() { /* UI만 */ }
function useBusinessLogic() { /* 로직만 */ }
```

### 2. 컴포넌트 크기
```
- 50줄 이하: 이상적
- 100줄 이하: 좋음
- 200줄 이상: 리팩토링 고려
- 500줄 이상: 즉시 리팩토링 필요
```

### 3. import 정리
```tsx
// ✅ 좋은 예
import { UdoHoverBox, ChujaHoverBox } from './HoverBoxes';
import { getTooltipPosition } from './constants/tooltipPositions';
import { useRegionHover } from './hooks/useRegionHover';

// ❌ 나쁜 예
import UdoHoverBox from './UdoHoverBox';
import ChujaHoverBox from './ChujaHoverBox';
// ... 15개 import
```

### 4. 파일 명명 규칙
```
컴포넌트: PascalCase (ReportHeader.tsx)
훅: camelCase with use prefix (useRegionData.ts)
유틸: camelCase (tooltipPositions.ts)
상수: UPPER_SNAKE_CASE (REGION_DATA.ts)
```

## 📈 개선 효과

### Before
```
✗ 파일 찾기 어려움 (Ctrl+F로 검색)
✗ 수정 시 다른 코드 영향 파악 어려움
✗ 코드 리뷰 힘듦 (스크롤 지옥)
✗ 재사용 불가능
✗ 테스트 작성 어려움
```

### After
```
✓ 명확한 파일 구조로 쉽게 찾기
✓ 독립된 컴포넌트로 영향 범위 명확
✓ 작은 단위로 코드 리뷰 용이
✓ 다른 페이지에서도 재사용 가능
✓ 단위 테스트 작성 쉬움
```

## 🚀 다음 단계

1. **폴리곤 컴포넌트 분리 완료**
   ```bash
   npm run dev  # 실행하면서 확인
   ```

2. **메인 페이지들 단순화**
   - DashboardPage.tsx → 100줄 이내
   - ChatPage.tsx → 150줄 이내

3. **성능 최적화**
   ```tsx
   // React.memo로 불필요한 리렌더링 방지
   export const RegionTooltip = React.memo(({ ... }) => (...));
   
   // useMemo로 무거운 계산 캐싱
   const sortedData = useMemo(() => data.sort(), [data]);
   ```

4. **테스트 작성**
   ```tsx
   // src/features/dashboard/components/Map/__tests__/RegionTooltip.test.tsx
   describe('RegionTooltip', () => {
     it('should render region name', () => {
       // ...
     });
   });
   ```

## 📝 커밋 가이드

```bash
# 작은 단위로 커밋
git commit -m "refactor(dashboard): extract HoverBox components"
git commit -m "refactor(dashboard): create useRegionHover hook"
git commit -m "refactor(chat): separate ReportHeader component"
```

## ⚠️ 주의사항

1. **기존 기능 유지**: 리팩토링 중에도 모든 기능이 정상 작동해야 함
2. **점진적 접근**: 한 번에 모두 바꾸지 말고 단계적으로
3. **테스트 확인**: 각 단계마다 브라우저에서 동작 확인
4. **백업**: 큰 변경 전에 브랜치 생성

```bash
git checkout -b refactor/split-large-components
# 작업 후
git checkout main
git merge refactor/split-large-components
```
