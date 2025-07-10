import MarketCarousel from '../components/MarketCarousel';

interface Market {
  id: string;
  title?: string;
  question?: string;
  total_volume?: number;
  volume?: number;
  end_date?: string;
  timeLeft?: string;
}

async function getMarkets() {
  // Ajuste a URL se necessário para ambiente de produção
  const res = await fetch('http://localhost:3001/api/markets/active', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function Home() {
  const markets = await getMarkets();
  // Adicionar odds fake para visual (depois integrar odds reais)
  const marketsWithOdds = markets.map((m: Market, i: number) => ({
    ...m,
    odds: 50 + (i % 2 === 0 ? 10 : -10),
    volume: m.total_volume ?? m.volume ?? 0,
    timeLeft: m.end_date ? new Date(m.end_date).toLocaleDateString() : (m.timeLeft || ''),
    title: m.title ?? m.question ?? '',
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Mercados em Destaque */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        
        {marketsWithOdds.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl mb-4">Nenhum mercado ativo no momento.</p>
            <p className="text-gray-500">Seja o primeiro a criar um mercado!</p>
          </div>
        ) : (
          <MarketCarousel markets={marketsWithOdds} />
        )}
      </section>

      {/* Estatísticas */}
      <section className="bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-neon mb-2">$2.1M</div>
              <div className="text-gray-400">Volume Total</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-neon mb-2">1,247</div>
              <div className="text-gray-400">Mercados Ativos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-neon mb-2">89.3%</div>
              <div className="text-gray-400">Taxa de Acerto</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
