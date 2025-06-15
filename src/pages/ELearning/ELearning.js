import React from 'react';
import useELearning from '../../hooks/useELearning';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import SearchBar from '../../components/SearchBar/SearchBar';
import VideoCard from '../../components/VideoCard/VideoCard';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import ActionButton from '../../components/ActionButton/ActionButton';
import './ELearning.css';

const ELearning = () => {
    const {
        videos,
        loading,
        error,
        searchQuery,
        selectedVideo,
        searchHistory,
        recommendedTerms,
        hasMore,
        handleSearch,
        loadMoreVideos,
        selectVideo,
        clearSelectedVideo,
        searchByRecommended,
        searchByHistory,
        clearError,
        refreshVideos
    } = useELearning();

    console.log('ELearning 렌더링:', {
        videosCount: videos.length,
        loading,
        error,
        searchQuery,
        hasMore
    });

    const handleSearchSubmit = (query) => {
        console.log('검색 제출:', query);
        handleSearch(query, true);
    };

    const handleLoadMore = () => {
        console.log('더 보기 클릭');
        loadMoreVideos();
    };

    return (
        <div className="elearning-container">
            <PageHeader 
                title="한국어 교육 E러닝"
                subtitle="YouTube의 다양한 한국어 교육 영상으로 학습하세요"
                className="elearning-page-header"
            />

            <div className="search-section">
                <SearchBar
                    onSearch={handleSearchSubmit}
                    initialValue={searchQuery}
                    loading={loading}
                    recommendedTerms={recommendedTerms}
                    searchHistory={searchHistory}
                    onRecommendedClick={searchByRecommended}
                    onHistoryClick={searchByHistory}
                />
            </div>

            {error && (
                <ErrorMessage 
                    message={error}
                    onClose={clearError}
                    className="elearning-error"
                />
            )}

            <main className="content-section">
                {loading && videos.length === 0 ? (
                    <LoadingSpinner 
                        message="영상을 불러오는 중..."
                        size="large"
                    />
                ) : videos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <h3>검색 결과가 없습니다</h3>
                        <p>다른 검색어로 시도해보세요</p>
                        <ActionButton onClick={refreshVideos} variant="primary">
                            다시 검색
                        </ActionButton>
                    </div>
                ) : (
                    <>
                        <div className="results-header">
                            <h2>
                                "{searchQuery}" 검색 결과 
                                <span className="results-count">({videos.length}개)</span>
                            </h2>
                        </div>

                        <div className="videos-grid">
                            {console.log('videos-grid 렌더링, videos 배열:', videos)}
                            {videos.map((video, index) => {
                                console.log(`VideoCard ${index} 렌더링:`, video);
                                return (
                                    <VideoCard
                                        key={`${video.video_id}-${index}`}
                                        video={video}
                                        onVideoSelect={selectVideo}
                                        isSelected={selectedVideo?.video_id === video.video_id}
                                    />
                                );
                            })}
                        </div>

                        {hasMore && (
                            <div className="load-more-section">
                                <ActionButton
                                    onClick={handleLoadMore}
                                    disabled={loading}
                                    variant="secondary"
                                >
                                    {loading ? (
                                        <>
                                            <div className="button-spinner"></div>
                                            로딩 중...
                                        </>
                                    ) : (
                                        '더 많은 영상 보기'
                                    )}
                                </ActionButton>
                            </div>
                        )}
                    </>
                )}
            </main>

            {selectedVideo && (
                <VideoPlayer
                    video={selectedVideo}
                    onClose={clearSelectedVideo}
                />
            )}
        </div>
    );
};

export default ELearning; 