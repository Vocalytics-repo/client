import { useState, useEffect, useCallback } from 'react';
import { 
    searchVideos, 
    searchVideosWithOptions, 
    getVideoDetails,
    getRecommendedSearchTerms 
} from '../services/youtubeService';

const useELearning = () => {
    const [allVideos, setAllVideos] = useState([]); // 모든 받아온 영상들 저장
    const [videos, setVideos] = useState([]); // 현재 화면에 표시되는 영상들
    const [displayedCount, setDisplayedCount] = useState(0); // 현재 표시된 영상 수
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('한국어 교육');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);
    const [currentOffset, setCurrentOffset] = useState(0); // API 요청용 offset
    const [hasMore, setHasMore] = useState(true);
    const [totalResults, setTotalResults] = useState(0);

    // 추천 검색어 목록
    const recommendedTerms = getRecommendedSearchTerms();

    // 초기 영상 로드 (120개 받아서 12개만 표시)
    useEffect(() => {
        const initialSearch = async () => {
            setLoading(true);
            setError(null);
            console.log('초기 검색 시작 (120개 요청, 12개 표시)');

            try {
                const searchOptions = {
                    query: '한국어 교육',
                    max_results: 120,
                    order: 'relevance',
                    published_after: null,
                    duration: null,
                    offset: 0
                };

                console.log('초기 검색 옵션:', searchOptions);
                const result = await searchVideosWithOptions(searchOptions);
                console.log('초기 검색 결과:', result);
                
                if (result && result.videos && result.videos.length > 0) {
                    console.log('받은 전체 영상 수:', result.videos.length);
                    setAllVideos(result.videos); // 모든 영상 저장
                    setVideos(result.videos.slice(0, 12)); // 처음 12개만 표시
                    setDisplayedCount(12);
                    setTotalResults(result.total_results || 0);
                    setCurrentOffset(120); // 다음 API 요청을 위한 offset
                    
                    // hasMore 계산: 표시할 수 있는 영상이 더 있거나, API에서 더 가져올 수 있는 경우
                    const hasMoreToDisplay = result.videos.length > 12;
                    const hasMoreFromAPI = result.total_results > 120;
                    setHasMore(hasMoreToDisplay || hasMoreFromAPI);
                    
                    console.log('초기 상태 설정:', {
                        allVideosCount: result.videos.length,
                        displayedCount: 12,
                        hasMoreToDisplay,
                        hasMoreFromAPI,
                        hasMore: hasMoreToDisplay || hasMoreFromAPI
                    });
                } else {
                    setAllVideos([]);
                    setVideos([]);
                    setDisplayedCount(0);
                    setHasMore(false);
                    setTotalResults(0);
                }
                
                setSearchQuery('한국어 교육');
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
                // 새로운 검색 - 120개 요청해서 12개만 표시
                console.log('새로운 검색 - 120개 요청, 12개 표시');
                
                const searchOptions = {
                    query: query.trim(),
                    max_results: 120,
                    order: 'relevance',
                    published_after: null,
                    duration: null,
                    offset: 0
                };

                console.log('검색 옵션:', searchOptions);
                const result = await searchVideosWithOptions(searchOptions);
                console.log('검색 결과:', result);
                
                if (result && result.videos && result.videos.length > 0) {
                    setAllVideos(result.videos); // 모든 영상 저장
                    setVideos(result.videos.slice(0, 12)); // 처음 12개만 표시
                    setDisplayedCount(12);
                    setSearchQuery(query);
                    setCurrentOffset(120);
                    setTotalResults(result.total_results || 0);
                    
                    // 검색 기록 업데이트
                    setSearchHistory(prev => {
                        const newHistory = [query, ...prev.filter(item => item !== query)];
                        return newHistory.slice(0, 10);
                    });
                    
                    // hasMore 계산
                    const hasMoreToDisplay = result.videos.length > 12;
                    const hasMoreFromAPI = result.total_results > 120;
                    setHasMore(hasMoreToDisplay || hasMoreFromAPI);
                    
                    console.log('새로운 검색 상태 설정:', {
                        allVideosCount: result.videos.length,
                        displayedCount: 12,
                        hasMoreToDisplay,
                        hasMoreFromAPI,
                        hasMore: hasMoreToDisplay || hasMoreFromAPI
                    });
                } else {
                    setAllVideos([]);
                    setVideos([]);
                    setDisplayedCount(0);
                    setHasMore(false);
                    setTotalResults(0);
                }
            }
        } catch (err) {
            console.error('검색 오류:', err);
            setError('영상을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
            console.log('검색 완료');
        }
    }, [searchQuery]);

    // 더 많은 영상 로드 (클라이언트 사이드 페이징 또는 API 요청)
    const loadMoreVideos = useCallback(async () => {
        console.log('더 많은 영상 로드 요청:', { 
            loading, 
            hasMore, 
            displayedCount, 
            allVideosCount: allVideos.length 
        });
        
        if (loading || !hasMore) return;

        // 아직 표시하지 않은 영상이 있는 경우 (클라이언트 사이드 페이징)
        if (displayedCount < allVideos.length) {
            console.log('클라이언트 사이드 페이징 - 12개 추가 표시');
            const nextDisplayCount = Math.min(displayedCount + 12, allVideos.length);
            setVideos(allVideos.slice(0, nextDisplayCount));
            setDisplayedCount(nextDisplayCount);
            
            // 모든 받아온 영상을 다 표시했는지 확인
            const allDisplayed = nextDisplayCount >= allVideos.length;
            const hasMoreFromAPI = totalResults > currentOffset;
            setHasMore(!allDisplayed || hasMoreFromAPI);
            
            console.log('클라이언트 페이징 완료:', {
                nextDisplayCount,
                allDisplayed,
                hasMoreFromAPI,
                hasMore: !allDisplayed || hasMoreFromAPI
            });
            return;
        }

        // 모든 영상을 표시했고 API에서 더 가져올 수 있는 경우
        if (totalResults > currentOffset) {
            console.log('API에서 추가 120개 요청, offset:', currentOffset);
            setLoading(true);
            
            try {
                const searchOptions = {
                    query: searchQuery,
                    max_results: 120,
                    order: 'relevance',
                    published_after: null,
                    duration: null,
                    offset: currentOffset
                };

                const result = await searchVideosWithOptions(searchOptions);
                console.log('추가 API 요청 결과:', result);
                
                if (result && result.videos && result.videos.length > 0) {
                    // 중복 제거
                    const existingIds = new Set(allVideos.map(video => video.video_id));
                    const newVideos = result.videos.filter(video => !existingIds.has(video.video_id));
                    
                    const updatedAllVideos = [...allVideos, ...newVideos];
                    const nextDisplayCount = displayedCount + 12;
                    
                    setAllVideos(updatedAllVideos);
                    setVideos(updatedAllVideos.slice(0, nextDisplayCount));
                    setDisplayedCount(nextDisplayCount);
                    setCurrentOffset(currentOffset + 120);
                    
                    // hasMore 업데이트
                    const hasMoreToDisplay = nextDisplayCount < updatedAllVideos.length;
                    const hasMoreFromAPI = totalResults > (currentOffset + 120);
                    setHasMore(hasMoreToDisplay || hasMoreFromAPI);
                    
                    console.log('API 요청 후 상태:', {
                        newVideosCount: newVideos.length,
                        updatedAllVideosCount: updatedAllVideos.length,
                        displayedCount: nextDisplayCount,
                        hasMoreToDisplay,
                        hasMoreFromAPI,
                        hasMore: hasMoreToDisplay || hasMoreFromAPI
                    });
                }
            } catch (err) {
                console.error('추가 영상 로드 오류:', err);
                setError('추가 영상을 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        }
    }, [loading, hasMore, displayedCount, allVideos, currentOffset, totalResults, searchQuery]);

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
        console.log('현재 상태:', { 
            allVideosCount: allVideos.length,
            displayedVideosCount: videos.length,
            displayedCount,
            currentOffset, 
            hasMore, 
            totalResults 
        });
    }, [allVideos.length, videos.length, displayedCount, currentOffset, hasMore, totalResults]);

    return {
        // 상태
        videos, // 화면에 표시되는 영상들
        loading,
        error,
        searchQuery,
        selectedVideo,
        searchHistory,
        recommendedTerms,
        currentOffset,
        hasMore,
        totalResults,
        displayedCount, // 디버깅용

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