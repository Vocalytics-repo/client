import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ 
    onSearch, 
    initialValue = '', 
    placeholder = '한국어 교육 영상을 검색하세요...', 
    loading = false,
    recommendedTerms = [],
    searchHistory = [],
    onRecommendedClick,
    onHistoryClick
}) => {
    const [query, setQuery] = useState(initialValue);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && !loading) {
            onSearch(query.trim());
            setShowSuggestions(false);
        }
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleInputFocus = () => {
        setShowSuggestions(true);
    };

    const handleInputBlur = () => {
        // 약간의 지연을 두어 클릭 이벤트가 처리될 수 있도록 함
        setTimeout(() => setShowSuggestions(false), 200);
    };

    const handleSuggestionClick = (term, type) => {
        setQuery(term);
        setShowSuggestions(false);
        
        if (type === 'recommended' && onRecommendedClick) {
            onRecommendedClick(term);
        } else if (type === 'history' && onHistoryClick) {
            onHistoryClick(term);
        } else {
            onSearch(term);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setShowSuggestions(false);
    };

    return (
        <div className="search-bar-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder={placeholder}
                        className="search-input"
                        disabled={loading}
                    />
                    
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="clear-button"
                            disabled={loading}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path 
                                    d="M18 6L6 18M6 6l12 12" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )}
                    
                    <button
                        type="submit"
                        className="search-button"
                        disabled={loading || !query.trim()}
                    >
                        {loading ? (
                            <div className="loading-spinner"></div>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle 
                                    cx="11" 
                                    cy="11" 
                                    r="8" 
                                    stroke="currentColor" 
                                    strokeWidth="2"
                                />
                                <path 
                                    d="M21 21l-4.35-4.35" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </form>
            
            {showSuggestions && (recommendedTerms.length > 0 || searchHistory.length > 0) && (
                <div className="suggestions-dropdown">
                    {searchHistory.length > 0 && (
                        <div className="suggestions-section">
                            <h4>최근 검색</h4>
                            <div className="suggestions-list">
                                {searchHistory.map((term, index) => (
                                    <button
                                        key={`history-${index}`}
                                        className="suggestion-item history-item"
                                        onClick={() => handleSuggestionClick(term, 'history')}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                                            <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2"/>
                                        </svg>
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {recommendedTerms.length > 0 && (
                        <div className="suggestions-section">
                            <h4>추천 검색어</h4>
                            <div className="suggestions-list">
                                {recommendedTerms.map((term, index) => (
                                    <button
                                        key={`recommended-${index}`}
                                        className="suggestion-item recommended-item"
                                        onClick={() => handleSuggestionClick(term, 'recommended')}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path 
                                                d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 