import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { VideoInputSection } from './components/VideoInputSection';
import { VideoPlayerWithSafeZone } from './components/VideoPlayerWithSafeZone';
import { MetricCards } from './components/MetricCards';
import { ReplicationModal } from './components/ReplicationModal';
import { DownloadModal } from './components/DownloadModal';
import { ChatModal } from './components/ChatModal';
import { CutGuideModal } from './components/CutGuideModal';
import { TeleprompterModal } from './components/TeleprompterModal';
import { ExportModal } from './components/ExportModal';
import { BottomNavBar, MainTabType } from './components/BottomNavBar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { extractVideoFrames } from './utils/videoExtractor';
import { MOCK_ANALYSES } from './data/samples';
import { ClipIQAnalysisResult, SampleVideoItem } from './types';
import { Smartphone, Tv, Sparkles } from 'lucide-react';

export default function App() {
  const [analysisResult, setAnalysisResult] = useState<ClipIQAnalysisResult | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const [urlSource, setUrlSource] = useState<string | undefined>(undefined);
  const [fallbackThumbnail, setFallbackThumbnail] = useState<string | undefined>(undefined);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStep, setAnalyzingStep] = useState('');
  const [activeMobileTab, setActiveMobileTab] = useState<MainTabType>('dashboard');

  // Modals
  const [isReplicationModalOpen, setIsReplicationModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isCutGuideModalOpen, setIsCutGuideModalOpen] = useState(false);
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Trigger celebration on high score
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#6366f1', '#10b981', '#f59e0b'],
      });
    } catch {
      // ignore in iframe
    }
  };

  // Analyze URL
  const handleAnalyzeUrl = async (url: string, nicho?: string) => {
    setUrlSource(url);
    setIsAnalyzing(true);
    setAnalyzingStep('Conectando con plataforma social...');
    setVideoSrc(undefined);

    const isYoutubeLong = url.includes('youtube.com/watch') || url.includes('youtu.be/');
    const detectedFormat = isYoutubeLong ? '16:9' : '9:16';
    setAspectRatio(detectedFormat);

    setFallbackThumbnail(
      isYoutubeLong
        ? 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop&q=80'
    );

    try {
      setTimeout(() => setAnalyzingStep('Evaluando gancho de 0-3s y zona segura...'), 1100);
      setTimeout(() => setAnalyzingStep('Calculando retención y puntos de fuga...'), 2200);

      const response = await fetch('/api/analyze-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceType: 'URL_SOCIAL',
          url,
          videoState: 'EDITADO',
          nichoHint: nicho,
          formato: detectedFormat,
        }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setAnalysisResult(resJson.data);
        if (resJson.data.diagnostico_inicial?.formato_video) {
          setAspectRatio(resJson.data.diagnostico_inicial.formato_video);
        }
        if (resJson.data.scores?.score_global >= 75) {
          triggerCelebration();
        }
      } else {
        throw new Error('API response invalid');
      }
    } catch (err) {
      console.warn('Backend API unavailble, using fallback analysis:', err);
      // Fallback for static hosts like Cloudflare Pages
      const fallback = isYoutubeLong ? MOCK_ANALYSES['youtube-horizontal'] : MOCK_ANALYSES['viral-ecommerce'];
      setAnalysisResult(fallback);
      if (fallback.diagnostico_inicial?.formato_video) {
        setAspectRatio(fallback.diagnostico_inicial.formato_video);
      }
    } finally {
      setIsAnalyzing(false);
      setAnalyzingStep('');
    }
  };

  // Analyze Gallery / File
  const handleAnalyzeFile = async (file: File, state: 'CRUDO' | 'EDITADO', nicho?: string) => {
    const fileBlobUrl = URL.createObjectURL(file);
    setVideoSrc(fileBlobUrl);
    setUrlSource(undefined);
    setFallbackThumbnail(undefined);
    setIsAnalyzing(true);
    setAnalyzingStep('Muestreando fotogramas clave 0-3s...');

    let extracted: { duration: number; width: number; height: number; frames: string[]; hasAudioTrack: boolean } | null = null;
    try {
      extracted = await extractVideoFrames(file, 6);
      if (extracted.width && extracted.height) {
        setAspectRatio(extracted.width > extracted.height ? '16:9' : '9:16');
      }
      setAnalyzingStep('Analizando espectro de audio y retención...');

      const response = await fetch('/api/analyze-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceType: 'GALERIA_LOCAL',
          videoState: state,
          videoTitle: file.name,
          duration: extracted.duration,
          dimensions: { width: extracted.width, height: extracted.height },
          frames: extracted.frames,
          audioDetected: extracted.hasAudioTrack,
          nichoHint: nicho,
        }),
      });

      const resJson = await response.json();
      if (resJson.success && resJson.data) {
        setAnalysisResult(resJson.data);
        if (resJson.data.diagnostico_inicial?.formato_video) {
          setAspectRatio(resJson.data.diagnostico_inicial.formato_video);
        }
        if (resJson.data.scores?.score_global >= 75) {
          triggerCelebration();
        }
      } else {
        throw new Error('API response invalid');
      }
    } catch (err) {
      console.warn('Backend API unavailable, using fallback analysis for uploaded file:', err);
      const isLandscapeVideo = Boolean(extracted && extracted.width && extracted.height && extracted.width > extracted.height);
      const fallback = state === 'CRUDO'
        ? MOCK_ANALYSES['raw-vlog']
        : isLandscapeVideo
        ? MOCK_ANALYSES['youtube-horizontal']
        : MOCK_ANALYSES['viral-ecommerce'];
      setAnalysisResult(fallback);
      if (fallback.diagnostico_inicial?.formato_video) {
        setAspectRatio(fallback.diagnostico_inicial.formato_video);
      }
    } finally {
      setIsAnalyzing(false);
      setAnalyzingStep('');
    }
  };

  // Select Sample Preset
  const handleSelectSample = (sample: SampleVideoItem) => {
    setVideoSrc(sample.videoSrc);
    setUrlSource(undefined);
    setFallbackThumbnail(sample.thumbnailUrl);
    setAspectRatio(sample.aspectRatio || '9:16');
    setIsAnalyzing(true);
    setAnalyzingStep('Analizando video de prueba...');

    setTimeout(() => {
      const sampleAudit = MOCK_ANALYSES[sample.id] || MOCK_ANALYSES['viral-ecommerce'];
      setAnalysisResult(sampleAudit);
      if (sampleAudit.diagnostico_inicial?.formato_video) {
        setAspectRatio(sampleAudit.diagnostico_inicial.formato_video);
      }
      setIsAnalyzing(false);
      setAnalyzingStep('');
      if (sampleAudit.scores?.score_global >= 75) {
        triggerCelebration();
      }
    }, 1000);
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setVideoSrc(undefined);
    setUrlSource(undefined);
    setFallbackThumbnail(undefined);
    setAspectRatio('9:16');
    setIsAnalyzing(false);
    setActiveMobileTab('dashboard');
  };

  const isRaw = analysisResult?.diagnostico_inicial?.estado_video === 'CRUDO';
  const isLandscape = aspectRatio === '16:9';

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col antialiased selection:bg-violet-600 selection:text-white pb-16 md:pb-6">
        {/* Top Header */}
        <Header
          hasResult={!!analysisResult || isAnalyzing}
          onNewAnalysis={handleNewAnalysis}
          onOpenExport={() => setIsExportModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-4 sm:py-6">
          {!analysisResult && !isAnalyzing ? (
            /* 1. Initial State: Upload / URL / Samples */
            <VideoInputSection
              onAnalyzeUrl={handleAnalyzeUrl}
              onAnalyzeFile={handleAnalyzeFile}
              onSelectSample={handleSelectSample}
              isAnalyzing={isAnalyzing}
              analyzingStep={analyzingStep}
            />
          ) : (
            /* 2. Analysis & Live Scanning View */
            <div className="space-y-6">
              {/* ======================================================== */}
              {/* CASE A: FORMATO LARGO (16:9 Horizontal)                  */}
              {/* Layout: Video Player ON TOP, Information UNDERNEATH       */}
              {/* ======================================================== */}
              {isLandscape ? (
                <div className="space-y-6">
                  {/* Top: Widescreen Video Player */}
                  <div className="w-full max-w-4xl mx-auto bg-neutral-900/60 border border-neutral-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <div className="flex items-center gap-2">
                        <Tv className="w-4 h-4 text-violet-400" />
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                          {isAnalyzing ? 'Escaneando Video Horizontal (16:9)' : 'Reproductor 16:9 & Zona Segura Broadcast'}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                        16:9 Formato Largo
                      </span>
                    </div>

                    <VideoPlayerWithSafeZone
                      videoSrc={videoSrc}
                      fallbackThumbnail={fallbackThumbnail}
                      hasWatermark={analysisResult?.diagnostico_inicial?.contiene_marca_de_agua}
                      dropOffData={analysisResult?.auditoria_tecnica?.fuga_audiencia_estimada}
                      cutsTimeline={analysisResult?.modulo_guia_crudo?.corta_en_segundos}
                      isRaw={isRaw}
                      isAnalyzing={isAnalyzing}
                      analyzingStep={analyzingStep}
                      aspectRatio="16:9"
                      onFormatChange={setAspectRatio}
                    />
                  </div>

                  {/* Bottom: Information distributed in balanced columns */}
                  {isAnalyzing && !analysisResult ? (
                    <div className="max-w-4xl mx-auto bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                      <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-400">
                        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-white">Generando Reporte de Auditoría Panorámico</h3>
                        <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                          {analyzingStep || 'Analizando retención en formato largo, ritmo narrativo y balance de audio...'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    analysisResult && (
                      <div className="max-w-4xl mx-auto space-y-6">
                        <MetricCards
                          scores={analysisResult.scores}
                          diagnostico={analysisResult.diagnostico_inicial}
                          auditoria={analysisResult.auditoria_tecnica}
                          puntosMejora={analysisResult.puntos_clave_mejora}
                          isRaw={isRaw}
                          guiaCrudo={analysisResult.modulo_guia_crudo}
                          onOpenReplication={() => setIsReplicationModalOpen(true)}
                          onOpenDownload={() => setIsDownloadModalOpen(true)}
                          onOpenChat={() => setIsChatModalOpen(true)}
                          onOpenCutGuide={() => setIsCutGuideModalOpen(true)}
                        />
                      </div>
                    )
                  )}
                </div>
              ) : (
                /* ======================================================== */
                /* CASE B: FORMATO VERTICAL (9:16 Móvil)                    */
                /* Layout: Video Player on LEFT, Information on RIGHT        */
                /* ======================================================== */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Vertical Video Player */}
                  <div
                    className={`lg:col-span-5 lg:sticky lg:top-20 space-y-4 ${
                      activeMobileTab === 'video' ? 'block' : 'hidden md:block'
                    }`}
                  >
                    <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-violet-400" />
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                            {isAnalyzing ? 'Escaneando Video 9:16' : 'Reproductor & Zona Segura'}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-violet-300 bg-violet-950/60 px-2 py-0.5 rounded border border-violet-800/50">
                          9:16 Móvil
                        </span>
                      </div>

                      <VideoPlayerWithSafeZone
                        videoSrc={videoSrc}
                        fallbackThumbnail={fallbackThumbnail}
                        hasWatermark={analysisResult?.diagnostico_inicial?.contiene_marca_de_agua}
                        dropOffData={analysisResult?.auditoria_tecnica?.fuga_audiencia_estimada}
                        cutsTimeline={analysisResult?.modulo_guia_crudo?.corta_en_segundos}
                        isRaw={isRaw}
                        isAnalyzing={isAnalyzing}
                        analyzingStep={analyzingStep}
                        aspectRatio="9:16"
                        onFormatChange={setAspectRatio}
                      />
                    </div>
                  </div>

                  {/* Right Column: Clean Metric Report & Action Toolbar */}
                  <div className="lg:col-span-7 space-y-6">
                    {isAnalyzing && !analysisResult ? (
                      <div className="bg-neutral-900/80 border border-neutral-800 rounded-3xl p-8 text-center space-y-4 shadow-xl">
                        <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto text-violet-400">
                          <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-white">Generando Reporte de Auditoría</h3>
                          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                            {analyzingStep || 'Analizando audio, ritmo de cortes y ganchos psicológicos...'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      analysisResult && (
                        <div className={`${activeMobileTab === 'dashboard' ? 'block' : 'hidden md:block'} space-y-6`}>
                          <MetricCards
                            scores={analysisResult.scores}
                            diagnostico={analysisResult.diagnostico_inicial}
                            auditoria={analysisResult.auditoria_tecnica}
                            puntosMejora={analysisResult.puntos_clave_mejora}
                            isRaw={isRaw}
                            guiaCrudo={analysisResult.modulo_guia_crudo}
                            onOpenReplication={() => setIsReplicationModalOpen(true)}
                            onOpenDownload={() => setIsDownloadModalOpen(true)}
                            onOpenChat={() => setIsChatModalOpen(true)}
                            onOpenCutGuide={() => setIsCutGuideModalOpen(true)}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        {analysisResult && (
          <BottomNavBar
            activeTab={activeMobileTab}
            onChangeTab={setActiveMobileTab}
            onOpenReplication={() => setIsReplicationModalOpen(true)}
            onOpenDownload={() => setIsDownloadModalOpen(true)}
            onOpenChat={() => setIsChatModalOpen(true)}
          />
        )}

        {/* 1. Modal: Replicar Video */}
        {analysisResult?.modulo_replicar_video && (
          <ReplicationModal
            isOpen={isReplicationModalOpen}
            onClose={() => setIsReplicationModalOpen(false)}
            replicar={analysisResult.modulo_replicar_video}
            onOpenTeleprompter={() => setIsTeleprompterOpen(true)}
          />
        )}

        {/* 2. Modal: Descargar Video */}
        <DownloadModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          videoSrc={videoSrc}
          urlSource={urlSource}
          hasWatermark={analysisResult?.diagnostico_inicial?.contiene_marca_de_agua}
        />

        {/* 3. Modal: Chat Asistente IA */}
        <ChatModal
          isOpen={isChatModalOpen}
          onClose={() => setIsChatModalOpen(false)}
          analysisResult={analysisResult}
        />

        {/* 4. Modal: Plan de Cortes (si es crudo) */}
        {analysisResult?.modulo_guia_crudo && (
          <CutGuideModal
            isOpen={isCutGuideModalOpen}
            onClose={() => setIsCutGuideModalOpen(false)}
            guia={analysisResult.modulo_guia_crudo}
          />
        )}

        {/* 5. Modal: Teleprompter Studio */}
        {analysisResult?.modulo_replicar_video?.esqueleto_viral && (
          <TeleprompterModal
            isOpen={isTeleprompterOpen}
            onClose={() => setIsTeleprompterOpen(false)}
            esqueleto={analysisResult.modulo_replicar_video.esqueleto_viral}
          />
        )}

        {/* 6. Modal: Exportar Reporte & JSON */}
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          analysisResult={analysisResult}
        />
      </div>
    </ErrorBoundary>
  );
}
