"use client";

import { HiSearch, HiLightningBolt, HiLockClosed, HiBadgeCheck } from "react-icons/hi";

const commitments = [
  {
    icon: HiSearch,
    title: "Analyse 100% humaine",
    desc: "Un conseiller en chair et en os lit votre dossier et rédige votre rapport. Pas un algorithme.",
  },
  {
    icon: HiLightningBolt,
    title: "Réponse sous 24h",
    desc: "Du lundi au vendredi, vous recevez votre analyse et vos conseils personnalisés en moins d'une journée.",
  },
  {
    icon: HiLockClosed,
    title: "Données protégées RGPD",
    desc: "Vos informations sont confidentielles, jamais revendues à des tiers, supprimées sur simple demande.",
  },
  {
    icon: HiBadgeCheck,
    title: "Remboursé sous 30 jours",
    desc: "Si vous n'êtes pas satisfait de notre accompagnement, nous vous remboursons intégralement. Sans discussion.",
  },
];

export default function CommitmentsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Nos engagements
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            On s&apos;engage, vraiment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {commitments.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <c.icon className="text-2xl" />
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
