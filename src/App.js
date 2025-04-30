import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import STTService from './pages/STTService/STTService';
import SidebarMenu from './components/Sidebar/SidebarMenu';

// 임시 페이지 컴포넌트
const GrammarService = () => (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>문법 교정 서비스</h1>
        <p>이 페이지는 현재 개발 중입니다.</p>
        <p>빠른 시일 내에 서비스를 제공해 드리겠습니다.</p>
    </div>
);

const PronunciationService = () => (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>발음 교정 서비스</h1>
        <p>이 페이지는 현재 개발 중입니다.</p>
        <p>빠른 시일 내에 서비스를 제공해 드리겠습니다.</p>
    </div>
);

function App() {
    return (
        <Router>
            {/* 사이드바 메뉴 컴포넌트 */}
            <SidebarMenu />

            {/* 라우팅 설정 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stt" element={<STTService />} />
                <Route path="/grammar" element={<GrammarService />} />
                <Route path="/pronunciation" element={<PronunciationService />} />
            </Routes>
        </Router>
    );
}

export default App;
