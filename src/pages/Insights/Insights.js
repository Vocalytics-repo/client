import React from 'react';
import useInsights from '../../hooks/useInsights';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import OverviewSection from './components/OverviewSection';
import TabNavigation from './components/TabNavigation';
import FilterSection from './components/FilterSection';
import DetailSection from './components/DetailSection';
import './Insights.css';
import './components/OverviewSection.css';

const Insights = () => {
    const {
        // 데이터
        overview,
        genderPerformance,

        levelPerformance,
        csidPatterns,
        typePerformance,
        textDifficulty,
        
        // 상태
        loading,
        overviewLoading,
        detailLoading,
        error,
        serviceHealth,
        activeTab,
        filters,
        
        // 액션
        refreshAllData,
        handleTabChange,
        handleFilterChange,
        clearError
    } = useInsights();

    // 현재 탭의 데이터 가져오기
    const getCurrentTabData = () => {
        switch (activeTab) {
            case 'overview':
                return overview;
            case 'gender':
                return genderPerformance;
            
            case 'level':
                return levelPerformance;
            case 'csid':
                return csidPatterns;
            case 'type':
                return typePerformance;
            case 'text':
                return textDifficulty;
            default:
                return null;
        }
    };

    return (
        <div className="insights-container">
            {/* 페이지 헤더 */}
            <PageHeader 
                title="학습 인사이트"
                subtitle="한국어 발음 학습 데이터 분석 및 통계"
                className="insights-page-header"
            />

            {/* 서비스 상태 표시 */}
            {serviceHealth && !serviceHealth.success && (
                <ErrorMessage 
                    message={`인사이트 서비스 연결 상태: ${serviceHealth.message}`}
                    type="warning"
                    className="service-status-warning"
                />
            )}

            {/* 오류 메시지 */}
            {error && (
                <ErrorMessage 
                    message={error} 
                    onClose={clearError}
                />
            )}

            {/* 탭 네비게이션 - 페이지 헤더 바로 아래 */}
            <TabNavigation 
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {/* 메인 콘텐츠 */}
            <div className="insights-content">
                {/* 개요 섹션 - overview 탭일 때만 표시 */}
                {activeTab === 'overview' && (
                    <OverviewSection 
                        data={overview}
                        loading={overviewLoading}
                        onRefresh={refreshAllData}
                    />
                )}

                {/* 필터 섹션 - 필터가 필요한 탭에서만 표시 */}
                {(activeTab === 'gender' || activeTab === 'csid') && (
                    <FilterSection 
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        activeTab={activeTab}
                    />
                )}

                {/* 세부 분석 섹션 */}
                {activeTab !== 'overview' && (
                    <DetailSection 
                        activeTab={activeTab}
                        data={getCurrentTabData()}
                        loading={detailLoading}
                        filters={filters}
                    />
                )}

                {/* 전체 로딩 상태 */}
                {loading && !overviewLoading && !detailLoading && (
                    <LoadingSpinner message="데이터를 불러오는 중..." />
                )}
            </div>
        </div>
    );
};

export default Insights; 