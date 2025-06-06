import React from 'react';
import './VideoCard.css';

const VideoCard = ({ video, onVideoSelect, isSelected = false }) => {
    // 데이터 유효성 검증
    if (!video) {
        console.warn('VideoCard: video 데이터가 없습니다.');
        return null;
    }

    console.log('VideoCard 렌더링:', video);

    const handleClick = () => {
        console.log('VideoCard 클릭:', video.video_id, video.title);
        onVideoSelect(video);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '날짜 없음';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            console.warn('날짜 형식 오류:', dateString);
            return '날짜 형식 오류';
        }
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // 필수 데이터 체크
    const title = video.title || '제목 없음';
    const thumbnail_url = video.thumbnail_url || '';
    const channel_title = video.channel_title || '채널 정보 없음';
    const description = video.description || '';
    const published_at = video.published_at || '';

    return (
        <div 
            className={`video-card ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <div className="video-thumbnail">
                {thumbnail_url ? (
                    <img 
                        src={thumbnail_url} 
                        alt={title}
                        loading="lazy"
                        onError={(e) => {
                            console.warn('썸네일 로드 실패:', thumbnail_url);
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        backgroundColor: '#f0f0f0', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        color: '#999'
                    }}>
                        썸네일 없음
                    </div>
                )}
                <div className="play-overlay">
                    <div className="play-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path 
                                d="M8 5v14l11-7z" 
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            
            <div className="video-info">
                <h3 className="video-title" title={title}>
                    {title}
                </h3>
                
                <p className="video-channel">
                    {channel_title}
                </p>
                
                <p className="video-description">
                    {truncateText(description)}
                </p>
                
                <div className="video-meta">
                    <span className="video-date">
                        {formatDate(published_at)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard; 