import React from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import RefreshButton from '../../../components/common/RefreshButton';

const OverviewSection = ({ data, loading, onRefresh }) => {
    // 로딩 상태
    if (loading) {
        return (
            <div className="insight-card">
                <h2>
                    전체 개요
                </h2>
                <LoadingSpinner message="개요 데이터를 불러오는 중..." />
            </div>
        );
    }

    // 데이터가 없는 경우
    if (!data) {
        return (
            <div className="insight-card">
                <h2>
                    전체 개요
                </h2>
                <div className="empty-state">
                    <h3>데이터를 불러올 수 없습니다</h3>
                    <p>인사이트 서비스에 연결할 수 없거나 데이터가 없습니다.</p>
                    <RefreshButton 
                        onRefresh={onRefresh}
                        className="retry-refresh-button"
                    />
                </div>
            </div>
        );
    }

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

    return (
        <div className="insight-card">
            <div className="insight-card-header">
                <h2>전체 개요</h2>
                <RefreshButton 
                    onRefresh={onRefresh}
                    loading={loading}
                    className="overview-refresh-button"
                />
            </div>

            {/* 주요 통계 */}
            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-value">{formatNumber(data.summary.total_samples)}</span>
                    <span className="stat-label">총 샘플 수</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{formatPercent(data.summary.overall_accuracy)}</span>
                    <span className="stat-label">전체 정확도</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{formatPercent(data.summary.overall_avg_error_rate)}</span>
                    <span className="stat-label">평균 오류율</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{formatNumber(data.summary.data_coverage.nationalities)}</span>
                    <span className="stat-label">분석 사용자 수</span>
                </div>
            </div>

            {/* CSID 분포 */}
            <div className="chart-container">
                <div className="chart-title">CSID 오류 분포</div>
                <div className="csid-distribution">
                    <div className="csid-grid">
                        <div className="csid-item correct">
                            <div className="csid-bar" style={{ 
                                width: `${data.csid_overview.ratios.C}%`,
                                backgroundColor: '#4CAF50'
                            }}></div>
                            <div className="csid-info">
                                <span className="csid-label">정확 (C)</span>
                                <span className="csid-value">{formatPercent(data.csid_overview.ratios.C / 100)}</span>
                            </div>
                        </div>
                        <div className="csid-item substitution">
                            <div className="csid-bar" style={{ 
                                width: `${data.csid_overview.ratios.S}%`,
                                backgroundColor: '#FF9800'
                            }}></div>
                            <div className="csid-info">
                                <span className="csid-label">대체 (S)</span>
                                <span className="csid-value">{formatPercent(data.csid_overview.ratios.S / 100)}</span>
                            </div>
                        </div>
                        <div className="csid-item insertion">
                            <div className="csid-bar" style={{ 
                                width: `${data.csid_overview.ratios.I}%`,
                                backgroundColor: '#F44336'
                            }}></div>
                            <div className="csid-info">
                                <span className="csid-label">삽입 (I)</span>
                                <span className="csid-value">{formatPercent(data.csid_overview.ratios.I / 100)}</span>
                            </div>
                        </div>
                        <div className="csid-item deletion">
                            <div className="csid-bar" style={{ 
                                width: `${data.csid_overview.ratios.D}%`,
                                backgroundColor: '#9C27B0'
                            }}></div>
                            <div className="csid-info">
                                <span className="csid-label">삭제 (D)</span>
                                <span className="csid-value">{formatPercent(data.csid_overview.ratios.D / 100)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 성별 요약 */}
            <div className="summary-section">
                <h3>성별 분석 요약</h3>
                <div className="gender-summary">
                    <div className="gender-item">
                        <span className="gender-label">👨 남성</span>
                        <span className="gender-stats">
                            {formatNumber(data.gender_summary.male.count)}명 
                            (오류율: {formatPercent(data.gender_summary.male.avg_error_rate)})
                        </span>
                    </div>
                    <div className="gender-item">
                        <span className="gender-label">👩 여성</span>
                        <span className="gender-stats">
                            {formatNumber(data.gender_summary.female.count)}명 
                            (오류율: {formatPercent(data.gender_summary.female.avg_error_rate)})
                        </span>
                    </div>
                </div>
            </div>

            {/* 가장 어려운 텍스트 */}
            <div className="summary-section">
                <h3>가장 어려운 텍스트 TOP 3</h3>
                <div className="difficult-texts">
                    {data.hardest_texts.map((text, index) => (
                        <div key={index} className="difficult-text-item">
                            <div className="text-rank">#{index + 1}</div>
                            <div className="text-content">
                                <div className="text-value">"{text.text}"</div>
                                <div className="text-stats">
                                    오류율: {formatPercent(text.avg_error_rate)} 
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 핵심 인사이트 */}
            <div className="summary-section">
                <h3>종합 분석 결과</h3>
                <ul className="insights-list">
                    {data.key_insights.map((insight, index) => (
                        <li key={index}>{insight}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OverviewSection; 