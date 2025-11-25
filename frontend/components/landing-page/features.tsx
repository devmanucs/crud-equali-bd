import { Users, Calculator, BarChart3, ShieldCheck } from "lucide-react";

export function Features() {
  return (
    // Adicionado o ID para o scroll funcionar
    <section id="features" className="container mx-auto px-4 py-16 scroll-mt-20">
      <h2 className="font-fredoka text-2xl md:text-3xl font-bold text-center text-[#1f2937] dark:text-white mb-4">
        Por que escolher o Equali?
      </h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto">
        Desenvolvemos a plataforma mais intuitiva para organizar suas despesas compartilhadas.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard 
          icon={<Users className="h-8 w-8 text-white" />} 
          color="bg-[#3b82f6]" 
          title="Grupos colaborativos" 
          description="Crie grupos e convide amigos facilmente com códigos únicos."
        />
        {/* ... (mantém os outros FeatureCards iguais, eles usarão o componente abaixo) */}
        <FeatureCard 
          icon={<Calculator className="h-8 w-8 text-white" />} 
          color="bg-[#3b82f6]" 
          title="Divisão inteligente" 
          description="Divida despesas automaticamente e veja quem deve para quem."
        />
        <FeatureCard 
          icon={<BarChart3 className="h-8 w-8 text-white" />} 
          color="bg-[#10b981]" 
          title="Visualizações Claras" 
          description="Gráficos intuitivos para acompanhar seus gastos em tempo real."
        />
        <FeatureCard 
          icon={<ShieldCheck className="h-8 w-8 text-white" />} 
          color="bg-[#3b82f6]" 
          title="Seguro e confiável" 
          description="Seus dados financeiros protegidos com tecnologia de ponta."
        />
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) {
  return (
    // Adicionado suporte a dark mode (bg-slate-900 border-slate-800)
    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <div className={`${color} p-3 rounded-xl mb-4 shadow-md`}>
        {icon}
      </div>
      <h3 className="font-fredoka font-bold text-lg text-[#1f2937] dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}