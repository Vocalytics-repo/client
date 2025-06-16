/**
 * 텍스트 처리 관련 유틸리티 함수들
 */

/**
 * STT 응답에서 실제 텍스트만 추출합니다.
 * @param {any} response - 서버 응답 데이터
 * @returns {string} - 추출된 텍스트
 */
export const extractTextFromSTTResponse = (response) => {
    if (!response) return '';
    
    // 이미 문자열인 경우
    if (typeof response === 'string') {
        return cleanSTTText(response);
    }
    
    // 객체인 경우 텍스트 필드 찾기
    if (typeof response === 'object') {
        const textFields = ['text', 'transcription', 'transcript', 'result'];
        
        for (const field of textFields) {
            if (response[field] && typeof response[field] === 'string') {
                return cleanSTTText(response[field]);
            }
        }
        
        // 객체를 문자열로 변환해서 텍스트 추출 시도
        const stringified = JSON.stringify(response);
        return cleanSTTText(stringified);
    }
    
    return String(response);
};

/**
 * STT 텍스트에서 불필요한 부분을 제거하고 정리합니다.
 * @param {string} text - 정리할 텍스트
 * @returns {string} - 정리된 텍스트
 */
export const cleanSTTText = (text) => {
    if (!text || typeof text !== 'string') return '';
    
    let cleanedText = text;
    
    // JSON 형태의 문자열에서 텍스트 추출
    const jsonPatterns = [
        /'text':\s*'([^']+)'/g,           // 'text': '내용'
        /"text":\s*"([^"]+)"/g,           // "text": "내용"
        /'transcription':\s*'([^']+)'/g,  // 'transcription': '내용'
        /"transcription":\s*"([^"]+)"/g,  // "transcription": "내용"
    ];
    
    for (const pattern of jsonPatterns) {
        const matches = [...cleanedText.matchAll(pattern)];
        if (matches.length > 0) {
            cleanedText = matches[0][1];
            break;
        }
    }
    
    // 중괄호로 둘러싸인 JSON 객체 제거
    if (cleanedText.includes('{') && cleanedText.includes('}')) {
        // JSON 객체 패턴 찾기
        const jsonMatch = cleanedText.match(/\{[^}]*'text':\s*'([^']+)'[^}]*\}/);
        if (jsonMatch && jsonMatch[1]) {
            cleanedText = jsonMatch[1];
        } else {
            // 다른 패턴 시도
            const altJsonMatch = cleanedText.match(/\{[^}]*"text":\s*"([^"]+)"[^}]*\}/);
            if (altJsonMatch && altJsonMatch[1]) {
                cleanedText = altJsonMatch[1];
            }
        }
    }
    
    // 불필요한 메타데이터 제거
    const metadataPatterns = [
        /, 'processing_method':[^}]*\}/g,
        /, "processing_method":[^}]*\}/g,
        /\{'text':\s*/g,
        /\{"text":\s*/g,
        /'\}/g,
        /"\}/g,
    ];
    
    for (const pattern of metadataPatterns) {
        cleanedText = cleanedText.replace(pattern, '');
    }
    
    // 앞뒤 공백 및 특수문자 정리
    cleanedText = cleanedText
        .trim()
        .replace(/^['"]|['"]$/g, '')  // 앞뒤 따옴표 제거
        .replace(/\\n/g, '\n')        // 이스케이프된 개행문자 복원
        .replace(/\\t/g, '\t')        // 이스케이프된 탭 복원
        .trim();
    
    return cleanedText;
};

/**
 * 발음 교정 결과를 추출합니다.
 * @param {any} response - 서버 응답 데이터
 * @returns {string} - 추출된 발음 교정 텍스트
 */
export const extractCorrectionFromSTTResponse = (response) => {
    if (!response) return '';
    
    // 이미 문자열인 경우
    if (typeof response === 'string') {
        return cleanSTTText(response);
    }
    
    // 객체인 경우 교정 필드 찾기
    if (typeof response === 'object') {
        const correctionFields = ['correction', 'pronunciation', 'correctionResult', 'feedback'];
        
        for (const field of correctionFields) {
            if (response[field] && typeof response[field] === 'string') {
                return cleanSTTText(response[field]);
            }
        }
    }
    
    return '';
};

/**
 * 텍스트가 JSON 형태인지 확인합니다.
 * @param {string} text - 확인할 텍스트
 * @returns {boolean} - JSON 형태 여부
 */
export const isJSONLikeText = (text) => {
    if (!text || typeof text !== 'string') return false;
    
    const trimmed = text.trim();
    return (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
           (trimmed.startsWith('[') && trimmed.endsWith(']')) ||
           trimmed.includes("'text':") ||
           trimmed.includes('"text":');
}; 