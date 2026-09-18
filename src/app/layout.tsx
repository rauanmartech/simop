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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://simopouropreto.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SiMOP — Sistema de Museus de Ouro Preto",
  description:
    "Sistema de Museus de Ouro Preto — patrimônio, memória e cultura de Ouro Preto.",
  keywords: [
    "SiMOP",
    "Sistema de Museus de Ouro Preto",
    "Ouro Preto",
    "Museus",
    "Patrimônio Histórico",
    "Minas Gerais",
    "Arte Sacra",
    "Inconfidência",
    "Aleijadinho",
    "Cultura",
  ],
  authors: [{ name: "SiMOP — Sistema de Museus de Ouro Preto" }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "SiMOP — Sistema de Museus de Ouro Preto",
    description:
      "Sistema de Museus de Ouro Preto — patrimônio, memória e cultura de Ouro Preto.",
    url: siteUrl,
    siteName: "SiMOP",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "SiMOP — Sistema de Museus de Ouro Preto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SiMOP — Sistema de Museus de Ouro Preto",
    description:
      "Sistema de Museus de Ouro Preto — patrimônio, memória e cultura de Ouro Preto.",
    images: [`${siteUrl}/og-image.jpg`],
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
