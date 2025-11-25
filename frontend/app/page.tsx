import { Features } from "@/components/landing-page/features";
import { Footer } from "@/components/landing-page/footer";
import { Header } from "@/components/landing-page/header";
import { Hero } from "@/components/landing-page/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f4f6] font-sans text-gray-800">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}