import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portal dos Museus de Ouro Preto — Histórias, Memórias e Patrimônio",
  description:
    "Plataforma institucional e cultural completa dedicada à descoberta, consulta e exploração dos museus e acervos de Ouro Preto, Minas Gerais.",
  keywords: [
    "Ouro Preto",
    "Museus",
    "Patrimônio Histórico",
    "Arte Sacra",
    "Inconfidência",
    "Aleijadinho",
    "Minas Gerais",
  ],
  authors: [{ name: "Portal dos Museus de Ouro Preto" }],
  openGraph: {
    title: "Portal dos Museus de Ouro Preto",
    description:
      "Histórias, memórias e patrimônios que atravessam séculos. Conheça o acervo dos museus de Ouro Preto.",
    type: "website",
    locale: "pt_BR",
    siteName: "Portal dos Museus de Ouro Preto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal dos Museus de Ouro Preto",
    description: "Conheça a história e o acervo dos museus de Ouro Preto, Minas Gerais.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen relative antialiased selection:bg-gold selection:text-night" suppressHydrationWarning>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
