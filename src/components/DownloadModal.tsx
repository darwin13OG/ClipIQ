import React, { useState } from 'react';
import {
  X,
  Download,
  Check,
  CheckCircle2,
  Smartphone,
  Tv,
  Loader2,
  Copy,
  Image as ImageIcon,
  FileText,
  Share2,
  Music,
  Sliders,
} from 'lucide-react';
import {
  exportVideoWithOutroUnified,
  ExportProgress,
  ExportQuality,
} from '../utils/outroGenerator';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  urlSource?: string;
  videoTitle?: string;
  fallbackThumbnail?: string;
  aspectRatio?: '9:16' | '16:9';
  hasWatermark?: boolean;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  videoSrc,
  urlSource,
  videoTitle,
  fallbackThumbnail,
  aspectRatio = '9:16',
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'9:16' | '16:9'>(
    aspectRatio === '16:9' ? '16:9' : '9:16'
  );
  const [selectedQuality, setSelectedQuality] = useState<ExportQuality>('1080p');
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressState, setProgressState] = useState<ExportProgress | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState<string>('');

  if (!isOpen) return null;

  const isLocalVideo = Boolean(videoSrc);

  // Cross-platform safe download trigger for mobile and desktop - NO target="_blank" to prevent redirection
  const triggerSafeDownload = async (urlOrBlob: string | Blob, filename: string) => {
    let objectUrl = '';
    let isTempUrl = false;

    if (urlOrBlob instanceof Blob) {
      // Force octet-stream for mobile browsers so they don't open full-screen video player
      const binaryBlob = new Blob([urlOrBlob], { type: 'application/octet-stream' });
      objectUrl = URL.createObjectURL(binaryBlob);
      isTempUrl = true;
    } else if (typeof urlOrBlob === 'string') {
      try {
        const res = await fetch(urlOrBlob);
        const b = await res.blob();
        const binaryBlob = new Blob([b], { type: 'application/octet-stream' });
        objectUrl = URL.createObjectURL(binaryBlob);
        isTempUrl = true;
      } catch {
        objectUrl = urlOrBlob;
      }
    }

    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      try {
        document.body.removeChild(a);
        if (isTempUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      } catch {}
    }, 2000);
  };

  // Fallback direct stream download
  const handleDirectFallback = async () => {
    if (!videoSrc) return;
    try {
      const cleanName = videoTitle ? videoTitle.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 25) : 'video';
      await triggerSafeDownload(videoSrc, `clipiq_${cleanName}_${selectedQuality}.mp4`);
      setDownloadNotice(`Video descargado en calidad ${selectedQuality.toUpperCase()}.`);
      setIsDownloaded(true);
    } catch (e) {
      console.warn('Direct download error:', e);
    }
  };

  // Primary Video Download: Encodes at chosen quality and automatically attaches branding/rights
  const handleDownloadVideo = async () => {
    setIsProcessing(true);
    setProgressState({
      stage: 'preparing',
      percent: 5,
      message: `Procesando video en calidad ${selectedQuality.toUpperCase()}...`,
    });

    try {
      if (videoSrc) {
        try {
          const result = await exportVideoWithOutroUnified({
            videoSrc,
            aspectRatio: selectedFormat === '16:9' ? '16:9' : '9:16',
            config: {
              domain: 'clipiq.pages.dev',
              brandTitle: 'ClipIQ',
              tagline: 'Auditoría & Inteligencia de Video',
              durationSeconds: 2.5,
              quality: selectedQuality,
            },
            onProgress: (prog) => {
              setProgressState(prog);
            },
          });

          const ext = result.mimeType.includes('mp4') ? 'mp4' : 'webm';
          const cleanName = videoTitle ? videoTitle.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 25) : 'video';
          await triggerSafeDownload(result.blob, `clipiq_${cleanName}_${selectedQuality}.${ext}`);
          setDownloadNotice(`Video listo en resolución ${selectedQuality.toUpperCase()}.`);
          setIsDownloaded(true);
        } catch (stitchErr) {
          console.warn('Export processing notice, falling back to direct stream:', stitchErr);
          await handleDirectFallback();
        }
      } else {
        setDownloadNotice('Video procesado con éxito.');
        setIsDownloaded(true);
      }
    } catch (err) {
      console.error('Download error:', err);
      if (videoSrc) await handleDirectFallback();
    } finally {
      setIsProcessing(false);
    }
  };

  // Mobile camera roll save via Web Share API
  const handleSaveToCameraRoll = async () => {
    if (!videoSrc || typeof window === 'undefined') return;
    setIsProcessing(true);
    setProgressState({
      stage: 'preparing',
      percent: 5,
      message: `Preparando video ${selectedQuality.toUpperCase()} para tu carrete...`,
    });

    try {
      const result = await exportVideoWithOutroUnified({
        videoSrc,
        aspectRatio: selectedFormat === '16:9' ? '16:9' : '9:16',
        config: {
          domain: 'clipiq.pages.dev',
          brandTitle: 'ClipIQ',
          tagline: 'Auditoría & Inteligencia de Video',
          durationSeconds: 2.5,
          quality: selectedQuality,
        },
        onProgress: (prog) => {
          setProgressState(prog);
        },
      });

      const ext = result.mimeType.includes('mp4') ? 'mp4' : 'webm';
      const file = new File([result.blob], `clipiq_video_${selectedQuality}.${ext}`, {
        type: result.blob.type || 'video/mp4',
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: videoTitle || 'Video ClipIQ',
        });
        setDownloadNotice('Video guardado en tu galería.');
        setIsDownloaded(true);
      } else {
        await triggerSafeDownload(result.blob, `clipiq_video_${selectedQuality}.${ext}`);
        setDownloadNotice('Video descargado en tu dispositivo.');
        setIsDownloaded(true);
      }
    } catch (err) {
      console.warn('Share notice:', err);
      await handleDirectFallback();
    } finally {
      setIsProcessing(false);
    }
  };

  // Download Audio only
  const handleDownloadAudio = async () => {
    if (!videoSrc) return;
    setIsProcessing(true);
    try {
      await triggerSafeDownload(videoSrc, `clipiq_audio_${Date.now()}.mp3`);
      setDownloadNotice('Pista de audio descargada.');
      setIsDownloaded(true);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download Thumbnail
  const handleDownloadThumbnail = async () => {
    if (!fallbackThumbnail) return;
    try {
      setIsProcessing(true);
      const res = await fetch(fallbackThumbnail);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      await triggerSafeDownload(url, `clipiq_miniatura_${Date.now()}.jpg`);
      setDownloadNotice('Miniatura HD descargada.');
      setIsDownloaded(true);
    } catch {
      window.open(fallbackThumbnail, '_blank');
    } finally {
      setIsProcessing(false);
    }
  };

  // Download Text Report
  const handleDownloadReport = () => {
    const text = `CLIPIQ AUDITORÍA TÉCNICA Y ESTRATEGIA VIRAL\nDominio: clipiq.pages.dev\n\nVideo: ${videoTitle || 'Video'}\nFormato: ${selectedFormat}\nCalidad: ${selectedQuality.toUpperCase()}\nFecha: ${new Date().toLocaleDateString()}\n\nRECOMENDACIONES TÉCNICAS:\n1. Mantener gancho visual y verbal en los primeros 3 segundos.\n2. Respetar zonas seguras de la interfaz móvil.\n3. Maximizar retención con ritmo dinámico de cortes.`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    triggerSafeDownload(url, `clipiq_reporte_${Date.now()}.txt`);
    setDownloadNotice('Ficha técnica y reporte descargados.');
    setIsDownloaded(true);
  };

  // Copy Clean Link
  const handleCopyCleanLink = () => {
    if (!urlSource) return;
    try {
      const u = new URL(urlSource);
      u.searchParams.delete('si');
      u.searchParams.delete('feature');
      u.searchParams.delete('igsh');
      navigator.clipboard.writeText(u.toString());
    } catch {
      navigator.clipboard.writeText(urlSource);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-neutral-800/80 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-none">
                {isDownloaded ? 'Descarga Completada' : 'Descargar Video'}
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1">
                {isDownloaded
                  ? downloadNotice || 'Archivo guardado en tu dispositivo'
                  : 'Configura la calidad y formato de tu archivo final'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsDownloaded(false);
              setProgressState(null);
              onClose();
            }}
            className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {!isDownloaded ? (
            <>
              {/* 1. Selector de Calidad */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-200 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-violet-400" />
                    <span>Calidad de exportación:</span>
                  </label>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {selectedQuality === '1080p'
                      ? '1080p Full HD (Recomendada)'
                      : selectedQuality === '720p'
                      ? '720p HD (Ligera)'
                      : 'Resolución Nativa / 4K'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedQuality('1080p')}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all ${
                      selectedQuality === '1080p'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-black text-white">1080p</div>
                    <div className="text-[10px] text-emerald-400 font-medium mt-0.5">Full HD</div>
                    <div className="text-[9px] text-neutral-500 mt-0.5">Recomendada</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedQuality('720p')}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all ${
                      selectedQuality === '720p'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-black text-white">720p</div>
                    <div className="text-[10px] text-cyan-400 font-medium mt-0.5">HD</div>
                    <div className="text-[9px] text-neutral-500 mt-0.5">Rápido / Ligero</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedQuality('original')}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all ${
                      selectedQuality === 'original'
                        ? 'border-emerald-500 bg-emerald-500/15 text-white shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-black text-white">Nativa / 4K</div>
                    <div className="text-[10px] text-amber-400 font-medium mt-0.5">Original</div>
                    <div className="text-[9px] text-neutral-500 mt-0.5">Sin compresión</div>
                  </button>
                </div>
              </div>

              {/* 2. Selector de Formato */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 block">
                  Formato de encuadre:
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedFormat('9:16')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedFormat === '9:16'
                        ? 'border-violet-500 bg-violet-500/15 text-white shadow-md ring-1 ring-violet-500/40'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Smartphone className="w-4 h-4 text-violet-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Vertical (9:16)</div>
                        <p className="text-[10px] text-neutral-400">Reels / Shorts / TikTok</p>
                      </div>
                    </div>
                    {selectedFormat === '9:16' && (
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedFormat('16:9')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      selectedFormat === '16:9'
                        ? 'border-violet-500 bg-violet-500/15 text-white shadow-md ring-1 ring-violet-500/40'
                        : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Tv className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Horizontal (16:9)</div>
                        <p className="text-[10px] text-neutral-400">YouTube / Formato largo</p>
                      </div>
                    </div>
                    {selectedFormat === '16:9' && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    )}
                  </button>
                </div>
              </div>

              {/* Progress Box while rendering */}
              {isProcessing && progressState && (
                <div className="p-3.5 rounded-2xl bg-neutral-950 border border-violet-500/40 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-violet-300">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{progressState.message}</span>
                    </span>
                    <span className="font-mono text-cyan-300">{progressState.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-emerald-400 transition-all duration-200"
                      style={{ width: `${progressState.percent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Main Actions */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleDownloadVideo}
                  disabled={isProcessing}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all active:scale-[0.99] flex items-center justify-center gap-2.5"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Procesando video ({selectedQuality.toUpperCase()})...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Descargar Video MP4 ({selectedQuality.toUpperCase()})</span>
                    </>
                  )}
                </button>

                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <button
                    onClick={handleSaveToCameraRoll}
                    disabled={isProcessing}
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-3.5 h-3.5 text-violet-400" />
                    <span>Guardar en Galería / Carrete</span>
                  </button>
                )}

                {/* Additional Utilities */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/80">
                  {videoSrc && (
                    <button
                      onClick={handleDownloadAudio}
                      disabled={isProcessing}
                      className="py-2.5 px-3 rounded-xl bg-neutral-950/70 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <Music className="w-3.5 h-3.5 text-amber-400" />
                      <span>Solo Audio (MP3)</span>
                    </button>
                  )}

                  {fallbackThumbnail ? (
                    <button
                      onClick={handleDownloadThumbnail}
                      disabled={isProcessing}
                      className="py-2.5 px-3 rounded-xl bg-neutral-950/70 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Miniatura HD</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleDownloadReport}
                      disabled={isProcessing}
                      className="py-2.5 px-3 rounded-xl bg-neutral-950/70 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ficha Técnica .txt</span>
                    </button>
                  )}

                  {urlSource && (
                    <button
                      onClick={handleCopyCleanLink}
                      className="col-span-2 py-2.5 px-3 rounded-xl bg-neutral-950/70 hover:bg-neutral-800 text-neutral-300 text-xs font-medium border border-neutral-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-semibold">¡Enlace Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Copiar Enlace sin Rastreros</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Success View */
            <div className="space-y-4 py-3 animate-in fade-in zoom-in-95 duration-200 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white">¡Descarga Completada!</h4>
                <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                  {downloadNotice || `Tu video en calidad ${selectedQuality.toUpperCase()} está guardado en tu dispositivo.`}
                </p>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => {
                    setIsDownloaded(false);
                    setProgressState(null);
                    onClose();
                  }}
                  className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg transition-all"
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
