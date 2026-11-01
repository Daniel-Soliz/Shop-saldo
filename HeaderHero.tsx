import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Sparkles } from 'lucide-react';
import { STORE_DATA } from '../data/storeData';

export const HeaderHero: React.FC = () => {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0.45]);
  const heroScale = useTransform(scrollY, [0, 320], [1, 0.94]);
  const heroY = useTransform(scrollY, [0, 320], [0, 40]);

  const brandTitle = STORE_DATA.name.split("");

  return (
    <motion.header
      style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      className="relative pt-8 pb-6 px-4 flex flex-col items-center text-center overflow-hidden"
    >
      {/* Glow laranja radial pulsante de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-radial-orange-intense blur-2xl opacity-60 pointer-events-none animate-pulse" />

      {/* Partículas sutis flutuantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 left-8 w-1.5 h-1.5 rounded-full bg-[#FF9A3D] opacity-40 animate-ping" />
        <div className="absolute top-28 right-10 w-2 h-2 rounded-full bg-[#FF6A00] opacity-50 animate-bounce" />
        <div className="absolute top-44 left-14 w-1 h-1 rounded-full bg-white opacity-30 animate-pulse" />
        <div className="absolute bottom-10 right-16 w-1.5 h-1.5 rounded-full bg-[#FF6A00] opacity-40" />
      </div>

      {/* Container do Mascote / Logo */}
      <div className="relative mb-5 flex items-center justify-center">
        {/* Anel animado estilo Instagram Story */}
        <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#E24E00] via-[#FF6A00] to-[#FF9A3D] shadow-[0_0_25px_rgba(255,106,0,0.5)]">
          <div className="p-0.5 rounded-full bg-[#0B0B0C]">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/20 shadow-inner bg-gradient-to-b from-[#FF6A00]/20 to-black"
            >
              {/* Imagem do mascote centralizada na personagem */}
              <img
                src={STORE_DATA.mascotImage}
                alt="Mascote Shop Saldo - Loja de Oportunidades"
                className="w-full h-full object-cover object-[78%_42%] select-none pointer-events-none transition-transform duration-500 hover:scale-110"
                loading="eager"
              />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
            </motion.div>
          </div>
        </div>

        {/* Selo circular girando ao lado do mascote */}
        <div className="absolute -top-3 -right-4 w-18 h-18 pointer-events-none select-none">
          <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <circle cx="50" cy="50" r="37" fill="#17171A" stroke="#FF6A00" strokeWidth="1.5" />
            <text fill="#FFFFFF" fontSize="8.5" fontWeight="800" letterSpacing="2.5">
              <textPath href="#circlePath" startOffset="0%">
                • NOVIDADES • OPORTUNIDADES •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-[#FF6A00] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Nome SHOP SALDO em branco, bold, com animação letra por letra */}
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-center justify-center drop-shadow-md">
        {brandTitle.map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.04 + 0.1,
              ease: "easeOut"
            }}
            className={char === " " ? "w-2.5" : "inline-block"}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      {/* Slogan em Laranja Vibrante */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="text-[#FF6A00] font-semibold text-lg sm:text-xl mt-1 tracking-wide"
      >
        {STORE_DATA.slogan}
      </motion.p>

      {/* Linha de status: Taipas • São Paulo e Novidades toda semana */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17171A]/90 border border-white/10 text-xs sm:text-sm text-gray-300 shadow-sm"
      >
        <span className="flex items-center gap-1 text-gray-200 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#FF6A00]" />
          {STORE_DATA.neighborhood} • SP
        </span>
        <span className="text-gray-600">•</span>
        <span className="flex items-center gap-1.5 text-white font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6A00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6A00]"></span>
          </span>
          Novidades toda semana
        </span>
      </motion.div>
    </motion.header>
  );
};
