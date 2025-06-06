import React from 'react';
import './VideoCard.css';

const VideoCard = ({ video, onVideoSelect, isSelected = false }) => {
    const handleClick = () => {
        onVideoSelect(video);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text, maxLength = 100) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div 
            className={`video-card ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
        >
            <div className="video-thumbnail">
                <img 
                    src={video.thumbnail_url} 
                    alt={video.title}
                    loading="lazy"
                />
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
                <h3 className="video-title" title={video.title}>
                    {video.title}
                </h3>
                
                <p className="video-channel">
                    {video.channel_title}
                </p>
                
                <p className="video-description">
                    {truncateText(video.description)}
                </p>
                
                <div className="video-meta">
                    <span className="video-date">
                        {formatDate(video.published_at)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard; 