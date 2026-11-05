import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "YRRG.ai | Smart Websites en Next.js Gestionados por WhatsApp",
    template: "%s | YRRG.ai",
  },
  description:
    "Creamos, migramos y mantenemos sitios web ultrarrápidos en Next.js (100/100 PageSpeed). Olvídate de WordPress y de paneles complejos: pide cambios por WhatsApp y recíbelos en 30 minutos.",
  keywords: [
    "Smart Websites",
    "Desarrollo web Next.js",
    "Migración de WordPress a Next.js",
    "AI SEO Latinoamérica",
    "Mantenimiento web por WhatsApp",
    "YRRG.ai",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#090D16] font-sans text-[#F9FAFB] antialiased selection:bg-[#10B981] selection:text-[#090D16]">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
