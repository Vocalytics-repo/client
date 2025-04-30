import React from 'react';
import useSTT from '../../hooks/useSTT';
import ResultCard from '../../components/ResultCard/ResultCard';
import ActionButton from '../../components/ActionButton/ActionButton';
import { MicrophoneIcon, StopIcon, SoundIcon } from '../../components/Icons/Icons';
import './STTService.css';

const STTService = () => {
    const {
        isRecording,
        transcriptionText,
        pronunciationText,
        transcriptionCanvasRef,
        pronunciationCanvasRef,
        analyserRef,
        startRecording,
        stopRecording,
        handleTTS
    } = useSTT();
    
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
                
                <ActionButton 
                    onClick={handleTTS}
                    disabled={!pronunciationText}
                    variant="secondary"
                >
                    <SoundIcon />
                    TTS 발음 듣기
                </ActionButton>
            </div>
        </div>
    );
};

export default STTService;
