import type { Metadata } from "next";
import { dmSans, playfair } from "./fonts";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  // Dominio definitivo de producción. Base para los canonical absolutos (ej. /dermatologia/).
  metadataBase: new URL("https://gioventu.com.mx"),
  title: "Gioventù — Centro Dermatológico y Estético",
  description:
    "Centro dermatológico y estético en Lomas Verdes. Ciencia y tecnología de vanguardia para una piel radiante.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon-gioventu.webp" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        <BookingProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
