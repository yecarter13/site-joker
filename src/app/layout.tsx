import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Logement Dossier - Votre dossier, votre meilleure chance de louer",
  description: "Nous analysons, structurons et optimisons votre candidature logement pour maximiser vos chances face aux bailleurs. HLM ou location privée, partout en France.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
