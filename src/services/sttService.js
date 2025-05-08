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
        
	const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/stt`, {
		method: "POST",
		body: formData,
	});

        // 백엔드 API 호출 (현재는 시뮬레이션)
        //const response = await fetch('/api/stt', {
        //     method: 'POST',
        //     body: formData
        // });
        const data = await response.json();
        return {
		transcription: data.transcription,
		correction: data.correction,
	};
    } catch (error) {
	    console.error("STT 처리 오류:", error);
	    throw error;
    }
        // 시뮬레이션된 응답
        /* await new Promise(resolve => setTimeout(resolve, 2000));
        const simulatedData = {
            transcription: '반갑습니다. 오늘은 좋은 하루입니다. 한국어 전사 결과가 여기에 스트리밍됩니다.',
            correction: '반갑습니다. 오늘은 조은 하루입니다. → 반갑습니다. 오늘은 좋은 하루입니다.'
        };
        
        return simulatedData;
    } catch (error) {
        console.error('STT 처리 오류:', error);
        throw error;
    }*/



	
};

/**
 * TTS 서비스를 사용하여 텍스트를 음성으로 변환합니다.
 * @param {string} text - 음성으로 변환할 텍스트
 * @returns {Promise<Blob>} - 오디오 Blob 데이터
 */
export const generateTTS = async (text) => {
    try {
        // 실제 구현에서는 백엔드 API 호출
        // const response = await fetch('/api/tts', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ text })
        // });
        // const audioBlob = await response.blob();
        
        // 시뮬레이션 (실제로는 오디오 파일을 반환해야 함)
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('TTS 생성 요청:', text);
        
        return null; // 실제 구현에서는 오디오 Blob 반환
    } catch (error) {
        console.error('TTS 생성 오류:', error);
        throw error;
    }
};
