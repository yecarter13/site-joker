"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsAppButton() {
  return (
    <a
      href={getWhatsAppLink("Bonjour, je souhaite optimiser mon dossier de location.")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-bounce-subtle"
      aria-label="Nous contacter"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}
