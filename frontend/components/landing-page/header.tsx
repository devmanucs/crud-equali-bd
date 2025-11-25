import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between py-6 px-4">
      <div className="flex items-center gap-2">
          <span className="font-fredoka text-2xl font-bold text-[#1f2937]">Equali</span>
          <div className="h-2 w-2 rounded-full bg-[#10b981]"></div>
      </div>

      <div className="flex gap-4">
        <Button variant="ghost" className="text-[#3b82f6] hover:bg-blue-50 hover:text-[#3b82f6]">
          Entrar
        </Button>
        <Button className="bg-[#3b82f6] hover:bg-blue-600 text-white rounded-full px-6">
          Cadastre-se
        </Button>
      </div>
    </header>
  );
}