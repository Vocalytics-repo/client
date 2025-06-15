import React from 'react';

const FilterSection = ({ filters, onFilterChange, activeTab }) => {
    const handleFilterUpdate = (key, value) => {
        const newFilters = {
            ...filters,
            [key]: value
        };
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        onFilterChange({
            level: '',
            sex: ''
        });
    };

    // 필터 옵션들
    const levelOptions = [
        { value: '', label: '전체 레벨' },
        { value: 'A', label: 'A 레벨' },
        { value: 'B', label: 'B 레벨' }
    ];



    const sexOptions = [
        { value: '', label: '전체 성별' },
        { value: 'M', label: '남성' },
        { value: 'F', label: '여성' }
    ];

    return (
        <div className="filter-section">
            <div className="filter-header">
                <h3>🔍 필터 옵션</h3>
                <button 
                    className="clear-filters-button"
                    onClick={clearFilters}
                >
                    초기화
                </button>
            </div>
            
            <div className="filter-controls">
                {/* 레벨 필터 */}
                <div className="filter-group">
                    <label className="filter-label">레벨</label>
                    <select
                        className="filter-select"
                        value={filters.level}
                        onChange={(e) => handleFilterUpdate('level', e.target.value)}
                    >
                        {levelOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                

                {/* 성별 필터 - CSID 탭에서만 표시 */}
                {activeTab === 'csid' && (
                    <div className="filter-group">
                        <label className="filter-label">성별</label>
                        <select
                            className="filter-select"
                            value={filters.sex}
                            onChange={(e) => handleFilterUpdate('sex', e.target.value)}
                        >
                            {sexOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* 현재 적용된 필터 표시 */}
            <div className="active-filters">
                {(filters.level || filters.sex) && (
                    <div className="active-filters-list">
                        <span className="active-filters-label">적용된 필터:</span>
                        {filters.level && (
                            <span className="filter-tag">
                                레벨: {filters.level}
                                <button 
                                    className="remove-filter"
                                    onClick={() => handleFilterUpdate('level', '')}
                                >
                                    ×
                                </button>
                            </span>
                        )}

                        {filters.sex && (
                            <span className="filter-tag">
                                성별: {sexOptions.find(opt => opt.value === filters.sex)?.label}
                                <button 
                                    className="remove-filter"
                                    onClick={() => handleFilterUpdate('sex', '')}
                                >
                                    ×
                                </button>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilterSection; 