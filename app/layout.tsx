import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OptimaVia Command Center",
  description: "Opportunity Finder & Agency Database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
