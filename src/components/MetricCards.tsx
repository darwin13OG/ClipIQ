import React, { useState } from 'react';
import {
  MetricScores,
  DiagnosticoInicial,
  AuditoriaTecnica,
  ModuloGuiaCrudo,
  MetricasCreador,
} from '../types';
import {
  Sparkles,
  TrendingUp,
  Anchor,
  Clock,
  Volume2,
  Type,
  CheckCircle2,
  AlertTriangle,
  Scissors,
  Flame,
  Layers,
  ArrowRight,
  Download,
  MessageSquare,
  Zap,
  Eye,
  MousePointerClick,
  ShieldCheck,
  Tag,
  Music,
  Gauge,
} from 'lucide-react';

interface MetricCardsProps {
  scores: MetricScores;
  diagnostico: DiagnosticoInicial;
  auditoria: AuditoriaTecnica;
  puntosMejora: string[];
  metricasCreador?: MetricasCreador;
  isRaw?: boolean;
  guiaCrudo?: ModuloGuiaCrudo;
  onOpenReplication: () => void;
  onOpenDownload: () => void;
  onOpenChat: () => void;
  onOpenCutGuide?: () => void;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  scores,
  diagnostico,
  auditoria,
  puntosMejora = [],
  metricasCreador,
  isRaw,
  guiaCrudo,
  onOpenReplication,
  onOpenDownload,
  onOpenChat,
  onOpenCutGuide,
}) => {
  const [copiedTitleIdx, setCopiedTitleIdx] = useState<number | null>(null);
  const [copiedTags, setCopiedTags] = useState(false);
  const isLandscape = diagnostico.formato_video === '16:9';
  const videoDuration = diagnostico.duracion_segundos && diagnostico.duracion_segundos > 0
    ? diagnostico.duracion_segundos
    : (isLandscape ? 90 : 15);
  const isLocal = diagnostico.fuente_detectada === 'GALERIA_LOCAL';

  const formatSec = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Dynamically calculate retention milestones that NEVER exceed videoDuration
  const milestones = React.useMemo(() => {
    if (videoDuration <= 5) {
      return [
        { time: '00:00', pct: '100%', color: 'text-emerald-400' },
        { time: '00:01', pct: `${Math.min(95, scores.hook_score || 90)}%`, color: 'text-emerald-300' },
        { time: '00:02', pct: `${Math.round((scores.hook_score || 85) * 0.92)}%`, color: 'text-cyan-300' },
        { time: `00:0${Math.max(3, videoDuration - 1)}`, pct: `${Math.round((scores.retencion_score || 80) * 0.88)}%`, color: 'text-indigo-300' },
        { time: `00:0${videoDuration}`, pct: `${Math.round((scores.retencion_score || 75) * 0.8)}%`, color: 'text-violet-400' },
      ];
    }
    if (videoDuration <= 15) {
      return [
        { time: '00:00', pct: '100%', color: 'text-emerald-400' },
        { time: '00:03', pct: `${Math.min(95, scores.hook_score || 88)}%`, color: 'text-emerald-300' },
        { time: formatSec(Math.round(videoDuration * 0.4)), pct: `${Math.round((scores.retencion_score || 80) * 0.9)}%`, color: 'text-cyan-300' },
        { time: formatSec(Math.round(videoDuration * 0.75)), pct: `${Math.round((scores.retencion_score || 75) * 0.82)}%`, color: 'text-indigo-300' },
        { time: formatSec(videoDuration), pct: `${Math.round((scores.retencion_score || 70) * 0.75)}%`, color: 'text-violet-400' },
      ];
    }
    return [
      { time: '00:00', pct: '100%', color: 'text-emerald-400' },
      { time: isLandscape ? '00:30' : '00:03', pct: `${Math.min(95, scores.hook_score || 85)}%`, color: 'text-emerald-300' },
      { time: formatSec(Math.round(videoDuration * 0.3)), pct: `${Math.round((scores.retencion_score || 80) * 0.88)}%`, color: 'text-cyan-300' },
      { time: formatSec(Math.round(videoDuration * 0.65)), pct: `${Math.round((scores.retencion_score || 75) * 0.78)}%`, color: 'text-indigo-300' },
      { time: formatSec(videoDuration), pct: `${Math.round((scores.retencion_score || 70) * 0.68)}%`, color: 'text-violet-400' },
    ];
  }, [videoDuration, isLandscape, scores.hook_score, scores.retencion_score]);

  const getViralBadge = (potencial: string) => {
    switch (potencial) {
      case 'Viral Garantizado':
        return 'bg-gradient-to-r from-amber-500 to-rose-500 text-white font-extrabold shadow-sm';
      case 'Alto':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
      case 'Medio':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
      default:
        return 'bg-rose-500/20 text-rose-300 border border-rose-500/40';
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* 1. Header Overview Pill: Nicho, Formato, Estado, Pista de Voz */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 sm:p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
            <span className="text-xs font-bold text-white">Ficha de Producción:</span>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-xl bg-violet-500/15 text-violet-300 border border-violet-500/30">
            {diagnostico.nicho_detectado || 'Creator & Redes Sociales'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          {/* Formato y Duración */}
          <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
            <span className="text-[9px] text-neutral-400 block font-medium">Formato & Duración</span>
            <span className="font-bold text-white text-[11px] sm:text-xs">
              {isLandscape ? '16:9' : '9:16'} ({videoDuration}s)
            </span>
          </div>

          {/* Origen */}
          <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
            <span className="text-[9px] text-neutral-400 block font-medium">Origen</span>
            <span className="font-bold text-cyan-300 text-[11px] sm:text-xs">
              {isLocal ? 'Galería Local' : 'Enlace Web'}
            </span>
          </div>

          {/* Estado de Edición */}
          <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
            <span className="text-[9px] text-neutral-400 block font-medium">Edición</span>
            <span
              className={`font-bold text-[11px] sm:text-xs ${
                diagnostico.estado_video === 'CRUDO' ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {diagnostico.estado_video === 'CRUDO' ? 'Toma Cruda' : 'Editado'}
            </span>
          </div>

          {/* Calidad de Audio */}
          <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800/80">
            <span className="text-[9px] text-neutral-400 block font-medium">Pista de Voz</span>
            <span className="font-bold text-emerald-400 text-[11px] sm:text-xs">
              {diagnostico.tiene_audio_voz ? 'Voz Nítida ✓' : 'Ambiente'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Global Score & Metrics Hero Card */}
      <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-3.5 sm:p-5 shadow-xl space-y-3 sm:space-y-4">
        <div className="flex flex-row items-center justify-between gap-3">
          {/* Main Large Score Indicator */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center rounded-2xl bg-neutral-950 border border-neutral-800 shadow-inner">
              <div className="text-center">
                <span className="text-2xl sm:text-3xl font-black text-white">{scores.score_global}</span>
                <span className="text-[9px] sm:text-[10px] block text-neutral-400 font-mono -mt-1">/100</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] sm:text-xs font-semibold text-neutral-400">Rendimiento Estimado</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold ${getViralBadge(scores.potencial_viral)}`}>
                  {scores.potencial_viral}
                </span>
              </div>
            </div>
          </div>

          {/* Sub Scores: Differentiated for Long vs Short video */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="p-2 sm:p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[80px] sm:min-w-[115px]">
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-neutral-400 mb-0.5">
                <Anchor className="w-3 h-3 text-amber-400" />
                <span className="font-semibold">{isLandscape ? 'Promesa' : 'Gancho'}</span>
              </div>
              <div className="text-base sm:text-2xl font-black text-amber-300">{scores.hook_score}%</div>
              <div className="text-[8px] sm:text-[10px] text-neutral-400">
                {isLandscape ? 'Intro 0-60s' : '0-3s inicial'}
              </div>
            </div>

            <div className="p-2 sm:p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[80px] sm:min-w-[115px]">
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-neutral-400 mb-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="font-semibold">Retención</span>
              </div>
              <div className="text-base sm:text-2xl font-black text-emerald-300">{scores.retencion_score}%</div>
              <div className="text-[8px] sm:text-[10px] text-neutral-400">Estimada</div>
            </div>
          </div>
        </div>

        {/* Informative banner explaining why hook depends on format */}
        {isLandscape ? (
          <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-[10px] text-violet-300 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
            <span>
              <strong>Formato Largo:</strong> La retención depende de la claridad de la promesa inicial y el ritmo de capítulos, no de un gancho apresurado de 3 segundos.
            </span>
          </div>
        ) : (
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-300 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>
              <strong>Formato Corto:</strong> Los primeros 3 segundos son determinantes para detener el scroll continuo del usuario en la red.
            </span>
          </div>
        )}

        {/* Technical Indicators: Ritmo, Audio, Zona Segura */}
        <div className="pt-2 sm:pt-3 border-t border-neutral-800/80 grid grid-cols-3 gap-1.5 text-center">
          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
            <div className="text-[9px] sm:text-[10px] text-neutral-400 flex items-center justify-center gap-1 mb-0.5 font-medium">
              <Scissors className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
              <span>Ritmo</span>
            </div>
            <span
              className={`text-[11px] sm:text-xs font-bold ${
                auditoria.ritmo_cortes === 'Óptimo'
                  ? 'text-emerald-400'
                  : auditoria.ritmo_cortes === 'Frenético'
                  ? 'text-amber-400'
                  : 'text-neutral-300'
              }`}
            >
              {auditoria.ritmo_cortes}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
            <div className="text-[9px] sm:text-[10px] text-neutral-400 flex items-center justify-center gap-1 mb-0.5 font-medium">
              <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
              <span>Audio</span>
            </div>
            <span
              className={`text-[11px] sm:text-xs font-bold ${
                auditoria.balance_audio === 'Excelente'
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`}
            >
              {auditoria.balance_audio}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800/70">
            <div className="text-[9px] sm:text-[10px] text-neutral-400 flex items-center justify-center gap-1 mb-0.5 font-medium">
              <Type className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-neutral-400" />
              <span>Zona Segura</span>
            </div>
            <span
              className={`text-[11px] sm:text-xs font-bold ${
                auditoria.legibilidad_texto === 'Buena'
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              {auditoria.legibilidad_texto}
            </span>
          </div>
        </div>
      </div>

      {/* 3. METRICAS PARA CREADORES (YouTubers / TikTokers / Reels) */}
      {metricasCreador && (
        <div className="bg-neutral-900/90 border border-violet-500/20 rounded-3xl p-3.5 sm:p-5 space-y-3.5 shadow-xl">
          <div className="flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Gauge className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white">
                  {isLocal ? 'Proyección Probable de Rendimiento' : 'Métricas de Algoritmo & Audiencia'}
                </h4>
                <p className="text-[10px] text-neutral-400">
                  {isLocal
                    ? 'Estimación probabilística pre-publicación basada en cadencia y cortes'
                    : 'Datos analíticos y estimaciones para creadores de contenido'}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {isLocal ? 'Estimación Predictiva' : 'Creator Pro'}
            </span>
          </div>

          {/* Subgrid 1: Swipe Ratio & Retención */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Swipe Ratio / Retención Inicial */}
            <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isLocal ? 'Probabilidad de Retención Inicial' : 'Tasa Visto vs. Swipe (Deslizado)'}</span>
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">
                  {metricasCreador.swipe_ratio_estimado.porcentaje_visto}% Visto
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full transition-all"
                  style={{ width: `${metricasCreador.swipe_ratio_estimado.porcentaje_visto}%` }}
                  title="Porcentaje que ve el inicio"
                />
                <div
                  className="bg-rose-500 h-full transition-all"
                  style={{ width: `${metricasCreador.swipe_ratio_estimado.porcentaje_deslizado}%` }}
                  title="Porcentaje que desliza rápido"
                />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span className="text-emerald-400">
                  ✓ {metricasCreador.swipe_ratio_estimado.porcentaje_visto}% probable que continúe
                </span>
                <span className="text-rose-400">
                  ✗ {metricasCreador.swipe_ratio_estimado.porcentaje_deslizado}% riesgo de abandono
                </span>
              </div>
              <p className="text-[10px] text-neutral-300 leading-snug pt-0.5">
                {metricasCreador.swipe_ratio_estimado.diagnostico}
              </p>
            </div>

            {/* Retención a los 30s o Duración Total */}
            <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {videoDuration < 30 ? `Retención Total (${videoDuration}s)` : 'Retención a los 30s'}
                  </span>
                </span>
                <span className="text-cyan-400 font-mono text-[11px]">
                  {metricasCreador.retencion_30s_estimada.porcentaje}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden relative">
                <div
                  className="bg-cyan-500 h-full transition-all"
                  style={{ width: `${metricasCreador.retencion_30s_estimada.porcentaje}%` }}
                />
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400"
                  style={{ left: `${metricasCreador.retencion_30s_estimada.benchmark_nicho}%` }}
                  title={`Benchmark del nicho: ${metricasCreador.retencion_30s_estimada.benchmark_nicho}%`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span className="text-cyan-300 font-medium">
                  {videoDuration < 30 ? `Finalización: ${metricasCreador.retencion_30s_estimada.porcentaje}%` : `Tu video: ${metricasCreador.retencion_30s_estimada.porcentaje}%`}
                </span>
                <span className="text-amber-400">
                  Media del nicho: {metricasCreador.retencion_30s_estimada.benchmark_nicho}%
                </span>
              </div>
              <p className="text-[10px] text-neutral-300 leading-snug pt-0.5">
                {metricasCreador.retencion_30s_estimada.veredicto}
              </p>
            </div>
          </div>

          {/* Subgrid 2: Dinamismo Visual & Engagement (Guardados) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            {/* Dinamismo de Cambios */}
            <div className="p-2.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80">
              <span className="text-[9px] text-neutral-400 block font-medium">Cambio Visual</span>
              <span className="font-bold text-white text-xs">
                c/{metricasCreador.dinamismo_visual.segundos_por_cambio_visual}s
              </span>
              <span className="text-[9px] text-cyan-300 block font-mono">
                {metricasCreador.dinamismo_visual.calificacion_ritmo}
              </span>
            </div>

            {/* Cadencia WPM */}
            <div className="p-2.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80">
              <span className="text-[9px] text-neutral-400 block font-medium">Cadencia de Voz</span>
              <span className="font-bold text-white text-xs">
                {metricasCreador.dinamismo_visual.cadencia_habla_wpm} WPM
              </span>
              <span className="text-[9px] text-neutral-400 block font-mono">
                Palabras/min
              </span>
            </div>

            {/* Potencial de Guardado */}
            <div className="p-2.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80">
              <span className="text-[9px] text-neutral-400 block font-medium">Guardados</span>
              <span className={`font-bold text-xs ${
                metricasCreador.indice_guardados_compartidos.potencial_guardado === 'Alto'
                  ? 'text-emerald-400'
                  : 'text-amber-400'
              }`}>
                {metricasCreador.indice_guardados_compartidos.potencial_guardado}
              </span>
              <span className="text-[9px] text-neutral-400 block font-mono">
                Pedir en {metricasCreador.indice_guardados_compartidos.segundo_micro_compromiso}
              </span>
            </div>

            {/* Brand Safety Monetización */}
            <div className="p-2.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80">
              <span className="text-[9px] text-neutral-400 block font-medium">Monetización</span>
              <span className="font-bold text-emerald-400 text-xs flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{metricasCreador.brand_safety_monetizacion.clasificacion}</span>
              </span>
              <span className="text-[9px] text-neutral-400 block truncate font-mono">
                100% Apto
              </span>
            </div>
          </div>

          {/* CTR Estimado & 3 Títulos A/B Testing para Creadores */}
          {metricasCreador.ctr_estimado?.titulos_ab_testing && metricasCreador.ctr_estimado.titulos_ab_testing.length > 0 && (
            <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-white">
                  <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
                  <span>CTR Estimado ({metricasCreador.ctr_estimado.porcentaje}%) & 3 Títulos A/B Testing</span>
                </span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  Copia y prueba en tu publicación
                </span>
              </div>

              <div className="space-y-1.5">
                {metricasCreador.ctr_estimado.titulos_ab_testing.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-violet-500/20 text-violet-300 font-mono inline-block mb-0.5">
                        {item.enfoque}
                      </span>
                      <p className="text-[11px] font-medium text-white truncate">
                        "{item.titulo}"
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.titulo);
                        setCopiedTitleIdx(idx);
                        setTimeout(() => setCopiedTitleIdx(null), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[10px] font-semibold shrink-0 transition-all flex items-center gap-1"
                    >
                      {copiedTitleIdx === idx ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-300">¡Copiado!</span>
                        </>
                      ) : (
                        <span>Copiar</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audio, Música & Estrategia de Loop */}
          <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-white">
              <Music className="w-3.5 h-3.5 text-violet-400" />
              <span>Estrategia de Audio & Loop Viral</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-300">
              <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[9px] text-neutral-400 block font-semibold">Música de Fondo Recomendada:</span>
                <span>{metricasCreador.audio_y_musica.sugerencia_musical}</span>
                <span className="text-[9px] text-cyan-300 block mt-0.5 font-mono">
                  Volumen sugerido: {metricasCreador.audio_y_musica.db_fondo_recomendado}
                </span>
              </div>
              {metricasCreador.estrategia_loop_viral && (
                <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800">
                  <span className="text-[9px] text-neutral-400 block font-semibold">Estrategia de Loop Infinito:</span>
                  <span className="text-violet-300 font-medium">"{metricasCreador.estrategia_loop_viral.frase_conexion_loop}"</span>
                  <span className="text-[9px] text-neutral-400 block mt-0.5 font-mono">
                    Conecta el final del video con la primera frase para reproducciones infinitas.
                  </span>
                </div>
              )}
            </div>

            {/* SEO Tags with Copy All */}
            {metricasCreador.palabras_clave_seo && metricasCreador.palabras_clave_seo.length > 0 && (
              <div className="pt-2 border-t border-neutral-850 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3 h-3 text-neutral-500" />
                  <span className="text-[10px] text-neutral-400 font-semibold">Etiquetas SEO:</span>
                  {metricasCreador.palabras_clave_seo.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono"
                    >
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const allTags = metricasCreador.palabras_clave_seo.map((t) => `#${t.replace(/\s+/g, '')}`).join(' ');
                    navigator.clipboard.writeText(allTags);
                    setCopiedTags(true);
                    setTimeout(() => setCopiedTags(null as any), 2000);
                  }}
                  className="px-2 py-0.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[10px] text-neutral-400 hover:text-white transition-colors"
                >
                  {copiedTags ? '✓ Copiados' : 'Copiar tags'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Curva de Retención Estimada & Diagnóstico del Minutaje */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curva de Retención Estimada</span>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20">
            {isLocal ? 'Modelo Predictivo ClipIQ' : (isLandscape ? 'Algoritmo YouTube' : 'TikTok / Reels')}
          </span>
        </div>

        {/* Milestone Retention Timeline Graphic */}
        <div className="space-y-1.5 bg-neutral-950/80 border border-neutral-800/80 p-3 rounded-xl">
          <div className="grid grid-cols-5 gap-1 text-center font-mono text-[10px]">
            {milestones.map((m, idx) => (
              <div key={idx}>
                <span className="text-neutral-500 block">{m.time}</span>
                <span className={`font-bold ${m.color}`}>{m.pct}</span>
              </div>
            ))}
          </div>

          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden flex mt-1">
            <div className="w-1/5 bg-emerald-500 h-full" />
            <div className="w-1/5 bg-emerald-400 h-full" />
            <div className="w-1/5 bg-cyan-400 h-full" />
            <div className="w-1/5 bg-indigo-500 h-full" />
            <div className="w-1/5 bg-violet-600 h-full" />
          </div>
        </div>

        {/* Fuga de Audiencia Específica con Solución Inmediata */}
        {auditoria.fuga_audiencia_estimada && (
          <div className="bg-rose-950/25 border border-rose-500/35 rounded-xl p-3 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
              <Flame className="w-3.5 h-3.5" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-rose-300">
                  {videoDuration <= 5 ? 'Punto Clave del Corto:' : 'Punto Crítico Detectado:'}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-rose-500/30 font-mono text-white text-[11px] font-bold">
                  Segundo {auditoria.fuga_audiencia_estimada.segundo} (de {videoDuration}s)
                </span>
              </div>
              <p className="text-[11px] text-neutral-200 leading-snug">
                {auditoria.fuga_audiencia_estimada.motivo}
              </p>
              <div className="pt-1 text-[10px] text-amber-300 flex items-center gap-1 font-semibold">
                <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                <span>
                  {videoDuration <= 5
                    ? 'Solución: En videos ultracortos, añade un texto o remate en este segundo para incentivar reproducciones en loop.'
                    : 'Solución: Aplica un corte a cámara secundaria o zoom 1.1x en este segundo.'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Puntos Clave a Mejorar Clasificados por Prioridad */}
      {puntosMejora && puntosMejora.length > 0 && (
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3.5 sm:p-4 space-y-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              <span>Plan de Optimización Prioritario</span>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              {puntosMejora.length} acciones recomendadas
            </span>
          </div>
          <div className="space-y-2">
            {puntosMejora.map((punto, idx) => {
              const priority =
                idx === 0
                  ? { label: 'Prioridad Alta', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' }
                  : idx === 1
                  ? { label: 'Prioridad Media', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' }
                  : { label: 'Optimización', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };

              return (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs text-neutral-200"
                >
                  <div className="w-5 h-5 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded border font-mono inline-block ${priority.badge}`}
                    >
                      {priority.label}
                    </span>
                    <p className="leading-snug text-neutral-300 text-[11px] sm:text-xs">
                      {punto}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Tool Actions Toolbar: Replicar, Descargar, Asistente IA */}
      <div className="pt-3 space-y-3">
        {/* Prominent Secondary Action: Replicar este formato */}
        <button
          onClick={onOpenReplication}
          className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-violet-600 via-violet-700 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-600/25 transition-all active:scale-[0.99] group"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black">⚡ Replicar este formato</div>
              <div className="text-[10px] sm:text-xs text-violet-200 mt-0.5">
                Guion, Título, SEO & Prompt IA
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Secondary Tool Buttons: Descargar & Chat */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenDownload}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-800 hover:border-neutral-700 transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Descargar Video</span>
          </button>

          <button
            onClick={onOpenChat}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-800 hover:border-neutral-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-4 h-4 text-violet-400" />
            <span>Asistente IA</span>
          </button>
        </div>

        {/* If Raw Video: option to view editing cut guide */}
        {isRaw && guiaCrudo?.corta_en_segundos && guiaCrudo.corta_en_segundos.length > 0 && onOpenCutGuide && (
          <button
            onClick={onOpenCutGuide}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors"
          >
            <Scissors className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Plan de Cortes ({guiaCrudo.corta_en_segundos.length} pausas)</span>
          </button>
        )}
      </div>
    </div>
  );
};
