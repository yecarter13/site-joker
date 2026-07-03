"use client";

import { useModal } from "@/lib/ModalContext";
import { FaArrowRight } from "react-icons/fa";
import { HiDocumentText, HiCheck } from "react-icons/hi";

export default function HeroSection() {
  const { openModal } = useModal();

  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-indigo-900/60 to-indigo-950/90" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-1.5 text-xs md:text-sm mb-5">
              <HiDocumentText className="text-indigo-300" />
              <span>+800 dossiers accompagnés</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
              Trouvez un logement en toute sérénité avec <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Espace Habitat</span>.
            </h1>

            <p className="text-sm md:text-base text-indigo-100/80 mb-4 leading-relaxed">
              Nous vous accompagnons de A à Z dans votre recherche de logement social : étude de votre situation, constitution d'un dossier solide, orientation vers les bailleurs adaptés et suivi personnalisé de vos démarches.
            </p>

            <p className="text-sm md:text-base text-indigo-100/60 mb-6 leading-relaxed">
              Notre objectif est de vous faire gagner du temps et de maximiser vos chances de trouver un logement correspondant à vos besoins.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={() => openModal()}
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-6 py-3.5 rounded-full text-base font-bold transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-[0.97] cursor-pointer"
              >
                Commencez votre accompagnement dès aujourd'hui
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="/catalog"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-indigo-50 text-indigo-700 px-6 py-3.5 rounded-full text-base font-bold transition-all shadow-lg"
              >
                Voir les logements disponibles
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-full h-full bg-gradient-to-br from-indigo-800/40 to-purple-800/40 rounded-3xl" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { value: "800+", label: "Dossiers accompagnés" },
              { value: "96%", label: "Taux de satisfaction" },
              { value: "24h", label: "Délai de réponse moyen" },
              { value: "30j", label: "Garantie remboursée" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 md:p-4 text-center">
                <div className="text-xl md:text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-[11px] md:text-sm text-indigo-200/70 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-40 bg-gradient-to-r from-indigo-700 to-purple-700 md:hidden">
        <button
          onClick={() => openModal()}
          className="w-full text-white py-3.5 px-4 text-sm font-bold cursor-pointer"
        >
          Suivre mon dossier
        </button>
      </div>
    </section>
  );
}
