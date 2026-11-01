import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MapPin, Sparkles } from 'lucide-react';
import shopLogo from './assets/shop-saldo-mascote.webp';
import { STORE_DATA } from './storeData';

/**
 * Logo original enviado pela loja.
 * A arte inteira fica visível (sem cortes), com um aro de luz atrás e
 * movimento suave que respeita as preferências de acessibilidade.
 */
export const HeaderHero: React.FC = () => {
  const { scrollY } = useScroll();
  const logoScrollY = useTransform(scrollY, [0, 420], [0, 42]);

  return (
    <motion.header
      className="shop-hero-header relative flex flex-col items-center justify-center overflow-hidden px-4 pt-7 pb-8 text-center"
    >
      <div className="absolute inset-0 pointer-events-none bg-radial-orange-glow opacity-40" aria-hidden="true" />

      <motion.div
        className="shop-logo-stage relative flex w-full items-center justify-center"
        style={{ y: logoScrollY }}
      >
        <span className="shop-logo-orbit" aria-hidden="true" />
        <span className="shop-logo-orbit-secondary" aria-hidden="true" />
        <span className="shop-logo-sparkle shop-logo-sparkle-one" aria-hidden="true">✦</span>
        <span className="shop-logo-sparkle shop-logo-sparkle-two" aria-hidden="true">✦</span>

        <img
          src={shopLogo}
          alt="Logo oficial Shop Saldo: mascote com sacolas de compras e o nome Sua Loja de Oportunidades"
          className="shop-original-logo"
          width={720}
          height={360}
          loading="eager"
          fetchPriority="high"
          draggable={false}
        />
      </motion.div>

      <h1 className="sr-only">{STORE_DATA.name} — {STORE_DATA.slogan}</h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-1 text-base font-semibold tracking-wide text-[#FF9A3D] sm:text-lg"
      >
        Moda, utilidades e novidades para você
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 flex max-w-full flex-wrap items-center justify-center gap-2"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#17171A]/90 px-3.5 py-2 text-xs font-medium text-gray-200">
          <MapPin className="h-3.5 w-3.5 text-[#FF6A00]" aria-hidden="true" />
          {STORE_DATA.neighborhood} • São Paulo
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF6A00]/25 bg-[#FF6A00]/10 px-3.5 py-2 text-xs font-medium text-[#FFB16B]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          Novidades toda semana
        </span>
      </motion.div>
    </motion.header>
  );
};
