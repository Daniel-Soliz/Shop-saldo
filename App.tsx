import React, { useState } from 'react';
import { ArrowUpRight, MessageCircle, MapPin } from 'lucide-react';
import { STORE_DATA, getWhatsAppUrl } from './storeData';
import shopLogo from './assets/shop-saldo-mascote.webp';
import { ScrollProgressBar } from './ScrollProgressBar';
import { HeaderHero } from './HeaderHero';
import { MainActionButtons } from './MainActionButtons';
import { MarqueeBanners } from './MarqueeBanners';
import { CategoryGrid } from './CategoryGrid';
import { WhyShopSaldo } from './WhyShopSaldo';
import { HowToBuySteps } from './HowToBuySteps';
import { LocationSection } from './LocationSection';
import { FooterClosing } from './FooterClosing';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { AiAssistantSheet } from './AiAssistantSheet';
import { ShareToast, sharePage } from './ShareToast';

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleShare = () => {
    sharePage((message) => {
      setToastMessage(message);
      setTimeout(() => setToastMessage(null), 3000);
    });
  };

  return (
    <div className="shop-page min-h-screen bg-[#0B0B0C] text-[#F7F4F0] relative overflow-x-clip selection:bg-[#FF6A00] selection:text-white">
      <ScrollProgressBar />
      <div className="shop-page-glow shop-page-glow-left" aria-hidden="true" />
      <div className="shop-page-glow shop-page-glow-right" aria-hidden="true" />

      <div className="shop-topbar-wrap">
        <div className="shop-topbar">
          <a href="#inicio" className="shop-brand" aria-label="Shop Saldo — voltar ao início">
            <span className="shop-brand-mark shop-brand-original"><img src={shopLogo} alt="" className="shop-brand-logo-img" width={72} height={36} /></span>
            <span className="shop-brand-name">
              <strong>SHOP <span>SALDO</span></strong>
              <small>TAIPAS • SÃO PAULO</small>
            </span>
          </a>

          <nav className="shop-desktop-nav" aria-label="Navegação principal">
            <a href="#categorias">Departamentos</a>
            <a href="#vantagens">Por que escolher</a>
            <a href="#como-comprar">Como comprar</a>
            <a href="#localizacao">Onde estamos</a>
          </nav>

          <a
            className="shop-top-cta"
            href={getWhatsAppUrl('Olá! Vim pelo site da Shop Saldo e gostaria de falar com a loja.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>Falar com a loja</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>

      <main id="inicio" className="shop-main">
        <section className="shop-intro" aria-label="Apresentação da Shop Saldo">
          <div className="shop-hero-panel">
            <div className="shop-hero-eyebrow">
              <span className="shop-eyebrow-dot" aria-hidden="true" />
              SUA LOJA DE OPORTUNIDADES EM TAIPAS
            </div>
            <HeaderHero />
            <p className="shop-hero-description">
              Moda, bolsas, ferramentas, utilidades e novidades para você descobrir.
              Compre com a equipe pelo WhatsApp ou venha visitar a nossa loja.
            </p>
            <div className="shop-hero-tags">
              <span><MapPin size={15} aria-hidden="true" /> {STORE_DATA.neighborhood}, São Paulo</span>
              <span>Novidades toda semana</span>
            </div>
          </div>

          <div className="shop-actions-panel">
            <div className="shop-action-intro">
              <span>COMECE POR AQUI</span>
              <h2>Encontre sua próxima oportunidade</h2>
              <p>Escolha como prefere descobrir os produtos e falar com a nossa equipe.</p>
            </div>
            <MainActionButtons onShareClick={handleShare} />
          </div>
        </section>

        <div className="shop-marquee-area">
          <MarqueeBanners />
        </div>

        <div className="shop-section shop-categories">
          <CategoryGrid />
        </div>

        <div id="vantagens" className="shop-benefits">
          <WhyShopSaldo />
        </div>

        <div id="como-comprar" className="shop-section shop-steps">
          <HowToBuySteps />
        </div>

        <div id="localizacao" className="shop-section shop-location">
          <LocationSection />
        </div>

        <div className="shop-footer">
          <FooterClosing />
        </div>
      </main>

      <FloatingWhatsApp onOpenAiChat={() => setIsAiOpen(true)} />
      <AiAssistantSheet isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      <ShareToast show={Boolean(toastMessage)} message={toastMessage || ''} />
    </div>
  );
}
