import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import STTService from './pages/STTService/STTService';
import ELearning from './pages/ELearning/ELearning';
import SidebarMenu from './components/Sidebar/SidebarMenu';

// 임시 페이지 컴포넌트
const InsightService = () => (
    <div style={{ padding: '50px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>인사이트 서비스</h1>
        <p>이 페이지는 현재 개발 중입니다.</p>
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
                <Route path="/insights" element={<InsightService />} />
                <Route path="/elearning" element={<ELearning />} />
            </Routes>
        </Router>
    );
}

export default App;
