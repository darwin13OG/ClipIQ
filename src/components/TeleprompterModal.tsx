import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Camera,
  CameraOff,
  Sliders,
  Type,
  Flame,
  Layers,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { EsqueletoViral } from '../types';

interface TeleprompterModalProps {
  isOpen: boolean;
  onClose: () => void;
  esqueleto: EsqueletoViral;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  isOpen,
  onClose,
  esqueleto,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [scrollSpeed, setScrollSpeed] = useState(25); // px per second
  const [fontSize, setFontSize] = useState(22); // px
  const [cameraActive, setCameraActive] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize camera stream
  useEffect(() => {
    if (!isOpen) return;

    let activeStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 1280 } },
            audio: false,
          });
          activeStream = stream;
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Camera access denied or unavailable for teleprompter:', err);
        setCameraActive(false);
      }
    };

    if (cameraActive) {
      startCamera();
    }

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen, cameraActive]);

  // Handle countdown & auto-scroll
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCountdown(null);
      setIsPlaying(true);
    }
  }, [countdown]);

  // Auto-scroll loop & timer
  useEffect(() => {
    if (!isPlaying) return;

    const timerInterval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    const scrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop += scrollSpeed / 20;
      }
    }, 50);

    return () => {
      clearInterval(timerInterval);
      clearInterval(scrollInterval);
    };
  }, [isPlaying, scrollSpeed]);

  if (!isOpen) return null;

  const handleStartWithCountdown = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setCountdown(3);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setTimerSeconds(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const formatTimer = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between select-none">
      {/* Background Camera Mirror */}
      {cameraActive && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover -scale-x-100 opacity-35"
          />
        </div>
      )}

      {/* Top Header Controls */}
      <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center font-bold text-xs">
            IQ
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Teleprompter Creator Studio</span>
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div className="text-[11px] font-mono text-neutral-300">
              Tiempo: <span className="font-bold text-white">{formatTimer(timerSeconds)}</span>
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Toggle Camera */}
          <button
            onClick={() => setCameraActive(!cameraActive)}
            className={`p-2 rounded-xl border text-xs transition-colors ${
              cameraActive ? 'bg-neutral-800 text-white border-neutral-700' : 'bg-neutral-900 text-neutral-400 border-neutral-800'
            }`}
            title="Activar o desactivar espejo de cámara"
          >
            {cameraActive ? <Camera className="w-4 h-4 text-emerald-400" /> : <CameraOff className="w-4 h-4" />}
          </button>

          {/* Font Size decrease / increase */}
          <button
            onClick={() => setFontSize(Math.max(16, fontSize - 2))}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs font-bold text-neutral-300"
          >
            A-
          </button>
          <button
            onClick={() => setFontSize(Math.min(36, fontSize + 2))}
            className="px-2.5 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs font-bold text-white"
          >
            A+
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Countdown Big Display */}
      {countdown !== null && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none">
          <div className="text-8xl font-black text-violet-400 animate-ping">
            {countdown}
          </div>
        </div>
      )}

      {/* Eye-line Target Marker */}
      <div className="relative z-10 mx-auto w-full max-w-lg px-4 pointer-events-none">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-violet-400 border-b border-dashed border-violet-500/50 pb-1">
          <span>▲ LÍNEA DE CONTACTO VISUAL CON LENTE ▲</span>
          <span>ZONA 0-3S</span>
        </div>
      </div>

      {/* Scrolling Text Container */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-1 overflow-y-auto px-6 py-12 max-w-xl mx-auto space-y-12 scroll-smooth text-center"
      >
        {/* Spacer before text */}
        <div className="h-10" />

        {/* Hook 0-3s Section */}
        <div className="space-y-3 p-6 rounded-3xl bg-amber-500/15 border-2 border-amber-500/40 backdrop-blur-md shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-black font-extrabold text-xs uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>00:00 - 00:03 | Gancho Inicial</span>
          </div>

          <div className="text-amber-200 text-xs font-semibold uppercase tracking-wider">
            Acción: {esqueleto.gancho_0_3s.accion_camara}
          </div>

          <div
            style={{ fontSize: `${fontSize + 4}px` }}
            className="font-black text-white leading-tight tracking-tight drop-shadow-md"
          >
            "{esqueleto.gancho_0_3s.audio_voz}"
          </div>

          <div className="text-[11px] font-mono text-amber-300 bg-black/50 p-2 rounded-xl">
            Texto pantalla: "{esqueleto.gancho_0_3s.texto_pantalla}"
          </div>
        </div>

        {/* Body 3-15s Section */}
        <div className="space-y-4 p-6 rounded-3xl bg-violet-600/15 border-2 border-violet-500/40 backdrop-blur-md shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600 text-white font-extrabold text-xs uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>00:03 - 00:15 | Cuerpo & Retención</span>
          </div>

          <div className="space-y-4 text-left">
            {esqueleto.cuerpo_3_15s.map((step, idx) => (
              <div
                key={idx}
                style={{ fontSize: `${fontSize}px` }}
                className="font-bold text-neutral-100 leading-snug drop-shadow-sm flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center shrink-0 mt-1">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="space-y-3 p-6 rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/40 backdrop-blur-md shadow-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Final | Llamada a la Acción (CTA)</span>
          </div>

          <div
            style={{ fontSize: `${fontSize + 2}px` }}
            className="font-black text-emerald-200 leading-tight drop-shadow-md"
          >
            "{esqueleto.cta_final.texto_o_voz}"
          </div>
        </div>

        {/* Extra Bottom Spacer */}
        <div className="h-32" />
      </div>

      {/* Bottom Bar Controls */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col items-center gap-3">
        {/* Speed Slider */}
        <div className="w-full max-w-sm flex items-center justify-between gap-3 px-2">
          <span className="text-[11px] text-neutral-400 font-semibold">Velocidad:</span>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(parseInt(e.target.value, 10))}
            className="flex-1 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
          <span className="text-[11px] font-mono text-neutral-300 w-8">{scrollSpeed}px</span>
        </div>

        {/* Play/Pause & Reset Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
            title="Reiniciar texto al principio"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleStartWithCountdown}
            className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95 ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-violet-600/30'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Comenzar Grabación</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
