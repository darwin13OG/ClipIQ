import React, { useState, useRef } from 'react';
import {
  Upload,
  Link,
  Camera,
  Film,
  Sparkles,
  Flame,
  Play,
  Scissors,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { SAMPLE_VIDEOS } from '../data/samples';
import { SampleVideoItem } from '../types';

interface VideoInputSectionProps {
  onAnalyzeUrl: (url: string, nicho?: string) => void;
  onAnalyzeFile: (file: File, state: 'CRUDO' | 'EDITADO', nicho?: string) => void;
  onSelectSample: (sample: SampleVideoItem) => void;
  isAnalyzing: boolean;
  analyzingStep: string;
}

export const VideoInputSection: React.FC<VideoInputSectionProps> = ({
  onAnalyzeUrl,
  onAnalyzeFile,
  onSelectSample,
  isAnalyzing,
  analyzingStep,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'samples'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [videoState, setVideoState] = useState<'CRUDO' | 'EDITADO'>('CRUDO');
  const [nichoInput, setNichoInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const preview = URL.createObjectURL(file);
      setVideoPreviewUrl(preview);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        setVideoPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleStartAnalysis = () => {
    if (activeTab === 'upload' && selectedFile) {
      onAnalyzeFile(selectedFile, videoState, nichoInput);
    } else if (activeTab === 'url' && urlInput.trim()) {
      onAnalyzeUrl(urlInput.trim(), nichoInput);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-2 sm:px-4 py-2 sm:py-4 space-y-3.5 sm:space-y-5">
      {/* Title with clean minimal mobile typography */}
      <div className="text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] sm:text-xs font-semibold">
          <Sparkles className="w-3 h-3 text-violet-400" />
          <span>Auditoría de Retención</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
          Analiza tu Video
        </h2>
        <p className="text-neutral-400 text-[11px] sm:text-xs max-w-sm mx-auto leading-tight sm:leading-normal">
          Diagnóstico de retención 0-3s, fugas y zona segura móvil.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all ${
            activeTab === 'upload'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Subir</span>
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all ${
            activeTab === 'url'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Link className="w-3.5 h-3.5" />
          <span>Pegar Link</span>
        </button>
        <button
          onClick={() => setActiveTab('samples')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs transition-all ${
            activeTab === 'samples'
              ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Ejemplos</span>
        </button>
      </div>

      {/* Tab: Upload / Camera */}
      {activeTab === 'upload' && (
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleFileChange}
            accept="video/*"
            capture="environment"
            className="hidden"
          />

          {/* Drag & Drop Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-violet-500 bg-violet-500/10 scale-[0.99]'
                : selectedFile
                ? 'border-emerald-500/50 bg-neutral-900/90'
                : 'border-neutral-800 bg-neutral-900/50 hover:border-neutral-700 hover:bg-neutral-900'
            }`}
          >
            {selectedFile ? (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white truncate max-w-xs mx-auto">
                    {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-neutral-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Toca para cambiar
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center mx-auto text-violet-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    Toca para seleccionar video
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">
                    MP4, MOV, WEBM hasta 500MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mode Selector (Crudo vs Editado) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setVideoState('CRUDO')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                videoState === 'CRUDO'
                  ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Scissors className="w-3.5 h-3.5" />
                <span>Video Crudo</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                Para plan de cortes y pausas
              </p>
            </button>

            <button
              type="button"
              onClick={() => setVideoState('EDITADO')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                videoState === 'EDITADO'
                  ? 'border-violet-500/60 bg-violet-500/10 text-violet-300'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ya Editado</span>
              </div>
              <p className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                Para gancho y retención
              </p>
            </button>
          </div>

          {/* Action Button */}
          <button
            onClick={handleStartAnalysis}
            disabled={!selectedFile || isAnalyzing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{analyzingStep || 'Analizando...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Comenzar Auditoría</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Tab: URL */}
      {activeTab === 'url' && (
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-neutral-300">
              Enlace de TikTok, Reels o Shorts:
            </label>
            <div className="relative">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.tiktok.com/@usuario/video/..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-violet-500 transition-colors"
              />
              <Link className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            onClick={handleStartAnalysis}
            disabled={!urlInput.trim() || isAnalyzing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 disabled:opacity-40 transition-all flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>{analyzingStep || 'Conectando y analizando...'}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Analizar Enlace Social</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Tab: Samples */}
      {activeTab === 'samples' && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_VIDEOS.map((sample) => (
              <div
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className="group relative rounded-xl border border-neutral-800 bg-neutral-900/80 hover:border-violet-500/50 hover:bg-neutral-900 p-2.5 flex gap-2.5 cursor-pointer transition-all"
              >
                <div className={`relative ${sample.aspectRatio === '16:9' ? 'w-20 h-14' : 'w-14 h-18'} rounded-lg overflow-hidden shrink-0 bg-neutral-950 border border-neutral-800`}>
                  <img
                    src={sample.thumbnailUrl}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white/80" />
                  </div>
                </div>

                <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                  <div>
                    <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                      <span
                        className={`text-[8px] font-bold px-1 py-0.2 rounded ${
                          sample.type === 'CRUDO'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                        }`}
                      >
                        {sample.type === 'CRUDO' ? 'Crudo' : 'Editado'}
                      </span>
                      <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
                        {sample.aspectRatio === '16:9' ? '16:9' : '9:16'}
                      </span>
                    </div>
                    <h4 className="text-[11px] font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                      {sample.title}
                    </h4>
                  </div>
                  <div className="flex items-center text-[9px] font-semibold text-violet-400 gap-1">
                    <span>Auditar</span>
                    <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
