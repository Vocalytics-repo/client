import React, { useState } from 'react';
import { generateTTS } from '../../services/sttService';
import { SoundIcon } from '../Icons/Icons';
import './TTSButton.css';

const TTSButton = ({ 
    text, 
    gender = 'female', 
    disabled = false, 
    variant = 'primary',
    size = 'medium',
    className = '',
    children
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleTTS = async () => {
        if (!text || text.trim() === '') {
            alert('변환할 텍스트가 없습니다.');
            return;
        }

        if (isPlaying) {
            return; // 이미 재생 중이면 무시
        }

        try {
            setIsPlaying(true);
            const audioBlob = await generateTTS(text, gender);
            
            if (!audioBlob || !(audioBlob instanceof Blob)) {
                throw new Error('오디오 데이터를 받지 못했습니다.');
            }
            
            // 오디오 재생
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            // 오디오 재생 완료 후 URL 객체 해제
            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
                setIsPlaying(false);
            };
            
            audio.onerror = () => {
                URL.revokeObjectURL(audioUrl);
                setIsPlaying(false);
                throw new Error('오디오 재생 중 오류가 발생했습니다.');
            };
            
            await audio.play();
        } catch (error) {
            console.error('TTS 처리 오류:', error);
            alert('TTS 발음 듣기 중 오류가 발생했습니다: ' + error.message);
            setIsPlaying(false);
        }
    };

    const buttonClasses = [
        'tts-button',
        `tts-button--${variant}`,
        `tts-button--${size}`,
        isPlaying ? 'tts-button--playing' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button 
            className={buttonClasses}
            onClick={handleTTS}
            disabled={disabled || !text || isPlaying}
            title={isPlaying ? '재생 중...' : '텍스트를 음성으로 듣기'}
        >
            <SoundIcon />
            {children || (isPlaying ? '재생 중...' : 'TTS 발음 듣기')}
        </button>
    );
};

export default TTSButton; 