import React from 'react';
import { X, MessageSquare, Bot } from 'lucide-react';
import { InteractiveChat } from './InteractiveChat';
import { ClipIQAnalysisResult } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: ClipIQAnalysisResult | null;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  analysisResult,
}) => {
  if (!isOpen || !analysisResult) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Asistente IA de Contenido</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-neutral-400">
                Pide variaciones de ganchos, ideas de títulos o adaptaciones a tu nicho
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Component Embed */}
        <div className="p-3 sm:p-4 flex-1 overflow-hidden bg-neutral-950/40">
          <InteractiveChat
            suggestions={analysisResult.sugerencias_chat_interactivo}
            analysisResult={analysisResult}
          />
        </div>
      </div>
    </div>
  );
};
