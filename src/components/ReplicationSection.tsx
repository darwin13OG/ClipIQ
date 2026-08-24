import React, { useState } from 'react';
import { ModuloReplicarVideo } from '../types';
import {
  Sparkles,
  Copy,
  Check,
  Video,
  Camera,
  Layers,
  ArrowRight,
  Tv,
  Mic,
  MessageSquare,
  Flame,
} from 'lucide-react';

interface ReplicationSectionProps {
  replicar: ModuloReplicarVideo;
  onOpenTeleprompter: () => void;
}

export const ReplicationSection: React.FC<ReplicationSectionProps> = ({
  replicar,
  onOpenTeleprompter,
}) => {
  const [copied, setCopied] = useState(false);
  const esqueleto = replicar.esqueleto_viral;

  const handleCopyScript = () => {
    const text = `🎬 GUION ESTRUCTURAL CLONADO - CLIPIQ ENGINE (clipiq.pages.dev)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 GANCHO VIRAL (0-3s):
- Acción a Cámara: ${esqueleto.gancho_0_3s.accion_camara}
- Texto en Pantalla: ${esqueleto.gancho_0_3s.texto_pantalla}
- Voz / Frase: ${esqueleto.gancho_0_3s.audio_voz}

📦 DESARROLLO / CUERPO (3-15s):
${esqueleto.cuerpo_3_15s.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

🚀 LLAMADA A LA ACCIÓN (CTA FINAL):
- ${esqueleto.cta_final.texto_o_voz}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generado con ClipIQ Engine v2.0 Enterprise`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900/90 border border-violet-500/30 rounded-3xl p-5 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Protocolo: Replicar Este Video</h3>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300">
                Clonación v2.0
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              Esqueleto ganador desglosado para adaptar a tu propio nicho
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyScript}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Copiado!' : 'Copiar'}</span>
          </button>

          <button
            onClick={onOpenTeleprompter}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-violet-600/30 transition-all active:scale-95"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Grabar / Teleprompter</span>
          </button>
        </div>
      </div>

      {/* 1. Gancho 0-3s */}
      <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Fase 1: Gancho Psicológico (0-3s)</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
            00:00 - 00:03
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Acción de Cámara */}
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 space-y-1">
            <div className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
              <Video className="w-3 h-3 text-violet-400" />
              <span>Acción a Cámara</span>
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed">
              {esqueleto.gancho_0_3s.accion_camara}
            </p>
          </div>

          {/* Texto en Pantalla */}
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 space-y-1">
            <div className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
              <Tv className="w-3 h-3 text-indigo-400" />
              <span>Texto en Pantalla</span>
            </div>
            <p className="text-xs font-bold text-white leading-relaxed">
              "{esqueleto.gancho_0_3s.texto_pantalla}"
            </p>
          </div>

          {/* Audio / Voz */}
          <div className="p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 space-y-1">
            <div className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
              <Mic className="w-3 h-3 text-emerald-400" />
              <span>Guion Hablado</span>
            </div>
            <p className="text-xs italic text-neutral-200 leading-relaxed">
              "{esqueleto.gancho_0_3s.audio_voz}"
            </p>
          </div>
        </div>
      </div>

      {/* 2. Cuerpo 3-15s */}
      <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-violet-300">
            <Layers className="w-4 h-4 text-violet-400" />
            <span>Fase 2: Retención del Cuerpo (3-15s)</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20">
            00:03 - 00:15
          </span>
        </div>

        <div className="space-y-2">
          {esqueleto.cuerpo_3_15s.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-xl bg-neutral-900/80 border border-neutral-800/80 text-xs text-neutral-200"
            >
              <div className="w-5 h-5 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-sm">
                {idx + 1}
              </div>
              <p className="leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. CTA Final */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-950 to-neutral-900 border border-emerald-500/30 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Fase 3: Call to Action (Cierre de Alta Conversión)</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
            Comentarios & Guardados
          </span>
        </div>
        <p className="text-xs font-bold text-white bg-neutral-900/90 p-3 rounded-xl border border-neutral-800 leading-relaxed">
          "{esqueleto.cta_final.texto_o_voz}"
        </p>
      </div>
    </div>
  );
};
