"use client";

import { useModal } from "@/lib/ModalContext";
import { FaArrowRight } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import Image from "next/image";

const heroImages = [
  { src: "/hero1.webp", alt: "Espace Habitat" },
  { src: "/hero2.webp", alt: "Espace Habitat" },
  { src: "/hero3.webp", alt: "Espace Habitat" },
];

export default function HeroSection() {
  const { openModal } = useModal();

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {heroImages.map((img) => (
            <div key={img.src} className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-2xl rotate-[-3deg] first:rotate-[3deg] last:rotate-[2deg]">
              <Image
                src={img.src}
                alt={img.alt}
                width={208}
                height={208}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-1.5 text-xs md:text-sm mb-5">
            <HiDocumentText className="text-blue-300" />
            <span>+800 dossiers accompagnés</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4">
            Trouvez un logement en toute sérénité avec <span className="text-blue-400">Espace Habitat</span>.
          </h1>

          <p className="text-sm md:text-base text-slate-100/80 mb-4 leading-relaxed max-w-2xl mx-auto">
            Nous vous accompagnons de A à Z dans votre recherche de logement social : étude de votre situation, constitution d&apos;un dossier solide, orientation vers les bailleurs adaptés et suivi personnalisé de vos démarches.
          </p>

          <p className="text-sm md:text-base text-slate-100/60 mb-6 leading-relaxed max-w-2xl mx-auto">
            Notre objectif est de vous faire gagner du temps et de maximiser vos chances de trouver un logement correspondant à vos besoins.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
            <button
              onClick={() => openModal()}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3.5 rounded-full text-base font-bold transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-[0.97] cursor-pointer"
            >
              Commencez votre accompagnement dès aujourd&apos;hui
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 px-6 py-3.5 rounded-full text-base font-bold transition-all shadow-lg"
            >
              Voir les logements disponibles
            </a>
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
                <div className="text-[11px] md:text-sm text-slate-200/70 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-40 bg-gradient-to-r from-slate-700 to-slate-600 md:hidden">
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
