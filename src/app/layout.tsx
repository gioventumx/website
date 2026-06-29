import type { Metadata } from "next";
import { dmSans, playfair } from "./fonts";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gioventù — Centro Dermatológico y Estético",
  description:
    "Centro dermatológico y estético en Lomas Verdes. Ciencia y tecnología de vanguardia para una piel radiante.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
