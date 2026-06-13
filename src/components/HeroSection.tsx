"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp, FaCheck, FaArrowRight } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      </div>

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots-white opacity-30" />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-indigo-400/20 rounded-xl rotate-45 animate-float hidden lg:block" />
      <div className="absolute bottom-32 right-16 w-16 h-16 border-2 border-purple-400/20 clip-octagon animate-float-slow hidden lg:block" />
      <div className="absolute top-40 right-1/4 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 clip-blob-soft animate-float hidden lg:block" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-40 left-1/4 w-24 h-24 border border-white/10 rounded-full animate-pulse-soft hidden lg:block" />

      {/* Spinning gradient ring */}
      <div className="absolute top-1/3 -right-20 w-64 h-64 rounded-full border border-indigo-500/10 animate-spin-slow hidden lg:block" />
      <div className="absolute top-1/3 -right-20 w-48 h-48 rounded-full border border-purple-500/10 animate-spin-slow hidden lg:block" style={{ animationDirection: "reverse" }} />

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 text-sm mb-6 border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>+800 dossiers accompagnés</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Votre dossier, votre
              <span className="gradient-text"> meilleure chance </span>
              de louer
            </h1>

            <p className="text-lg md:text-xl text-indigo-100/80 mb-8 leading-relaxed">
              Nous analysons, structurons et optimisons votre candidature logement pour maximiser vos chances face aux bailleurs — et vous accompagnons jusqu&apos;à l&apos;obtention de votre logement. HLM ou location privée, partout en France.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={getWhatsAppLink("Bonjour, je souhaite faire analyser mon dossier de location.")}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
              >
                Analyser mon dossier
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/#method"
                className="inline-flex items-center justify-center gap-2 glass-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:bg-white/20"
              >
                Voir comment ça marche
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-indigo-200/80">
              <span className="flex items-center gap-1.5"><FaCheck className="text-green-400 text-xs" /> Aucun paiement avant validation</span>
              <span className="flex items-center gap-1.5"><FaCheck className="text-green-400 text-xs" /> Réponse sous 24h</span>
              <span className="flex items-center gap-1.5"><FaCheck className="text-green-400 text-xs" /> Remboursé si insatisfait</span>
            </div>
          </div>

          {/* Right Column - Visual + Stats */}
          <div className="relative hidden lg:block">
            {/* Main image with clip-path */}
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 clip-rounded-hex" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-dots-indigo rounded-2xl" />
              <div className="relative clip-rounded-hex overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
                  alt="Logement"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-transparent to-transparent" />
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -left-6 glass-dark rounded-2xl p-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <FaCheck className="text-green-400 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold">96%</div>
                    <div className="text-xs text-indigo-200">Taux de satisfaction</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 glass-dark rounded-2xl p-4 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <HiDocumentText className="text-indigo-300 text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold">800+</div>
                    <div className="text-xs text-indigo-200">Dossiers traités</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          {[
            { value: "800+", label: "Dossiers accompagnés" },
            { value: "96%", label: "Taux de satisfaction" },
            { value: "24h", label: "Délai de réponse" },
            { value: "30j", label: "Garantie remboursée" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 md:p-5 text-center hover:bg-white/10 transition-all">
              <div className="text-2xl md:text-3xl font-extrabold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-indigo-200/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="sticky bottom-0 z-40 bg-gradient-to-r from-indigo-700 to-purple-700 md:hidden">
        <a
          href={getWhatsAppLink("Bonjour, je souhaite faire analyser mon dossier de location.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-white py-3.5 px-4 text-sm font-bold"
        >
          <FaWhatsapp className="text-xl" />
          Analyser mon dossier
        </a>
      </div>
    </section>
  );
}
