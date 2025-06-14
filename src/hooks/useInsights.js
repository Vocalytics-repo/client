import { useState, useEffect, useCallback } from 'react';
import {
    getInsightOverview,
    getGenderPerformance,
    getNationalityAnalysis,
    getLevelPerformance,
    getCSIDPatterns,
    getTypePerformance,
    getTextDifficulty,
    checkInsightServiceHealth
} from '../services/insightService';

const useInsights = () => {
    // 전체 개요 데이터
    const [overview, setOverview] = useState(null);
    
    // 세부 분석 데이터
    const [genderPerformance, setGenderPerformance] = useState(null);
    const [nationalityAnalysis, setNationalityAnalysis] = useState(null);
    const [levelPerformance, setLevelPerformance] = useState(null);
    const [csidPatterns, setCSIDPatterns] = useState(null);
    const [typePerformance, setTypePerformance] = useState(null);
    const [textDifficulty, setTextDifficulty] = useState(null);
    
    // 로딩 상태
    const [loading, setLoading] = useState(false);
    const [overviewLoading, setOverviewLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    
    // 오류 상태
    const [error, setError] = useState(null);
    
    // 서비스 상태
    const [serviceHealth, setServiceHealth] = useState(null);
    
    // 현재 선택된 탭
    const [activeTab, setActiveTab] = useState('overview');
    
    // 필터 상태
    const [filters, setFilters] = useState({
        level: '',
        nationality: '',
        sex: ''
    });

    // 서비스 상태 확인
    const checkServiceHealth = useCallback(async () => {
        try {
            const health = await checkInsightServiceHealth();
            setServiceHealth(health);
            return health.success;
        } catch (err) {
            console.error('서비스 상태 확인 실패:', err);
            setServiceHealth({ success: false, message: '서비스 연결 실패' });
            return false;
        }
    }, []);

    // 전체 개요 데이터 로드
    const loadOverview = useCallback(async () => {
        setOverviewLoading(true);
        setError(null);
        
        try {
            console.log('개요 데이터 로드 시작');
            const data = await getInsightOverview();
            
            if (data) {
                setOverview(data);
                console.log('개요 데이터 로드 완료:', data);
            } else {
                setError('개요 데이터를 불러올 수 없습니다.');
            }
        } catch (err) {
            console.error('개요 데이터 로드 오류:', err);
            setError('개요 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setOverviewLoading(false);
        }
    }, []);

    // 성별 성과 데이터 로드
    const loadGenderPerformance = useCallback(async (filterOptions = {}) => {
        setDetailLoading(true);
        
        try {
            console.log('성별 성과 데이터 로드 시작:', filterOptions);
            const data = await getGenderPerformance(filterOptions);
            
            if (data) {
                setGenderPerformance(data);
                console.log('성별 성과 데이터 로드 완료:', data);
            }
        } catch (err) {
            console.error('성별 성과 데이터 로드 오류:', err);
            setError('성별 성과 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setDetailLoading(false);
        }
    }, []);

    // 국적별 분석 데이터 로드
    const loadNationalityAnalysis = useCallback(async () => {
        setDetailLoading(true);
        
        try {
            console.log('국적별 분석 데이터 로드 시작');
            const data = await getNationalityAnalysis();
            
            if (data) {
                setNationalityAnalysis(data);
                console.log('국적별 분석 데이터 로드 완료:', data);
            }
        } catch (err) {
            console.error('국적별 분석 데이터 로드 오류:', err);
            setError('국적별 분석 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setDetailLoading(false);
        }
    }, []);

    // 레벨별 성과 데이터 로드
    const loadLevelPerformance = useCallback(async () => {
        setDetailLoading(true);
        
        try {
            console.log('레벨별 성과 데이터 로드 시작');
            const data = await getLevelPerformance();
            
            if (data) {
                setLevelPerformance(data);
                console.log('레벨별 성과 데이터 로드 완료:', data);
            }
        } catch (err) {
            console.error('레벨별 성과 데이터 로드 오류:', err);
            setError('레벨별 성과 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setDetailLoading(false);
        }
    }, []);

    // CSID 패턴 데이터 로드
    const loadCSIDPatterns = useCallback(async (filterOptions = {}) => {
        setDetailLoading(true);
        
        try {
            console.log('CSID 패턴 데이터 로드 시작:', filterOptions);
            const data = await getCSIDPatterns(filterOptions);
            
            if (data) {
                setCSIDPatterns(data);
                console.log('CSID 패턴 데이터 로드 완료:', data);
            }
        } catch (err) {
            console.error('CSID 패턴 데이터 로드 오류:', err);
            setError('CSID 패턴 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setDetailLoading(false);
        }
    }, []);

    // 타입별 성과 데이터 로드
    const loadTypePerformance = useCallback(async () => {
        setDetailLoading(true);
        
        try {
            console.log('타입별 성과 데이터 로드 시작');
            const data = await getTypePerformance();
            
            if (data) {
                setTypePerformance(data);
                console.log('타입별 성과 데이터 로드 완료:', data);
            }
        } catch (err) {
            console.error('타입별 성과 데이터 로드 오류:', err);
            setError('타입별 성과 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setDetailLoading(false);
        }
    }, []);

    // 텍스트 난이도 데이터 로드
    const loadTextDifficulty = useCallback(async (limit = 10) => {
        setDetailLoading(true);
        
        try {
            console.log('텍스트 난이도 데이터 로드 시작:', limit);
            const data = await getTextDifficulty(limit);
            
            if (data) {
                setTextDifficulty(data);
                console.log('텍스트 난이도 데이터 로드 완료:', data);
            }
        } catch (err) {
            console.error('텍스트 난이도 데이터 로드 오류:', err);
            setError('텍스트 난이도 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setDetailLoading(false);
        }
    }, []);

    // 모든 데이터 새로고침
    const refreshAllData = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            // 서비스 상태 확인
            const isHealthy = await checkServiceHealth();
            
            if (!isHealthy) {
                setError('인사이트 서비스에 연결할 수 없습니다.');
                return;
            }
            
            // 개요 데이터는 항상 로드
            await loadOverview();
            
            // 현재 활성 탭에 따라 세부 데이터 로드
            switch (activeTab) {
                case 'gender':
                    await loadGenderPerformance(filters);
                    break;
                case 'nationality':
                    await loadNationalityAnalysis();
                    break;
                case 'level':
                    await loadLevelPerformance();
                    break;
                case 'csid':
                    await loadCSIDPatterns(filters);
                    break;
                case 'type':
                    await loadTypePerformance();
                    break;
                case 'text':
                    await loadTextDifficulty();
                    break;
                default:
                    break;
            }
        } catch (err) {
            console.error('데이터 새로고침 오류:', err);
            setError('데이터를 새로고침하는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    }, [activeTab, filters, checkServiceHealth, loadOverview, loadGenderPerformance, 
        loadNationalityAnalysis, loadLevelPerformance, loadCSIDPatterns, 
        loadTypePerformance, loadTextDifficulty]);

    // 탭 변경 핸들러
    const handleTabChange = useCallback(async (newTab) => {
        if (newTab === activeTab) return;
        
        setActiveTab(newTab);
        setError(null);
        
        // 해당 탭의 데이터가 없으면 로드
        switch (newTab) {
            case 'gender':
                if (!genderPerformance) {
                    await loadGenderPerformance(filters);
                }
                break;
            case 'nationality':
                if (!nationalityAnalysis) {
                    await loadNationalityAnalysis();
                }
                break;
            case 'level':
                if (!levelPerformance) {
                    await loadLevelPerformance();
                }
                break;
            case 'csid':
                if (!csidPatterns) {
                    await loadCSIDPatterns(filters);
                }
                break;
            case 'type':
                if (!typePerformance) {
                    await loadTypePerformance();
                }
                break;
            case 'text':
                if (!textDifficulty) {
                    await loadTextDifficulty();
                }
                break;
            default:
                break;
        }
    }, [activeTab, filters, genderPerformance, nationalityAnalysis, levelPerformance,
        csidPatterns, typePerformance, textDifficulty, loadGenderPerformance,
        loadNationalityAnalysis, loadLevelPerformance, loadCSIDPatterns,
        loadTypePerformance, loadTextDifficulty]);

    // 필터 변경 핸들러
    const handleFilterChange = useCallback(async (newFilters) => {
        setFilters(newFilters);
        
        // 필터가 적용되는 탭들의 데이터 다시 로드
        if (activeTab === 'gender') {
            await loadGenderPerformance(newFilters);
        } else if (activeTab === 'csid') {
            await loadCSIDPatterns(newFilters);
        }
    }, [activeTab, loadGenderPerformance, loadCSIDPatterns]);

    // 오류 클리어
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // 초기 데이터 로드
    useEffect(() => {
        const initializeData = async () => {
            console.log('인사이트 데이터 초기화 시작');
            // 서비스 상태 확인
            const isHealthy = await checkServiceHealth();
            
            if (!isHealthy) {
                setError('인사이트 서비스에 연결할 수 없습니다.');
                return;
            }
            
            // 개요 데이터만 초기 로드
            await loadOverview();
        };
        
        initializeData();
    }, [checkServiceHealth, loadOverview]); // 필요한 의존성만 포함

    return {
        // 데이터
        overview,
        genderPerformance,
        nationalityAnalysis,
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
        clearError,
        
        // 개별 로드 함수들
        loadOverview,
        loadGenderPerformance,
        loadNationalityAnalysis,
        loadLevelPerformance,
        loadCSIDPatterns,
        loadTypePerformance,
        loadTextDifficulty,
        checkServiceHealth
    };
};

export default useInsights; 