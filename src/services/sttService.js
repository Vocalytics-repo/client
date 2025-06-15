// STT 서비스 API 함수
// 실제 백엔드 연동 시 사용할 API 함수들을 정의합니다.

/**
 * 음성 데이터를 서버로 전송하여 STT 처리를 요청합니다.
 * @param {Blob} audioBlob - 음성 녹음 데이터
 * @returns {Promise<Object>} - 전사 결과와 발음 교정 결과를 포함한 객체
 */
export const processAudioForSTT = async (audioBlob) => {
    try {
        // 실제 구현에서는 FormData를 사용하여 파일 업로드
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');
        
        console.log('STT 요청 시작:', `${process.env.REACT_APP_BACKEND_URL}/api/stt`);
        
	const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stt`, {
		method: "POST",
		body: formData,
	});

        if (!response.ok) {
            throw new Error(`STT 요청 실패: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('STT 서버 응답 데이터:', data); // 응답 데이터 로깅
        
        // 응답 데이터 유효성 검사
        if (!data) {
            throw new Error('서버에서 유효한 응답을 받지 못했습니다.');
        }
        
        // 서버 응답 형식이 다를 경우를 처리
        let transcription = '';
        let correction = '';
        
        // 서버가 다른 속성명을 사용하는지 확인
        if (data.transcription !== undefined) {
            transcription = data.transcription;
        } else if (data.text !== undefined) {
            transcription = data.text;
        } else if (data.transcript !== undefined) {
            transcription = data.transcript;
        }
        
        if (data.correction !== undefined) {
            correction = data.correction;
        } else if (data.pronunciation !== undefined) {
            correction = data.pronunciation;
        } else if (data.correctionResult !== undefined) {
            correction = data.correctionResult;
        }
        
        console.log('정리된 데이터:', { transcription, correction });
        
        // transcription과 correction이 없는 경우 기본값 설정
        return {
            transcription: transcription || '',
            correction: correction || '',
        };
    } catch (error) {
	    console.error("STT 처리 오류:", error);
	    // 오류가 발생해도 기본값 반환
	    return {
	        transcription: '',
	        correction: '음성 인식 처리 중 오류가 발생했습니다: ' + error.message,
	    };
    }
};

/**
 * TTS 서비스를 사용하여 텍스트를 음성으로 변환합니다.
 * @param {string} text - 음성으로 변환할 텍스트
 * @param {string} gender - 음성 성별 ("male" 또는 "female", 기본값: "female")
 * @returns {Promise<Blob>} - 오디오 Blob 데이터
 */
export const generateTTS = async (text, gender = 'female') => {
    try {
        console.log('TTS 요청 시작:', `${process.env.REACT_APP_BACKEND_URL}/api/tts`, { text, gender });
        
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, gender })
        });

        if (!response.ok) {
            console.error(`TTS 요청 실패: ${response.status} ${response.statusText}`);
            const errorBody = await response.text().catch(() => '');
            console.error('오류 응답 내용:', errorBody);
            throw new Error(`TTS 요청 실패: ${response.statusText}`);
        }

        console.log('TTS 응답 받음, Content-Type:', response.headers.get('content-type'));
        const audioBlob = await response.blob();  // MP3 Blob 받아오기
        console.log('오디오 Blob 크기:', audioBlob.size, 'bytes');
        
        if (audioBlob.size === 0) {
            throw new Error('서버에서 빈 오디오 데이터를 반환했습니다.');
        }
        
        return audioBlob;
    
    } catch (error) {
        console.error('TTS 생성 오류:', error);
        throw error;
    }
};
