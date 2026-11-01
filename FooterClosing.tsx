import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Instagram, Heart } from 'lucide-react';
import { STORE_DATA, openWhatsApp, openWhatsAppGroup } from './storeData';

export const FooterClosing: React.FC = () => {
  return (
    <footer className="pt-8 pb-16 px-4 w-full max-w-[480px] mx-auto text-center">
      {/* Bloco de fechamento com mascote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-[28px] bg-gradient-to-b from-[#17171A] to-[#0B0B0C] border border-[#FF6A00]/30 p-6 relative overflow-hidden shadow-2xl"
      >
        {/* Glow de fundo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#FF6A00]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-[#FF6A00] shadow-[0_0_20px_rgba(255,106,0,0.4)] mb-3 bg-[#FF6A00]/10">
            <span className="absolute w-16 h-16 flex items-center justify-center text-[#FF6A00] text-3xl font-black">S.</span>
            <img
              src={STORE_DATA.mascotImage}
              onError={(event) => { event.currentTarget.style.display = "none"; }}
              alt="Mascote Shop Saldo"
              className="w-full h-full object-cover object-[78%_42%]"
            />
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight">
            Bora conferir as novidades?
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xs mt-1 leading-relaxed">
            Nossos lotes esgotam rápido. Entre no grupo oficial do WhatsApp ou acompanhe os stories no Instagram.
          </p>

          <div className="shop-footer-actions w-full flex flex-col gap-2.5 mt-5">
            <button
              onClick={openWhatsAppGroup}
              className="cursor-pointer w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6A00] to-[#E24E00] hover:brightness-105 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(255,106,0,0.35)] active:scale-98 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Entrar no Grupo VIP do WhatsApp</span>
            </button>

            <a
              href={STORE_DATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#FF9A3D]" />
              <span>Seguir no Instagram {STORE_DATA.instagramHandle}</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Rodapé discreto */}
      <div className="mt-8 flex flex-col items-center gap-1.5 text-xs text-gray-500">
        <p className="font-semibold text-gray-400">
          © 2026 {STORE_DATA.name} – {STORE_DATA.neighborhood}, São Paulo
        </p>
        <p className="flex items-center gap-1 text-[11px] text-gray-500">
          Feito com <Heart className="w-3 h-3 text-[#FF6A00] fill-[#FF6A00]" /> para a comunidade de Taipas
        </p>
      </div>
    </footer>
  );
};
