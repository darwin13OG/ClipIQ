import React, { useState } from 'react';
import { ModuloGuiaCrudo } from '../types';
import {
  Scissors,
  Anchor,
  Palette,
  Music,
  Copy,
  Check,
  Sparkles,
  Zap,
  Mic,
  Tv,
} from 'lucide-react';

interface CutGuideSectionProps {
  guia: ModuloGuiaCrudo;
}

export const CutGuideSection: React.FC<CutGuideSectionProps> = ({ guia }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNotes = () => {
    const text = `📋 GUÍA DE EDICIÓN - CLIPIQ ENGINE (clipiq.pages.dev)
✂️ RECORTAR SILENCIOS / PAUSAS:
${guia.corta_en_segundos.map((s) => `- Eliminar: ${s}`).join('\n')}

🎯 HOOK 0-3s:
- En Pantalla: ${guia.hook_sugerido_texto}
- Voz a Cámara: ${guia.hook_sugerido_voz}

🎨 SUBTÍTULOS:
${guia.estilo_subtitulos}

🎵 MÚSICA & AUDIO:
${guia.musica_recomendada}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900/90 border border-amber-500/30 rounded-3xl p-5 space-y-5 shadow-xl">
      {/* Module Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Scissors className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Camino A: Guía de Edición Técnica</h3>
            <p className="text-[11px] text-amber-300/80">Hoja de ruta para transformar tu toma cruda en video viral</p>
          </div>
        </div>

        <button
          onClick={handleCopyNotes}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? '¡Copiado!' : 'Copiar Guía'}</span>
        </button>
      </div>

      {/* 1. Plan de Cortes Exactos */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
          <Scissors className="w-3.5 h-3.5 text-amber-400" />
          <span>Plan de Cortes (Eliminar Silencios & Pausas):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {guia.corta_en_segundos && guia.corta_en_segundos.length > 0 ? (
            guia.corta_en_segundos.map((timestamp, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950 border border-amber-500/40 text-xs font-mono text-amber-300 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="font-bold">Corte {idx + 1}:</span>
                <span>{timestamp}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-neutral-400">No se detectaron pausas graves.</div>
          )}
        </div>
      </div>

      {/* 2. Hook Visual & Verbal (0-3s) */}
      <div className="space-y-2 pt-2 border-t border-neutral-800">
        <div className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
          <Anchor className="w-3.5 h-3.5 text-violet-400" />
          <span>Gancho Sugerido para los Primeros 3 Segundos:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {/* Texto en Pantalla */}
          <div className="p-3 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1">
              <Tv className="w-3 h-3" />
              <span>Texto en Pantalla (Título Gancho)</span>
            </div>
            <p className="text-xs font-bold text-white leading-relaxed">
              "{guia.hook_sugerido_texto}"
            </p>
          </div>

          {/* Guion Verbal */}
          <div className="p-3 rounded-2xl bg-neutral-950/90 border border-neutral-800 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Mic className="w-3 h-3" />
              <span>Frase Verbal a Cámara</span>
            </div>
            <p className="text-xs font-medium text-neutral-200 leading-relaxed italic">
              "{guia.hook_sugerido_voz}"
            </p>
          </div>
        </div>
      </div>

      {/* 3. Paleta de Subtítulos & Música */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-800">
        {/* Estilo Subtítulos */}
        <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1.5">
          <div className="text-[11px] font-bold text-neutral-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Estilo de Subtítulos Recomendado</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {guia.estilo_subtitulos}
          </p>
        </div>

        {/* Música Recomendada */}
        <div className="p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1.5">
          <div className="text-[11px] font-bold text-neutral-300 flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-indigo-400" />
            <span>Música de Fondo & BPM</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            {guia.musica_recomendada}
          </p>
        </div>
      </div>
    </div>
  );
};
