# Vocalytics - 한국어 학습 플랫폼 (클라이언트)

Vocalytics는 AI 기반 한국어 학습을 위한 종합 플랫폼입니다. 음성 인식(STT), 발음 교정, 학습 인사이트 분석, 그리고 YouTube 기반 E-Learning 기능을 제공합니다.

## 주요 기능

### 1. STT 서비스 (Speech-to-Text)
- 실시간 음성 인식 및 텍스트 변환
- AI 기반 발음 교정 및 피드백
- TTS(Text-to-Speech) 기능으로 정확한 발음 학습

### 2. 인사이트 분석 (Insights)
- 학습자 성과 분석 및 시각화
- 성별, 레벨, 국적별 학습 패턴 분석
- CSID 오류 패턴 분석
- 텍스트 난이도 분석

### 3. E-Learning
- YouTube 기반 한국어 교육 영상 검색
- 맞춤형 학습 콘텐츠 추천
- 영상별 상세 정보 제공

## 기술 스택

- **Frontend**: React 18.2.0
- **라우팅**: React Router DOM 6.14.0
- **빌드 도구**: Create React App
- **스타일링**: CSS3
- **상태 관리**: React Hooks (Custom Hooks)

## 프로젝트 구조

```
client/
├── public/                    # 정적 파일
│   ├── assets/               # 이미지, 아이콘 등
│   └── index.html           # HTML 템플릿
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── Header/          # 헤더 컴포넌트
│   │   ├── Sidebar/         # 사이드바 메뉴
│   │   ├── HeroSection/     # 메인 히어로 섹션
│   │   ├── FeatureSection/  # 기능 소개 섹션
│   │   ├── AudioSpectrum/   # 오디오 스펙트럼 시각화
│   │   ├── VideoPlayer/     # 비디오 플레이어
│   │   ├── VideoCard/       # 비디오 카드
│   │   ├── SearchBar/       # 검색 바
│   │   ├── ResultCard/      # 결과 카드
│   │   ├── ActionButton/    # 액션 버튼
│   │   ├── Icons/           # 아이콘 컴포넌트
│   │   └── common/          # 공통 컴포넌트
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home/            # 홈 페이지
│   │   ├── STTService/      # STT 서비스 페이지
│   │   ├── STT/             # STT 기능 페이지
│   │   ├── Insights/        # 인사이트 분석 페이지
│   │   └── ELearning/       # E-Learning 페이지
│   ├── services/            # API 서비스 모듈
│   │   ├── sttService.js    # STT/TTS API 함수
│   │   ├── youtubeService.js # YouTube API 함수
│   │   └── insightService.js # 인사이트 분석 API 함수
│   ├── hooks/               # 커스텀 훅
│   │   ├── useSTT.js        # STT 관련 훅
│   │   ├── useInsights.js   # 인사이트 관련 훅
│   │   └── useELearning.js  # E-Learning 관련 훅
│   ├── utils/               # 유틸리티 함수
│   ├── App.js               # 메인 앱 컴포넌트
│   ├── index.js             # 앱 진입점
│   ├── index.css            # 글로벌 스타일
│   └── routes.js            # 라우팅 설정
├── package.json             # 의존성 관리
└── README.md               # 프로젝트 문서
```

## 설치 및 실행

### 사전 요구사항
- Node.js (v14 이상)
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone [repository-url]
cd client

# 의존성 설치
npm install
```

### 환경 변수 설정
`.env` 파일을 생성하고 다음 변수를 설정하세요:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### 실행
```bash
# 개발 서버 시작
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test
```

## 라우팅 구조

- `/` - 홈 페이지 (서비스 소개)
- `/stt` - STT 서비스 (음성 인식 및 발음 교정)
- `/insights` - 인사이트 분석 (학습 데이터 시각화)
- `/elearning` - E-Learning (YouTube 기반 학습)

## 주요 API 서비스

### STT 서비스
- `processAudioForSTT()` - 음성 데이터 처리 및 텍스트 변환
- `generateTTS()` - 텍스트를 음성으로 변환

### YouTube 서비스
- `searchVideos()` - 한국어 교육 영상 검색
- `searchVideosWithOptions()` - 상세 옵션 검색
- `getVideoDetails()` - 영상 상세 정보 조회

### 인사이트 서비스
- `getInsightOverview()` - 전체 지표 개요
- `getGenderPerformance()` - 성별별 성과 분석
- `getLevelPerformance()` - 레벨별 성과 분석
- `getCSIDPatterns()` - CSID 오류 패턴 분석
- `getTextDifficulty()` - 텍스트 난이도 분석

## 커스텀 훅

- `useSTT` - STT 기능 및 상태 관리
- `useInsights` - 인사이트 데이터 관리
- `useELearning` - E-Learning 기능 관리
