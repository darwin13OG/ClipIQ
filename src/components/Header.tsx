import React, { useState, useEffect } from 'react';
import { Share2, Plus, Download, Smartphone } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onNewAnalysis?: () => void;
  onOpenExport?: () => void;
  hasResult?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewAnalysis,
  onOpenExport,
  hasResult,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('Para instalar ClipIQ en tu dispositivo: abre el menú de tu navegador y selecciona "Agregar a la pantalla de inicio" o "Instalar aplicación".');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800/80 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand with New Modern Logo */}
        <div className="cursor-pointer" onClick={onNewAnalysis}>
          <BrandLogo size="md" />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* PWA Install Button */}
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              title="Instalar ClipIQ en tu móvil o PC (PWA)"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors"
            >
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Instalar App</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/10 text-cyan-300 font-mono">PWA</span>
            </button>
          )}

          {hasResult && (
            <>
              <button
                onClick={onNewAnalysis}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-violet-400" />
                <span>Nuevo Video</span>
              </button>

              {onOpenExport && (
                <button
                  onClick={onOpenExport}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600 text-white shadow-md shadow-violet-600/20 hover:opacity-95 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Reporte</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

