"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { EMAIL } from "@/lib/constants";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={`mailto:${EMAIL}`}
        className="w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-xl shadow-blue-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Nous envoyer un email"
      >
        <FaEnvelope size={22} />
      </a>
      <a
        href={getWhatsAppLink("Bonjour, je souhaite optimiser mon dossier de location.")}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-bounce-subtle"
        aria-label="Nous contacter sur WhatsApp"
      >
        <FaWhatsapp size={26} />
      </a>
    </div>
  );
}
