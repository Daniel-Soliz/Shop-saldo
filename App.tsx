/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HeaderHero } from './components/HeaderHero';
import { MainActionButtons } from './components/MainActionButtons';
import { MarqueeBanners } from './components/MarqueeBanners';
import { CategoryGrid } from './components/CategoryGrid';
import { WhyShopSaldo } from './components/WhyShopSaldo';
import { HowToBuySteps } from './components/HowToBuySteps';
import { LocationSection } from './components/LocationSection';
import { FooterClosing } from './components/FooterClosing';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AiAssistantSheet } from './components/AiAssistantSheet';
import { ShareToast, sharePage } from './components/ShareToast';

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = () => {
    sharePage((msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F7F4F0] flex justify-center relative overflow-x-hidden selection:bg-[#FF6A00] selection:text-white">
      {/* Barra de progresso de rolagem no topo */}
      <ScrollProgressBar />

      {/* Brilhos ambientais laterais no desktop para atmosfera sofisticada */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 bg-[#FF6A00]/10 rounded-full blur-3xl pointer-events-none hidden md:block" />
      <div className="fixed bottom-1/4 -right-48 w-96 h-96 bg-[#E24E00]/10 rounded-full blur-3xl pointer-events-none hidden md:block" />

      {/* Container principal mobile-first (máximo 480px centrado) */}
      <main className="w-full max-w-[480px] min-h-screen flex flex-col relative z-10 shadow-[0_0_60px_rgba(0,0,0,0.8)] bg-[#0B0B0C]">
        {/* 4.1 Topo (Hero compacto) */}
        <HeaderHero />

        {/* 4.2 Botões Principais */}
        <MainActionButtons onShareClick={handleShare} />

        {/* 4.3 Faixas Marquee */}
        <MarqueeBanners />

        {/* 4.4 Departamentos e Categorias (Grade 2x3) */}
        <CategoryGrid />

        {/* 4.6 Por que a Shop Saldo (Seção Laranja com Métricas) */}
        <WhyShopSaldo />

        {/* 4.7 Como Comprar em 3 Passos */}
        <HowToBuySteps />

        {/* 4.8 Onde Estamos (Endereço, Horário e Mapa) */}
        <LocationSection />

        {/* 4.9 Fechamento & Rodapé */}
        <FooterClosing />
      </main>

      {/* 4.10 Elementos Globais */}
      <FloatingWhatsApp onOpenAiChat={() => setIsAiOpen(true)} />
      <AiAssistantSheet isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <ShareToast show={!!toastMessage} message={toastMessage || ''} />
    </div>
  );
}
