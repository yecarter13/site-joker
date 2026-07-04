"use client";

import { HiSearch, HiLightningBolt, HiLockClosed, HiBadgeCheck } from "react-icons/hi";

const commitments = [
  {
    icon: HiSearch,
    title: "Analyse 100% humaine",
    desc: "Un conseiller en chair et en os lit votre dossier et rédige votre rapport. Pas un algorithme.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: HiLightningBolt,
    title: "Réponse sous 24h",
    desc: "Du lundi au vendredi, vous recevez votre analyse et vos conseils personnalisés en moins d'une journée.",
    gradient: "from-blue-600 to-blue-700",
  },
  {
    icon: HiLockClosed,
    title: "Données protégées RGPD",
    desc: "Vos informations sont confidentielles, jamais revendues à des tiers, supprimées sur simple demande.",
    gradient: "from-blue-700 to-blue-800",
  },
  {
    icon: HiBadgeCheck,
    title: "Remboursé sous 30 jours",
    desc: "Si vous n'êtes pas satisfait de notre accompagnement, nous vous remboursons intégralement. Sans discussion.",
    gradient: "from-blue-600 to-blue-500",
  },
];

export default function CommitmentsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-grid" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-1.5 text-sm font-medium text-blue-600 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            Nos engagements
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            On s&apos;engage, <span className="gradient-text">vraiment</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            La transparence est au cœur de notre démarche. Voici ce que nous vous garantissons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {commitments.map((c) => (
            <div key={c.title} className="group relative bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              {/* Hover gradient bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${c.gradient} rounded-b-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

              <div className={`w-14 h-14 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-${c.gradient.split(" ")[1]}/20 group-hover:scale-110 transition-transform duration-500`}>
                <c.icon className="text-2xl text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
