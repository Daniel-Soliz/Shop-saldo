/**
 * DADOS EDITÁVEIS DA SHOP SALDO
 * 
 * O proprietário pode alterar os textos, departamentos,
 * horários, links de grupo e redes diretamente neste arquivo!
 */

export interface ProductCategory {
  id: string;
  name: string;
  icon: 'Shirt' | 'ShoppingBag' | 'Wrench' | 'Zap' | 'Home' | 'Sparkles';
  tagline: string;
}

export const STORE_DATA = {
  name: "SHOP SALDO",
  slogan: "Sua loja de oportunidades",
  address: "Av. Dep. Cantídio Sampaio, 5985",
  neighborhood: "Taipas",
  city: "São Paulo – SP",
  cep: "02860-001",
  fullAddress: "Av. Dep. Cantídio Sampaio, 5985, Taipas, São Paulo – SP",
  
  // Contatos atualizados
  phoneRaw: "5511970988133",
  phoneFormatted: "(11) 97098-8133",
  whatsappGroupUrl: "https://chat.whatsapp.com/KzWdts9glZU4ASPVBnKpgj?s=cl&p=a&iam=2",
  instagramHandle: "@shopsaldo.taipas",
  instagramUrl: "https://www.instagram.com/shopsaldo.taipas/",
  
  // Horário de funcionamento
  openingHours: "Seg a Sáb: 09h às 19h",
  openingHoursNote: "Domingos e feriados: consultar no WhatsApp",

  // Links de Mapa
  googleMapsRouteUrl: "https://www.google.com/maps/dir/?api=1&destination=Av.+Dep.+Cant%C3%ADdio+Sampaio%2C+5985+-+Taipas%2C+S%C3%A3o+Paulo+-+SP",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Av.+Dep.+Cant%C3%ADdio+Sampaio,+5985+-+Taipas,+S%C3%A3o+Paulo+-+SP&t=&z=16&ie=UTF8&iwloc=&output=embed",

  // Imagens da Marca
  mascotImage: "/Shop-saldo/assets/shop-saldo-mascote.webp",
  storeBgImage: "/assets/aistudio/file_0000000024ac820e800e87a264a4182d_2a52e5d1.png",

  // 6 Categorias Rápidas (Grade 2x3)
  categories: [
    {
      id: "cat-1",
      name: "Moda e Acessórios",
      icon: "Shirt",
      tagline: "Roupas, calçados e novidades"
    },
    {
      id: "cat-2",
      name: "Bolsas e Malas",
      icon: "ShoppingBag",
      tagline: "Transversais, mochilas e malas"
    },
    {
      id: "cat-3",
      name: "Ferramentas",
      icon: "Wrench",
      tagline: "Kits, elétricas e manuais"
    },
    {
      id: "cat-4",
      name: "Eletro e Utilidades",
      icon: "Zap",
      tagline: "Cozinha, praticidade e eletros"
    },
    {
      id: "cat-5",
      name: "Casa e Decoração",
      icon: "Home",
      tagline: "Organização e aconchego para o lar"
    },
    {
      id: "cat-6",
      name: "Beleza e Cuidados",
      icon: "Sparkles",
      tagline: "Cuidados pessoais e acessórios"
    }
  ] as ProductCategory[],

  // Por que a Shop Saldo
  benefits: [
    {
      title: "Grandes Oportunidades",
      metric: "Exclusivo",
      sub: "Lotes selecionados com oportunidades imperdíveis para você aproveitar"
    },
    {
      title: "Novidades toda semana",
      metric: "Lotes Novos",
      sub: "Lotes frescos chegando toda semana com variedade e itens exclusivos"
    },
    {
      title: "Grupo VIP de Novidades",
      metric: "WhatsApp",
      sub: "Receba em primeira mão fotos e novidades direto no grupo oficial"
    }
  ],

  // Como Comprar em 3 Passos
  steps: [
    {
      step: 1,
      title: "Entre no Grupo VIP ou siga o Insta",
      desc: "Acompanhe as novidades e lotes exclusivos pelo grupo do WhatsApp e no @shopsaldo.taipas."
    },
    {
      step: 2,
      title: "Fale no WhatsApp da Loja",
      desc: "Chame no (11) 97098-8133 para tirar dúvidas e reservar peças com a equipe."
    },
    {
      step: 3,
      title: "Retire na loja ou combine",
      desc: "Venha nos visitar na Av. Dep. Cantídio Sampaio, 5985 nas Taipas."
    }
  ]
};

/**
 * Função utilitária para abrir o Grupo Oficial do WhatsApp
 */
export function openWhatsAppGroup(): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(25);
    } catch {
      // ignore
    }
  }
  window.open(STORE_DATA.whatsappGroupUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Função utilitária para gerar o link de conversa direta no WhatsApp
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg = "Olá! Vim pelo Instagram da Shop Saldo e gostaria de ver as novidades disponíveis na loja.";
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${STORE_DATA.phoneRaw}?text=${text}`;
}

export function openWhatsApp(customMessage?: string): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(25);
    } catch {
      // ignore
    }
  }
  const url = getWhatsAppUrl(customMessage);
  window.open(url, '_blank', 'noopener,noreferrer');
}
