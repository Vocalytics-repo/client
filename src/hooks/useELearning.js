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

            try {
                const searchOptions = {
                    query: '한국어 교육',
                    max_results: 12,
                    order: 'relevance',
                    published_after: null,
                    duration: null
                };

                const results = await searchVideosWithOptions(searchOptions);
                setVideos(results);
                setSearchQuery('한국어 교육');
                setHasMore(results.length === 12);
                setCurrentPage(2);
            } catch (err) {
                console.error('초기 검색 오류:', err);
                setError('영상을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
            } finally {
                setLoading(false);
            }
        };

        initialSearch();
    }, []);

    // 영상 검색 함수
    const handleSearch = useCallback(async (query = searchQuery, isNewSearch = true) => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            if (isNewSearch) {
                setCurrentPage(1);
                setVideos([]);
            }

            const searchOptions = {
                query: query.trim(),
                max_results: 12,
                order: 'relevance',
                published_after: null,
                duration: null
            };

            const results = await searchVideosWithOptions(searchOptions);
            
            if (isNewSearch) {
                setVideos(results);
                setSearchQuery(query);
                
                // 검색 기록 업데이트
                setSearchHistory(prev => {
                    const newHistory = [query, ...prev.filter(item => item !== query)];
                    return newHistory.slice(0, 10); // 최대 10개까지 저장
                });
            } else {
                setVideos(prev => [...prev, ...results]);
            }

            setHasMore(results.length === 12);
            setCurrentPage(prev => prev + 1);

        } catch (err) {
            console.error('검색 오류:', err);
            setError('영상을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    }, [searchQuery]);

    // 더 많은 영상 로드
    const loadMoreVideos = useCallback(() => {
        if (!loading && hasMore) {
            handleSearch(searchQuery, false);
        }
    }, [loading, hasMore, searchQuery, handleSearch]);

    // 영상 선택
    const selectVideo = useCallback(async (video) => {
        setSelectedVideo(video);
        
        // 상세 정보가 필요한 경우 추가 API 호출
        try {
            const detailedInfo = await getVideoDetails(video.video_id);
            setSelectedVideo(prev => ({ ...prev, ...detailedInfo }));
        } catch (err) {
            console.error('영상 상세 정보 로드 오류:', err);
        }
    }, []);

    // 영상 선택 해제
    const clearSelectedVideo = useCallback(() => {
        setSelectedVideo(null);
    }, []);

    // 추천 검색어로 검색
    const searchByRecommended = useCallback((term) => {
        handleSearch(term, true);
    }, [handleSearch]);

    // 검색 기록으로 검색
    const searchByHistory = useCallback((term) => {
        handleSearch(term, true);
    }, [handleSearch]);

    // 검색어 변경
    const updateSearchQuery = useCallback((query) => {
        setSearchQuery(query);
    }, []);

    // 오류 초기화
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // 새로고침
    const refreshVideos = useCallback(() => {
        handleSearch(searchQuery, true);
    }, [searchQuery, handleSearch]);

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