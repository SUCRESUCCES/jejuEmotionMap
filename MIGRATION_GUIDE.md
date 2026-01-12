# 폴더 구조 마이그레이션 완료

## 새로운 폴더 구조

```
rag_dashboard/
├── src/
│   ├── features/                    # 기능별 모듈
│   │   ├── dashboard/              # 대시보드 기능
│   │   │   ├── DashboardPage.tsx   # 메인 대시보드 페이지
│   │   │   ├── components/
│   │   │   │   ├── Charts/
│   │   │   │   │   ├── ChartCard.tsx
│   │   │   │   │   └── SSILineChart.tsx
│   │   │   │   ├── Header/
│   │   │   │   │   ├── DateRangePicker.tsx
│   │   │   │   │   └── PageHeader.tsx
│   │   │   │   ├── Map/
│   │   │   │   │   ├── JejuMap.tsx
│   │   │   │   │   ├── RegionInfo.tsx
│   │   │   │   │   ├── RegionPolygon.tsx
│   │   │   │   │   ├── RegionTooltip.tsx
│   │   │   │   │   └── types.ts
│   │   │   │   └── WeatherInfo/
│   │   │   │       └── WeatherDisplay.tsx
│   │   │   ├── constants/
│   │   │   │   ├── regionData.ts
│   │   │   │   └── svg-paths.ts
│   │   │   └── types/
│   │   │       └── types.ts
│   │   │
│   │   └── chat/                   # 채팅/리포트 기능
│   │       ├── ChatPage.tsx        # 채팅 페이지 (구 Depth2)
│   │       ├── components/
│   │       │   └── Depth2Page.tsx
│   │       └── types/
│   │
│   ├── shared/                     # 공통 리소스
│   │   ├── components/            # 재사용 가능한 공통 컴포넌트
│   │   ├── types/                 # 공통 타입 정의
│   │   ├── styles/                # 공통 스타일
│   │   └── utils/                 # 유틸리티 함수
│   │       ├── svg-5fq1vtsmqv.ts
│   │       └── supabase/
│   │           └── info.tsx
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
└── archived/                       # 이전 파일 보관
    ├── unused/                    # 사용하지 않는 UI 컴포넌트
    ├── pages_unused/              # 사용하지 않는 페이지
    └── depth1/                    # 이전 depth1 구조

```

## 주요 변경사항

### 1. 기능 기반 구조 (Feature-based Architecture)
- **Before**: `src/pages/`, `src/components/depth1/`
- **After**: `src/features/dashboard/`, `src/features/chat/`
- **이점**: 관련 파일들이 한 곳에 모여있어 유지보수 용이

### 2. 공통 리소스 분리
- **Before**: 각 페이지/컴포넌트에 분산
- **After**: `src/shared/` 폴더에 통합
- **이점**: 중복 제거 및 일관성 유지

### 3. Import 경로 최적화
```tsx
// Before
import DateRangePicker from '../components/depth1/Header/DateRangePicker';

// After
import DateRangePicker from './components/Header/DateRangePicker';
```

### 4. 사용하지 않는 파일 정리
- `archived/` 폴더로 이동하여 필요시 복구 가능
- 프로젝트 구조 간소화

## 다음 단계

### 즉시 해야 할 일
1. **의존성 재설치**:
   ```bash
   cd /Users/mac/Downloads/rag_dashboard
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **애플리케이션 실행**:
   ```bash
   npm run dev
   ```

3. **오류 확인 및 수정**:
   - 누락된 import 경로 확인
   - 타입 오류 수정

### 추가 개선 사항

#### 1. 타입 정의 통합
```tsx
// src/shared/types/index.ts 생성
export interface RegionData {
  name: string;
  ssi: number;
  // ...
}
```

#### 2. 스타일 모듈화
- CSS Module 또는 Tailwind 설정 파일 정리
- `src/shared/styles/` 활용

#### 3. 훅 분리 (추천)
```
src/features/dashboard/
  └── hooks/
      ├── useDashboardData.ts
      └── useRegionSelection.ts
```

#### 4. API 서비스 레이어
```
src/shared/services/
  ├── api.ts
  └── supabaseClient.ts
```

## 장점

### 유지보수성
- ✅ 기능별로 파일이 그룹화되어 찾기 쉬움
- ✅ 관련 코드가 가까이 있어 수정 용이
- ✅ 명확한 책임 분리

### 확장성
- ✅ 새로운 기능 추가 시 독립적인 feature 폴더 생성
- ✅ 공통 컴포넌트 재사용 용이
- ✅ 팀 협업 시 충돌 최소화

### 성능
- ✅ 코드 스플리팅 최적화 가능
- ✅ 불필요한 import 제거

## 문제 해결

### Import 오류 발생 시
1. 경로가 정확한지 확인
2. 파일이 올바른 위치에 있는지 확인
3. TypeScript 서버 재시작: VS Code에서 `Cmd+Shift+P` → "TypeScript: Restart TS Server"

### 빌드 오류 발생 시
```bash
# 캐시 정리
rm -rf node_modules/.vite
npm run dev
```

## 향후 계획
- [ ] E2E 테스트 추가
- [ ] Storybook 설정
- [ ] 컴포넌트 문서화
- [ ] 성능 모니터링 설정
