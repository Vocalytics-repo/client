import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import STTService from './pages/STTService/STTService';
import ELearning from './pages/ELearning/ELearning';
import Insights from './pages/Insights/Insights';
import SidebarMenu from './components/Sidebar/SidebarMenu';

// 임시 페이지 컴포넌트는 더 이상 필요하지 않음 (Insights 컴포넌트로 대체)

function App() {
    return (
        <Router>
            {/* 사이드바 메뉴 컴포넌트 */}
            <SidebarMenu />

            {/* 라우팅 설정 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stt" element={<STTService />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/elearning" element={<ELearning />} />
            </Routes>
        </Router>
    );
}

export default App;
