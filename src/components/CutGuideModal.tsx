import React, { useState } from 'react';
import { ModuloGuiaCrudo } from '../types';
import {
  Scissors,
  Anchor,
  Palette,
  Music,
  Copy,
  Check,
  X,
  Mic,
  Tv,
} from 'lucide-react';

interface CutGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  guia: ModuloGuiaCrudo;
}

export const CutGuideModal: React.FC<CutGuideModalProps> = ({
  isOpen,
  onClose,
  guia,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyNotes = () => {
    const text = `📋 PLAN DE EDICIÓN Y CORTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✂️ RECORTAR SILENCIOS / PAUSAS:
${guia.corta_en_segundos.map((s) => `• Eliminar: ${s}`).join('\n')}

🎯 GANCHO (0-3s):
• En Pantalla: "${guia.hook_sugerido_texto}"
• Frase a Cámara: "${guia.hook_sugerido_voz}"

🎨 ESTILO DE SUBTÍTULOS:
• ${guia.estilo_subtitulos}

🎵 MÚSICA RECOMENDADA:
• ${guia.musica_recomendada}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generado con ClipIQ`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-600/20">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Plan de Cortes y Edición</h3>
              <p className="text-xs text-neutral-400">
                Pausas detectadas y sugerencias para la versión final
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* 1. Plan de Cortes */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-amber-400" />
              <span>Pausas y Silencios a Recortar:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {guia.corta_en_segundos && guia.corta_en_segundos.length > 0 ? (
                guia.corta_en_segundos.map((timestamp, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 border border-amber-500/30 text-xs font-mono text-amber-300"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="font-bold">Pausa {idx + 1}:</span>
                    <span>{timestamp}</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-neutral-400">No se detectaron pausas prolongadas.</div>
              )}
            </div>
          </div>

          {/* 2. Gancho 0-3s */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
              <Anchor className="w-4 h-4 text-violet-400" />
              <span>Gancho de Entrada Sugerido (0-3s):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1">
                  <Tv className="w-3 h-3" />
                  <span>Texto en Pantalla</span>
                </div>
                <p className="text-xs font-bold text-white leading-relaxed">
                  "{guia.hook_sugerido_texto}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <Mic className="w-3 h-3" />
                  <span>Frase Hablada</span>
                </div>
                <p className="text-xs italic text-neutral-200 leading-relaxed">
                  "{guia.hook_sugerido_voz}"
                </p>
              </div>
            </div>
          </div>

          {/* 3. Subtítulos & Música */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
              <div className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                <span>Estilo de Subtítulos</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {guia.estilo_subtitulos}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-1.5">
              <div className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-indigo-400" />
                <span>Música de Fondo</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                {guia.musica_recomendada}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
