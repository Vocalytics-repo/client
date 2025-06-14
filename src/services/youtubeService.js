// YouTube API 서비스 함수들
// 한국어 교육 영상 검색 및 관리를 위한 API 함수들을 정의합니다.

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

/**
 * 간단한 YouTube 영상 검색
 * @param {string} query - 검색어
 * @returns {Promise<Array>} - 검색된 영상 목록
 */
export const searchVideos = async (query = '한국어 교육') => {
    try {
        console.log('YouTube 검색 요청:', query);
        
        const response = await fetch(`${API_BASE_URL}/youtube/search?q=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error(`검색 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('YouTube 검색 응답:', result);
        
        // API 응답 구조에 맞게 수정
        if (result.success && result.data) {
            console.log('YouTube 검색 결과 영상 수:', result.data.length);
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return [];
        }
    } catch (error) {
        console.error('YouTube 검색 오류:', error);
        throw error;
    }
};

/**
 * 상세 옵션을 포함한 YouTube 영상 검색
 * @param {Object} searchOptions - 검색 옵션
 * @returns {Promise<Array>} - 검색된 영상 목록
 */
export const searchVideosWithOptions = async (searchOptions) => {
    try {
        console.log('YouTube 상세 검색 요청:', searchOptions);
        
        // 페이징 파라미터 추가
        const requestBody = {
            query: searchOptions.query || '한국어 교육',
            max_results: searchOptions.max_results || 12,
            order: searchOptions.order || 'relevance',
            published_after: searchOptions.published_after || null,
            duration: searchOptions.duration || null,
            offset: searchOptions.offset || 0  // 페이징을 위한 offset 추가
        };
        
        console.log('요청 본문:', requestBody);
        
        const response = await fetch(`${API_BASE_URL}/youtube/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            throw new Error(`상세 검색 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('YouTube 상세 검색 응답:', result);
        
        // API 응답 구조에 맞게 수정
        if (result.success && result.data) {
            console.log('YouTube 상세 검색 결과 영상 수:', result.data.length);
            console.log('총 결과 수:', result.total_results);
            return {
                videos: result.data,
                total_results: result.total_results || 0,
                has_more: result.data.length === requestBody.max_results
            };
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return {
                videos: [],
                total_results: 0,
                has_more: false
            };
        }
    } catch (error) {
        console.error('YouTube 상세 검색 오류:', error);
        throw error;
    }
};

/**
 * 특정 YouTube 영상의 상세 정보 조회
 * @param {string} videoId - YouTube 영상 ID
 * @returns {Promise<Object>} - 영상 상세 정보
 */
export const getVideoDetails = async (videoId) => {
    try {
        console.log('YouTube 영상 상세 정보 요청:', videoId);
        
        const response = await fetch(`${API_BASE_URL}/youtube/video/${videoId}`);
        
        if (!response.ok) {
            throw new Error(`영상 정보 요청 실패: ${response.status} ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log('YouTube 영상 상세 정보 응답:', result);
        
        // API 응답 구조에 맞게 수정
        if (result.success && result.data) {
            return result.data;
        } else {
            console.warn('예상과 다른 응답 형식:', result);
            return {};
        }
    } catch (error) {
        console.error('YouTube 영상 정보 조회 오류:', error);
        throw error;
    }
};

/**
 * YouTube 서비스 상태 확인
 * @returns {Promise<Object>} - 서비스 상태 정보
 */
export const checkYouTubeServiceHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/youtube/health`);
        
        if (!response.ok) {
            throw new Error(`서비스 상태 확인 실패: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('YouTube 서비스 상태:', data);
        
        return data;
    } catch (error) {
        console.error('YouTube 서비스 상태 확인 오류:', error);
        throw error;
    }
};

/**
 * 한국어 교육 관련 추천 검색어 목록
 */
export const getRecommendedSearchTerms = () => {
    return [
        '한국어 기초',
        '한국어 발음',
        '한국어 회화',
        '한국어 문법',
        '한국어 듣기',
        '한국어 읽기',
        '한국어 쓰기',
        '한국어 단어',
        '한국어 표현',
        '한국어 문화'
    ];
}; 