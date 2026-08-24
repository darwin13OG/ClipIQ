import React from 'react';
import {
  MetricScores,
  DiagnosticoInicial,
  AuditoriaTecnica,
  ModuloGuiaCrudo,
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
} from 'lucide-react';

interface MetricCardsProps {
  scores: MetricScores;
  diagnostico: DiagnosticoInicial;
  auditoria: AuditoriaTecnica;
  puntosMejora: string[];
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
  isRaw,
  guiaCrudo,
  onOpenReplication,
  onOpenDownload,
  onOpenChat,
  onOpenCutGuide,
}) => {
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
      {/* 1. Header Overview Pill: Nicho, Estado, Marca de Agua */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-2.5 sm:p-3.5 space-y-2 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs font-bold text-neutral-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Nicho:</span>
          </span>
          <span className="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-lg bg-neutral-800 text-violet-300 border border-neutral-700">
            {diagnostico.nicho_detectado || 'General'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[11px]">
          <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center sm:text-left">
            <span className="text-[9px] text-neutral-400 block font-medium">Estado</span>
            <span
              className={`font-bold text-[11px] sm:text-xs ${
                diagnostico.estado_video === 'CRUDO' ? 'text-amber-400' : 'text-violet-400'
              }`}
            >
              {diagnostico.estado_video === 'CRUDO' ? 'Crudo' : 'Editado'}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center sm:text-left">
            <span className="text-[9px] text-neutral-400 block font-medium">Marca Agua</span>
            <span
              className={`font-bold text-[11px] sm:text-xs ${
                diagnostico.contiene_marca_de_agua ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {diagnostico.contiene_marca_de_agua ? 'Alerta ⚠️' : 'Limpio ✓'}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center sm:text-left">
            <span className="text-[9px] text-neutral-400 block font-medium">Pista Voz</span>
            <span className="font-bold text-white text-[11px] sm:text-xs truncate block">
              {diagnostico.tiene_audio_voz ? 'Detectada ✓' : 'Música'}
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
              <div className="text-[10px] sm:text-xs font-semibold text-neutral-400">Score Global</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-bold ${getViralBadge(scores.potencial_viral)}`}>
                  {scores.potencial_viral}
                </span>
              </div>
            </div>
          </div>

          {/* Sub Scores (Hook 0-3s & Retención) */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <div className="p-2 sm:p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[76px] sm:min-w-[110px]">
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-neutral-400 mb-0.5">
                <Anchor className="w-3 h-3 text-amber-400" />
                <span className="font-semibold">Gancho</span>
              </div>
              <div className="text-base sm:text-2xl font-black text-amber-300">{scores.hook_score}%</div>
              <div className="text-[8px] sm:text-[10px] text-neutral-400">0-3s</div>
            </div>

            <div className="p-2 sm:p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[76px] sm:min-w-[110px]">
              <div className="flex items-center justify-center gap-1 text-[10px] sm:text-[11px] text-neutral-400 mb-0.5">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span className="font-semibold">Retención</span>
              </div>
              <div className="text-base sm:text-2xl font-black text-emerald-300">{scores.retencion_score}%</div>
              <div className="text-[8px] sm:text-[10px] text-neutral-400">Estimada</div>
            </div>
          </div>
        </div>

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
                  : 'text-rose-400'
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
              <span>Zona</span>
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

      {/* 3. Fuga de Audiencia Estimada */}
      {auditoria.fuga_audiencia_estimada && (
        <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-3 sm:p-4 flex items-start gap-2.5 shadow-sm">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] sm:text-xs font-bold text-rose-300">Punto de Fuga:</span>
              <span className="px-1.5 py-0.2 rounded bg-rose-500/30 font-mono text-white text-[10px] sm:text-xs font-bold">
                {auditoria.fuga_audiencia_estimada.segundo}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-200 leading-snug">
              {auditoria.fuga_audiencia_estimada.motivo}
            </p>
          </div>
        </div>
      )}

      {/* 4. Top 3 Actionable Improvements */}
      {puntosMejora && puntosMejora.length > 0 && (
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 sm:p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white">
            <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Puntos Clave a Mejorar</span>
          </div>
          <div className="space-y-1.5">
            {puntosMejora.map((punto, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2 sm:p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] sm:text-xs text-neutral-200"
              >
                <div className="w-4 h-4 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="leading-snug font-medium">{punto}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Tool Actions Toolbar: Replicar, Descargar, Asistente IA */}
      <div className="pt-1 space-y-2">
        {/* Prominent Secondary Action: Replicar este formato */}
        <button
          onClick={onOpenReplication}
          className="w-full flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-violet-600 via-violet-700 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-xl shadow-violet-600/25 transition-all active:scale-[0.99] group"
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black">⚡ Replicar este formato</div>
              <div className="text-[10px] sm:text-xs text-violet-200">
                Guion, Título, SEO & Prompt IA
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Secondary Tool Buttons: Descargar & Chat */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenDownload}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-800 hover:border-neutral-700 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Descargar Video</span>
          </button>

          <button
            onClick={onOpenChat}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold border border-neutral-800 hover:border-neutral-700 transition-colors shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
            <span>Asistente IA</span>
          </button>
        </div>

        {/* If Raw Video: option to view editing cut guide */}
        {isRaw && guiaCrudo?.corta_en_segundos && guiaCrudo.corta_en_segundos.length > 0 && onOpenCutGuide && (
          <button
            onClick={onOpenCutGuide}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-500/30 transition-colors"
          >
            <Scissors className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver Plan de Cortes ({guiaCrudo.corta_en_segundos.length} pausas)</span>
          </button>
        )}
      </div>
    </div>
  );
};
