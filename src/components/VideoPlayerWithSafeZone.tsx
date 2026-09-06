import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  AlertTriangle,
  Eye,
  EyeOff,
  Flame,
  Smartphone,
  Tv,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { FugaAudiencia } from '../types';

interface VideoPlayerProps {
  videoSrc?: string;
  youtubeId?: string;
  videoTitle?: string;
  channelName?: string;
  fallbackThumbnail?: string;
  hasWatermark?: boolean;
  dropOffData?: FugaAudiencia;
  cutsTimeline?: string[];
  isRaw?: boolean;
  isAnalyzing?: boolean;
  analyzingStep?: string;
  aspectRatio?: '9:16' | '16:9';
  onFormatChange?: (ratio: '9:16' | '16:9') => void;
}

export const VideoPlayerWithSafeZone: React.FC<VideoPlayerProps> = ({
  videoSrc,
  youtubeId,
  videoTitle,
  channelName,
  fallbackThumbnail,
  hasWatermark,
  dropOffData,
  isAnalyzing,
  analyzingStep,
  aspectRatio = '9:16',
  onFormatChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [showSafeZone, setShowSafeZone] = useState(false);
  const [platformOverlay, setPlatformOverlay] = useState<'tiktok' | 'reels' | 'shorts'>('tiktok');

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
      if (video.videoWidth && video.videoHeight && onFormatChange) {
        if (video.videoWidth > video.videoHeight) {
          onFormatChange('16:9');
        } else {
          onFormatChange('9:16');
        }
      }
    };
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [videoSrc, onFormatChange]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const parseSecond = (timeStr?: string): number => {
    if (!timeStr) return 4;
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseFloat(parts[1]);
    }
    return parseFloat(timeStr) || 4;
  };

  const dropOffSeconds = parseSecond(dropOffData?.segundo);
  const dropOffPercent = Math.min(Math.max((dropOffSeconds / duration) * 100, 0), 100);
  const hookPercent = Math.min((3 / duration) * 100, 100);

  const jumpToDropOff = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, dropOffSeconds - 0.5);
      setCurrentTime(Math.max(0, dropOffSeconds - 0.5));
      if (!isPlaying) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLandscape = aspectRatio === '16:9';
  const isAtDropOff = Math.abs(currentTime - dropOffSeconds) < 1.2;
  const isAtHook = currentTime <= 3.2;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Sleek, Uncluttered Responsive Header Bar */}
      <div className={`w-full ${isLandscape ? 'max-w-4xl' : 'max-w-[360px]'} flex items-center justify-between gap-2 mb-2 px-1 text-xs`}>
        {/* Network Preset / Format indicator */}
        <div className="flex items-center gap-1">
          {!isLandscape ? (
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
              <button
                onClick={() => setPlatformOverlay('tiktok')}
                className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all ${
                  platformOverlay === 'tiktok' ? 'bg-neutral-800 text-cyan-300 border border-cyan-500/30' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                TikTok
              </button>
              <button
                onClick={() => setPlatformOverlay('reels')}
                className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all ${
                  platformOverlay === 'reels' ? 'bg-neutral-800 text-pink-300 border border-pink-500/30' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Reels
              </button>
              <button
                onClick={() => setPlatformOverlay('shorts')}
                className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-all ${
                  platformOverlay === 'shorts' ? 'bg-neutral-800 text-red-300 border border-red-500/30' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Shorts
              </button>
            </div>
          ) : (
            <div className="px-2.5 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 font-bold text-[11px] flex items-center gap-1">
              <Tv className="w-3.5 h-3.5 text-violet-400" />
              <span>YouTube 16:9</span>
            </div>
          )}
        </div>

        {/* Safe Zone Toggle Button */}
        <button
          onClick={() => setShowSafeZone(!showSafeZone)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
            showSafeZone
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm'
              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200'
          }`}
          title="Ver guías de zona segura libres de obstáculos"
        >
          {showSafeZone ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>Zona Segura</span>
        </button>
      </div>

      {/* Main Video Player Container (100% Unobstructed Video Display) */}
      <div
        className={`relative w-full ${
          isLandscape
            ? 'max-w-4xl aspect-video rounded-2xl'
            : 'max-w-[360px] aspect-[9/16] rounded-3xl'
        } overflow-hidden bg-black border-2 border-neutral-800 shadow-2xl flex flex-col justify-between select-none transition-all duration-300`}
      >
        {/* Video Display (Real YouTube Embed or Native HTML5 Video) */}
        {youtubeId && !showSafeZone ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0&enablejsapi=1&rel=0&modestbranding=1`}
            title={videoTitle || 'Reproductor de YouTube'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0 bg-black z-10"
          />
        ) : videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted={isMuted}
            onClick={togglePlay}
            className={`absolute inset-0 w-full h-full ${isLandscape ? 'object-contain bg-black' : 'object-cover'} cursor-pointer`}
          />
        ) : fallbackThumbnail ? (
          <img
            src={fallbackThumbnail}
            alt={videoTitle || 'Preview'}
            className={`absolute inset-0 w-full h-full ${isLandscape ? 'object-contain bg-black' : 'object-cover'}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex flex-col items-center justify-center text-neutral-600 p-6 text-center">
            {isLandscape ? <Tv className="w-12 h-12 stroke-[1.2] mb-2" /> : <Smartphone className="w-12 h-12 stroke-[1.2] mb-2" />}
            <span className="text-xs text-neutral-400">Sin vista previa de video</span>
          </div>
        )}

        {/* Live Analysis Scanner Overlay (when analyzing) */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-30 bg-neutral-950/80 backdrop-blur-[3px] flex flex-col items-center justify-between p-6 overflow-hidden">
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-violet-400 to-transparent shadow-[0_0_20px_#8b5cf6] animate-pulse top-1/3" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/40 border border-violet-400/50 text-white text-xs font-bold shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-violet-300 animate-spin" />
              <span>Escaneando Metadatos & Retención</span>
            </div>
            <div className="w-full max-w-xs bg-black/85 border border-neutral-800 rounded-2xl p-4 text-center space-y-2 shadow-2xl">
              <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin mx-auto" />
              <div className="text-xs font-bold text-white">
                {analyzingStep || 'Analizando audio, ritmo y zonas de fuga...'}
              </div>
            </div>
            <div className="text-[10px] font-mono text-violet-300/80">ClipIQ Engine v2.0</div>
          </div>
        )}

        {/* Watermark Notice Badge */}
        {!isAnalyzing && hasWatermark && (
          <div className="absolute top-3 left-3 right-3 z-20 bg-rose-950/85 border border-rose-500/60 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 text-rose-200 text-[11px] shadow-lg">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="font-semibold leading-tight">Marca de agua detectada (penaliza retención)</span>
          </div>
        )}

        {/* Real-Time Failure Banner during playback */}
        {!isAnalyzing && dropOffData && isAtDropOff && (
          <div className="absolute top-3 inset-x-3 z-25 bg-rose-950/90 border border-rose-500 backdrop-blur-md p-2.5 rounded-2xl text-white text-xs shadow-2xl animate-in slide-in-from-top duration-150">
            <div className="flex items-center justify-between font-bold text-rose-300">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-400 animate-pulse" />
                <span>¡Falla en este segundo ({dropOffData.segundo})!</span>
              </span>
              <span className="text-[10px] font-mono bg-rose-900/80 px-1.5 py-0.5 rounded text-rose-200">
                Pérdida de Retención
              </span>
            </div>
            <p className="text-[11px] text-neutral-200 mt-1 leading-snug">
              {dropOffData.motivo}
            </p>
          </div>
        )}

        {/* Real-Time Hook Banner in 0-3s */}
        {!isAnalyzing && isAtHook && !isAtDropOff && (
          <div className="absolute top-3 left-3 z-20 bg-amber-950/75 border border-amber-500/40 backdrop-blur-md px-2.5 py-1 rounded-xl flex items-center gap-1.5 text-amber-300 text-[10px] font-bold shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Zona Crítica: Gancho (0-3s)</span>
          </div>
        )}

        {/* Safe Zone Grid Overlay (Clean, Transparent, Free of Dark Obstructions) */}
        {!isAnalyzing && showSafeZone && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {isLandscape ? (
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="w-full h-full border-2 border-dashed border-emerald-400/80 rounded-xl relative flex flex-col justify-between p-3 bg-emerald-500/5">
                  <span className="text-[9px] font-bold text-emerald-300 bg-black/85 px-2.5 py-1 rounded border border-emerald-500/40 self-start">
                    ✓ ZONA SEGURA DE TÍTULOS (16:9)
                  </span>
                  <div className="w-full text-center py-1">
                    <span className="text-[9px] font-mono text-emerald-300/80 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/30">
                      Margen inferior libre para subtítulos
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Platform Overlay Header simulation */}
                <div className="w-full pt-3 px-4 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-300 font-bold bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {platformOverlay === 'tiktok' ? 'TikTok UI' : platformOverlay === 'reels' ? 'Reels UI' : 'Shorts UI'}
                  </span>
                  <span className="text-[9px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    Zona Segura 9:16
                  </span>
                </div>

                {/* Right side interaction buttons ghost outline */}
                <div className="absolute right-2 top-28 bottom-20 flex flex-col items-center justify-end gap-3 z-10 opacity-75">
                  <div className="flex flex-col items-center">
                    <Heart className="w-5 h-5 text-white fill-white drop-shadow" />
                    <span className="text-[8px] font-bold text-white">Likes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <MessageCircle className="w-5 h-5 text-white fill-white drop-shadow" />
                    <span className="text-[8px] font-bold text-white">Comms</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Share2 className="w-5 h-5 text-white drop-shadow" />
                    <span className="text-[8px] font-bold text-white">Share</span>
                  </div>
                </div>

                {/* Clear, Unobstructed Safe Box */}
                <div className="absolute top-12 bottom-16 left-3 right-14 border-2 border-dashed border-emerald-400 rounded-2xl flex flex-col justify-between p-2.5 bg-emerald-500/5">
                  <span className="text-[9px] font-extrabold text-emerald-300 bg-black/85 px-2 py-0.5 rounded border border-emerald-500/40 shadow-lg self-start">
                    ✓ ÁREA SEGURA PARA TEXTOS & SUBTÍTULOS
                  </span>
                  <span className="text-[8px] font-semibold text-emerald-200/90 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30 self-center">
                    No colocar texto fuera de esta caja
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Center Play Button on Native Video Pause */}
        {videoSrc && !isAnalyzing && !isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 z-15 flex items-center justify-center bg-black/25 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-violet-600/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Video Bottom External HUD Controls (Positioned Below the Player - Completely Clear Video View) */}
      {!isAnalyzing && (
        <div className={`w-full ${isLandscape ? 'max-w-4xl' : 'max-w-[360px]'} mt-2.5 bg-neutral-900/95 border border-neutral-800 rounded-2xl p-3 space-y-2 shadow-xl`}>
          {youtubeId ? (
            /* YouTube Specific Controls & Information */
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white truncate text-xs">
                  {videoTitle || 'Video de YouTube'}
                </div>
                {channelName && (
                  <div className="text-[11px] text-neutral-400 truncate">
                    {channelName}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {dropOffData && (
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-rose-400 font-medium bg-rose-950/40 border border-rose-500/30 px-2 py-0.5 rounded-lg">
                    <Flame className="w-3 h-3 text-rose-400" />
                    <span>Falla: {dropOffData.segundo}</span>
                  </div>
                )}
                <a
                  href={`https://www.youtube.com/watch?v=${youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-[11px] font-bold transition-colors"
                >
                  <span>Abrir en YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : videoSrc ? (
            /* Native Video Controls */
            <>
              {/* Timeline Scrubber */}
              <div className="relative flex items-center">
                {/* Hook Range 0-3s */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-amber-400/80 rounded-l z-10 pointer-events-none"
                  style={{ width: `${hookPercent}%` }}
                  title="Gancho crítico (0-3s)"
                />

                {/* Failure Marker */}
                {dropOffData && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 z-30 -ml-2 cursor-pointer"
                    style={{ left: `${dropOffPercent}%` }}
                    onClick={jumpToDropOff}
                    title={`Falla detectada en ${dropOffData.segundo}: Clic para saltar`}
                  >
                    <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-lg flex items-center justify-center text-[8px] font-bold text-white animate-bounce">
                      !
                    </div>
                  </div>
                )}

                <input
                  type="range"
                  min="0"
                  max={duration || 30}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-violet-500 z-20"
                />
              </div>

              {/* Controls Bar & Quick Jump to Failure */}
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                    title={isPlaying ? 'Pausar' : 'Reproducir'}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                  <span className="font-mono text-[11px] text-neutral-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {dropOffData && (
                  <button
                    onClick={jumpToDropOff}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-950/70 hover:bg-rose-900 border border-rose-500/40 text-[11px] font-bold text-rose-300 transition-colors shadow-sm"
                    title="Saltar al segundo exacto donde cae la retención"
                  >
                    <Flame className="w-3.5 h-3.5 text-rose-400" />
                    <span>Ver Falla ({dropOffData.segundo})</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between text-xs text-neutral-400">
              <span className="font-medium truncate">{videoTitle || 'Vista previa'}</span>
              <span className="text-[11px] text-neutral-500">{aspectRatio}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
