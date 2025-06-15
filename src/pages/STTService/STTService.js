import React from 'react';
import useSTT from '../../hooks/useSTT';
import ResultCard from '../../components/ResultCard/ResultCard';
import ActionButton from '../../components/ActionButton/ActionButton';
import TTSButton from '../../components/common/TTSButton';
import GenderSelector from '../../components/common/GenderSelector';
import { MicrophoneIcon, StopIcon } from '../../components/Icons/Icons';
import './STTService.css';

const STTService = () => {
    const {
        isRecording,
        transcriptionText,
        pronunciationText,
        recordingTime,
        selectedGender,
        setSelectedGender,
        transcriptionCanvasRef,
        pronunciationCanvasRef,
        analyserRef,
        startRecording,
        stopRecording
    } = useSTT();
    
    // 타이머 포맷팅 함수
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    return (
        <div className="stt-service-container">
            <header className="page-header">
                <h1>음성 인식 서비스</h1>
                <p>한국어 발화를 녹음하고 전사 및 발음 교정 결과를 확인하세요</p>
            </header>
            
            <div className="cards-container">
                <ResultCard
                    title="한국어 전사 결과"
                    text={transcriptionText}
                    canvasRef={transcriptionCanvasRef}
                    isRecording={isRecording}
                    analyser={analyserRef.current}
                    cardType="transcription"
                />
                
                <ResultCard
                    title="발음 교정 결과"
                    text={pronunciationText}
                    canvasRef={pronunciationCanvasRef}
                    isRecording={isRecording}
                    analyser={analyserRef.current}
                    cardType="pronunciation"
                />
            </div>
            
            <div className="buttons-container">
                <div className="recording-controls">
                    <ActionButton 
                        onClick={isRecording ? stopRecording : startRecording}
                        variant="primary"
                    >
                        {isRecording ? (
                            <>
                                <StopIcon />
                                녹음 중지
                            </>
                        ) : (
                            <>
                                <MicrophoneIcon />
                                음성 녹음
                            </>
                        )}
                    </ActionButton>
                    
                    {isRecording && (
                        <div className="recording-timer">
                            {formatTime(recordingTime)}
                        </div>
                    )}
                </div>
                
                <div className="tts-controls">
                    <TTSButton 
                        text={pronunciationText}
                        gender={selectedGender}
                        disabled={!pronunciationText}
                        variant="secondary"
                        size="large"
                    />
                    
                    <GenderSelector 
                        value={selectedGender}
                        onChange={setSelectedGender}
                        size="small"
                        className="tts-gender-selector"
                    />
                </div>
            </div>
        </div>
    );
};

export default STTService;
