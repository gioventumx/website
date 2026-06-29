import type { Metadata } from "next";
import { dmSans, playfair } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gioventù",
  description: "Gioventù",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
