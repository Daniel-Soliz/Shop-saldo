import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import { STORE_DATA, openWhatsApp } from './storeData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

interface AiAssistantSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_PROMPTS = [
  "Qual o endereço da loja?",
  "Quais produtos têm na loja?",
  "Qual o horário de funcionamento?",
  "Como faço para falar com uma atendente?",
];

// GitHub Pages hospeda apenas arquivos estáticos: respostas informativas continuam
// disponíveis sem expor chaves ou depender de um servidor de IA.
function getLocalStoreReply(question: string): string {
  const text = question.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (/horario|funcionamento|abre|fecha|domingo|feriado/.test(text)) {
    return `Nosso horário é ${STORE_DATA.openingHours}. ${STORE_DATA.openingHoursNote}.`;
  }
  if (/endereco|onde|localiza|chegar|rota|bairro/.test(text)) {
    return `Estamos em ${STORE_DATA.fullAddress}. Você pode usar o botão de rotas do site para abrir o Google Maps.`;
  }
  if (/instagram|insta|rede social/.test(text)) {
    return `Nosso Instagram é ${STORE_DATA.instagramHandle}. Acompanhe por lá as novidades da Shop Saldo!`;
  }
  if (/contato|whatsapp|atendente|telefone|falar|numero|zap/.test(text)) {
    return `Fale com nossa equipe pelo WhatsApp ${STORE_DATA.phoneFormatted}. Use o botão abaixo para iniciar uma conversa.`;
  }
  if (/produto|vende|categoria|roupa|bolsa|ferrament|preco|valor|estoque|disponivel|entrega|comprar/.test(text)) {
    return `Trabalhamos com moda, bolsas, ferramentas, eletro, utilidades, casa e beleza. Como os lotes mudam, a equipe confirma fotos, preços e disponibilidade pelo WhatsApp ${STORE_DATA.phoneFormatted}.`;
  }
  return `Posso ajudar com endereço, horário, categorias de produtos e contato da Shop Saldo. Para outras dúvidas, fale com nossa equipe pelo WhatsApp ${STORE_DATA.phoneFormatted}.`;
}

export const AiAssistantSheet: React.FC<AiAssistantSheetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Olá! Sou a assistente virtual da Shop Saldo Taipas. Como posso ajudar você hoje com informações sobre nossa loja?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // No GitHub Pages não há API /api/chat. Use as respostas locais da loja.
      let replyText = getLocalStoreReply(query);
      if (!window.location.hostname.endsWith('.github.io')) {
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: query }),
          });
          if (res.ok) {
            const data = await res.json();
            replyText = data?.reply || replyText;
          }
        } catch {
          // Mantém respostas locais caso o servidor esteja indisponível.
        }
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "Tivemos uma instabilidade momentânea na conexão, mas nossa equipe humana está pronta para te atender agora mesmo no WhatsApp da loja!",
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueOnWhatsApp = () => {
    const lastUserQuery = [...messages].reverse().find((m) => m.sender === 'user')?.text;
    const msg = lastUserQuery
      ? `Olá! Estava tirando dúvidas no site da Shop Saldo sobre: "${lastUserQuery}" e gostaria de continuar o atendimento com vocês!`
      : "Olá! Vim pela assistente da Shop Saldo e quero tirar dúvidas sobre os produtos da loja.";
    openWhatsApp(msg);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-[480px] bg-[#17171A] border-t sm:border border-white/10 rounded-t-[32px] sm:rounded-[32px] max-h-[85vh] flex flex-col shadow-2xl z-10 overflow-hidden"
          >
            {/* Barra de arrasto no topo para mobile */}
            <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

            {/* Cabeçalho */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#FF6A00] p-0.5 bg-gradient-to-tr from-[#E24E00] to-[#FF6A00]">
                  <span className="absolute inset-0 flex items-center justify-center text-white font-black text-lg">S.</span>
                  <img
                    src={STORE_DATA.mascotImage}
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                    alt="Assistente Shop Saldo"
                    className="relative z-10 w-full h-full object-cover object-[78%_42%] rounded-full"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      Assistente Shop Saldo
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
                  </div>
                  <p className="text-[11px] text-gray-400">
                    Tire dúvidas rápidas sobre a loja
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="cursor-pointer w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar assistente"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Área de Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar min-h-[240px] max-h-[380px]">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#FF6A00] text-white rounded-tr-none font-medium'
                        : 'bg-[#0B0B0C] border border-white/10 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0B0B0C] border border-white/10 text-gray-300 p-3 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#FF6A00]" />
                    <span>Consultando informações da loja...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Perguntas Rápidas */}
            <div className="px-4 py-2 bg-[#0B0B0C]/40 border-t border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="cursor-pointer shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Botão de Transição para o WhatsApp */}
            <div className="px-4 py-2 bg-gradient-to-r from-[#FF6A00]/10 to-transparent border-t border-[#FF6A00]/20 flex items-center justify-between">
              <span className="text-[11px] text-gray-300 font-medium">
                Prefere atendimento humano com fotos?
              </span>
              <button
                onClick={handleContinueOnWhatsApp}
                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
                <span>Ir para o Zap</span>
              </button>
            </div>

            {/* Input de Envio */}
            <div className="p-3 bg-[#0B0B0C] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte sobre produtos, endereço ou ofertas..."
                disabled={isLoading}
                className="flex-1 bg-[#17171A] border border-white/10 focus:border-[#FF6A00] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 outline-none transition-colors"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="cursor-pointer w-10 h-10 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] disabled:opacity-40 disabled:hover:bg-[#FF6A00] text-white flex items-center justify-center shrink-0 transition-colors"
                aria-label="Enviar mensagem"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
