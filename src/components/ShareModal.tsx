import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Smartphone,
  ExternalLink,
  MessageCircle,
  Send,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ClipIQAnalysisResult } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult?: ClipIQAnalysisResult | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  analysisResult,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);
  const [shareMode, setShareMode] = useState<'app' | 'analysis'>('app');

  if (!isOpen) return null;

  // Obtain the current real URL of the application
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://clipiq.pages.dev';

  const appTitle = 'ClipIQ — Suite de Auditoría y Retención de Video Viral';
  const appDesc = 'Audita tus videos de TikTok, Reels y YouTube Shorts con IA. Detecta fallas de retención en segundos exactos y optimiza tu gancho.';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: appTitle,
          text: shareMode === 'analysis' && analysisResult
            ? `¡Mira la auditoría de mi video en ClipIQ! Score Global: ${analysisResult.scores.score_global}/100. Potencial Viral: ${analysisResult.scores.potencial_viral}.`
            : appDesc,
          url: currentUrl,
        });
      } catch (err) {
        // User cancelled or share dismissed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShareWhatsApp = () => {
    const text = shareMode === 'analysis' && analysisResult
      ? `🎬 *Auditoría de Video en ClipIQ*\n• Score Global: ${analysisResult.scores.score_global}/100\n• Potencial Viral: ${analysisResult.scores.potencial_viral}\n• Gancho 0-3s: ${analysisResult.scores.hook_score}%\n\nPruébalo aquí: ${currentUrl}`
      : `🎬 *ClipIQ — Auditoría & Retención de Video*\nAudita tus videos de TikTok, Reels y Shorts con IA para no perder visitas:\n${currentUrl}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTelegram = () => {
    const text = shareMode === 'analysis' && analysisResult
      ? `Auditoría de Video ClipIQ (Score: ${analysisResult.scores.score_global}/100)`
      : appTitle;
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopySummaryText = async () => {
    if (!analysisResult) return;
    const summary = `📊 Auditoría ClipIQ
Score Global: ${analysisResult.scores.score_global}/100 (${analysisResult.scores.potencial_viral})
Gancho 0-3s: ${analysisResult.scores.hook_score}%
Fuga estimada: Seg ${analysisResult.auditoria_tecnica.fuga_audiencia_estimada.segundo} (${analysisResult.auditoria_tecnica.fuga_audiencia_estimada.motivo})
App: ${currentUrl}`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    } catch {
      // Fallback
    }
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Compartir ClipIQ</h3>
              <p className="text-[11px] text-neutral-400">Envía la app o el análisis en 1 toque</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Mode Selector (if analysis is available) */}
          {analysisResult && (
            <div className="flex p-1 bg-neutral-950 rounded-xl border border-neutral-800 text-xs font-semibold">
              <button
                onClick={() => setShareMode('app')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  shareMode === 'app'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Compartir la App
              </button>
              <button
                onClick={() => setShareMode('analysis')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  shareMode === 'analysis'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Compartir mi Análisis
              </button>
            </div>
          )}

          {/* URL Box with direct copy */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-300">
              Enlace directo de la aplicación:
            </label>
            <div className="flex items-center gap-2 p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="bg-transparent text-xs text-neutral-300 font-mono flex-1 outline-none truncate select-all"
              />
              <button
                onClick={handleCopyLink}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  copiedLink
                    ? 'bg-emerald-600 text-white'
                    : 'bg-violet-600 hover:bg-violet-500 text-white'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Primary Action: Native mobile share or direct share */}
          {canNativeShare && (
            <button
              onClick={handleNativeShare}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-violet-600/30 hover:opacity-95 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>Abrir Menú de Compartir del Celular</span>
            </button>
          )}

          {/* Social Quick Share Buttons */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
              O compartir directamente vía:
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleShareTelegram}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-950/60 border border-sky-800/60 hover:bg-sky-900/60 text-sky-300 text-xs font-semibold transition-all"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Telegram</span>
              </button>
            </div>
          </div>

          {/* Analysis Snippet Copy if in analysis mode */}
          {shareMode === 'analysis' && analysisResult && (
            <div className="pt-2 border-t border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-semibold">Resumen en Texto:</span>
                <button
                  onClick={handleCopySummaryText}
                  className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
                >
                  {copiedReport ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedReport ? '¡Copiado!' : 'Copiar Resumen'}</span>
                </button>
              </div>
              <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-[11px] text-neutral-300 space-y-1 font-mono">
                <div>🎬 <strong>Score Global:</strong> {analysisResult.scores.score_global}/100 ({analysisResult.scores.potencial_viral})</div>
                <div>🪝 <strong>Gancho 0-3s:</strong> {analysisResult.scores.hook_score}%</div>
                <div>📉 <strong>Fuga estimada:</strong> Seg {analysisResult.auditoria_tecnica.fuga_audiencia_estimada.segundo}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
