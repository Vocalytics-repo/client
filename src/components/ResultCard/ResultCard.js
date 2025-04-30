import React from 'react';
import AudioSpectrum from '../AudioSpectrum/AudioSpectrum';
import './ResultCard.css';

const ResultCard = ({ 
    title, 
    text, 
    canvasRef, 
    isRecording, 
    analyser, 
    cardType 
}) => {
    const shouldShowSpectrum = isRecording || !text;
    const shouldShowText = !isRecording && text;
    
    return (
        <div className={`result-card ${cardType}-card`}>
            <h2>{title}</h2>
            
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