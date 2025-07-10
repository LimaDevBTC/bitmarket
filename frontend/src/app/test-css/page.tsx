export default function TestCSS() {
  return (
    <div className="min-h-screen bg-[#09080A] p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white mb-8">Teste de CSS</h1>
        
        {/* Teste de cores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-black font-bold">Branco</h3>
            <p className="text-gray-600">bg-white</p>
          </div>
          <div className="bg-[#fa5b1c] p-4 rounded-lg">
            <h3 className="text-white font-bold">Laranja Neon</h3>
            <p className="text-white/80">bg-[#fa5b1c]</p>
          </div>
          <div className="bg-gray-600 p-4 rounded-lg">
            <h3 className="text-white font-bold">Cinza</h3>
            <p className="text-gray-200">bg-gray-600</p>
          </div>
        </div>

        {/* Teste de glassmorphism */}
        <div className="glass-effect p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Glassmorphism</h2>
          <p className="text-gray-300">Este é um teste do efeito glassmorphism.</p>
        </div>

        {/* Teste de botões */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Botões</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Botão Primário</button>
            <button className="btn-secondary">Botão Secundário</button>
            <button className="btn-ghost">Botão Ghost</button>
          </div>
        </div>

        {/* Teste de tipografia */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Tipografia</h2>
          <h1 className="text-4xl font-bold text-white">Título H1</h1>
          <h2 className="text-3xl font-semibold text-white">Título H2</h2>
          <h3 className="text-2xl font-medium text-white">Título H3</h3>
          <p className="text-gray-300">Texto normal em cinza claro.</p>
          <p className="text-gray-500">Texto secundário em cinza médio.</p>
        </div>

        {/* Teste de gradientes */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Gradientes</h2>
          <div className="bg-gradient-to-r from-[#fa5b1c] to-orange-600 p-6 rounded-lg">
            <h3 className="text-white font-bold">Gradiente Laranja</h3>
          </div>
          <h3 className="text-3xl font-bold gradient-text">Texto com Gradiente</h3>
        </div>

        {/* Teste de responsividade */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Responsividade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-white">Coluna 1</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-white">Coluna 2</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-white">Coluna 3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 