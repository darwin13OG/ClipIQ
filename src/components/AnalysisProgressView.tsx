import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Film,
  Zap,
  Volume2,
  TrendingUp,
  Loader2,
} from 'lucide-react';

interface AnalysisProgressViewProps {
  videoTitle?: string;
  thumbnailUrl?: string;
  aspectRatio?: '9:16' | '16:9';
  stepMessage?: string;
  progressPercent?: number;
}

interface StepItem {
  id: number;
  label: string;
  threshold: number;
  icon: React.ElementType;
}

const MINIMAL_STEPS: StepItem[] = [
  {
    id: 1,
    label: 'Fotogramas y formato',
    threshold: 25,
    icon: Film,
  },
  {
    id: 2,
    label: 'Gancho visual (0-3s)',
    threshold: 50,
    icon: Zap,
  },
  {
    id: 3,
    label: 'Ritmo y audio',
    threshold: 75,
    icon: Volume2,
  },
  {
    id: 4,
    label: 'Proyección predictiva',
    threshold: 95,
    icon: TrendingUp,
  },
];

export const AnalysisProgressView: React.FC<AnalysisProgressViewProps> = ({
  videoTitle,
  thumbnailUrl,
  aspectRatio = '9:16',
  stepMessage,
  progressPercent,
}) => {
  const [internalPercent, setInternalPercent] = useState(progressPercent ?? 15);

  useEffect(() => {
    if (progressPercent !== undefined) {
      setInternalPercent(progressPercent);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      let target = 15;
      if (elapsed < 800) {
        target = 15 + (elapsed / 800) * 30; // 15 -> 45
      } else if (elapsed < 1800) {
        target = 45 + ((elapsed - 800) / 1000) * 35; // 45 -> 80
      } else if (elapsed < 3000) {
        target = 80 + ((elapsed - 1800) / 1200) * 14; // 80 -> 94
      } else {
        const extraSecs = (elapsed - 3000) / 1000;
        target = Math.min(99, 94 + extraSecs * 1.2);
      }

      setInternalPercent((prev) => {
        if (target > prev) {
          return Math.round(target);
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [progressPercent]);

  const activePercent = Math.min(100, Math.max(0, Math.round(progressPercent !== undefined ? progressPercent : internalPercent)));
  const isComplete = activePercent >= 100;

  return (
    <div className="w-full max-w-lg mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
      {/* Header with Title & Percentage */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-violet-400">
            {isComplete ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <Loader2 className="w-5 h-5 animate-spin text-violet-400" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white truncate max-w-[220px] sm:max-w-xs">
              {videoTitle || 'Procesando video'}
            </h3>
            <p className="text-[11px] text-neutral-400">
              {isComplete ? 'Auditoría lista' : 'Analizando contenido y retención'}
            </p>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-2xl font-black text-white">{activePercent}%</span>
        </div>
      </div>

      {/* Minimalist Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-violet-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${activePercent}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-neutral-500">
          <span className="truncate max-w-[280px]">
            {stepMessage || (isComplete ? 'Finalizado' : 'Extrayendo métricas...')}
          </span>
          <span className="shrink-0 font-mono">
            {aspectRatio === '16:9' ? '16:9' : '9:16'}
          </span>
        </div>
      </div>

      {/* Minimalist 4 Steps List */}
      <div className="space-y-2 pt-1 border-t border-neutral-800/60">
        {MINIMAL_STEPS.map((step) => {
          const isDone = activePercent >= step.threshold;
          const isCurrent = !isDone && activePercent >= step.threshold - 25;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-colors ${
                isDone
                  ? 'bg-neutral-950/60 text-neutral-300'
                  : isCurrent
                  ? 'bg-neutral-800/80 text-white'
                  : 'text-neutral-500'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-400' : isCurrent ? 'text-violet-400' : 'text-neutral-600'}`} />
                <span className="text-xs font-medium">{step.label}</span>
              </div>

              <div>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
