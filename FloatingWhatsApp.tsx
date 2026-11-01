import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp, Sparkles } from 'lucide-react';
import { openWhatsAppGroup } from './storeData';

interface FloatingWhatsAppProps {
  onOpenAiChat: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenAiChat }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 220);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    openWhatsAppGroup();
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-2.5">
          {/* Botão sutil de Assistente de IA */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={onOpenAiChat}
            className="cursor-pointer group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17171A]/90 hover:bg-[#1f1f24] text-xs font-bold text-white border border-[#FF6A00]/50 shadow-lg backdrop-blur-md transition-all active:scale-95"
            aria-label="Abrir assistente virtual da Shop Saldo"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF6A00] animate-spin-slow" />
            <span>Dúvidas? Ajuda rápida</span>
          </motion.button>

          <div className="flex items-center gap-2">
            {/* Botão Voltar ao Topo */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              className="cursor-pointer w-10 h-10 rounded-full bg-[#17171A]/85 border border-white/10 text-white flex items-center justify-center shadow-md backdrop-blur-sm hover:bg-[#17171A] hover:border-white/30 transition-all active:scale-90"
              aria-label="Voltar ao topo da página"
            >
              <ArrowUp className="w-4 h-4 text-gray-300" />
            </motion.button>

            {/* Botão Flutuante do WhatsApp com Pulso */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileTap={{ scale: 0.92 }}
              onClick={handleWhatsApp}
              className="cursor-pointer relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#E24E00] to-[#FF6A00] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(255,106,0,0.5)] border-2 border-white/20 group"
              aria-label="Chamar equipe no WhatsApp"
            >
              {/* Anel de pulso contínuo */}
              <span className="absolute -inset-1 rounded-full bg-[#FF6A00] opacity-40 animate-ping pointer-events-none" />

              <MessageCircle className="w-7 h-7 fill-white/20 group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
