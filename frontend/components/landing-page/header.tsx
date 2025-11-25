import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themeToggle";

export function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between py-6 px-4">
      <div className="flex items-center gap-2">
          <span className="font-fredoka text-2xl font-bold text-[#1f2937] dark:text-white">Equali</span>
          <div className="h-2 w-2 rounded-full bg-[#10b981]"></div>
      </div>

      <div className="flex items-center gap-4">
        {/* Toggle de Tema */}
        <ThemeToggle />

        {/* Botões Aumentados */}
        <Button variant="ghost" className="h-11 text-base font-medium text-[#3b82f6] hover:bg-blue-50 hover:text-[#3b82f6] dark:hover:bg-slate-800">
          Entrar
        </Button>
        <Button className="h-11 px-8 text-base bg-[#3b82f6] hover:bg-blue-600 text-white rounded-full transition-all hover:scale-105">
          Cadastre-se
        </Button>
      </div>
    </header>
  );
}