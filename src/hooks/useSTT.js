import { useState, useRef, useEffect } from 'react';
import { processAudioForSTT, generateTTS } from '../services/sttService';

const useSTT = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcriptionText, setTranscriptionText] = useState('');
    const [pronunciationText, setPronunciationText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    
    // 오디오 관련 ref
    const mediaRecorderRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    
    // 캔버스 ref
    const transcriptionCanvasRef = useRef(null);
    const pronunciationCanvasRef = useRef(null);
    
    // 스트리밍 텍스트 관련
    const fullTranscriptionText = useRef('');
    const fullPronunciationText = useRef('');
    const streamingInterval = useRef(null);
    
    // 컴포넌트 언마운트 시 리소스 정리
    useEffect(() => {
        return () => {
            stopAllAudio();
            clearInterval(streamingInterval.current);
            clearInterval(timerRef.current);
        };
    }, []);
    
    // 타이머 시작
    const startTimer = () => {
        setRecordingTime(0);
        timerRef.current = setInterval(() => {
            setRecordingTime(prev => {
                if (prev >= 60) {
                    stopRecording();
                    return 60;
                }
                return prev + 1;
            });
        }, 1000);
    };
    
    // 타이머 중지
    const stopTimer = () => {
        clearInterval(timerRef.current);
        setRecordingTime(0);
    };
    
    // 마이크 녹음 시작
    const startRecording = async () => {
        try {
            // 이전 텍스트 초기화
            setTranscriptionText('');
            setPronunciationText('');
            audioChunksRef.current = [];
            
            // 스트림 요청
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            
            // MediaRecorder 설정
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                // 녹음 종료 후 STT 처리
                await processSTT(audioBlob);
            };
            mediaRecorderRef.current.start();
            
            // AudioContext 설정
            audioContextRef.current = new AudioContext();
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 512; // 주파수 해상도 설정
            analyserRef.current.smoothingTimeConstant = 0.8; // 스무딩 설정
            
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            
            setIsRecording(true);
            startTimer();
        } catch (error) {
            console.error('녹음 시작 오류:', error);
            alert('마이크 접근 권한을 허용해 주세요.');
        }
    };
    
    // 녹음 중지
    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        
        setIsRecording(false);
        stopTimer();
        
        // 스트림 트랙 중지
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        
        // 오디오 관련 리소스 정리
        stopAllAudio();
    };
    
    // 모든 오디오 관련 리소스 정리
    const stopAllAudio = () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };
    
    // STT 처리 함수
    const processSTT = async (audioBlob) => {
        try {
            const result = await processAudioForSTT(audioBlob);
            fullTranscriptionText.current = result.transcription;
            fullPronunciationText.current = result.correction;
            
            // 텍스트 스트리밍 시작
            startTextStreaming();
        } catch (error) {
            console.error('STT 처리 오류:', error);
            setTranscriptionText('STT 처리 중 오류가 발생했습니다.');
        }
    };
    
    // 텍스트 스트리밍 시뮬레이션
    const startTextStreaming = () => {

        if (!fullTranscriptionText.current || !fullPronunciationText.current) {
            console.warn("Cannot start streaming: transcription or correction text is empty.");
            return;
        }
        
        setIsStreaming(true);
        let transcriptionIndex = 0;
        let pronunciationIndex = 0;
        
        // 이전 인터벌 클리어
        if (streamingInterval.current) {
            clearInterval(streamingInterval.current);
        }
        
        streamingInterval.current = setInterval(() => {
            if (transcriptionIndex < fullTranscriptionText.current.length) {
                setTranscriptionText(fullTranscriptionText.current.substring(0, transcriptionIndex + 1));
                transcriptionIndex++;
            }
            
            if (pronunciationIndex < fullPronunciationText.current.length) {
                setPronunciationText(fullPronunciationText.current.substring(0, pronunciationIndex + 1));
                pronunciationIndex++;
            }
            
            if (transcriptionIndex >= fullTranscriptionText.current.length && 
                pronunciationIndex >= fullPronunciationText.current.length) {
                clearInterval(streamingInterval.current);
                setIsStreaming(false);
            }
        }, 50);
    };
    
    // TTS 발음 듣기
    const handleTTS = async () => {
        try {
            const audioBlob = await generateTTS(pronunciationText);
            if (audioBlob) {
                // 오디오 재생 로직 (실제 구현에서 추가)
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.play();
            } else {
                alert('TTS 발음 듣기 기능이 구현될 예정입니다.');
            }
        } catch (error) {
            console.error('TTS 처리 오류:', error);
            alert('TTS 발음 듣기 중 오류가 발생했습니다.');
        }
    };
    
    return {
        isRecording,
        transcriptionText,
        pronunciationText,
        isStreaming,
        recordingTime,
        transcriptionCanvasRef,
        pronunciationCanvasRef,
        analyserRef,
        startRecording,
        stopRecording,
        handleTTS
    };
};

export default useSTT; 