import React, { useState, useEffect } from 'react';
import { Plus, Smartphone, X, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  onNewAnalysis?: () => void;
  hasResult?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onNewAnalysis,
  hasResult,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);

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
      setShowInstallGuide(true);
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
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* PWA Install Button */}
          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              title="Instalar ClipIQ como app nativa (PWA)"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-xl bg-violet-600/15 hover:bg-violet-600/25 text-violet-300 border border-violet-500/30 shadow-sm shadow-violet-600/10 transition-all active:scale-95 shrink-0"
            >
              <Smartphone className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span>Instalar</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/25 text-violet-200 font-mono font-bold">App</span>
            </button>
          )}

          {hasResult && (
            <button
              onClick={onNewAnalysis}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/25 transition-all active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nuevo Análisis</span>
            </button>
          )}
        </div>
      </div>

      {/* PWA Install Guide Modal without alert() */}
      {showInstallGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Instalar ClipIQ</h4>
              </div>
              <button
                onClick={() => setShowInstallGuide(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-neutral-300">
              <p className="font-medium text-white">Para tener ClipIQ como app nativa:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-neutral-400">
                <li>Abre el menú de tu navegador (⋮ en Chrome o compartir ⎋ en Safari).</li>
                <li>Selecciona <strong className="text-white">"Agregar a la pantalla de inicio"</strong> o <strong className="text-white">"Instalar aplicación"</strong>.</li>
                <li>¡Listo! Podrás abrir ClipIQ directamente sin abrir el navegador.</li>
              </ol>
            </div>
            <button
              onClick={() => setShowInstallGuide(false)}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


