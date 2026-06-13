"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp, FaArrowRight, FaCheck } from "react-icons/fa";

export default function FinalCTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "3s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots-white opacity-20" />

      {/* Floating shapes */}
      <div className="absolute top-16 right-16 w-20 h-20 border border-white/10 clip-octagon animate-float-slow hidden md:block" />
      <div className="absolute bottom-20 left-16 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 clip-blob-soft animate-float hidden md:block" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full border border-indigo-400/10 animate-spin-slow hidden md:block" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-sm mb-6 border border-white/10">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Prêt à trouver votre logement ?
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Votre logement
          <span className="gradient-text"> vous attend</span>
        </h2>
        <p className="text-lg md:text-xl text-indigo-100/80 mb-10 max-w-xl mx-auto">
          Rejoignez les centaines de personnes qui ont boosté leurs chances avec Logement Dossier. C&apos;est gratuit pour commencer.
        </p>

        <a
          href={getWhatsAppLink("Bonjour, je souhaite faire analyser mon dossier de location.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
        >
          <FaWhatsapp className="text-2xl" />
          Analyser mon dossier
          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-indigo-200/80">
          <span className="flex items-center gap-1.5"><FaCheck className="text-green-400" /> Réponse sous 24h</span>
          <span className="flex items-center gap-1.5"><FaCheck className="text-green-400" /> Aucun paiement avant validation</span>
          <span className="flex items-center gap-1.5"><FaCheck className="text-green-400" /> Accompagnement jusqu&apos;à l&apos;obtention</span>
        </div>
      </div>
    </section>
  );
}
