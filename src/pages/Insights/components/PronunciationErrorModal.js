import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import './PronunciationErrorModal.css';

const PronunciationErrorModal = ({ isOpen, onClose, refText }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 퍼센트 포맷팅 함수
    const formatPercent = (value) => {
        if (value > 1) {
            return `${value.toFixed(1)}%`;
        } else {
            return `${(value * 100).toFixed(1)}%`;
        }
    };

    // 숫자 포맷팅 함수
    const formatNumber = (value) => {
        return value.toLocaleString();
    };

    // API 호출 함수
    const fetchPronunciationErrors = async (text) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(
                `http://localhost:8000/api/insights/pronunciation-errors?ref_text=${encodeURIComponent(text)}&limit=50`
            );
            const result = await response.json();
            
            if (result.success) {
                setData(result.data);
            } else {
                setError(result.message || '데이터를 불러오는데 실패했습니다.');
            }
        } catch (err) {
            setError('서버 연결에 실패했습니다.');
            console.error('API 호출 오류:', err);
        } finally {
            setLoading(false);
        }
    };

    // 모달이 열릴 때 API 호출
    useEffect(() => {
        if (isOpen && refText) {
            fetchPronunciationErrors(refText);
        }
    }, [isOpen, refText]);

    // 키보드 이벤트 처리 (ESC 키로 닫기)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // 모달이 닫혀있으면 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <div className="pronunciation-modal-overlay" onClick={onClose}>
            <div className="pronunciation-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="pronunciation-modal-header">
                    <h2>발음 오류 분석: "{refText}"</h2>
                    <button className="pronunciation-modal-close" onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className="pronunciation-modal-body">
                    {loading && (
                        <div className="pronunciation-loading">
                            <LoadingSpinner message="발음 오류 데이터를 분석하는 중..." />
                        </div>
                    )}

                    {error && (
                        <div className="pronunciation-error">
                            <div className="error-icon">⚠️</div>
                            <h3>오류 발생</h3>
                            <p>{error}</p>
                        </div>
                    )}

                    {data && !loading && (
                        <div className="pronunciation-analysis">
                            <div className="analysis-overview">
                                <div className="overview-stats">
                                    <div className="stat-item">
                                        <span className="stat-value">{formatNumber(data.found_documents)}</span>
                                        <span className="stat-label">발견된 샘플</span>
                                    </div>
                                </div>
                            </div>

                            {data.found_documents > 0 ? (
                                <>
                                    <div className="error-summary">
                                        <h3>오류 분석 요약</h3>
                                        
                                        {data.error_analysis?.gender_performance && (
                                            <div className="performance-section">
                                                <h4>성별별 성과</h4>
                                                <div className="performance-grid">
                                                    {Object.entries(data.error_analysis.gender_performance).map(([gender, stats]) => (
                                                        <div key={gender} className="performance-item">
                                                            <div className="performance-label">
                                                                {gender === 'M' ? '남성' : '여성'}
                                                            </div>
                                                            <div className="performance-stats">
                                                                <span>샘플: {formatNumber(stats.count || 0)}</span>
                                                                <span>오류율: {formatPercent(stats.avg_error_rate || 0)}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {data.error_analysis?.nationality_performance && (
                                            <div className="performance-section">
                                                <h4>국적별 성과 (상위 5개)</h4>
                                                <div className="nationality-performance">
                                                    {Object.entries(data.error_analysis.nationality_performance).map(([nationality, stats]) => (
                                                        <div key={nationality} className="nationality-item">
                                                            <span className="nationality-name">{nationality}</span>
                                                            <span className="nationality-stats">
                                                                {formatNumber(stats.count || 0)}개 샘플, 오류율 {formatPercent(stats.avg_error_rate || 0)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {data.error_analysis?.level_performance && (
                                            <div className="performance-section">
                                                <h4>레벨별 성과</h4>
                                                <div className="level-performance">
                                                    {Object.entries(data.error_analysis.level_performance).map(([level, stats]) => (
                                                        <div key={level} className="level-item">
                                                            <span className="level-name">{level} 레벨</span>
                                                            <span className="level-stats">
                                                                {formatNumber(stats.count || 0)}개 샘플, 오류율 {formatPercent(stats.avg_error_rate || 0)}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {data.error_analysis?.top_error_patterns && (
                                            <div className="performance-section">
                                                <h4>주요 오류 패턴 (상위 10개)</h4>
                                                <div className="error-patterns">
                                                    {Object.entries(data.error_analysis.top_error_patterns).map(([pattern, count]) => (
                                                        <div key={pattern} className="error-pattern-item">
                                                            <span className="pattern-text">{pattern}</span>
                                                            <span className="pattern-count">{formatNumber(count || 0)}회</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {data.pronunciation_samples && data.pronunciation_samples.length > 0 && (
                                        <div className="pronunciation-samples">
                                            <h3>발음 샘플 ({data.pronunciation_samples.length}개)</h3>
                                            <div className="samples-list">
                                                {data.pronunciation_samples.slice(0, 20).map((sample, index) => (
                                                    <div key={index} className="sample-item">
                                                        <div className="sample-header">
                                                            <span className="sample-number">#{index + 1}</span>
                                                            <div className="sample-metadata">
                                                                <span className="metadata-item">{sample.metadata.sex === 'M' ? '남성' : '여성'}</span>
                                                                <span className="metadata-item">{sample.metadata.nationality}</span>
                                                                <span className="metadata-item">{sample.metadata.level} 레벨</span>
                                                                <span className="metadata-item">{sample.metadata.type === 'S' ? '문장' : '단어'}</span>
                                                            </div>
                                                        </div>
                                                        <div className="sample-content">
                                                            <div className="pronunciation-comparison">
                                                                <div className="pronunciation-row">
                                                                    <span className="pronunciation-label">정답:</span>
                                                                    <span className="pronunciation-text correct">{sample.ans}</span>
                                                                </div>
                                                                <div className="pronunciation-row">
                                                                    <span className="pronunciation-label">인식:</span>
                                                                    <span className="pronunciation-text recognized">{sample.rec}</span>
                                                                </div>
                                                            </div>
                                                            <div className="sample-error">
                                                                <span className="error-label">오류:</span>
                                                                <span className="error-description">{sample.error}</span>
                                                            </div>
                                                            <div className="sample-csid">
                                                                <span className="csid-label">CSID:</span>
                                                                <div className="csid-values">
                                                                    <span className="csid-item correct">C: {sample.csid.C}</span>
                                                                    <span className="csid-item substitution">S: {sample.csid.S}</span>
                                                                    <span className="csid-item insertion">I: {sample.csid.I}</span>
                                                                    <span className="csid-item deletion">D: {sample.csid.D}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {data.pronunciation_samples.length > 20 && (
                                                <div className="samples-note">
                                                    * 처음 20개 샘플만 표시됩니다. 전체 {data.pronunciation_samples.length}개 샘플 중
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {data.insights && data.insights.length > 0 && (
                                        <div className="analysis-insights">
                                            <h3>분석 인사이트</h3>
                                            <div className="insights-list">
                                                {data.insights.map((insight, index) => (
                                                    <div key={index} className="insight-item">
                                                        <span className="insight-icon">💡</span>
                                                        <span className="insight-text">{insight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="no-data">
                                    <div className="no-data-icon">🔍</div>
                                    <h3>데이터 없음</h3>
                                    <p>"{refText}"와 관련된 발음 데이터를 찾을 수 없습니다.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PronunciationErrorModal; 