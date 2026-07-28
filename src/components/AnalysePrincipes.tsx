"use client";

import { useState, useCallback } from "react";
import {
  HiCheckCircle, HiSearch, HiLocationMarker, HiDocumentText,
  HiUserGroup, HiHome, HiShieldCheck, HiChevronLeft, HiChevronRight,
  HiStar, HiEye, HiClipboardCheck, HiOfficeBuilding,
} from "react-icons/hi";
import { FaFileSignature, FaHandshake, FaChartLine } from "react-icons/fa";
import { useModal } from "@/lib/ModalContext";

const principes = [
  {
    step: "01",
    icon: HiClipboardCheck,
    title: "Vérification complète de votre dossier",
    desc: "Nous contrôlons l'ensemble des pièces justificatives et nous nous assurons que votre demande est complète et à jour. Grâce à votre numéro unique et votre situation, cela facilite également votre chance auprès d'un bailleur.",
    color: "from-emerald-500 to-emerald-600",
    bgLight: "bg-emerald-50",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200",
  },
  {
    step: "02",
    icon: HiSearch,
    title: "Étude de votre situation",
    desc: "Nous analysons votre profil (composition familiale, ressources, emploi, handicap, séparation, logement actuel, etc.) afin d'identifier les dispositifs qui peuvent s'appliquer à votre situation.",
    color: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    step: "03",
    icon: HiLocationMarker,
    title: "Orientation vers les dispositifs adaptés",
    desc: "Selon votre profil, nous vous expliquons les démarches liées au DALO, à Action Logement, aux demandes de mutation HLM, aux contingents préfectoraux, municipaux ou employeurs, lorsque vous pouvez y prétendre.",
    color: "from-violet-500 to-violet-600",
    bgLight: "bg-violet-50",
    textColor: "text-violet-600",
    borderColor: "border-violet-200",
  },
  {
    step: "04",
    icon: HiDocumentText,
    title: "Optimisation de votre dossier",
    desc: "Nous vous conseillons sur les justificatifs à fournir et sur la manière de présenter votre situation afin que votre dossier soit clair, cohérent et retienne l'attention des bailleurs lors de son examen.",
    color: "from-amber-500 to-amber-600",
    bgLight: "bg-amber-50",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
  },
  {
    step: "05",
    icon: HiUserGroup,
    title: "Accompagnement personnalisé",
    desc: "Nous répondons à vos questions, vous aidons à éviter les erreurs administratives et vous guidons à chaque étape de votre demande.",
    color: "from-rose-500 to-rose-600",
    bgLight: "bg-rose-50",
    textColor: "text-rose-600",
    borderColor: "border-rose-200",
  },
  {
    step: "06",
    icon: HiOfficeBuilding,
    title: "Recherche de logement",
    desc: "Nous montons un dossier locatif en béton, solide, fluide et transparent, éligible à toute requête. Selon vos critères, nous recherchons les logements disponibles et vous proposons les multiples choix avec les prix, avant de passer aux visites.",
    color: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50",
    textColor: "text-cyan-600",
    borderColor: "border-cyan-200",
    details: [
      "Entre 3 à 5 visites organisées",
      "3 jours pour choisir le logement qui vous convient",
    ],
  },
  {
    step: "07",
    icon: FaFileSignature,
    title: "Signature de votre contrat de bail",
    desc: "Une fois le logement choisi, nous vous accompagnons jusqu'à la signature de votre contrat de bail, en nous assurant que toutes les conditions sont réunies.",
    color: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
    borderColor: "border-indigo-200",
  },
];

export default function AnalysePrincipes() {
  const [current, setCurrent] = useState(0);
  const { openModal } = useModal();
  const total = principes.length;

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
  }, [total]);

  const p = principes[current];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-4">
            <HiStar className="text-indigo-500" />
            Analyse complète
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Principes fondamentaux
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez notre méthodologie complète pour maximiser vos chances d&apos;obtenir un logement social.
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center gap-2 justify-center mb-2">
            <span className="text-sm font-medium text-gray-500">
              Étape {current + 1} / {total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Main card */}
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all cursor-pointer"
          >
            <HiChevronLeft className="text-lg md:text-xl" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all cursor-pointer"
          >
            <HiChevronRight className="text-lg md:text-xl" />
          </button>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-500">
            <div className="md:flex">
              {/* Left colored panel */}
              <div className={`md:w-80 lg:w-96 p-8 md:p-10 bg-gradient-to-br ${p.color} text-white flex flex-col justify-between`}>
                <div>
                  <div className="text-5xl md:text-6xl font-black opacity-20 leading-none mb-6">
                    {p.step}
                  </div>
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <p.icon className="text-3xl text-white" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold leading-tight mb-3">
                    {p.title}
                  </h2>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <HiEye className="text-white" />
                    <span>
                      {current + 1} / {total}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right content */}
              <div className="flex-1 p-8 md:p-10">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                  {p.desc}
                </p>

                {"details" in p && p.details && (
                  <div className="space-y-3 mb-6">
                    {p.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <HiCheckCircle className="text-cyan-600 text-sm" />
                        </div>
                        <span className="text-gray-700">{d}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`inline-flex items-center gap-2 ${p.bgLight} ${p.textColor} px-4 py-2 rounded-full text-sm font-medium`}>
                  <span className="w-2 h-2 rounded-full bg-current" />
                  Principe clé n°{current + 1}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {principes.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === current
                  ? "w-8 h-3 bg-indigo-600"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
            <HiShieldCheck className="text-5xl text-indigo-600 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Prêt à commencer ?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Notre objectif principal est de vous aider à présenter un dossier sérieux, complet et adapté à votre situation afin de mettre toutes les chances de votre côté dans le respect des règles d&apos;attribution des logements sociaux.
            </p>
            <button
              onClick={() => openModal()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-[0.97] cursor-pointer"
            >
              Contactez-nous en privé pour étudier votre situation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
