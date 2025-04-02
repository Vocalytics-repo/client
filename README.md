# client

```
프론트엔드 애플리케이션 (React)
├── public/                    # 정적 파일 (HTML, favicon 등)
├── src/
│   ├── assets/                # 이미지, 아이콘, 폰트 등
│   │   ├── images/
│   │   └── icons/
│   ├── components/            # 공통 및 재사용 컴포넌트
│   │   ├── Header/            # 사이트 상단 네비게이션
│   │   ├── Footer/            # 사이트 하단 정보
│   │   ├── HeroSection/       # 홈 페이지의 Hero 섹션 (서비스명, 슬로건, CTA)
│   │   ├── FeatureCards/      # 기능 소개 카드 (STT, 발음 교정, 속담 학습 등)
│   │   ├── MicrophoneInput/   # 마이크 입력 및 음성 파형 표시
│   │   └── ProverbCard/       # 속담 카드 컴포넌트 (랜덤 속담, 해석, 예문)
│   ├── pages/                 # 각 페이지 단위 컴포넌트
│   │   ├── Home/              # 홈 페이지 (서비스 소개)
│   │   ├── STTService/        # STT 및 발음 교정 페이지
│   │   └── ProverbLearning/   # 한국 속담 학습 페이지
│   ├── services/              # 백엔드 API 연동 모듈
│   │   ├── sttService.js
│   │   ├── ttsService.js
│   │   ├── summarizationService.js
│   │   └── translationService.js
│   ├── utils/                 # 유틸리티 함수들 (예: 포맷팅, 상수 등)
│   ├── App.js                 # 루트 컴포넌트 및 라우터 구성
│   ├── index.js               # 애플리케이션 엔트리 포인트
│   └── routes.js              # 페이지 라우팅 정의
├── package.json               # 프론트엔드 의존성 관리
└── README.md
```
