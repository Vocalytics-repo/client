import React, { useState, useRef, useEffect } from 'react';
import './STTService.css';

const STTService = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [rawText, setRawText] = useState('');
    const [correctedText, setCorrectedText] = useState('');

    // 오디오 관련 ref
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const animationIdRef = useRef(null);

    // ★ 스트림을 저장할 ref
    const streamRef = useRef(null);

    // 캔버스 ref
    const canvasRef = useRef(null);

    useEffect(() => {
        drawCenterLine();
        return () => {
            stopAllAudio();
        };
    }, []);

    const drawCenterLine = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 2;
        ctx.stroke();
    };

    // 마이크 녹음 시작
    const startRecording = async () => {
        try {
            // 1) 스트림 요청
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream; // ★ 나중에 트랙 종료 위해 저장

            // 2) MediaRecorder
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                // 실제 STT 로직 연결 시, audioChunks를 전송
            };
            mediaRecorderRef.current.onstop = () => {
                // 전사 및 발음 교정 결과 시뮬레이션
                setTimeout(() => {
                    const simulatedRawText = '반가스비다';
                    setRawText(simulatedRawText);
                    const simulatedCorrectedText = '반갑습니다';
                    setCorrectedText(simulatedCorrectedText);
                }, 2000);
            };
            mediaRecorderRef.current.start();

            // 3) AudioContext + AnalyserNode
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 2048;
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);

            // 4) 파형 그리기 시작
            drawWaveform();

            setIsRecording(true);
        } catch (error) {
            console.error('녹음 시작 오류:', error);
        }
    };

    // 실시간 파형 그리는 함수
    const drawWaveform = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const analyser = analyserRef.current;
        if (!canvas || !ctx || !analyser) return;

        const bufferLength = analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationIdRef.current = requestAnimationFrame(draw);

            analyser.getByteTimeDomainData(dataArray);

            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#333';
            ctx.beginPath();

            const sliceWidth = canvas.width / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const v = dataArray[i] / 128.0;
                const y = (v * canvas.height) / 2;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                x += sliceWidth;
            }

            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };

        draw();
    };

    // 녹음 중지 + 파형 멈춤
    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);

        // ★ 스트림 트랙을 중지해 마이크를 해제
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }

        // 오디오 컨텍스트 정리
        stopAllAudio();
        drawCenterLine();
    };

    const stopAllAudio = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current);
            animationIdRef.current = null;
        }
    };

    // TTS 발음 듣기 (시뮬레이션)
    const handleTTS = () => {
        console.log('TTS 실행:', correctedText);
        alert(`TTS 발음 듣기(시뮬레이션): ${correctedText}`);
    };

    // 텍스트 요약 (시뮬레이션)
    const handleSummarize = () => {
        console.log('요약 요청:', rawText);
        alert(`요약 결과: ${rawText.substring(0, 10)}...`);
    };

    // 다국어 번역 (시뮬레이션)
    const handleTranslate = () => {
        console.log('번역 요청:', rawText);
        alert('Translation: Hello! (simulated)');
    };

    return (
        <div className="stt-service-page">
            <header className="header">
                <h1>STT & 발음 교정 서비스</h1>
            </header>

            {/* 파형 캔버스 */}
            <div className="waveform">
                <canvas ref={canvasRef} width="600" height="100" />
            </div>

            <div className="result-container">
                <div className="result-card">
                    <h2>전사 결과</h2>
                    <p>{rawText || '결과가 없습니다.'}</p>
                </div>
                <div className="result-card">
                    <h2>교정 결과</h2>
                    {rawText && correctedText && rawText !== correctedText ? (
                        <p>
                            {rawText} &rarr; <strong>{correctedText}</strong>
                        </p>
                    ) : (
                        <p>{rawText || '결과가 없습니다.'}</p>
                    )}
                </div>
            </div>

            <div className="action-buttons">
                {!isRecording ? (
                    <button onClick={startRecording}>마이크 켜기</button>
                ) : (
                    <button onClick={stopRecording}>녹음 중지</button>
                )}
                <button onClick={handleTTS}>TTS 발음 듣기</button>
            </div>
        </div>
    );
};

export default STTService;
