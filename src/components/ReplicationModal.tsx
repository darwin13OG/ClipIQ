import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Copy,
  Check,
  Video,
  Camera,
  Layers,
  Tv,
  Mic,
  MessageSquare,
  Flame,
  Type,
  FileText,
  Image as ImageIcon,
  Hash,
  Share2,
  CheckCheck,
} from 'lucide-react';
import { ModuloReplicarVideo, EsqueletoViral, RecomendacionPublicacion } from '../types';

interface ReplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  replicar?: ModuloReplicarVideo;
  onOpenTeleprompter: () => void;
}

export const ReplicationModal: React.FC<ReplicationModalProps> = ({
  isOpen,
  onClose,
  replicar,
  onOpenTeleprompter,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen || !replicar?.esqueleto_viral) return null;

  const esqueleto: EsqueletoViral = replicar.esqueleto_viral;
  const publicacion: RecomendacionPublicacion = replicar.publicacion_recomendada || {
    titulo_viral: 'CÓMO MULTIPLICAR TUS RESULTADOS (Fórmula Probada) 🚀',
    descripcion_seo: `¿Quieres dominar este formato en minutos? Aquí tienes el desglose exacto que necesitas para tu próximo video.\n\n👇 Guarda este video y compártelo con tu equipo.\n💬 Cuéntame en los comentarios qué tema te gustaría ver a continuación.\n\n⚡ Replicado y analizado con ClipIQ (clipiq.pages.dev)`,
    hashtags: ['#CreacionDeContenido', '#TipsVirales', '#MarketingDigital', '#Shorts', '#ReelsTips', '#ClipIQ'],
    es_horizontal_o_youtube: true,
    prompt_miniatura_ia: `Ultra viral YouTube thumbnail photography, expressive creator with excited face pointing to a glowing 3D holographic viral badge, high contrast neon cyan and violet studio rim lighting, cinematic depth of field, 8k resolution, Unreal Engine 5 render style, photorealistic, clean dark background, no messy text, --ar 16:9 --v 6.0`,
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = `🎬 PACK COMPLETO DE PUBLICACIÓN & GUION VIRAL - CLIPIQ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 TÍTULO VIRAL RECOMENDADO:
${publicacion.titulo_viral}

📝 DESCRIPCIÓN & SEO:
${publicacion.descripcion_seo}

🏷️ HASHTAGS:
${publicacion.hashtags.join(' ')}

🎨 PROMPT PARA MINIATURA CON IA (Midjourney / DALL-E 3 / Flux):
${publicacion.prompt_miniatura_ia}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 ESTRUCTURA DEL GUION:
[0-3s Gancho Inicial]
• Acción: ${esqueleto.gancho_0_3s.accion_camara}
• Texto Pantalla: ${esqueleto.gancho_0_3s.texto_pantalla}
• Voz: "${esqueleto.gancho_0_3s.audio_voz}"

[3-15s Desarrollo]
${esqueleto.cuerpo_3_15s.map((step, idx) => `• Paso ${idx + 1}: ${step}`).join('\n')}

[CTA Cierre]
• "${esqueleto.cta_final.texto_o_voz}"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generado con ClipIQ | clipiq.pages.dev`;

    copyToClipboard(fullText, 'all');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/30 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Kit de Replicación & Publicación
              </h3>
              <p className="text-[11px] text-neutral-400">
                Guion, Título, Descripción y Prompt para Miniatura con IA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all active:scale-95"
            >
              {copiedType === 'all' ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span className="hidden sm:inline">
                {copiedType === 'all' ? '¡Pack Copiado!' : 'Copiar Todo'}
              </span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* Action Bar for Teleprompter */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-neutral-900 to-indigo-950/40 border border-violet-500/30 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-violet-400" />
                <span>¿Listo para grabar tu versión frente a cámara?</span>
              </h4>
              <p className="text-[10px] text-neutral-400 mt-0.5">
                Abre el teleprompter con espejo de cámara para leer mientras grabas.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenTeleprompter();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-violet-600/30 transition-all active:scale-95 shrink-0"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Abrir Teleprompter</span>
            </button>
          </div>

          {/* 1. TÍTULO VIRAL RECOMENDADO */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Type className="w-3.5 h-3.5 text-amber-400" />
                <span>Título Viral Recomendado (Alto CTR)</span>
              </div>
              <button
                onClick={() => copyToClipboard(publicacion.titulo_viral, 'title')}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[11px] font-semibold text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              >
                {copiedType === 'title' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedType === 'title' ? 'Copiado' : 'Copiar Título'}</span>
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-white">
              {publicacion.titulo_viral}
            </div>
          </div>

          {/* 2. DESCRIPCIÓN & HASHTAGS SEO */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300">
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Descripción & SEO para Redes Sociales</span>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(
                    `${publicacion.descripcion_seo}\n\n${publicacion.hashtags.join(' ')}`,
                    'desc'
                  )
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[11px] font-semibold text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              >
                {copiedType === 'desc' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedType === 'desc' ? 'Copiado' : 'Copiar Descripción'}</span>
              </button>
            </div>

            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 whitespace-pre-line leading-relaxed">
              {publicacion.descripcion_seo}
            </div>

            {/* Hashtags Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {publicacion.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  onClick={() => copyToClipboard(tag, `tag-${idx}`)}
                  className="cursor-pointer text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-sky-950/60 text-sky-300 border border-sky-800/40 hover:bg-sky-900/60 transition-colors"
                  title="Clic para copiar este hashtag"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 3. PROMPT DE MINIATURA CON IA (Especial YouTube / Horizontal) */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-indigo-500/30 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Prompt IA para Miniatura (YouTube & Portadas)</span>
              </div>
              <button
                onClick={() =>
                  copyToClipboard(publicacion.prompt_miniatura_ia || '', 'thumb')
                }
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-[11px] font-semibold text-indigo-200 border border-indigo-700/50 transition-colors"
              >
                {copiedType === 'thumb' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedType === 'thumb' ? 'Copiado' : 'Copiar Prompt IA'}</span>
              </button>
            </div>

            <p className="text-[10px] text-neutral-400">
              Pégalo directamente en <strong>Midjourney</strong>, <strong>DALL-E 3</strong>, <strong>Imagen 3</strong> o <strong>Flux</strong> para generar una miniatura de alto impacto.
            </p>

            <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-indigo-200/90 leading-relaxed select-all">
              {publicacion.prompt_miniatura_ia}
            </div>
          </div>

          {/* 4. GUION ESTRUCTURAL (Gancho 0-3s, Pasos 3-15s, CTA) */}
          <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-300">
                <Flame className="w-3.5 h-3.5 text-violet-400" />
                <span>Estructura del Guion & Formato</span>
              </div>
              <button
                onClick={() => {
                  const scriptText = `🎯 GANCHO (0-3s):\n• Acción: ${esqueleto.gancho_0_3s.accion_camara}\n• Texto: ${esqueleto.gancho_0_3s.texto_pantalla}\n• Voz: "${esqueleto.gancho_0_3s.audio_voz}"\n\n📦 CUERPO (3-15s):\n${esqueleto.cuerpo_3_15s.map((s, i) => `• Paso ${i+1}: ${s}`).join('\n')}\n\n🚀 CTA:\n"${esqueleto.cta_final.texto_o_voz}"`;
                  copyToClipboard(scriptText, 'script');
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[11px] font-semibold text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              >
                {copiedType === 'script' ? (
                  <Check className="w-3 h-3 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>{copiedType === 'script' ? 'Copiado' : 'Copiar Guion'}</span>
              </button>
            </div>

            {/* Gancho 0-3s */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-[9px] uppercase font-bold text-neutral-400 flex items-center gap-1">
                  <Video className="w-3 h-3 text-violet-400" />
                  Acción en Cámara
                </span>
                <p className="text-neutral-200 text-[11px] leading-relaxed">
                  {esqueleto.gancho_0_3s.accion_camara}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-[9px] uppercase font-bold text-neutral-400 flex items-center gap-1">
                  <Tv className="w-3 h-3 text-indigo-400" />
                  Texto en Pantalla
                </span>
                <p className="font-bold text-white text-[11px] leading-relaxed">
                  "{esqueleto.gancho_0_3s.texto_pantalla}"
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-1">
                <span className="text-[9px] uppercase font-bold text-neutral-400 flex items-center gap-1">
                  <Mic className="w-3 h-3 text-emerald-400" />
                  Frase Hablada
                </span>
                <p className="italic text-neutral-200 text-[11px] leading-relaxed">
                  "{esqueleto.gancho_0_3s.audio_voz}"
                </p>
              </div>
            </div>

            {/* Pasos de desarrollo */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 flex items-center gap-1">
                <Layers className="w-3 h-3 text-violet-400" />
                Desarrollo y Retención (03 - 15 Segundos)
              </span>
              {esqueleto.cuerpo_3_15s.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-200"
                >
                  <span className="w-4 h-4 rounded bg-violet-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>

            {/* CTA Final */}
            <div className="p-2.5 rounded-xl bg-neutral-900/90 border border-emerald-500/30 text-[11px] font-bold text-emerald-300 leading-relaxed">
              <span className="text-[9px] uppercase text-emerald-400 block font-bold mb-0.5">
                Llamada a la Acción (CTA):
              </span>
              "{esqueleto.cta_final.texto_o_voz}"
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
