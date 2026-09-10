import React from 'react';
import {
  BarChart3,
  Zap,
  Download,
  MessageSquare,
} from 'lucide-react';

interface BottomNavBarProps {
  onScrollToTop: () => void;
  onOpenReplication: () => void;
  onOpenDownload: () => void;
  onOpenChat: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  onScrollToTop,
  onOpenReplication,
  onOpenDownload,
  onOpenChat,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-1 pointer-events-none md:hidden">
      <nav className="max-w-md mx-auto pointer-events-auto bg-neutral-900/95 backdrop-blur-2xl border border-neutral-800 shadow-2xl rounded-2xl p-1.5 flex items-center justify-around gap-1.5">
        {/* Auditoría */}
        <button
          onClick={onScrollToTop}
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 active:scale-95 transition-all"
        >
          <BarChart3 className="w-4 h-4 text-violet-400 mb-1" />
          <span className="text-[10px] font-semibold tracking-wide whitespace-nowrap">Reporte</span>
        </button>

        {/* Replicar */}
        <button
          onClick={onOpenReplication}
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 active:scale-95 transition-all"
        >
          <Zap className="w-4 h-4 text-amber-400 fill-current mb-1" />
          <span className="text-[10px] font-semibold tracking-wide whitespace-nowrap">Replicar</span>
        </button>

        {/* Descargar (Destacado) */}
        <button
          onClick={onOpenDownload}
          className="flex-1 flex flex-col items-center justify-center py-2 px-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 active:scale-95 transition-all shadow-sm"
        >
          <Download className="w-4 h-4 text-emerald-400 mb-1" />
          <span className="text-[10px] font-bold tracking-wide whitespace-nowrap">Descargar</span>
        </button>

        {/* Chat IA */}
        <button
          onClick={onOpenChat}
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/60 active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-cyan-400 mb-1" />
          <span className="text-[10px] font-semibold tracking-wide whitespace-nowrap">Chat IA</span>
        </button>
      </nav>
    </div>
  );
};
