import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Users, ShoppingBag, Instagram, Navigation, Share2, ArrowRight, Phone } from 'lucide-react';
import { STORE_DATA, openWhatsApp, openWhatsAppGroup } from './storeData';

interface MainActionButtonsProps {
  onShareClick: () => void;
}

export const MainActionButtons: React.FC<MainActionButtonsProps> = ({ onShareClick }) => {
  const handleVibrate = () => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(20);
      } catch {
        // ignore
      }
    }
  };

  // 1. Abre diretamente o grupo oficial do WhatsApp solicitado
  const handleWhatsAppGroup = () => {
    handleVibrate();
    openWhatsAppGroup();
  };

  // 2. Abre conversa direta no WhatsApp com o número da loja (11) 97098-8133
  const handleDirectWhatsApp = () => {
    handleVibrate();
    openWhatsApp("Olá! Vim pelo Instagram da Shop Saldo e gostaria de falar com um atendente.");
  };

  const handleScrollToCategories = () => {
    handleVibrate();
    const el = document.getElementById('categorias');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInstagram = () => {
    handleVibrate();
    window.open(STORE_DATA.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirections = () => {
    handleVibrate();
    window.open(STORE_DATA.googleMapsRouteUrl, '_blank', 'noopener,noreferrer');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" as const } },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="show"
      aria-label="Links principais"
      className="px-4 py-2 flex flex-col gap-3.5 w-full max-w-[480px] mx-auto z-10"
    >
      {/* 1. Entrar no Grupo do WhatsApp (Botão Laranja Sólido Maior com Pulso e Shine) */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        onClick={handleWhatsAppGroup}
        className="relative group min-h-[72px] w-full p-4 rounded-[22px] bg-gradient-to-r from-[#FF6A00] to-[#E24E00] text-white flex items-center justify-between shadow-[0_10px_25px_-5px_rgba(255,106,0,0.45)] border border-[#FF9A3D]/30 overflow-hidden cursor-pointer"
      >
        {/* Efeito de brilho que passa a cada poucos segundos */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shine" />
        </div>

        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            <Users className="w-7 h-7 text-white" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white">Entrar no Grupo WhatsApp</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-black/35 text-white px-2 py-0.5 rounded-full">
                VIP
              </span>
            </div>
            <p className="text-white/85 text-xs sm:text-sm font-medium">Receba novidades e lotes em 1ª mão</p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform relative z-10">
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.button>

      {/* 2. Falar com Atendente no WhatsApp (11 97098-8133) */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        onClick={handleDirectWhatsApp}
        className="relative group min-h-[64px] w-full p-4 rounded-[22px] bg-white text-[#0B0B0C] flex items-center justify-between shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6 text-[#25D366] fill-[#25D366]/20" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-base sm:text-lg tracking-tight text-[#0B0B0C]">Falar com Atendente</h2>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                Online
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-semibold">{STORE_DATA.phoneFormatted} • Tire dúvidas</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#0B0B0C] shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.button>

      {/* 3. Seguir no Instagram (@shopsaldo.taipas) */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        onClick={handleInstagram}
        className="relative group min-h-[64px] w-full p-4 rounded-[22px] bg-[#17171A] text-white flex items-center justify-between shadow-md border-2 border-[#FF6A00]/80 overflow-hidden cursor-pointer hover:border-[#FF6A00] hover:bg-[#1a1a1f] transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#E24E00] to-[#FF6A00] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Instagram className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-base sm:text-lg tracking-tight text-white">Seguir no Instagram</h2>
            <p className="text-[#FF9A3D] text-xs sm:text-sm font-medium">{STORE_DATA.instagramHandle}</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4 text-[#FF9A3D]" />
        </div>
      </motion.button>

      {/* 4. Ver Departamentos e Categorias */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        onClick={handleScrollToCategories}
        className="relative group min-h-[64px] w-full p-4 rounded-[22px] bg-[#17171A] text-white flex items-center justify-between shadow-md border border-white/10 overflow-hidden cursor-pointer hover:border-white/20 transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#FF6A00]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-6 h-6 text-[#FF6A00]" />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-base sm:text-lg tracking-tight text-white">Ver departamentos da loja</h2>
            <p className="text-gray-400 text-xs sm:text-sm font-medium">Moda, ferramentas, utilidades, malas e mais</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.button>

      {/* 5. Como chegar na loja (Branco) */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        onClick={handleDirections}
        className="relative group min-h-[64px] w-full p-4 rounded-[22px] bg-white text-[#0B0B0C] flex items-center justify-between shadow-lg border border-gray-200 overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#0B0B0C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Navigation className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-base sm:text-lg tracking-tight text-[#0B0B0C]">Como chegar na loja</h2>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">Av. Dep. Cantídio Sampaio, 5985 • Taipas</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[#0B0B0C] shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.button>

      {/* 6. Compartilhar com um amigo (Borda branca translúcida) */}
      <motion.button
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        onClick={onShareClick}
        className="relative group min-h-[64px] w-full p-4 rounded-[22px] bg-[#17171A]/70 text-white flex items-center justify-between shadow-sm border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 hover:bg-[#17171A] transition-all"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Share2 className="w-5 h-5 text-gray-200" />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-base sm:text-lg tracking-tight text-white">Compartilhar com um amigo</h2>
            <p className="text-gray-400 text-xs sm:text-sm font-medium">Envie o link para quem mora em Taipas</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-300 shrink-0 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-4 h-4" />
        </div>
      </motion.button>
    </motion.nav>
  );
};
