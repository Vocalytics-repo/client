import { useState, useEffect, useCallback } from 'react';
import { 
    searchVideos, 
    searchVideosWithOptions, 
    getVideoDetails,
    getRecommendedSearchTerms 
} from '../services/youtubeService';

const useELearning = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('한국어 교육');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // 추천 검색어 목록
    const recommendedTerms = getRecommendedSearchTerms();

    // 초기 영상 로드
    useEffect(() => {
        const initialSearch = async () => {
            setLoading(true);
            setError(null);
            console.log('초기 검색 시작');

            try {
                const searchOptions = {
                    query: '한국어 교육',
                    max_results: 12,
                    order: 'relevance',
                    published_after: null,
                    duration: null
                };

                console.log('초기 검색 옵션:', searchOptions);
                const results = await searchVideosWithOptions(searchOptions);
                console.log('초기 검색 결과:', results);
                console.log('결과 타입:', typeof results, '길이:', Array.isArray(results) ? results.length : 'not array');
                
                if (Array.isArray(results) && results.length > 0) {
                    console.log('첫 번째 영상 데이터:', results[0]);
                }
                
                setVideos(results);
                setSearchQuery('한국어 교육');
                setHasMore(results.length === 12);
                setCurrentPage(2);
                
                console.log('상태 업데이트 완료 - videos:', results.length);
            } catch (err) {
                console.error('초기 검색 오류:', err);
                setError('영상을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            } finally {
                setLoading(false);
                console.log('초기 검색 완료');
            }
        };

        initialSearch();
    }, []);

    // 영상 검색 함수
    const handleSearch = useCallback(async (query = searchQuery, isNewSearch = true) => {
        if (!query.trim()) {
            console.log('검색어가 비어있음');
            return;
        }

        console.log('검색 시작:', { query, isNewSearch });
        setLoading(true);
        setError(null);

        try {
            if (isNewSearch) {
                setCurrentPage(1);
                setVideos([]);
                console.log('새로운 검색 - 이전 결과 초기화');
            }

            const searchOptions = {
                query: query.trim(),
                max_results: 12,
                order: 'relevance',
                published_after: null,
                duration: null
            };

            console.log('검색 옵션:', searchOptions);
            const results = await searchVideosWithOptions(searchOptions);
            console.log('검색 결과:', results);
            console.log('결과 타입:', typeof results, '길이:', Array.isArray(results) ? results.length : 'not array');
            
            if (Array.isArray(results) && results.length > 0) {
                console.log('첫 번째 영상 데이터:', results[0]);
            }
            
            if (isNewSearch) {
                setVideos(results);
                setSearchQuery(query);
                
                // 검색 기록 업데이트
                setSearchHistory(prev => {
                    const newHistory = [query, ...prev.filter(item => item !== query)];
                    return newHistory.slice(0, 10); // 최대 10개까지 저장
                });
                console.log('새로운 검색 결과 설정:', results.length);
            } else {
                setVideos(prev => {
                    const combined = [...prev, ...results];
                    console.log('기존 결과와 합침:', prev.length, '+', results.length, '=', combined.length);
                    return combined;
                });
            }

            setHasMore(results.length === 12);
            setCurrentPage(prev => prev + 1);

        } catch (err) {
            console.error('검색 오류:', err);
            setError('영상을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
            console.log('검색 완료');
        }
    }, [searchQuery]);

    // 더 많은 영상 로드
    const loadMoreVideos = useCallback(() => {
        console.log('더 많은 영상 로드 요청:', { loading, hasMore });
        if (!loading && hasMore) {
            handleSearch(searchQuery, false);
        }
    }, [loading, hasMore, searchQuery, handleSearch]);

    // 영상 선택
    const selectVideo = useCallback(async (video) => {
        console.log('영상 선택:', video);
        setSelectedVideo(video);
        
        // 상세 정보가 필요한 경우 추가 API 호출
        try {
            const detailedInfo = await getVideoDetails(video.video_id);
            console.log('영상 상세 정보:', detailedInfo);
            setSelectedVideo(prev => ({ ...prev, ...detailedInfo }));
        } catch (err) {
            console.error('영상 상세 정보 로드 오류:', err);
        }
    }, []);

    // 영상 선택 해제
    const clearSelectedVideo = useCallback(() => {
        console.log('영상 선택 해제');
        setSelectedVideo(null);
    }, []);

    // 추천 검색어로 검색
    const searchByRecommended = useCallback((term) => {
        console.log('추천 검색어로 검색:', term);
        handleSearch(term, true);
    }, [handleSearch]);

    // 검색 기록으로 검색
    const searchByHistory = useCallback((term) => {
        console.log('검색 기록으로 검색:', term);
        handleSearch(term, true);
    }, [handleSearch]);

    // 검색어 변경
    const updateSearchQuery = useCallback((query) => {
        console.log('검색어 변경:', query);
        setSearchQuery(query);
    }, []);

    // 오류 초기화
    const clearError = useCallback(() => {
        console.log('오류 초기화');
        setError(null);
    }, []);

    // 새로고침
    const refreshVideos = useCallback(() => {
        console.log('영상 새로고침');
        handleSearch(searchQuery, true);
    }, [searchQuery, handleSearch]);

    // 디버깅용 - 현재 상태 로깅
    useEffect(() => {
        console.log('현재 videos 상태:', videos.length, videos);
    }, [videos]);

    return {
        // 상태
        videos,
        loading,
        error,
        searchQuery,
        selectedVideo,
        searchHistory,
        recommendedTerms,
        currentPage,
        hasMore,

        // 액션
        handleSearch,
        loadMoreVideos,
        selectVideo,
        clearSelectedVideo,
        searchByRecommended,
        searchByHistory,
        updateSearchQuery,
        clearError,
        refreshVideos
    };
};

export default useELearning; 