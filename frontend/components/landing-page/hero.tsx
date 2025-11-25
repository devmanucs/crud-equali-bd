import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="container mx-auto flex flex-col items-center text-center px-4 py-16 md:py-24">
      <h1 className="font-fredoka text-4xl md:text-6xl font-bold text-[#1f2937] dark:text-white mb-6 leading-tight">
        Divida despesas com <br />
        {/* CORREÇÃO 1: bg-linear-to-r em vez de bg-gradient-to-r */}
        <span className="bg-linear-to-r from-[#10b981] to-[#3b82f6] bg-clip-text text-transparent">
          simplicidade
        </span>
      </h1>
      
      <p className="max-w-2xl text-gray-600 dark:text-gray-300 mb-10 text-lg">
        Gerencie gastos compartilhados entre amigos, família ou colegas. 
        Calcule automaticamente quem deve para quem e mantenha tudo organizado.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/cadastro">
          {/* CORREÇÃO 2: bg-linear-to-r aqui também */}
          <Button className="h-12 px-8 text-lg rounded-full bg-linear-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] text-white shadow-lg hover:shadow-xl transition-all">
            Começar agora <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
        
        <Link href="#features">
          <Button variant="outline" className="h-12 px-8 text-lg rounded-full border-[#3b82f6] text-[#3b82f6] hover:bg-blue-50 dark:hover:bg-slate-800 bg-transparent">
            Saiba mais
          </Button>
        </Link>
      </div>
    </section>
  );
}