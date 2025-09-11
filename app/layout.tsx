import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StockSys - Gestão de Stock",
  description: "Sistema de gestão de stock fullstack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="antialiased bg-gray-100 ">{children}</body>
    </html>
  );
}
