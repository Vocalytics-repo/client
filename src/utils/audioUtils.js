/**
 * 오디오 관련 유틸리티 함수들
 */

/**
 * Blob 데이터를 파일로 다운로드합니다.
 * @param {Blob} blob - 다운로드할 Blob 데이터
 * @param {string} filename - 저장할 파일명
 */
export const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

/**
 * 현재 날짜와 시간을 기반으로 파일명을 생성합니다.
 * @param {string} prefix - 파일명 접두사
 * @param {string} extension - 파일 확장자 (점 포함)
 * @returns {string} - 생성된 파일명
 */
export const generateFilename = (prefix, extension) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${prefix}_${year}${month}${day}_${hours}${minutes}${seconds}${extension}`;
};

/**
 * AudioBuffer를 WAV Blob으로 변환합니다.
 * @param {AudioBuffer} audioBuffer - 변환할 AudioBuffer
 * @param {number} sampleRate - 샘플링 레이트 (기본값: 16000)
 * @returns {Blob} - WAV 형식의 Blob
 */
export const audioBufferToWav = (audioBuffer, sampleRate = 16000) => {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const length = audioBuffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * numberOfChannels * 2);
    const view = new DataView(arrayBuffer);
    
    // WAV 헤더 작성
    const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
    
    const writeUint32 = (offset, value) => {
        view.setUint32(offset, value, true);
    };
    
    const writeUint16 = (offset, value) => {
        view.setUint16(offset, value, true);
    };
    
    // RIFF 헤더
    writeString(0, 'RIFF');
    writeUint32(4, 36 + length * numberOfChannels * 2);
    writeString(8, 'WAVE');
    
    // fmt 청크
    writeString(12, 'fmt ');
    writeUint32(16, 16); // 청크 크기
    writeUint16(20, 1); // 오디오 포맷 (PCM)
    writeUint16(22, numberOfChannels);
    writeUint32(24, sampleRate);
    writeUint32(28, sampleRate * numberOfChannels * 2); // 바이트 레이트
    writeUint16(32, numberOfChannels * 2); // 블록 정렬
    writeUint16(34, 16); // 비트 깊이
    
    // data 청크
    writeString(36, 'data');
    writeUint32(40, length * numberOfChannels * 2);
    
    // 오디오 데이터 작성
    let offset = 44;
    for (let i = 0; i < length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(channel)[i]));
            view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            offset += 2;
        }
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
};

/**
 * MediaRecorder로 녹음된 데이터를 실제 WAV 형식으로 변환합니다.
 * @param {Blob} recordedBlob - MediaRecorder로 녹음된 Blob
 * @param {number} sampleRate - 목표 샘플링 레이트 (기본값: 16000)
 * @returns {Promise<Blob>} - WAV 형식의 Blob
 */
export const convertToWav = async (recordedBlob, sampleRate = 16000) => {
    try {
        // AudioContext 생성
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Blob을 ArrayBuffer로 변환
        const arrayBuffer = await recordedBlob.arrayBuffer();
        
        // 오디오 디코딩
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // 샘플링 레이트 변경이 필요한 경우
        let finalAudioBuffer = audioBuffer;
        if (audioBuffer.sampleRate !== sampleRate) {
            finalAudioBuffer = await resampleAudioBuffer(audioBuffer, sampleRate);
        }
        
        // WAV로 변환
        const wavBlob = audioBufferToWav(finalAudioBuffer, sampleRate);
        
        // AudioContext 정리
        await audioContext.close();
        
        console.log(`오디오 변환 완료: ${audioBuffer.sampleRate}Hz -> ${sampleRate}Hz`);
        return wavBlob;
        
    } catch (error) {
        console.error('WAV 변환 오류:', error);
        throw new Error('오디오를 WAV 형식으로 변환하는 중 오류가 발생했습니다: ' + error.message);
    }
};

/**
 * AudioBuffer의 샘플링 레이트를 변경합니다.
 * @param {AudioBuffer} audioBuffer - 원본 AudioBuffer
 * @param {number} targetSampleRate - 목표 샘플링 레이트
 * @returns {Promise<AudioBuffer>} - 리샘플링된 AudioBuffer
 */
const resampleAudioBuffer = async (audioBuffer, targetSampleRate) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: targetSampleRate
    });
    
    const offlineContext = new OfflineAudioContext(
        audioBuffer.numberOfChannels,
        audioBuffer.duration * targetSampleRate,
        targetSampleRate
    );
    
    const source = offlineContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineContext.destination);
    source.start();
    
    const resampledBuffer = await offlineContext.startRendering();
    await audioContext.close();
    
    return resampledBuffer;
};

/**
 * MediaRecorder가 지원하는 MIME 타입을 확인합니다.
 * @returns {string} - 지원되는 최적의 MIME 타입
 */
export const getSupportedMimeType = () => {
    const types = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/wav'
    ];
    
    for (const type of types) {
        if (MediaRecorder.isTypeSupported(type)) {
            console.log('지원되는 MIME 타입:', type);
            return type;
        }
    }
    
    console.warn('지원되는 오디오 MIME 타입을 찾을 수 없습니다.');
    return '';
};

/**
 * 녹음된 오디오를 WAV 파일로 저장합니다.
 * @param {Blob} audioBlob - 오디오 Blob 데이터
 * @param {string} customName - 사용자 지정 파일명 (선택사항)
 */
export const saveRecordedAudio = (audioBlob, customName = null) => {
    const filename = customName || generateFilename('녹음', '.wav');
    downloadBlob(audioBlob, filename);
    console.log('녹음 파일 저장:', filename);
};

/**
 * TTS 오디오를 MP3 파일로 저장합니다.
 * @param {Blob} audioBlob - 오디오 Blob 데이터
 * @param {string} text - TTS에 사용된 텍스트 (파일명 생성용)
 * @param {string} customName - 사용자 지정 파일명 (선택사항)
 */
export const saveTTSAudio = (audioBlob, text = '', customName = null) => {
    let filename;
    
    if (customName) {
        filename = customName;
    } else {
        // 텍스트가 있으면 첫 10글자를 파일명에 포함
        const textPrefix = text ? text.substring(0, 10).replace(/[^\w가-힣]/g, '') : 'TTS';
        filename = generateFilename(textPrefix, '.mp3');
    }
    
    downloadBlob(audioBlob, filename);
    console.log('TTS 파일 저장:', filename);
};

/**
 * 파일 크기를 사람이 읽기 쉬운 형태로 변환합니다.
 * @param {number} bytes - 바이트 크기
 * @returns {string} - 변환된 크기 문자열
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 