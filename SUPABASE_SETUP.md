# Supabase 데이터베이스 설정 가이드

## 테이블 구조

대시보드에서 실제 데이터를 사용하려면 다음 테이블들이 필요합니다.

## 1. ssi_data 테이블

SSI 추이 데이터를 저장하는 테이블입니다.

### 테이블 생성 SQL

```sql
CREATE TABLE IF NOT EXISTS ssi_data (
  id BIGSERIAL PRIMARY KEY,
  region_name TEXT NOT NULL,
  ssi DECIMAL(5,3) NOT NULL CHECK (ssi >= 0 AND ssi <= 1),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_ssi_data_region_date 
  ON ssi_data(region_name, date DESC);

-- 중복 방지 (같은 지역, 같은 날짜)
CREATE UNIQUE INDEX IF NOT EXISTS idx_ssi_data_unique 
  ON ssi_data(region_name, date);
```

### 지역명 (region_name) 값

- `jeju-do`: 제주도 전체
- `jeju-si`: 제주시
- `seogwipo-si`: 서귀포시
- `gujwa-uep`: 구좌읍
- `jocheon-uep`: 조천읍
- `aewol-uep`: 애월읍
- `hallim-uep`: 한림읍
- `hangyeong-myeon`: 한경면
- `daejeong-uep`: 대정읍
- `andeok-myeon`: 안덕면
- `jungmun`: 중문
- `namwon-uep`: 남원읍
- `pyoseon-myeon`: 표선면
- `seongsan-uep`: 성산읍
- `chuja-myeon`: 추자면
- `udo-myeon`: 우도면

### 데이터 예시

```sql
-- 제주도 SSI 데이터 예시
INSERT INTO ssi_data (region_name, ssi, date) VALUES
  ('jeju-do', 0.492, '2024-12-01'),
  ('jeju-do', 0.495, '2024-12-02'),
  ('jeju-do', 0.490, '2024-12-03'),
  ('jeju-do', 0.498, '2024-12-04'),
  ('jeju-do', 0.493, '2024-12-05');

-- 제주시 SSI 데이터 예시
INSERT INTO ssi_data (region_name, ssi, date) VALUES
  ('jeju-si', 0.420, '2024-12-01'),
  ('jeju-si', 0.425, '2024-12-02'),
  ('jeju-si', 0.418, '2024-12-03'),
  ('jeju-si', 0.422, '2024-12-04'),
  ('jeju-si', 0.428, '2024-12-05');

-- 서귀포시 SSI 데이터 예시
INSERT INTO ssi_data (region_name, ssi, date) VALUES
  ('seogwipo-si', 0.476, '2024-12-01'),
  ('seogwipo-si', 0.480, '2024-12-02'),
  ('seogwipo-si', 0.472, '2024-12-03'),
  ('seogwipo-si', 0.478, '2024-12-04'),
  ('seogwipo-si', 0.485, '2024-12-05');
```

## 2. regions_analysis 테이블

이미 존재하는 테이블입니다. 지역별 상세 분석 정보를 저장합니다.

### 필요한 컬럼

- `region_name` (TEXT): 지역명 (영문)
- `ssi_score` (DECIMAL): SSI 점수
- `risk_level` (TEXT): 위험도 ('stable', 'safe', 'caution', 'warning', 'danger')
- `trend_data` (JSONB): SSI 추이 데이터 배열 `[0.52, 0.54, 0.58, ...]`
- `negative_issues` (JSONB): 부정 이슈 배열
- `positive_issues` (JSONB): 긍정 이슈 배열
- `insights` (JSONB): 인사이트 배열

### 데이터 구조 예시

```json
{
  "region_name": "jeju-si",
  "ssi_score": 0.420,
  "risk_level": "caution",
  "trend_data": [0.415, 0.418, 0.420, 0.422, 0.425, 0.428, 0.430],
  "negative_issues": [
    {
      "keyword": "교통",
      "voices": ["교통이 너무 막혀요", "주차 공간이 부족해요"],
      "severity": "Medium"
    }
  ],
  "positive_issues": [
    {
      "keyword": "관광",
      "voices": ["관광객이 많아서 좋아요"]
    }
  ],
  "insights": [
    {
      "title": "교통 혼잡 증가",
      "description": "제주시 지역의 교통 혼잡이 증가하고 있습니다."
    }
  ]
}
```

## 3. 데이터 마이그레이션

기존 데이터를 Supabase로 마이그레이션하는 방법:

### 방법 1: CSV 파일로 임포트

1. 데이터를 CSV 형식으로 준비:
```csv
region_name,ssi,date
jeju-do,0.492,2024-12-01
jeju-do,0.495,2024-12-02
jeju-si,0.420,2024-12-01
```

2. Supabase 대시보드에서 Table Editor 열기
3. `ssi_data` 테이블 선택
4. Import data → CSV 파일 업로드

### 방법 2: SQL 스크립트 실행

Supabase SQL Editor에서 위의 INSERT 문을 실행하세요.

## 4. 환경 변수 설정

`.env` 파일에 다음을 추가:

```env
VITE_DATA_SOURCE=supabase
```

## 5. 테스트

데이터가 제대로 연결되었는지 확인:

1. 개발 서버 실행: `npm run dev`
2. 대시보드 페이지에서 날짜 범위 선택
3. 브라우저 콘솔에서 에러 확인
4. 네트워크 탭에서 Supabase 요청 확인

## 문제 해결

### 데이터가 표시되지 않는 경우

1. **테이블 이름 확인**: `ssi_data` 테이블이 존재하는지 확인
2. **컬럼 이름 확인**: `region_name`, `ssi`, `date` 컬럼이 정확한지 확인
3. **날짜 형식 확인**: `YYYY-MM-DD` 형식인지 확인
4. **브라우저 콘솔 확인**: 에러 메시지 확인

### 권한 문제

Supabase에서 테이블에 대한 읽기 권한이 있는지 확인하세요:
- Settings → API → Row Level Security (RLS) 확인
- 필요시 RLS 정책 추가 또는 비활성화








