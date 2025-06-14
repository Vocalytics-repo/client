import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const DetailSection = ({ activeTab, data, loading, filters }) => {
    // 퍼센트 포맷팅 함수 - 스마트 변환
    const formatPercent = (value) => {
        // 값이 1보다 크면 이미 백분율 형태로 간주 (예: 82.18)
        // 값이 1보다 작거나 같으면 소수 형태로 간주 (예: 0.8218)
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

    // 로딩 상태
    if (loading) {
        return (
            <div className="insight-card">
                <h2>
                    <span className="card-icon">⏳</span>
                    데이터 로딩 중
                </h2>
                <LoadingSpinner message="세부 분석 데이터를 불러오는 중..." />
            </div>
        );
    }

    // 데이터가 없는 경우
    if (!data) {
        return (
            <div className="insight-card">
                <h2>
                    <span className="card-icon">📊</span>
                    세부 분석
                </h2>
                <div className="empty-state">
                    <div className="empty-icon">📈</div>
                    <h3>데이터를 불러올 수 없습니다</h3>
                    <p>해당 분석 데이터가 없거나 서버에서 오류가 발생했습니다.</p>
                </div>
            </div>
        );
    }

    // 탭별 렌더링
    const renderTabContent = () => {
        switch (activeTab) {
            case 'gender':
                return renderGenderAnalysis(data);
            case 'nationality':
                return renderNationalityAnalysis(data);
            case 'level':
                return renderLevelAnalysis(data);
            case 'csid':
                return renderCSIDAnalysis(data);
            case 'type':
                return renderTypeAnalysis(data);
            case 'text':
                return renderTextAnalysis(data);
            default:
                return <div>선택된 탭의 데이터를 표시할 수 없습니다.</div>;
        }
    };

    // 성별 분석 렌더링
    const renderGenderAnalysis = (data) => (
        <div className="detail-content">
            <h2>
                <span className="card-icon">👥</span>
                성별 발음 성과 분석
            </h2>
            
            <div className="comparison-stats">
                <div className="comparison-item male">
                    <h3>👨 남성</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-value">{formatNumber(data.male.count)}</span>
                            <span className="stat-label">샘플 수</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{formatPercent(data.male.avg_error_rate)}</span>
                            <span className="stat-label">평균 오류율</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{formatPercent(data.male.median_error_rate)}</span>
                            <span className="stat-label">중간값 오류율</span>
                        </div>
                    </div>
                </div>
                
                <div className="comparison-item female">
                    <h3>👩 여성</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-value">{formatNumber(data.female.count)}</span>
                            <span className="stat-label">샘플 수</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{formatPercent(data.female.avg_error_rate)}</span>
                            <span className="stat-label">평균 오류율</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{formatPercent(data.female.median_error_rate)}</span>
                            <span className="stat-label">중간값 오류율</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="comparison-summary">
                <h3>비교 결과</h3>
                <div className="summary-item">
                    <span className="summary-label">오류율 차이:</span>
                    <span className={`summary-value ${data.comparison.error_rate_difference > 0 ? 'positive' : 'negative'}`}>
                        {data.comparison.error_rate_difference > 0 ? '+' : ''}{formatPercent(data.comparison.error_rate_difference)}
                        <small> (남성 - 여성)</small>
                    </span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">전체 샘플 수:</span>
                    <span className="summary-value">{formatNumber(data.comparison.total_samples)}</span>
                </div>
            </div>
        </div>
    );

    // 국적별 분석 렌더링
    const renderNationalityAnalysis = (data) => (
        <div className="detail-content">
            <h2>
                <span className="card-icon">🌍</span>
                국적별 발음 특성 분석
            </h2>
            
            <div className="nationality-ranking">
                <div className="ranking-section">
                    <h3>🏆 성과 우수 국적 TOP 5</h3>
                    <div className="ranking-list">
                        {data.ranking.best_performance.slice(0, 5).map(([nationality, stats], index) => (
                            <div key={nationality} className="ranking-item best">
                                <div className="rank">#{index + 1}</div>
                                <div className="nationality-info">
                                    <span className="nationality-name">{nationality}</span>
                                    <span className="nationality-stats">
                                        오류율: {formatPercent(stats.avg_error_rate)} 
                                        ({formatNumber(stats.count)}명)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ranking-section">
                    <h3>📈 개선 필요 국적 TOP 5</h3>
                    <div className="ranking-list">
                        {data.ranking.worst_performance.slice(0, 5).map(([nationality, stats], index) => (
                            <div key={nationality} className="ranking-item worst">
                                <div className="rank">#{index + 1}</div>
                                <div className="nationality-info">
                                    <span className="nationality-name">{nationality}</span>
                                    <span className="nationality-stats">
                                        오류율: {formatPercent(stats.avg_error_rate)} 
                                        ({formatNumber(stats.count)}명)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    // CSID 분석 렌더링
    const renderCSIDAnalysis = (data) => (
        <div className="detail-content">
            <h2>
                <span className="card-icon">🔍</span>
                CSID 오류 패턴 분석
            </h2>
            
            <div className="csid-overview">
                <div className="stats-grid">
                    <div className="stat-item">
                        <span className="stat-value">{formatNumber(data.sample_count)}</span>
                        <span className="stat-label">분석 샘플 수</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{formatPercent(data.accuracy_rate / 100)}</span>
                        <span className="stat-label">정확도</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">{formatNumber(data.total_errors)}</span>
                        <span className="stat-label">총 오류 수</span>
                    </div>
                </div>
            </div>

            <div className="csid-distribution">
                <h3>CSID 분포</h3>
                <div className="csid-grid">
                    <div className="csid-item correct">
                        <div className="csid-bar" style={{ 
                            width: `${data.csid_ratios.C}%`,
                            backgroundColor: '#4CAF50'
                        }}></div>
                        <div className="csid-info">
                            <span className="csid-label">정확 (C)</span>
                            <span className="csid-value">{formatPercent(data.csid_ratios.C / 100)}</span>
                        </div>
                    </div>
                    <div className="csid-item substitution">
                        <div className="csid-bar" style={{ 
                            width: `${data.csid_ratios.S}%`,
                            backgroundColor: '#FF9800'
                        }}></div>
                        <div className="csid-info">
                            <span className="csid-label">대체 (S)</span>
                            <span className="csid-value">{formatPercent(data.csid_ratios.S / 100)}</span>
                        </div>
                    </div>
                    <div className="csid-item insertion">
                        <div className="csid-bar" style={{ 
                            width: `${data.csid_ratios.I}%`,
                            backgroundColor: '#F44336'
                        }}></div>
                        <div className="csid-info">
                            <span className="csid-label">삽입 (I)</span>
                            <span className="csid-value">{formatPercent(data.csid_ratios.I / 100)}</span>
                        </div>
                    </div>
                    <div className="csid-item deletion">
                        <div className="csid-bar" style={{ 
                            width: `${data.csid_ratios.D}%`,
                            backgroundColor: '#9C27B0'
                        }}></div>
                        <div className="csid-info">
                            <span className="csid-label">삭제 (D)</span>
                            <span className="csid-value">{formatPercent(data.csid_ratios.D / 100)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 기본 렌더링 (다른 탭들을 위한 간단한 구현)
    const renderLevelAnalysis = (data) => (
        <div className="detail-content">
            <h2>
                <span className="card-icon">📈</span>
                레벨별 성과 분석
            </h2>
            <div className="simple-stats">
                {Object.entries(data.level_stats || {}).map(([level, stats]) => (
                    <div key={level} className="level-item">
                        <h3>{level} 레벨</h3>
                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-value">{formatNumber(stats.count)}</span>
                                <span className="stat-label">샘플 수</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{formatPercent(stats.avg_error_rate)}</span>
                                <span className="stat-label">평균 오류율</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTypeAnalysis = (data) => (
        <div className="detail-content">
            <h2>
                <span className="card-icon">📝</span>
                타입별 성과 분석
            </h2>
            <div className="type-comparison">
                <div className="type-item">
                    <h3>String 타입</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-value">{formatNumber(data.string_analysis?.count || 0)}</span>
                            <span className="stat-label">샘플 수</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{formatPercent(data.string_analysis?.avg_error_rate || 0)}</span>
                            <span className="stat-label">평균 오류율</span>
                        </div>
                    </div>
                </div>
                <div className="type-item">
                    <h3>Word 타입</h3>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-value">{formatNumber(data.word_analysis?.count || 0)}</span>
                            <span className="stat-label">샘플 수</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{formatPercent(data.word_analysis?.avg_error_rate || 0)}</span>
                            <span className="stat-label">평균 오류율</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTextAnalysis = (data) => (
        <div className="detail-content">
            <h2>
                <span className="card-icon">📚</span>
                텍스트 난이도 분석
            </h2>
            <div className="text-difficulty">
                <div className="difficulty-overview">
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-value">{formatNumber(data.total_unique_texts || 0)}</span>
                            <span className="stat-label">고유 텍스트 수</span>
                        </div>
                    </div>
                </div>
                
                <div className="difficult-texts-section">
                    <h3>가장 어려운 텍스트</h3>
                    <div className="text-list">
                        {(data.hardest_texts || []).slice(0, 5).map((text, index) => (
                            <div key={index} className="text-item difficult">
                                <div className="text-rank">#{index + 1}</div>
                                <div className="text-content">
                                    <div className="text-value">"{text.text}"</div>
                                    <div className="text-stats">
                                        오류율: {formatPercent(text.avg_error_rate)} 
                                        ({formatNumber(text.sample_count)}개 샘플)
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="insight-card">
            {renderTabContent()}
        </div>
    );
};

export default DetailSection; 