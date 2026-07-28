"use client";

import { useState } from "react";
import { getWhatsAppLink } from "@/lib/utils";
import { EMAIL } from "@/lib/constants";
import { FaWhatsapp, FaEnvelope, FaCommentDots } from "react-icons/fa";

export default function FloatingWhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {open && (
        <>
          <a
            href={`mailto:${EMAIL}`}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Nous envoyer un email"
            onClick={() => setOpen(false)}
          >
            <FaEnvelope size={18} />
          </a>
          <a
            href={getWhatsAppLink("Bonjour, je souhaite optimiser mon dossier de location.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
            aria-label="Nous contacter sur WhatsApp"
            onClick={() => setOpen(false)}
          >
            <FaWhatsapp size={20} />
          </a>
        </>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Nous contacter"
      >
        {open ? <FaCommentDots size={22} /> : <FaWhatsapp size={26} />}
      </button>
    </div>
  );
}
