# 제주 사회적 스트레스 모니터링 시스템
> Jeju Social Stress Monitoring System

제주 지역의 소셜 미디어 데이터를 분석하여 지역별 사회적 스트레스 지수(SSI)를 시각화하는 대시보드

![대시보드 메인](이미지URL)

## 📌 프로젝트 소개

제주시는 전국의 자연환경과 온화한 기후로 삶의 만족도가 높고, 제주시보다 한적하고 여유로운 생활이 가능하나, 실제 삶을 인프라(일자리·의료·소형·교육)는 대부분 제주시에 집중되어 서귀포 주민은 제주시 의존도가 매우 높을 제주시까지 왕복 2시간이 힘상황입니다.

### 주요 기능

- 📊 **지역별 SSI 시각화**: 제주 11개 지역의 실시간 스트레스 지수 모니터링
- 🗺️ **인터랙티브 지도**: 지역 클릭 시 상세 데이터 표시
- 📈 **트렌드 분석**: 시계열 차트로 스트레스 변화 추이 분석
- 💬 **감정 분석**: 부정적/중립/긍정 게시물 분류 및 주요 키워드 추출

## 🖼️ 주요 화면

### 1. 메인 대시보드
![메인 대시보드](./images/dashboard-main.png)
- 제주 전체 지도 기반 SSI 시각화
- 지역별 색상 구분 (빨강: 높음, 주황: 중간, 초록: 낮음)
- 우측 트렌드 차트로 주요 지역 모니터링

### 2. 부정적 의견 분석
![부정적 의견](./images/dashboard-analysis.png)
- 지역별 주요 부정 키워드 분석
- 실제 게시물 예시 제공

### 3. 데이터 인사이트
![데이터 인사이트](./images/dashboard-insights.png)
- AI 기반 데이터 해석
- 주요 발견사항 및 정책 제언

## 🛠️ 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS** - 스타일링
- **Recharts** - 데이터 시각화
- **Vite** - 빌드 도구

### Backend & Data
- **FastAPI** - REST API 서버
- **Supabase** - PostgreSQL 데이터베이스
- **Python** - 데이터 처리

### AI/ML
- **KcELECTRA** - 한국어 감정 분석
- **KoBERT** - 키워드 추출
- **GPT-4** - 텍스트 해석

<!--
## 🚀 시작하기

### 설치
```bash
# 레포 클론
git clone https://github.com/SUCRESUCCES/jejuEmotionMap.git
cd jejuEmotionMap

# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 Supabase 키 입력

# 개발 서버 실행
npm run dev
```

### 환경변수
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```
-->

## 📂 프로젝트 구조
```
jejuEmotionMap/
├── src/
│   ├── components/       # React 컴포넌트
│   │   ├── JejuMap.tsx  # 지도 컴포넌트
│   │   └── SSIChart.tsx # 차트 컴포넌트
│   ├── hooks/           # Custom Hooks
│   ├── utils/           # 유틸리티 함수
│   └── supabase/        # Supabase 설정
├── images/              # README 이미지
└── README.md
```


## 🎯 개발 로드맵

- [x] 기본 대시보드 UI 구현
- [x] 제주 지도 시각화
- [x] SSI 데이터 API 연동
- [ ] 실시간 데이터 업데이트
- [ ] 사용자 맞춤 알림 기능
- [ ] 모바일 앱 개발

## 📊 데이터 출처

- 소셜 미디어: 네이버 카페, 인스타그램, 블로그
- 감정 분석: KcELECTRA, KoBERT 모델
- 지역 경계: 제주특별자치도 오픈데이터
