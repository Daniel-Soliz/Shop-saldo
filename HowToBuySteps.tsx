import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, MessageCircle, Store, CheckCircle2, Users } from 'lucide-react';
import { STORE_DATA, openWhatsApp, openWhatsAppGroup } from '../data/storeData';

const stepIcons = [
  Smartphone,
  MessageCircle,
  Store,
];

export const HowToBuySteps: React.FC = () => {
  return (
    <section className="py-8 px-4 w-full max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center mb-6"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00] block mb-1">
          Simples & Sem Burocracia
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Como comprar em 3 passos
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Do story do Instagram para a sua mão em poucos minutos
        </p>
      </motion.div>

      <div className="relative pl-6 sm:pl-8">
        {/* Linha vertical que conecta os passos */}
        <div className="absolute left-3 sm:left-4 top-4 bottom-8 w-0.5 bg-gradient-to-b from-[#FF6A00] via-[#FF9A3D] to-white/20" />

        <div className="flex flex-col gap-6">
          {STORE_DATA.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || CheckCircle2;

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="relative flex items-start gap-3.5 group"
              >
                {/* Marcador Numerado no Trilho */}
                <div className="absolute -left-6 sm:-left-8 top-0 w-6.5 h-6.5 rounded-full bg-[#0B0B0C] border-2 border-[#FF6A00] text-[#FF6A00] flex items-center justify-center text-xs font-black shrink-0 shadow-[0_0_12px_rgba(255,106,0,0.4)] group-hover:bg-[#FF6A00] group-hover:text-white transition-colors">
                  {step.step}
                </div>

                {/* Cartão de Conteúdo */}
                <div className="flex-1 p-4 rounded-[22px] bg-[#17171A] border border-white/10 group-hover:border-[#FF6A00]/40 transition-colors shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="w-4 h-4 text-[#FF6A00]" />
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {step.desc}
                  </p>

                  {idx === 0 && (
                    <button
                      onClick={openWhatsAppGroup}
                      className="cursor-pointer mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF6A00] hover:bg-[#E24E00] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Entrar no Grupo VIP</span>
                    </button>
                  )}

                  {idx === 1 && (
                    <button
                      onClick={() => openWhatsApp("Olá! Quero tirar uma dúvida sobre os produtos da Shop Saldo.")}
                      className="cursor-pointer mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-bold transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Falar no Zap {STORE_DATA.phoneFormatted}</span>
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
