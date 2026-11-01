import React from 'react';
import { motion } from 'motion/react';

export const MarqueeBanners: React.FC = () => {
  const orangeText = "OPORTUNIDADES ÚNICAS • NOVIDADES TODA SEMANA • ATENDIMENTO NO WHATSAPP • SHOP SALDO TAIPAS • ";
  const blackText = "MODA • BOLSAS & MALAS • FERRAMENTAS • UTILIDADES • ELETRO • CASA & DECORAÇÃO • ";

  return (
    <div className="relative py-8 my-4 overflow-hidden select-none pointer-events-none w-full">
      {/* Faixa 1: Laranja inclinada com texto preto */}
      <div className="relative -rotate-2 transform scale-105 shadow-md z-10 bg-gradient-to-r from-[#FF6A00] via-[#FF9A3D] to-[#FF6A00] py-2.5 border-y border-black/20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
          }}
          className="flex whitespace-nowrap text-[#0B0B0C] font-black text-sm tracking-wider uppercase"
        >
          <span>{orangeText.repeat(6)}</span>
        </motion.div>
      </div>

      {/* Faixa 2: Preta inclinada no sentido oposto com texto branco e detalhes em laranja */}
      <div className="relative rotate-1.5 -mt-3.5 transform scale-105 shadow-xl bg-[#0B0B0C] py-2.5 border-y border-[#FF6A00]/40 z-20">
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className="flex whitespace-nowrap text-white font-bold text-xs sm:text-sm tracking-wider uppercase"
        >
          <span>{blackText.repeat(6)}</span>
        </motion.div>
      </div>
    </div>
  );
};
