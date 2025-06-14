// 인사이트 API 서비스 함수들
// 한국어 학습 인사이트 분석을 위한 API 함수들을 정의합니다.

const API_BASE_URL = 'http://localhost:8000';

/**
 * 전체 지표 개요 조회
 * @returns {Promise<Object>} - 전체 인사이트 개요 데이터
 */
export const getInsightOverview = async () => {
    try {
        console.log('인사이트 개요 요청');
        
        const response = await fetch(`${API_BASE_URL}/api/insights/overview`);
        
        if (!response.ok) {
            throw new Error(`개요 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('인사이트 개요 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('인사이트 개요 조회 오류:', error);
        throw error;
    }
};

/**
 * 성별별 발음 성과 분석 조회
 * @param {Object} filters - 필터 옵션
 * @returns {Promise<Object>} - 성별별 성과 데이터
 */
export const getGenderPerformance = async (filters = {}) => {
    try {
        console.log('성별별 성과 분석 요청:', filters);
        
        const params = new URLSearchParams();
        if (filters.level) params.append('level', filters.level);
        if (filters.nationality) params.append('nationality', filters.nationality);
        
        const response = await fetch(`${API_BASE_URL}/api/insights/gender-performance?${params}`);
        
        if (!response.ok) {
            throw new Error(`성별 성과 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('성별별 성과 분석 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('성별별 성과 분석 오류:', error);
        throw error;
    }
};

/**
 * 국적별 발음 특성 분석 조회 (전체)
 * @returns {Promise<Object>} - 국적별 분석 데이터
 */
export const getNationalityAnalysis = async () => {
    try {
        console.log('국적별 분석 요청');
        
        const response = await fetch(`${API_BASE_URL}/api/insights/nationality-analysis`);
        
        if (!response.ok) {
            throw new Error(`국적별 분석 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('국적별 분석 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('국적별 분석 오류:', error);
        throw error;
    }
};

/**
 * 특정 국적 분석 조회
 * @param {string} nationality - 분석할 국적
 * @returns {Promise<Object>} - 특정 국적 분석 데이터
 */
export const getSpecificNationalityAnalysis = async (nationality) => {
    try {
        console.log('특정 국적 분석 요청:', nationality);
        
        const response = await fetch(`${API_BASE_URL}/api/insights/nationality-analysis/${nationality}`);
        
        if (!response.ok) {
            throw new Error(`특정 국적 분석 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('특정 국적 분석 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('특정 국적 분석 오류:', error);
        throw error;
    }
};

/**
 * 레벨별 성과 분석 조회 (전체)
 * @returns {Promise<Object>} - 레벨별 성과 데이터
 */
export const getLevelPerformance = async () => {
    try {
        console.log('레벨별 성과 분석 요청');
        
        const response = await fetch(`${API_BASE_URL}/api/insights/level-performance`);
        
        if (!response.ok) {
            throw new Error(`레벨별 성과 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('레벨별 성과 분석 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('레벨별 성과 분석 오류:', error);
        throw error;
    }
};

/**
 * CSID 오류 패턴 분석 조회
 * @param {Object} filters - 필터 옵션
 * @returns {Promise<Object>} - CSID 패턴 데이터
 */
export const getCSIDPatterns = async (filters = {}) => {
    try {
        console.log('CSID 패턴 분석 요청:', filters);
        
        const params = new URLSearchParams();
        if (filters.sex) params.append('sex', filters.sex);
        if (filters.nationality) params.append('nationality', filters.nationality);
        if (filters.level) params.append('level', filters.level);
        
        const response = await fetch(`${API_BASE_URL}/api/insights/csid-patterns?${params}`);
        
        if (!response.ok) {
            throw new Error(`CSID 패턴 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('CSID 패턴 분석 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('CSID 패턴 분석 오류:', error);
        throw error;
    }
};

/**
 * 타입별 성과 분석 조회
 * @returns {Promise<Object>} - 타입별 성과 데이터
 */
export const getTypePerformance = async () => {
    try {
        console.log('타입별 성과 분석 요청');
        
        const response = await fetch(`${API_BASE_URL}/api/insights/type-performance`);
        
        if (!response.ok) {
            throw new Error(`타입별 성과 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('타입별 성과 분석 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('타입별 성과 분석 오류:', error);
        throw error;
    }
};

/**
 * 텍스트 난이도 분석 조회
 * @param {number} limit - 반환할 텍스트 개수
 * @returns {Promise<Object>} - 텍스트 난이도 데이터
 */
export const getTextDifficulty = async (limit = 20) => {
    try {
        console.log('텍스트 난이도 분석 요청:', limit);
        
        const params = new URLSearchParams();
        params.append('limit', limit.toString());
        
        const response = await fetch(`${API_BASE_URL}/api/insights/text-difficulty?${params}`);
        
        if (!response.ok) {
            throw new Error(`텍스트 난이도 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('텍스트 난이도 분석 응답:', result);
        
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return null;
        }
    } catch (error) {
        console.error('텍스트 난이도 분석 오류:', error);
        throw error;
    }
};

/**
 * 인사이트 서비스 상태 확인
 * @returns {Promise<Object>} - 서비스 상태 정보
 */
export const checkInsightServiceHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/insights/health`);
        
        if (!response.ok) {
            throw new Error(`서비스 상태 확인 실패: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('인사이트 서비스 상태:', data);
        
        return data;
    } catch (error) {
        console.error('인사이트 서비스 상태 확인 오류:', error);
        throw error;
    }
}; 