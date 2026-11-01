import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Instanciar GoogleGenAI com segurança no lado do servidor
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_INSTRUCTION = `Você é o assistente virtual oficial da Shop Saldo, loja de oportunidades localizada nas Taipas (São Paulo - SP).
Fale em português do Brasil, de forma muito simpática, prestativa, popular e direta, em no máximo 3 frases.
Informações oficiais que você conhece:
- Nome: SHOP SALDO ("Sua loja de oportunidades")
- Endereço: Av. Dep. Cantídio Sampaio, 5985, Taipas, São Paulo – SP
- WhatsApp: (11) 97098-8133
- Instagram: @shopsaldo.taipas
- Produtos: Moda e acessórios femininos/masculinos, bolsas e malas de viagem, ferramentas e kits manuais/elétricos, eletroportáteis (Air Fryer, cafeteiras, etc.), utilidades domésticas e itens para casa e decoração.
- Horário regular: Segunda a Sábado das 09h às 19h (domingos e feriados sob consulta no WhatsApp).
REGRA INEGOCIÁVEL: NUNCA invente preço exato de itens não informados, estoque específico ou prazo de entrega. Diga sempre que como é loja de oportunidades e saldos, o estoque gira super rápido e a equipe confirma no WhatsApp na hora com fotos reais do lote atual.
Sempre que o cliente demonstrar interesse em comprar ou ver produtos, convide-o a continuar no WhatsApp da loja.`;

// Endpoint do Assistente da Shop Saldo
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Mensagem inválida.' });
      return;
    }

    if (!aiClient) {
      // Resposta de fallback quando sem chave de API
      res.json({
        reply: "Olá! Seja muito bem-vindo(a) à Shop Saldo Taipas! Estamos localizados na Av. Dep. Cantídio Sampaio, 5985. Como nossos lotes mudam toda semana, nossa equipe te atende agora mesmo no WhatsApp (11) 97098-8133 para mandar fotos e confirmar os itens disponíveis!",
        hasApiKey: false,
      });
      return;
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text || "Olá! Venha conferir as novidades da Shop Saldo nas Taipas ou chame nossa equipe no WhatsApp (11) 97098-8133 para ver as novidades de hoje!";
    
    res.json({
      reply,
      hasApiKey: true,
    });
  } catch (error: any) {
    console.error('Erro na API Gemini:', error);
    res.status(200).json({
      reply: "Olá! Nosso estoque de lotes gira muito rápido! Chame nossa equipe no WhatsApp (11) 97098-8133 que te enviamos na hora fotos reais dos produtos disponíveis hoje na loja.",
      error: error?.message || 'Falha temporária',
    });
  }
});

// Configuração do Vite para desenvolvimento e estático para produção
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Shop Saldo Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
