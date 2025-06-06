import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = ({ video, onClose }) => {
    if (!video) return null;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="video-player-overlay" onClick={handleBackdropClick}>
            <div className="video-player-container">
                <div className="video-player-header">
                    <h2>{video.title}</h2>
                    <button className="close-button" onClick={onClose}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path 
                                d="M18 6L6 18M6 6l12 12" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
                
                <div className="video-embed-container">
                    <iframe
                        src={video.embed_url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                
                <div className="video-details">
                    <div className="video-info-section">
                        <div className="channel-info">
                            <h3>{video.channel_title}</h3>
                            <span className="publish-date">
                                {formatDate(video.published_at)}
                            </span>
                        </div>
                        
                        <div className="video-actions">
                            <a 
                                href={video.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="youtube-link"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path 
                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
                                        fill="currentColor"
                                    />
                                </svg>
                                YouTube에서 보기
                            </a>
                        </div>
                    </div>
                    
                    {video.description && (
                        <div className="video-description">
                            <h4>영상 설명</h4>
                            <p>{video.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer; 