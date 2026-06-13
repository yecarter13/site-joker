"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

export default function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Votre logement vous attend
        </h2>
        <p className="text-lg text-indigo-100 mb-8 max-w-xl mx-auto">
          Rejoignez les centaines de personnes qui ont boosté leurs chances avec Logement Dossier. C&apos;est gratuit pour commencer.
        </p>

        <a
          href={getWhatsAppLink("Bonjour, je souhaite faire analyser mon dossier de location.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
        >
          <FaWhatsapp className="text-2xl" />
          Analyser mon dossier →
        </a>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-indigo-200">
          <span className="flex items-center gap-1.5"><HiCheck className="text-green-400" /> Réponse sous 24h</span>
          <span className="flex items-center gap-1.5"><HiCheck className="text-green-400" /> Aucun paiement avant validation</span>
          <span className="flex items-center gap-1.5"><HiCheck className="text-green-400" /> Accompagnement jusqu&apos;à l&apos;obtention</span>
        </div>
      </div>
    </section>
  );
}
