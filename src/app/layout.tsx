import type { Metadata } from "next";
import Script from "next/script";
import { dmSans, playfair } from "./fonts";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { WhatsAppFab } from "@/components/booking/WhatsAppFab";
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

// Contenedor de Google Tag Manager. GA4, Google Ads y Clarity NO se instalan en el
// código: se cuelgan como tags dentro de este contenedor.
const GTM_ID = "GTM-N7BCN238";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {/* GTM (noscript) — al inicio del body */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* dataLayer creado ANTES del snippet de GTM: así ningún push temprano se
            pierde (ej. booking_whatsapp de fireBookingConversion). */}
        <Script id="gtm-datalayer" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>

        <SmoothScroll />
        <BookingProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </BookingProvider>
      </body>
    </html>
  );
}
