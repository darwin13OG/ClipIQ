import React, { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto z-50 flex items-center justify-between sm:justify-start gap-2.5 rounded-xl bg-amber-500/95 text-neutral-950 font-semibold px-4 py-2.5 text-xs shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 text-neutral-950 shrink-0 animate-pulse" />
        <span>Modo sin conexión — Auditoría local activa</span>
      </div>
      <span className="text-[10px] bg-neutral-950/20 px-2 py-0.5 rounded-full font-mono">
        PWA Offline
      </span>
    </div>
  );
};
