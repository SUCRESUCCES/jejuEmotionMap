# 환경변수 설정 가이드

## 데이터 소스 설정

대시보드에서 사용할 데이터 소스를 선택할 수 있습니다.

### 1. 환경변수 파일 생성

프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# 데이터 소스 선택: 'mock' | 'supabase' | 'api'
# - mock: 목 데이터 사용 (기본값)
# - supabase: Supabase 데이터베이스 사용
# - api: 외부 API 사용
VITE_DATA_SOURCE=mock

# 기상청 API 키 (공공데이터포털에서 발급)
# https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15084084
VITE_WEATHER_API_KEY=발급받은_API_키를_여기에_입력

# 외부 API URL (VITE_DATA_SOURCE=api일 때 사용)
VITE_API_URL=http://localhost:3001
```

### 2. Supabase 데이터베이스 사용

실제 데이터를 사용하려면 `VITE_DATA_SOURCE=supabase`로 설정하세요.

#### 필요한 Supabase 테이블 구조

**ssi_data 테이블** (SSI 추이 데이터):
```sql
CREATE TABLE ssi_data (
  id BIGSERIAL PRIMARY KEY,
  region_name TEXT NOT NULL,  -- 'jeju-do', 'jeju-si', 'seogwipo-si' 등
  ssi DECIMAL(5,3) NOT NULL,  -- SSI 점수 (0.000 ~ 1.000)
  date DATE NOT NULL,          -- 날짜
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ssi_data_region_date ON ssi_data(region_name, date);
```

**regions_analysis 테이블** (이미 존재하는 테이블):
- `region_name`: 지역명 (영문)
- `ssi_score`: SSI 점수
- `risk_level`: 위험도 ('stable', 'safe', 'caution', 'warning', 'danger')
- `trend_data`: JSONB 배열 형태의 추이 데이터
- `negative_issues`: JSONB 배열
- `positive_issues`: JSONB 배열
- `insights`: JSONB 배열

#### 데이터 예시

```sql
-- SSI 추이 데이터 예시
INSERT INTO ssi_data (region_name, ssi, date) VALUES
  ('jeju-do', 0.492, '2024-12-01'),
  ('jeju-do', 0.495, '2024-12-02'),
  ('jeju-si', 0.420, '2024-12-01'),
  ('jeju-si', 0.425, '2024-12-02'),
  ('seogwipo-si', 0.476, '2024-12-01'),
  ('seogwipo-si', 0.480, '2024-12-02');
```

### 3. 기상청 API 키 설정

날씨 정보를 표시하기 위해 기상청 API 키가 필요합니다.

#### API 키 발급

1. [공공데이터포털](https://www.data.go.kr/) 접속
2. "기상청_단기예보 ((구)_동네예보) 조회서비스" 검색
3. API 키 발급 신청
4. 발급받은 API 키 복사

#### 환경변수에 추가

`.env` 파일에 다음을 추가:
```env
VITE_WEATHER_API_KEY=발급받은_API_키를_여기에_입력
```

### 4. 서버 재시작

환경변수를 변경한 후에는 개발 서버를 재시작해야 합니다:

```bash
npm run dev
```

### 참고사항

- `.env` 파일은 Git에 커밋하지 마세요 (보안상의 이유)
- `VITE_DATA_SOURCE`가 설정되지 않으면 기본적으로 목 데이터를 사용합니다
- Supabase 연결 실패 시 자동으로 목 데이터로 폴백됩니다
- API 키가 없어도 날짜와 시간은 표시되며, 온도는 `--°C`로 표시됩니다

