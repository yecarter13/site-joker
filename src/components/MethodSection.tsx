"use client";

import { HiClipboardList, HiUserGroup, HiDocumentReport } from "react-icons/hi";

const steps = [
  {
    number: "01",
    title: "Décrivez votre situation",
    desc: "Remplissez notre formulaire en ligne en 5 minutes : profil, projet logement, contraintes personnelles.",
    time: "5 minutes",
    icon: HiClipboardList,
    color: "from-red-500 to-red-600",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80",
  },
  {
    number: "02",
    title: "Nos experts analysent votre dossier",
    desc: "Un conseiller humain examine votre profil, identifie les points forts à valoriser et les faiblesses à corriger.",
    time: "Sous 24h",
    icon: HiUserGroup,
    color: "from-red-600 to-red-700",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
  },
  {
    number: "03",
    title: "Recevez votre plan d'action",
    desc: "Rapport complet, conseils sur mesure, documents à préparer : tout ce qu'il faut pour convaincre.",
    time: "Résultats concrets",
    icon: HiDocumentReport,
    color: "from-red-700 to-red-800",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-red-100/30 to-red-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 rounded-full px-4 py-1.5 text-sm font-medium text-red-500 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            Notre méthode
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Simple, <span className="gradient-text">humain</span>, efficace
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            En 3 étapes claires, votre dossier passe du brouillon au dossier qui convainc les bailleurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={step.number} className="group relative">
              {/* Connector line */}
              {i < 2 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[40%] h-0.5 bg-gradient-to-r from-red-200 to-red-300 z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-300 rounded-full" />
                </div>
              )}

              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100">
                {/* Image with clip-path */}
                <div className="relative h-44 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-20 z-10`} />
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Number badge */}
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                    <span className={`text-sm font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <step.icon className="text-xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{step.desc}</p>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r ${step.color} px-3 py-1.5 rounded-full shadow`}>
                    <span>⏱</span> {step.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
            <span className="text-2xl">📈</span>
            <div>
              <span className="font-bold text-gray-900">+72%</span>
              <span className="text-gray-600 ml-1">d&apos;amélioration estimée du score bailleur</span>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-400 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Livré sous 24h
          </div>
        </div>
      </div>
    </section>
  );
}
