import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/lib/ModalContext";
import ContactModal from "@/components/ContactModal";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Votre dossier, votre meilleure chance de louer`,
  description: `Optimisez votre dossier de location avec ${SITE_NAME}. Accompagnement personnalisé pour maximiser vos chances d'être accepté.`,
  icons: { icon: "/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900 min-h-screen flex flex-col">
        <ModalProvider>
          {children}
          <ContactModal />
          <FloatingWhatsAppButton />
        </ModalProvider>
      </body>
    </html>
  );
}
