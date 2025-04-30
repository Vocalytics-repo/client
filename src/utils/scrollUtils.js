/**
 * 스크롤 관련 유틸리티 함수 모음
 */

/**
 * 요소가 화면에 보이는지 확인하는 함수
 * @param {HTMLElement} element - 확인할 DOM 요소
 * @param {number} threshold - 화면에 얼마나 보여야 보이는 것으로 간주할지 비율 (0~1)
 * @returns {boolean} 요소가 화면에 보이는지 여부
 */
export const isElementVisible = (element, threshold = 0.75) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * threshold;
};

/**
 * 특정 ID의 요소로 부드럽게 스크롤하는 함수
 * @param {string} elementId - 스크롤할 요소의 ID
 */
export const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

/**
 * 스크롤 위치에 따른 애니메이션 진행도 계산
 * @param {HTMLElement} element - 애니메이션 요소
 * @param {number} threshold - 시작 기준점 (0~1)
 * @param {number} range - 애니메이션 진행 범위 (픽셀)
 * @returns {number} 0~1 사이의 애니메이션 진행도
 */
export const calculateScrollProgress = (element, threshold = 0.75, range = 200) => {
    if (!element) return 0;
    
    const rect = element.getBoundingClientRect();
    const startPoint = window.innerHeight * threshold;
    
    if (rect.top > startPoint) return 0;
    if (rect.top < startPoint - range) return 1;
    
    return (startPoint - rect.top) / range;
}; 