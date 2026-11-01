import React from 'react';
import { motion } from 'motion/react';
import { Shirt, ShoppingBag, Wrench, Zap, Home, Sparkles, ArrowUpRight } from 'lucide-react';
import { STORE_DATA, openWhatsApp, ProductCategory } from './storeData';

const categoryIconMap = {
  Shirt,
  ShoppingBag,
  Wrench,
  Zap,
  Home,
  Sparkles,
};

export const CategoryGrid: React.FC = () => {
  const handleCategoryClick = (category: ProductCategory) => {
    const message = `Olá! Vim pelo Instagram da Shop Saldo e tenho interesse em ver o que tem disponível na categoria de ${category.name}.`;
    openWhatsApp(message);
  };

  return (
    <section id="categorias" className="py-7 px-4 w-full max-w-[480px] mx-auto scroll-mt-6">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mb-4"
      >
        <span className="text-xs font-bold uppercase tracking-wider text-[#FF6A00] block mb-1">
          Nossos Departamentos
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          O que você encontra na loja
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
          Toque na categoria para falar com a equipe no WhatsApp
        </p>
      </motion.div>

      {/* Grade 2x3 */}
      <div className="grid grid-cols-2 gap-3">
        {STORE_DATA.categories.map((cat, index) => {
          const IconComponent = categoryIconMap[cat.icon] || Sparkles;

          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleCategoryClick(cat)}
              className="cursor-pointer group text-left p-3.5 rounded-[22px] bg-[#17171A] hover:bg-[#1f1f24] border border-white/10 hover:border-[#FF6A00]/60 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(255,106,0,0.2)] flex flex-col justify-between min-h-[110px]"
            >
              {/* Glow sutil ao passar o cursor */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF6A00]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl bg-[#0B0B0C] border border-white/10 flex items-center justify-center text-[#FF6A00] group-hover:bg-[#FF6A00] group-hover:text-white transition-colors duration-300 shadow-inner">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.div>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#FF6A00]/30 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="mt-2.5">
                <h3 className="font-bold text-sm text-white group-hover:text-[#FF9A3D] transition-colors leading-tight">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-1">
                  {cat.tagline}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};
