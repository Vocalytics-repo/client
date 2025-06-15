import { useState, useRef, useEffect } from 'react';
import { processAudioForSTT, generateTTS } from '../services/sttService';

const useSTT = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcriptionText, setTranscriptionText] = useState('');
    const [pronunciationText, setPronunciationText] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [selectedGender, setSelectedGender] = useState('female');
    
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
            console.log('오디오 처리 시작:', audioBlob.size, 'bytes');
            const result = await processAudioForSTT(audioBlob);
            console.log('STT 처리 결과:', result);
            
            // 결과가 유효한지 확인
            if (!result || typeof result !== 'object') {
                throw new Error('서버에서 유효한 응답을 받지 못했습니다.');
            }
            
            // 안전하게 값 할당
            fullTranscriptionText.current = result.transcription || '';
            fullPronunciationText.current = result.correction || '';
            
            console.log('처리된 텍스트: ', { 
                transcription: fullTranscriptionText.current,
                correction: fullPronunciationText.current 
            });
            
            // 결과가 비어 있는지 확인
            if (!fullTranscriptionText.current && !fullPronunciationText.current) {
                console.warn('STT 결과가 비어 있습니다.');
                setTranscriptionText('음성 인식 결과가 없습니다.');
                setPronunciationText('발음 교정 결과가 없습니다.');
                return;
            }
            
            // 텍스트 스트리밍 시작
            startTextStreaming();
        } catch (error) {
            console.error('STT 처리 오류:', error);
            setTranscriptionText('STT 처리 중 오류가 발생했습니다: ' + error.message);
            setPronunciationText('');
            setIsStreaming(false);
        }
    };
    
    // 텍스트 스트리밍 시뮬레이션
    const startTextStreaming = () => {
        // 유효성 검증 강화
        if (!fullTranscriptionText.current && !fullPronunciationText.current) {
            console.warn("텍스트 스트리밍을 시작할 수 없습니다: 텍스트가 비어 있습니다.");
            setIsStreaming(false);
            return;
        }
      
        // 즉시 텍스트 표시 (스트리밍 효과 비활성화)
        setTranscriptionText(fullTranscriptionText.current);
        setPronunciationText(fullPronunciationText.current);
        
        // 백엔드 서버 URL이 원격인 경우 스트리밍 효과를 사용하지 않고 즉시 표시
        if (true) { // 혹은 조건을 확인하여 결정
            console.log('텍스트 즉시 표시');
            setIsStreaming(false);
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
            // 안전하게 문자열 처리
            const transcription = fullTranscriptionText.current || '';
            const pronunciation = fullPronunciationText.current || '';
            
            if (transcriptionIndex < transcription.length) {
                setTranscriptionText(transcription.substring(0, transcriptionIndex + 1));
                transcriptionIndex++;
            }
            
            if (pronunciationIndex < pronunciation.length) {
                setPronunciationText(pronunciation.substring(0, pronunciationIndex + 1));
                pronunciationIndex++;
            }
            
            if (transcriptionIndex >= transcription.length && 
                pronunciationIndex >= pronunciation.length) {
                clearInterval(streamingInterval.current);
                setIsStreaming(false);
            }
        }, 50);
    };
    

    
    return {
        isRecording,
        transcriptionText,
        pronunciationText,
        isStreaming,
        recordingTime,
        selectedGender,
        setSelectedGender,
        transcriptionCanvasRef,
        pronunciationCanvasRef,
        analyserRef,
        startRecording,
        stopRecording
    };
};

export default useSTT; 