import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Sparkles, Zap } from 'lucide-react';
import { synthesizeCinematicOutroAudio, drawOutroFrame } from '../utils/outroGenerator';

interface OutroPlayerProps {
  autoPlay?: boolean;
  aspectRatio?: '9:16' | '16:9';
  onComplete?: () => void;
  domain?: string;
  brandTitle?: string;
  tagline?: string;
}

export const OutroPlayer: React.FC<OutroPlayerProps> = ({
  autoPlay = true,
  aspectRatio = '9:16',
  onComplete,
  domain = 'clipiq.pages.dev',
  brandTitle = 'ClipIQ',
  tagline = 'Auditoría & Inteligencia de Video',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const startTimeRef = useRef<number>(0);
  const durationMs = 3500; // 3.5 seconds enriched outro

  const isLandscape = aspectRatio === '16:9';
  const width = isLandscape ? 640 : 360;
  const height = isLandscape ? 360 : 640;

  const playSynthesizedAudio = () => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      synthesizeCinematicOutroAudio(ctx, ctx.destination);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  };

  const startAnimation = () => {
    startTimeRef.current = performance.now();
    setIsPlaying(true);
    playSynthesizedAudio();
  };

  useEffect(() => {
    if (autoPlay) {
      startAnimation();
    }
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const timeSec = elapsed / 1000;

      drawOutroFrame({
        ctx,
        width,
        height,
        elapsedSec: timeSec,
        durationSec: durationMs / 1000,
        config: { domain, brandTitle, tagline },
        isLandscape,
      });

      if (elapsed < durationMs) {
        animFrameId.current = requestAnimationFrame(render);
      } else {
        setIsPlaying(false);
        if (onComplete) onComplete();
      }
    };

    if (isPlaying) {
      animFrameId.current = requestAnimationFrame(render);
    }

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, isLandscape, domain, brandTitle, tagline]);

  const handleReplay = () => {
    startAnimation();
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col items-center justify-center select-none group">
      {/* 60 FPS Canvas */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`w-full ${isLandscape ? 'aspect-video max-w-lg' : 'aspect-[9/16] max-w-[280px]'} object-contain`}
      />

      {/* Controls Overlay */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-20">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-neutral-300 hover:text-white border border-neutral-700/60 backdrop-blur-md transition-colors"
          title={isMuted ? 'Activar Sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={handleReplay}
          className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-neutral-300 hover:text-white border border-neutral-700/60 backdrop-blur-md transition-colors flex items-center gap-1 text-xs"
          title="Repetir animación"
        >
          <RotateCcw className="w-3.5 h-3.5 text-violet-400" />
        </button>
      </div>

      {/* Floating brand badge */}
      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/70 border border-neutral-800/80 backdrop-blur-md text-[10px] text-neutral-300">
        <span className="flex items-center gap-1.5 font-bold text-white">
          <Sparkles className="w-3 h-3 text-violet-400" />
          <span>ClipIQ Intelligence</span>
        </span>
        <span className="font-mono text-cyan-300 font-semibold">{domain}</span>
      </div>
    </div>
  );
};
