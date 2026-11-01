import React from 'react';
import { motion } from 'motion/react';
import { TrendingDown, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { STORE_DATA } from './storeData';

export const WhyShopSaldo: React.FC = () => {
  return (
    <section className="relative my-8 text-[#0B0B0C] overflow-hidden">
      {/* Divisor superior em onda SVG */}
      <div className="w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#FF6A00]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Conteúdo com Fundo Laranja Vibrante */}
      <div className="bg-[#FF6A00] py-8 px-4">
        <div className="shop-benefits-inner max-w-[480px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/15 text-[#0B0B0C] font-extrabold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Por que a Shop Saldo?
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B0B0C] tracking-tight">
              Oportunidades em Taipas
            </h2>
            <p className="text-[#0B0B0C]/80 text-xs sm:text-sm font-medium mt-1">
              Variedade, lotes exclusivos e atendimento rápido no seu bairro
            </p>
          </motion.div>

          {/* 3 Itens de Destaque com Métricas */}
          <div className="shop-benefits-grid flex flex-col gap-3.5">
            {/* Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-[22px] p-4 flex items-center gap-4 shadow-lg border border-black/5"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#0B0B0C] text-[#FF6A00] flex items-center justify-center shrink-0">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#0B0B0C]">
                    Grandes Oportunidades
                  </h3>
                  <span className="text-xs font-black text-[#FF6A00] bg-orange-100 px-2 py-0.5 rounded-full">
                    Exclusivo
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                  Produtos selecionados com oportunidades únicas para você aproveitar direto na loja.
                </p>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white rounded-[22px] p-4 flex items-center gap-4 shadow-lg border border-black/5"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#0B0B0C] text-[#FF9A3D] flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#0B0B0C]">
                    Novidades toda semana
                  </h3>
                  <span className="text-xs font-black text-[#FF6A00] bg-orange-100 px-2 py-0.5 rounded-full">
                    Lotes Novos
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                  Lotes novos e variedade de itens chegando toda semana para você conferir.
                </p>
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-[22px] p-4 flex items-center gap-4 shadow-lg border border-black/5"
            >
              <div className="w-13 h-13 rounded-2xl bg-[#0B0B0C] text-[#FF6A00] flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm sm:text-base text-[#0B0B0C]">
                    Atendimento rápido no Zap
                  </h3>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Pelo WhatsApp
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                  Tire fotos em tempo real, tire dúvidas e reserve itens antes de ir até a loja.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Divisor inferior em onda SVG */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-8 sm:h-12 text-[#FF6A00]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
};
