"use client";

import { useModal } from "@/lib/ModalContext";
import { HiCheck, HiHome } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

export default function AttributionSection() {
  const { openModal } = useModal();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <HiHome className="text-blue-300" />
              <span>Attribution rapide</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Pour l&apos;Attribution de logement sous 1 mois
            </h2>
            <p className="text-blue-100/80 mb-6 leading-relaxed">
              Je prends en charge la validation complète de votre dossier et vous accompagne dans toutes les démarches nécessaires.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Vérification et régularisation du dossier",
                "Suivi personnalisé jusqu'à l'attribution",
                "Assistance pour la caution et le premier loyer",
                "Accompagnement administratif complet",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HiCheck className="text-green-400 text-sm" />
                  </div>
                  <span className="text-blue-50">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-blue-200/60 mb-6">
              Et la commission d&apos;accompagnement selon le nombre de pièces du logement demandé.
            </p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-full font-bold text-sm transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              Suivre mon dossier
              <FaArrowRight className="text-xs" />
            </button>
            <p className="text-xs text-blue-200/40 mt-4">
              Sous réserve de l&apos;acceptation du dossier par l&apos;organisme bailleur.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <div className="text-5xl mb-4 text-blue-300">{"{"} / {"}"}</div>
              <h3 className="text-xl font-bold mb-2">Comment ça fonctionne ?</h3>
              <p className="text-blue-100/60 text-sm leading-relaxed">
                Après votre demande, nous analysons votre situation et vous proposons un accompagnement sur mesure. 
                Notre objectif : obtenir une attribution de logement sous 1 mois.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
