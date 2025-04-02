import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import STTService from './pages/STTService/STTService';
import SidebarMenu from './components/Sidebar/SidebarMenu';

function App() {
    return (
        <Router>
            {/* 사이드바 메뉴 컴포넌트 */}
            <SidebarMenu />

            {/* 라우팅 설정 */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stt" element={<STTService />} />
                {/* ... 다른 페이지 라우트 */}
            </Routes>
        </Router>
    );
}

export default App;
