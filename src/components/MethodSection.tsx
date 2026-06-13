"use client";

import { HiClipboardList, HiUserGroup, HiDocumentReport } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Décrivez votre situation",
    desc: "Remplissez notre formulaire en ligne en 5 minutes : profil, projet logement, contraintes personnelles.",
    time: "5 minutes",
    icon: HiClipboardList,
  },
  {
    number: "02",
    title: "Nos experts analysent votre dossier",
    desc: "Un conseiller humain examine votre profil, identifie les points forts à valoriser et les faiblesses à corriger.",
    time: "Sous 24h",
    icon: HiUserGroup,
  },
  {
    number: "03",
    title: "Recevez votre plan d'action",
    desc: "Rapport complet, conseils sur mesure, documents à préparer : tout ce qu'il faut pour convaincre.",
    time: "Résultats concrets",
    icon: HiDocumentReport,
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Notre méthode
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, humain, efficace. En 3 étapes claires, votre dossier passe du brouillon au dossier qui convainc les bailleurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.number} className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all">
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-3 text-2xl text-indigo-300 font-bold">→</div>
              )}
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <step.icon className="text-2xl" />
              </div>
              <div className="text-xs font-bold text-indigo-500 mb-2">{step.number}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{step.desc}</p>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {step.time}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-5 py-2 text-sm font-semibold text-indigo-700">
            +72% d&apos;amélioration estimée du score bailleur
          </div>
          <p className="text-xs text-gray-400 mt-2">Livré sous 24h</p>
        </div>
      </div>
    </section>
  );
}
