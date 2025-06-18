# Vocalytics - Korean Learning Platform (Client)

![ChatGPT Image 2025년 6월 15일 오후 09_01_18](https://github.com/user-attachments/assets/0b3144b7-e1da-4701-81ee-6de80cbeea51)


Vocalytics is a comprehensive AI-powered platform for learning Korean. It offers speech recognition (STT), pronunciation correction, learning insight analysis, and YouTube-based e-learning features.

## Key Features

### 1. STT Service (Speech-to-Text)
- Real-time speech recognition and text conversion
- AI-based pronunciation correction and feedback
- Learn accurate pronunciation with Text-to-Speech (TTS)
- Download your own recorded audio data

### 2. Insight Analysis (Insights)
- Analysis and visualization of learner performance
- Analysis by gender and Korean proficiency level
- CSID error pattern analysis
- Pronunciation difficulty analysis

### 3. E-Learning
- Search for Korean educational videos based on YouTube
- Personalized learning content recommendations
- Detailed information for each video

## Tech Stack

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.14.0
- **Build Tool**: Create React App
- **Styling**: CSS3
- **State Management**: React Hooks (Custom Hooks)

## Project Structure

```
client/
├── public/                    # Static files
│   ├── assets/               # Images, icons, etc.
│   └── index.html           # HTML template
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header/          # Header component
│   │   ├── Sidebar/         # Sidebar menu
│   │   ├── HeroSection/     # Main hero section
│   │   ├── FeatureSection/  # Feature introduction section
│   │   ├── AudioSpectrum/   # Audio spectrum visualization
│   │   ├── VideoPlayer/     # Video player
│   │   ├── VideoCard/       # Video card
│   │   ├── SearchBar/       # Search bar
│   │   ├── ResultCard/      # Result card
│   │   ├── ActionButton/    # Action button
│   │   ├── Icons/           # Icon components
│   │   └── common/          # Common components
│   ├── pages/               # Page components
│   │   ├── Home/            # Home page
│   │   ├── STTService/      # STT service page
│   │   ├── STT/             # STT feature page
│   │   ├── Insights/        # Insights analysis page
│   │   └── ELearning/       # E-Learning page
│   ├── services/            # API service modules
│   │   ├── sttService.js    # STT/TTS API functions
│   │   ├── youtubeService.js # YouTube API functions
│   │   └── insightService.js # Insight analysis API functions
│   ├── hooks/               # Custom hooks
│   │   ├── useSTT.js        # STT-related hook
│   │   ├── useInsights.js   # Insights-related hook
│   │   └── useELearning.js  # E-Learning-related hook
│   ├── utils/               # Utility functions
│   ├── App.js               # Main app component
│   ├── index.js             # App entry point
│   ├── index.css            # Global styles
│   └── routes.js            # Routing configuration
├── package.json             # Dependency management
└── README.md                # Project documentation
```

## Installation and execution

### Prerequisites
- Node.js (v14 and later)
- npm or yarn

### Installation
```bash
# Storage Clones
git clone [repository-url]
cd client

# Dependency installation
npm install
```

### Setting Environmental Variables
Create the '.env' file and set the following variables:
```env
REACT_APP_BACKEND_URL=http://localhost:8000
```

### Execute
```bash
# Launch Development Server
npm start

# Production Build
npm run build

# Run a test
npm test
```

## Routing Structure

- '/' - Home Page (Service Introduction)
- '/stt' - STT service (voice recognition and pronunciation correction)
- '/insights' - Insight Analysis (Visualization of Learning Data)
- `/elearning` - E-Learning (YouTube-based learning)

## Key API Services

### STT Services
- 'processAudioForSTT()' - Voice data processing and text conversion
- 'generateTTS()' - convert text to voice

### YouTube Services
- 'searchVideo()' - Search for Korean Education Video
- 'searchVideoWithOptions()' - Search for detailed options
- 'getVideoDetails()' - View video details

### Insight Service
- 'getInsightOverview()' - Overall Indicator Overview
- 'getGender Performance()' - Performance Analysis by Gender
- 'getLevelPerformance()' - Performance Analysis by Level
- 'getCSIDPatterns()' - CSID Error Pattern Analysis
- 'getTextDifficulty()' - Analysis of Difficulty by Pronunciation

## Custom Hook

- 'useSTT' - STT function and status management
- 'useInsights' - Insight Data Management
- 'useELEARNING' - E-Learning Functional Management
