import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing SaaS MVP",
  description: "MVP para diagnóstico, estratégia e conteúdo com OpenAI."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
