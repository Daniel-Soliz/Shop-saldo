import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Copy } from 'lucide-react';

interface ShareToastProps {
  show: boolean;
  message: string;
}

export const ShareToast: React.FC<ShareToastProps> = ({ show, message }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#17171A] border border-[#FF6A00] text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold backdrop-blur-md"
        >
          <CheckCircle2 className="w-4 h-4 text-[#FF6A00]" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export async function sharePage(onCopied: (msg: string) => void) {
  const shareData = {
    title: 'Shop Saldo | Loja de Oportunidades – Taipas, SP',
    text: 'Dá uma olhada nas ofertas e achadinhos da semana na Shop Saldo Taipas! Preço baixo de verdade:',
    url: window.location.href,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err: any) {
      if (err.name === 'AbortError') return;
    }
  }

  // Fallback para cópia
  try {
    await navigator.clipboard.writeText(window.location.href);
    onCopied('Link copiado com sucesso! Mande no WhatsApp.');
  } catch {
    onCopied('Link da Shop Saldo copiado!');
  }
}
