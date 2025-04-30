import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Pretendard 폰트 추가
const fontLink = document.createElement('link');
fontLink.href = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
