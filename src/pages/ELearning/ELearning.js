import React from 'react';
import useELearning from '../../hooks/useELearning';
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

    const handleSearchSubmit = (query) => {
        handleSearch(query, true);
    };

    const handleLoadMore = () => {
        loadMoreVideos();
    };

    return (
        <div className="elearning-container">
            <header className="elearning-page-header">
                <h1>한국어 교육 E러닝</h1>
                <p>YouTube의 다양한 한국어 교육 영상으로 학습하세요</p>
            </header>

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
                <div className="error-message">
                    <div className="error-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span>{error}</span>
                        <button onClick={clearError} className="error-close">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <main className="content-section">
                {loading && videos.length === 0 ? (
                    <div className="loading-container">
                        <div className="loading-spinner-large"></div>
                        <p>영상을 불러오는 중...</p>
                    </div>
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
                            {videos.map((video, index) => (
                                <VideoCard
                                    key={`${video.video_id}-${index}`}
                                    video={video}
                                    onVideoSelect={selectVideo}
                                    isSelected={selectedVideo?.video_id === video.video_id}
                                />
                            ))}
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