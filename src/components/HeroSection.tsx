"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp, FaCheck } from "react-icons/fa";
import { HiShieldCheck, HiClock, HiDocumentText } from "react-icons/hi";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200')] bg-cover bg-center opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-900/60 to-indigo-950/90" />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
            <HiDocumentText className="text-indigo-300" />
            <span>+800 dossiers accompagnés</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
            Votre dossier, votre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300"> meilleure chance </span>
            de louer
          </h1>

          <p className="text-lg md:text-xl text-indigo-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Nous analysons, structurons et optimisons votre candidature logement pour maximiser vos chances face aux bailleurs — et vous accompagnons jusqu&apos;à l&apos;obtention de votre logement. HLM ou location privée, partout en France.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={getWhatsAppLink("Bonjour, je souhaite faire analyser mon dossier de location.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
            >
              Analyser mon dossier →
            </a>
            <a
              href="/#method"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              Voir comment ça marche
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-indigo-200 mb-12">
            <span className="flex items-center gap-1.5"><FaCheck className="text-green-400 text-xs" /> Aucun paiement avant validation</span>
            <span className="flex items-center gap-1.5"><FaCheck className="text-green-400 text-xs" /> Réponse sous 24h</span>
            <span className="flex items-center gap-1.5"><FaCheck className="text-green-400 text-xs" /> Remboursé si insatisfait</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "800+", label: "Dossiers accompagnés" },
              { value: "96%", label: "Taux de satisfaction" },
              { value: "24h", label: "Délai de réponse moyen" },
              { value: "30j", label: "Garantie remboursée" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-xs text-indigo-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-40 bg-gradient-to-r from-indigo-700 to-indigo-800 md:hidden">
        <a
          href={getWhatsAppLink("Bonjour, je souhaite faire analyser mon dossier de location.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-white py-3 px-4 text-sm font-bold"
        >
          <FaWhatsapp className="text-xl" />
          Analyser mon dossier
        </a>
      </div>
    </section>
  );
}
