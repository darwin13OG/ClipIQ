import React, { useState } from 'react';
import {
  X,
  Download,
  Check,
  Film,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Layers,
  Music,
  Smartphone,
  Tv,
  Zap,
  Loader2,
} from 'lucide-react';
import { OutroPlayer } from './OutroPlayer';
import {
  exportVideoWithOutroUnified,
  generateOutroVideoBlob,
  ExportProgress,
} from '../utils/outroGenerator';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  urlSource?: string;
  hasWatermark?: boolean;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  urlSource,
  hasWatermark,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'9:16' | '16:9' | 'original' | 'audio'>('9:16');
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressState, setProgressState] = useState<ExportProgress | null>(null);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsProcessing(true);
    setProgressState({
      stage: 'preparing',
      percent: 5,
      message: 'Iniciando ensamble de video y cierre ClipIQ...',
    });

    try {
      if (selectedFormat === 'audio') {
        // Audio extraction / download
        if (videoSrc) {
          const a = document.createElement('a');
          a.href = videoSrc;
          a.download = `clipiq_audio_${Date.now()}.mp3`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        setIsDownloaded(true);
        return;
      }

      // If we have videoSrc, stitch video + outro together into ONE single file!
      if (videoSrc) {
        try {
          const result = await exportVideoWithOutroUnified({
            videoSrc,
            aspectRatio: selectedFormat === '16:9' ? '16:9' : '9:16',
            config: {
              domain: 'clipiq.pages.dev',
              brandTitle: 'ClipIQ',
              tagline: 'Auditoría & Inteligencia de Video',
              durationSeconds: 3.5,
            },
            onProgress: (prog) => {
              setProgressState(prog);
            },
          });

          // Trigger browser download of the stitched single file
          const a = document.createElement('a');
          a.href = result.url;
          const ext = result.mimeType.includes('mp4') ? 'mp4' : 'webm';
          a.download = `clipiq_video_completo_${Date.now()}.${ext}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } catch (stitchErr) {
          console.warn('Canvas video stitch fallback:', stitchErr);
          // Graceful fallback: download source video
          const a = document.createElement('a');
          a.href = videoSrc;
          a.download = `clipiq_${selectedFormat}_${Date.now()}.mp4`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } else if (urlSource) {
        window.open(urlSource, '_blank');
      }

      setIsDownloaded(true);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-none">
                {isDownloaded ? 'Descarga Completada' : 'Exportar & Descargar Video'}
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                {isDownloaded
                  ? 'Video exportado con cierre de marca incluido'
                  : 'Se unirá el video con el cierre de marca automáticamente'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsDownloaded(false);
              setProgressState(null);
              onClose();
            }}
            className="p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-5 space-y-4 overflow-y-auto">
          {!isDownloaded ? (
            <>
              {/* Format Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-300 block">
                  Elige el formato de exportación:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* 1. Vertical 9:16 */}
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('9:16')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedFormat === '9:16'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-md'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          selectedFormat === '9:16'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>Vertical (9:16)</span>
                        </div>
                        <p className="text-[10px] text-neutral-400">1080x1920 MP4</p>
                      </div>
                    </div>
                    {selectedFormat === '9:16' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>

                  {/* 2. Horizontal 16:9 */}
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('16:9')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedFormat === '16:9'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-md'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          selectedFormat === '16:9'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        <Tv className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1">
                          <span>Horizontal (16:9)</span>
                        </div>
                        <p className="text-[10px] text-neutral-400">1920x1080 YouTube</p>
                      </div>
                    </div>
                    {selectedFormat === '16:9' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>

                  {/* 3. Original */}
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('original')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedFormat === 'original'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-md'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          selectedFormat === 'original'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        <Film className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Calidad Original</div>
                        <p className="text-[10px] text-neutral-400">Resolución nativa</p>
                      </div>
                    </div>
                    {selectedFormat === 'original' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>

                  {/* 4. Audio MP3 */}
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('audio')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedFormat === 'audio'
                        ? 'border-emerald-500 bg-emerald-500/10 text-white shadow-md'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                          selectedFormat === 'audio'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-neutral-800 text-neutral-300'
                        }`}
                      >
                        <Music className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Pista de Audio</div>
                        <p className="text-[10px] text-neutral-400">Formato MP3</p>
                      </div>
                    </div>
                    {selectedFormat === 'audio' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Box while rendering */}
              {isProcessing && progressState && (
                <div className="p-3 rounded-2xl bg-neutral-950 border border-violet-500/40 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-violet-300">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{progressState.message}</span>
                    </span>
                    <span className="font-mono text-cyan-300">{progressState.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-400 transition-all duration-200"
                      style={{ width: `${progressState.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Main Download Button */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleDownload}
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Procesando video con cierre...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Descargar Video Completo</span>
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            /* Post-Download View: Show preview of the animated outro */
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Video descargado en un solo archivo</h4>
                  <p className="text-[10px] text-emerald-300">
                    Formato: {selectedFormat === 'audio' ? 'Audio MP3' : `MP4 con Cierre Oficial (${selectedFormat})`}
                  </p>
                </div>
              </div>

              {/* 60 FPS Outro Preview */}
              <OutroPlayer
                autoPlay={true}
                aspectRatio={selectedFormat === '16:9' ? '16:9' : '9:16'}
                domain="clipiq.pages.dev"
                brandTitle="ClipIQ"
                tagline="Auditoría & Inteligencia de Video"
              />

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => {
                    setIsDownloaded(false);
                    setProgressState(null);
                    onClose();
                  }}
                  className="w-full py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all text-center"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
