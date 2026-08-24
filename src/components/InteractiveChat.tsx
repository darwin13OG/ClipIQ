import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  Zap,
  MessageSquare,
} from 'lucide-react';
import { ChatMessage, ClipIQAnalysisResult } from '../types';

interface InteractiveChatProps {
  suggestions?: string[];
  analysisResult: ClipIQAnalysisResult | null;
}

export const InteractiveChat: React.FC<InteractiveChatProps> = ({
  suggestions = [],
  analysisResult,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: '¡Hola! Soy **ClipIQ Engine v2.0**.\n\nPuedo ayudarte con:\n- **Ganchos virales (0-3s)** alternativos de alto impacto\n- **Títulos optimizados para CTR**\n- **Estructura y ritmo** para evitar fugas de audiencia\n- **Adaptaciones** para tu nicho específico\n\n¿Qué te gustaría optimizar?',
      timestamp: 'Ahora',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText.trim();
    if (!query || isSending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputText('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          analysisResult,
        }),
      });

      const data = await response.json();
      const botReply = data.reply || 'Aquí tienes las recomendaciones de ClipIQ.';

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'Hubo un inconveniente al conectar con el servidor. Te sugiero revisar que el gancho de 0-3 segundos tenga una pregunta o dolor concreto y que cortes los silencios antes del primer segundo.',
          timestamp: 'Ahora',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-3xl p-3.5 sm:p-5 shadow-xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-600/30">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white">ClipIQ Chat Inteligente</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-neutral-400">Asistente viral contextual</p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome-reset',
                sender: 'assistant',
                text: 'Chat reiniciado. ¿Qué otra duda o adaptación necesitas para este video?',
                timestamp: 'Ahora',
              },
            ])
          }
          className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          title="Reiniciar conversación"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-3.5 space-y-3 pr-1 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`relative max-w-[90%] sm:max-w-[82%] rounded-2xl p-3 sm:p-3.5 ${
                msg.sender === 'user'
                  ? 'bg-violet-600 text-white rounded-br-sm shadow-md font-medium'
                  : 'bg-neutral-950/95 border border-neutral-800 text-neutral-200 rounded-bl-sm space-y-1'
              }`}
            >
              {msg.sender === 'user' ? (
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.text}
                </div>
              ) : (
                <div className="markdown-body text-neutral-200 text-xs leading-relaxed space-y-2 [&_p]:leading-relaxed [&_strong]:text-violet-300 [&_strong]:font-bold [&_h1]:text-sm [&_h1]:font-bold [&_h1]:text-white [&_h2]:text-xs [&_h2]:font-bold [&_h2]:text-white [&_h3]:text-xs [&_h3]:font-bold [&_h3]:text-violet-200 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-4 [&_ol]:space-y-1 [&_li]:leading-snug [&_code]:bg-neutral-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-cyan-300 [&_code]:font-mono [&_code]:text-[11px] [&_blockquote]:border-l-2 [&_blockquote]:border-violet-500 [&_blockquote]:pl-2.5 [&_blockquote]:italic [&_blockquote]:text-neutral-400">
                  <Markdown>{msg.text}</Markdown>
                </div>
              )}

              {msg.sender === 'assistant' && (
                <div className="flex items-center justify-between pt-1.5 mt-2 border-t border-neutral-800/80 text-[10px] text-neutral-500">
                  <span className="font-mono text-neutral-400">ClipIQ AI</span>
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="flex items-center gap-1 hover:text-violet-300 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isSending && (
          <div className="flex items-center gap-2 text-neutral-400 text-xs py-2 pl-9">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[11px]">ClipIQ Engine está pensando...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Chips */}
      {suggestions && suggestions.length > 0 && (
        <div className="pt-2 pb-2 border-t border-neutral-800 shrink-0">
          <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Acciones Rápidas:</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {suggestions.map((sug, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sug)}
                disabled={isSending}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-violet-500/50 hover:bg-neutral-800 text-[11px] text-neutral-300 transition-all shrink-0 text-left"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center gap-2 pt-2 border-t border-neutral-800 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Escribe tu consulta o pide otro gancho viral..."
          className="flex-1 px-3.5 py-2.5 text-xs bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-violet-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className={`p-2.5 rounded-xl text-white transition-all ${
            !inputText.trim() || isSending
              ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              : 'bg-violet-600 hover:bg-violet-500 shadow-md shadow-violet-600/30 active:scale-95'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
