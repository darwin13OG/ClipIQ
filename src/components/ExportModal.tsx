import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Download,
  FileCode,
  FileText,
  AlertTriangle,
  Sparkles,
  Share2,
  Tv,
  Globe,
} from 'lucide-react';
import { ClipIQAnalysisResult } from '../types';
import { BrandLogo } from './BrandLogo';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: ClipIQAnalysisResult | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  analysisResult,
}) => {
  const [activeTab, setActiveTab] = useState<'outro' | 'json' | 'report'>('outro');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !analysisResult) return null;

  const currentHost = typeof window !== 'undefined' ? window.location.host : 'clipiq.pages.dev';
  const currentAppUrl = typeof window !== 'undefined' ? window.location.href : 'https://clipiq.pages.dev';

  const jsonString = JSON.stringify(analysisResult, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clipiq_audit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadReport = () => {
    const markdown = `# REPORTE EJECUTIVO DE AUDITORÍA VIRAL - CLIPIQ
==================================================
App: ${analysisResult.meta_app.app_name} (v${analysisResult.meta_app.version})
Dominio Oficial: ${currentHost}
Fecha: ${new Date().toLocaleDateString()}
==================================================

## 1. DIAGNÓSTICO INICIAL
- Nicho: ${analysisResult.diagnostico_inicial.nicho_detectado}
- Fuente: ${analysisResult.diagnostico_inicial.fuente_detectada}
- Estado: ${analysisResult.diagnostico_inicial.estado_video}
- Marca de Agua: ${analysisResult.diagnostico_inicial.contiene_marca_de_agua ? 'SÍ (Recomendado limpiar)' : 'NO'}

## 2. MÉTRICAS CORE
- Score Global de Edición: ${analysisResult.scores.score_global}/100
- Potencial Viral: ${analysisResult.scores.potencial_viral}
- Hook Score (0-3s): ${analysisResult.scores.hook_score}%
- Eficiencia de Retención: ${analysisResult.scores.retencion_score}%

## 3. AUDITORÍA TÉCNICA
- Ritmo de Cortes: ${analysisResult.auditoria_tecnica.ritmo_cortes}
- Balance de Audio: ${analysisResult.auditoria_tecnica.balance_audio}
- Legibilidad en Zona Segura: ${analysisResult.auditoria_tecnica.legibilidad_texto}
- Fuga de Audiencia Estimada: Segundo ${analysisResult.auditoria_tecnica.fuga_audiencia_estimada.segundo}
  Razón: ${analysisResult.auditoria_tecnica.fuga_audiencia_estimada.motivo}

## 4. PUNTOS CLAVE DE MEJORA
${analysisResult.puntos_clave_mejora.map((p, i) => `${i + 1}. ${p}`).join('\n')}

## 5. ESQUELETO CLONADO (REPLICAR VIDEO)
- Acción a Cámara (0-3s): ${analysisResult.modulo_replicar_video.esqueleto_viral.gancho_0_3s.accion_camara}
- Texto en Pantalla: ${analysisResult.modulo_replicar_video.esqueleto_viral.gancho_0_3s.texto_pantalla}
- Voz Hablada: ${analysisResult.modulo_replicar_video.esqueleto_viral.gancho_0_3s.audio_voz}
- Desarrollo:
${analysisResult.modulo_replicar_video.esqueleto_viral.cuerpo_3_15s.map((c, i) => `  * Paso ${i + 1}: ${c}`).join('\n')}
- CTA Final: ${analysisResult.modulo_replicar_video.esqueleto_viral.cta_final.texto_o_voz}

==================================================
Generado automáticamente por ClipIQ Engine v2.0 Enterprise
${currentAppUrl}`;

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clipiq_report_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" showText={false} />
            <div>
              <h3 className="text-sm font-bold text-white">Centro de Exportación & Outro</h3>
              <p className="text-[11px] text-neutral-400 font-mono">{currentHost}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex p-2 bg-neutral-950/50 border-b border-neutral-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('outro')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              activeTab === 'outro' ? 'bg-violet-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Outro ClipIQ (2s)
          </button>
          <button
            onClick={() => setActiveTab('json')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              activeTab === 'json' ? 'bg-violet-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            JSON Estricto
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              activeTab === 'report' ? 'bg-violet-600 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Reporte Ejecutivo
          </button>
        </div>

        {/* Content area */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {/* TAB 1: OUTRO */}
          {activeTab === 'outro' && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-2xl bg-gradient-to-tr from-neutral-950 via-neutral-900 to-violet-950 border border-neutral-800 p-6 flex flex-col items-center justify-center text-center shadow-inner overflow-hidden">
                <div className="mb-3 animate-pulse">
                  <BrandLogo size="lg" showText={false} />
                </div>
                <h4 className="text-base font-extrabold text-white tracking-tight">
                  Analizado con ClipIQ
                </h4>
                <p className="text-xs font-mono text-violet-300 mt-1 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>{currentHost}</span>
                </p>
                <div className="absolute bottom-2 right-3 text-[10px] font-mono text-neutral-500">
                  Duración: 2s
                </div>
              </div>

              {analysisResult.opciones_exportacion_v2.recomienda_limpiar_marca_agua && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Aviso de Marca de Agua:</span>
                    TikTok e Instagram reducen hasta un 70% la distribución de videos que contengan marcas de agua de plataformas rivales. Remuévela antes de subir.
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                <span className="font-bold text-white block">Configuración de Branding:</span>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Texto:</span>
                  <span className="font-mono text-violet-300">
                    {analysisResult.opciones_exportacion_v2.configuracion_outro_clipiq.texto_branding}
                  </span>
                </div>
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Duración de salida:</span>
                  <span className="font-mono text-neutral-400">
                    {analysisResult.opciones_exportacion_v2.configuracion_outro_clipiq.duracion_segundos} segundos
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: JSON */}
          {activeTab === 'json' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">ClipIQ Engine Output v2.0</span>
                <button
                  onClick={handleCopyJSON}
                  className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar JSON'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-72 leading-relaxed">
                {jsonString}
              </pre>

              <button
                onClick={handleDownloadJSON}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar archivo .json</span>
              </button>
            </div>
          )}

          {/* TAB 3: EXECUTIVE REPORT */}
          {activeTab === 'report' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <FileText className="w-4 h-4" />
                  <span>Reporte Ejecutivo en Markdown Listo</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Incluye métricas core, auditoría técnica de retención, los 3 puntos de acción inmediata y el guion clonado listo para compartir con tu editor de video o equipo.
                </p>
              </div>

              <button
                onClick={handleDownloadReport}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Descargar Reporte Completo (.md)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
