import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container mx-auto flex flex-col items-center text-center px-4 py-16 md:py-24">
      <h1 className="font-fredoka text-4xl md:text-6xl font-bold text-[#1f2937] mb-6">
        Divida despesas com <br />
        <span className="text-[#10b981]">simplicidade</span>
      </h1>
      
      <p className="max-w-2xl text-gray-600 mb-10 text-lg">
        Gerencie gastos compartilhados entre amigos, família ou colegas. 
        Calcule automaticamente quem deve para quem e mantenha tudo organizado.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white rounded-full px-8 py-6 text-lg h-auto">
          Começar agora
        </Button>
        <Button variant="outline" className="border-[#3b82f6] text-[#3b82f6] hover:bg-blue-50 rounded-full px-8 py-6 text-lg h-auto bg-transparent">
          Saiba mais
        </Button>
      </div>
    </section>
  );
}