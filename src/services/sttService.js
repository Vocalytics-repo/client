import React, { useState, useRef } from 'react';

const STTService = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [rawText, setRawText] = useState("");
    const [correctedText, setCorrectedText] = useState("");
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // 마이크 녹음 시작 함수
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = event => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                audioChunksRef.current = [];
                // 백엔드의 STT API 호출 (여기선 시뮬레이션)
                simulateTranscription(audioBlob);
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
            // 실시간 음성 파형 업데이트 로직(필요 시 추가)
        } catch (error) {
            console.error("마이크 접근 에러:", error);
        }
    };

    // 마이크 녹음 중지 함수
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // 전사 및 발음 교정 결과를 시뮬레이션하는 함수
    const simulateTranscription = (audioBlob) => {
        // 실제 구현에서는 fetch/axios로 audioBlob을 백엔드에 전송하여 결과를 받아옴
        setTimeout(() => {
            const simulatedRawText = "반가스비다";
            setRawText(simulatedRawText);
            const simulatedCorrectedText = "반갑습니다";
            setCorrectedText(simulatedCorrectedText);
        }, 2000);
    };

    // TTS 발음 듣기 버튼 핸들러
    const handleTTS = () => {
        console.log("TTS 실행: ", correctedText);
        // 실제 구현에서는 Clova Voice API를 호출하여 음성을 재생합니다.
    };

    // 텍스트 요약 버튼 핸들러
    const handleSummarize = () => {
        console.log("요약 요청:", rawText);
        // 실제 API 호출로 요약 결과를 받아온 후 state 업데이트
        alert("요약 결과: " + rawText.substring(0, 10) + "...");
    };

    // 다국어 번역 버튼 핸들러 (현재는 영어 번역으로 한정)
    const handleTranslate = () => {
        console.log("번역 요청:", rawText);
        // 실제 API 호출로 번역 결과를 받아온 후 state 업데이트
        alert("Translation: Hello! (simulated)");
    };

    return (
        <div className="stt-service-page">
            <h1>STT & 발음 교정 서비스</h1>

            {/* 마이크 입력 영역 */}
            <div className="mic-control">
                <button onClick={isRecording ? stopRecording : startRecording}>
                    {isRecording ? "녹음 중지" : "마이크 켜기"}
                </button>
            </div>

            {/* 실시간 음성 파형 영역 (추후 구현 가능) */}
            <div className="waveform">
                <p>실시간 음성 파형 표시 (Placeholder)</p>
            </div>

            {/* 전사 및 교정 결과 영역 */}
            <div className="transcription-results">
                <div className="raw-text">
                    <h2>전사 결과</h2>
                    <p>{rawText}</p>
                </div>
                <div className="corrected-text">
                    <h2>교정 결과</h2>
                    <p>
                        {rawText && correctedText && rawText !== correctedText ? (
                            <>
                                {rawText} &rarr; <strong>{correctedText}</strong>
                            </>
                        ) : (
                            rawText || "결과가 없습니다."
                        )}
                    </p>
                </div>
            </div>

            {/* 기능 버튼 영역 */}
            <div className="action-buttons">
                <button onClick={handleTTS}>TTS 발음 듣기</button>
                <button onClick={handleSummarize}>텍스트 요약</button>
                <button onClick={handleTranslate}>다국어 번역</button>
            </div>
        </div>
    );
};

export default STTService;
