import React from 'react';
import {
  BarChart3,
  Smartphone,
  Zap,
  Download,
  MessageSquare,
} from 'lucide-react';

export type MainTabType = 'dashboard' | 'video';

interface BottomNavBarProps {
  activeTab: MainTabType;
  onChangeTab: (tab: MainTabType) => void;
  onOpenReplication: () => void;
  onOpenDownload: () => void;
  onOpenChat: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onChangeTab,
  onOpenReplication,
  onOpenDownload,
  onOpenChat,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/90 backdrop-blur-xl border-t border-neutral-800/80 px-2 py-1.5 md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around">
        <button
          onClick={() => onChangeTab('dashboard')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'dashboard'
              ? 'text-violet-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="text-[10px]">Análisis</span>
        </button>

        <button
          onClick={() => onChangeTab('video')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'video'
              ? 'text-violet-400 font-bold'
              : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          <Smartphone className="w-5 h-5" />
          <span className="text-[10px]">Video</span>
        </button>

        <button
          onClick={onOpenReplication}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-violet-400 hover:text-violet-300 font-bold transition-all"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span className="text-[10px]">Replicar</span>
        </button>

        <button
          onClick={onOpenDownload}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-emerald-400 hover:text-emerald-300 font-bold transition-all"
        >
          <Download className="w-5 h-5" />
          <span className="text-[10px]">Descargar</span>
        </button>

        <button
          onClick={onOpenChat}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-neutral-400 hover:text-white transition-all"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Chat</span>
        </button>
      </div>
    </div>
  );
};
