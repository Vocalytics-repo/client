import React, { useEffect, useRef, useCallback } from 'react';
import './AudioSpectrum.css';

const AudioSpectrum = ({ canvasRef, isRecording, analyser }) => {
    const animationIdRef = useRef(null);
    
    // 유휴 상태에서의 스펙트럼 애니메이션
    const drawIdleSpectrum = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // 바의 개수와 너비 계산
        const barCount = 64;
        const barWidth = Math.ceil(width / barCount);
        const barGap = 2;
        
        let phase = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // 배경 그리기
            ctx.fillStyle = '#f8faff';
            ctx.fillRect(0, 0, width, height);
            
            // 바 그리기
            ctx.fillStyle = '#5c6ac4';
            
            for (let i = 0; i < barCount; i++) {
                // 사인파를 이용해 자연스러운 움직임 생성
                const sinValue = Math.sin(phase + (i * Math.PI / 18));
                const amplitude = 5 + Math.abs(sinValue) * 15; // 유휴 상태에서의 낮은 진폭
                
                const barHeight = amplitude;
                const x = i * (barWidth + barGap);
                const y = height / 2 - barHeight / 2; // 중앙에서 시작
                
                // 위쪽 바
                ctx.fillRect(x, y, barWidth, barHeight);
                
                // 아래쪽 바 (위아래 대칭)
                ctx.fillRect(x, height / 2 + barHeight / 2, barWidth, -barHeight);
            }
            
            phase += 0.05; // 애니메이션 속도 조절
            animationIdRef.current = requestAnimationFrame(animate);
        };
        
        animate();
    }, [canvasRef]);
    
    // 실시간 스펙트럼 애니메이션
    const drawSpectrum = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || !analyser) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // 스펙트럼 데이터 준비
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const draw = () => {
            animationIdRef.current = requestAnimationFrame(draw);
            
            // 스펙트럼 데이터 가져오기
            analyser.getByteFrequencyData(dataArray);
            
            // 캔버스에 스펙트럼 그리기
            drawCanvasSpectrum(canvas, ctx, dataArray, bufferLength);
        };
        
        draw();
    }, [analyser, canvasRef]);
    
    // 오디오 스펙트럼 바 그리기
    const drawCanvasSpectrum = useCallback((canvas, ctx, dataArray, bufferLength) => {
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        // 배경 그리기
        ctx.fillStyle = '#f8faff';
        ctx.fillRect(0, 0, width, height);
        
        // 바의 개수와 너비 계산
        const barCount = 64; // 원하는 바의 개수
        const barWidth = Math.ceil(width / barCount);
        const barGap = 2; // 바 사이의 간격
        
        // 데이터 샘플링 (데이터를 바의 개수에 맞게 축소)
        const step = Math.floor(bufferLength / barCount);
        
        // 중앙선에서 바가 위아래로 그려지도록 함
        const centerY = height / 2;
        
        ctx.fillStyle = '#5c6ac4';
        
        for (let i = 0; i < barCount; i++) {
            // 데이터 샘플링 (데이터 중 일부를 바에 매핑)
            const dataIndex = i * step;
            
            // 진폭값 (0-255 사이)
            let value = dataArray[dataIndex];
            
            // 최소 높이 설정
            if (value < 5) value = 5;
            
            // 바 높이 (중앙에서 위아래로 그려짐)
            const barHeight = value * 0.5; // 높이 스케일 조정
            
            const x = i * (barWidth + barGap);
            
            // 위쪽 바
            ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight / 2);
            
            // 아래쪽 바 (위아래 대칭)
            ctx.fillRect(x, centerY, barWidth, barHeight / 2);
        }
    }, []);
    
    useEffect(() => {
        if (isRecording && analyser) {
            drawSpectrum();
        } else {
            drawIdleSpectrum();
        }
        
        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
                animationIdRef.current = null;
            }
        };
    }, [isRecording, analyser, drawSpectrum, drawIdleSpectrum]);
    
    return (
        <div className="spectrum-container">
            <canvas 
                ref={canvasRef} 
                width={600} 
                height={200}
            />
        </div>
    );
};

export default AudioSpectrum; 