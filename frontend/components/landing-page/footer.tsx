import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";

export function Footer() {
  return (
    <>
      {/* CTA Section */}
      <section className="bg-[#1f2937] text-white py-20 mt-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-fredoka text-3xl md:text-4xl font-bold mb-6">
            Pronto para simplificar suas finanças?
          </h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Junte-se a todos os usuários que já organizam suas despesas com o Equali.
          </p>
          <Button className="bg-[#10b981] hover:bg-emerald-600 text-white rounded-full px-8 py-6 text-lg h-auto font-bold">
            Criar conta gratuita
          </Button>
        </div>
      </section>

      {/* Rodapé Real */}
      <footer className="bg-[#f3f4f6] py-8 text-center">
        <div className="flex justify-center mb-4 text-[#1f2937]">
           <Divide className="h-8 w-8" />
        </div>
        <p className="text-xs text-gray-500">
          © 2024 Equali. Simplifique suas despesas compartilhadas.
        </p>
      </footer>
    </>
  );
}