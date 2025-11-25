import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const fredoka = Fredoka({ 
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Equali - Divida despesas com simplicidade",
  description: "Gerencie gastos compartilhados entre amigos e família.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body className={`${inter.variable} ${fredoka.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}