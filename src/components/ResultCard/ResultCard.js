import React from 'react';
import AudioSpectrum from '../AudioSpectrum/AudioSpectrum';
import './ResultCard.css';

const ResultCard = ({ 
    title, 
    text, 
    canvasRef, 
    isRecording, 
    analyser, 
    cardType,
    onSave,
    canSave = false
}) => {
    const shouldShowSpectrum = isRecording || !text;
    const shouldShowText = !isRecording && text;
    
    return (
        <div className={`result-card ${cardType}-card`}>
            <div className="card-header">
                <h2>{title}</h2>
                {canSave && shouldShowText && (
                    <button 
                        className="save-icon-button"
                        onClick={onSave}
                        title={`${title} 저장`}
                    >
                        💾
                    </button>
                )}
            </div>
            
            {shouldShowSpectrum && (
                <AudioSpectrum 
                    canvasRef={canvasRef} 
                    isRecording={isRecording} 
                    analyser={analyser}
                />
            )}
            
            {shouldShowText && (
                <div className="text-content">
                    <p>{text}</p>
                </div>
            )}
        </div>
    );
};

export default ResultCard; 