import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Navigation, Copy, Check } from 'lucide-react';
import { STORE_DATA } from './storeData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_DATA.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenRoute = () => {
    window.open(STORE_DATA.googleMapsRouteUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-8 px-4 w-full max-w-[480px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-4"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00] block mb-1">
          Fácil de Chegar
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Onde estamos
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
          Venha garimpar seus achadinhos pessoalmente na loja física
        </p>
      </motion.div>

      {/* Cartão de Informações de Endereço & Horário */}
      <div className="rounded-[26px] bg-[#17171A] border border-white/10 p-4 sm:p-5 shadow-xl flex flex-col gap-4">
        {/* Endereço */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF6A00]/15 flex items-center justify-center text-[#FF6A00] shrink-0 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Endereço da Loja
              </span>
              <p className="text-sm sm:text-base font-extrabold text-white mt-0.5 leading-snug">
                {STORE_DATA.address}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {STORE_DATA.neighborhood}, {STORE_DATA.city} • CEP {STORE_DATA.cep}
              </p>
            </div>
          </div>

          <button
            onClick={handleCopyAddress}
            title="Copiar endereço completo"
            className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors shrink-0"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Horário */}
        <div className="flex items-start gap-3 pt-3 border-t border-white/5">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FF9A3D] shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Horário de Atendimento
            </span>
            <p className="text-sm font-bold text-white mt-0.5">
              {STORE_DATA.openingHours}
            </p>
            <p className="text-xs text-[#FF6A00] mt-0.5 font-medium">
              {STORE_DATA.openingHoursNote}
            </p>
          </div>
        </div>

        {/* Mapa Embutido do Google */}
        <div className="w-full h-44 sm:h-48 rounded-[20px] overflow-hidden border border-white/10 bg-black/40 relative">
          <iframe
            title="Localização da Shop Saldo Taipas"
            src={STORE_DATA.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[0.2] contrast-[1.1]"
          />
        </div>

        {/* Botão de Ação: Abrir Rota no Maps */}
        <button
          onClick={handleOpenRoute}
          className="cursor-pointer w-full py-3.5 px-4 rounded-xl bg-white text-[#0B0B0C] hover:bg-gray-100 font-extrabold text-sm flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-md"
        >
          <Navigation className="w-4 h-4 text-[#FF6A00]" />
          <span>Traçar rota no Google Maps</span>
        </button>
      </div>
    </section>
  );
};
