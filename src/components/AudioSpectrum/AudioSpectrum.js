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
        
        let time = 0;
        
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // 어두운 배경 그리기
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
            gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.8)');
            gradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            // 바 그라데이션 생성
            const barGradient = ctx.createLinearGradient(0, 0, 0, height);
            barGradient.addColorStop(0, '#3b82f6');
            barGradient.addColorStop(0.5, '#8b5cf6');
            barGradient.addColorStop(1, '#06b6d4');
            
            const centerY = height / 2;
            
            for (let i = 0; i < barCount; i++) {
                // 여러 주파수를 조합해서 더 자연스러운 움직임 생성
                const freq1 = Math.sin(time * 0.02 + i * 0.1) * 0.5;
                const freq2 = Math.sin(time * 0.03 + i * 0.15) * 0.3;
                const freq3 = Math.sin(time * 0.05 + i * 0.08) * 0.2;
                const noise = (Math.random() - 0.5) * 0.1; // 약간의 랜덤 노이즈
                
                // 조합된 진폭 계산 (더 역동적)
                const combinedAmplitude = freq1 + freq2 + freq3 + noise;
                const barHeight = Math.max(5, 15 + combinedAmplitude * 25);
                
                const x = i * (barWidth + barGap);
                
                // 바 투명도 계산 (더 다양한 변화)
                const alpha = 0.4 + Math.abs(combinedAmplitude) * 0.6;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = barGradient;
                
                // 위쪽 바
                ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight / 2);
                
                // 아래쪽 바 (위아래 대칭)
                ctx.fillRect(x, centerY, barWidth, barHeight / 2);
                
                // 가끔 글로우 효과 추가 (랜덤하게)
                if (Math.abs(combinedAmplitude) > 0.6 && Math.random() > 0.7) {
                    ctx.shadowColor = '#8b5cf6';
                    ctx.shadowBlur = 8;
                    ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight / 2);
                    ctx.fillRect(x, centerY, barWidth, barHeight / 2);
                    ctx.shadowBlur = 0;
                }
            }
            
            ctx.globalAlpha = 1; // 투명도 초기화
            time += 1; // 시간 증가
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
        
        // 어두운 배경 그리기
        const backgroundGradient = ctx.createLinearGradient(0, 0, 0, height);
        backgroundGradient.addColorStop(0, 'rgba(15, 23, 42, 0.9)');
        backgroundGradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.8)');
        backgroundGradient.addColorStop(1, 'rgba(15, 23, 42, 0.9)');
        ctx.fillStyle = backgroundGradient;
        ctx.fillRect(0, 0, width, height);
        
        // 바의 개수와 너비 계산
        const barCount = 64; // 원하는 바의 개수
        const barWidth = Math.ceil(width / barCount);
        const barGap = 2; // 바 사이의 간격
        
        // 데이터 샘플링 (데이터를 바의 개수에 맞게 축소)
        const step = Math.floor(bufferLength / barCount);
        
        // 중앙선에서 바가 위아래로 그려지도록 함
        const centerY = height / 2;
        
        // 바 그라데이션 생성
        const barGradient = ctx.createLinearGradient(0, 0, 0, height);
        barGradient.addColorStop(0, '#3b82f6');
        barGradient.addColorStop(0.3, '#8b5cf6');
        barGradient.addColorStop(0.7, '#06b6d4');
        barGradient.addColorStop(1, '#10b981');
        
        for (let i = 0; i < barCount; i++) {
            // 데이터 샘플링 (데이터 중 일부를 바에 매핑)
            const dataIndex = i * step;
            
            // 진폭값 (0-255 사이)
            let value = dataArray[dataIndex];
            
            // 최소 높이 설정
            if (value < 8) value = 8;
            
            // 바 높이 (중앙에서 위아래로 그려짐)
            const barHeight = value * 0.6; // 높이 스케일 조정
            
            const x = i * (barWidth + barGap);
            
            // 바 투명도 계산 (음성 강도에 따라)
            const alpha = 0.7 + (value / 255) * 0.3;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = barGradient;
            
            // 위쪽 바
            ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight / 2);
            
            // 아래쪽 바 (위아래 대칭)
            ctx.fillRect(x, centerY, barWidth, barHeight / 2);
            
            // 글로우 효과 추가 (높은 값에 대해서만)
            if (value > 100) {
                ctx.shadowColor = '#3b82f6';
                ctx.shadowBlur = 10;
                ctx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight / 2);
                ctx.fillRect(x, centerY, barWidth, barHeight / 2);
                ctx.shadowBlur = 0;
            }
        }
        
        ctx.globalAlpha = 1; // 투명도 초기화
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