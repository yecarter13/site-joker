"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp, FaCheck } from "react-icons/fa";
import { HiStar, HiLightningBolt, HiFire } from "react-icons/hi";

const plans = [
  {
    name: "Standard",
    price: "24",
    cents: "99",
    desc: "Pour comprendre ce qui bloque votre dossier et recevoir un rapport personnalisé complet.",
    icon: HiStar,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Paiement unique — sans abonnement",
      "Analyse complète de votre profil locataire",
      "Rapport personnalisé détaillé (5-8 pages)",
      "Points forts & faiblesses identifiés",
      "Liste des documents essentiels à fournir",
      "Orientation vers les dispositifs adaptés",
      "Garantie satisfait ou remboursé 30j",
    ],
  },
  {
    name: "Prioritaire",
    price: "49",
    cents: "90",
    desc: "Analyse express, suivi renforcé et accompagnement jusqu'à l'obtention de votre logement.",
    icon: HiLightningBolt,
    gradient: "from-amber-500 to-orange-500",
    popular: true,
    features: [
      "Paiement unique — sans abonnement",
      "Tout le Standard inclus",
      "Analyse express sous 4h (jours ouvrés)",
      "Relecture & correction de vos documents",
      "Simulation de score bailleur estimé",
      "Support email prioritaire dédié",
      "Stratégie HLM vs secteur privé",
      "Accompagnement jusqu'à l'obtention du logement",
    ],
  },
  {
    name: "Premium",
    price: "125",
    cents: "00",
    desc: "Pour être relogé dans les 30 jours — expulsion, fin de bail, hébergement précaire.",
    icon: HiFire,
    gradient: "from-purple-500 to-pink-500",
    urgent: true,
    features: [
      "Paiement unique — sans abonnement",
      "Traitement en priorité absolue",
      "Montage complet du dossier locataire",
      "Lettre de motivation rédigée pour vous",
      "Coaching garant inclus",
      "Accompagnement jusqu'à l'obtention du logement",
      "Objectif : relogement sous 30 jours",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="tarifs" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl" />
      <div className="absolute top-40 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            Tarifs clairs
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Choisissez votre <span className="gradient-text">accompagnement</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paiement unique &middot; Aucun abonnement &middot; Aucun frais caché.
            Vous ne payez qu&apos;après la validation de votre éligibilité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl p-6 border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col ${
                plan.popular
                  ? "border-amber-400 shadow-xl shadow-amber-100 scale-105 md:scale-110 z-10"
                  : plan.urgent
                  ? "border-gray-100 hover:border-indigo-200 mt-8 md:mt-0"
                  : "border-gray-100 hover:border-indigo-200"
              }`}
            >
              {/* Decorative background shape */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${plan.gradient} opacity-5 rounded-bl-full`} />

              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap flex items-center gap-1 z-20">
                  <span>⭐</span> Le plus choisi
                </div>
              )}
              {plan.urgent && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-lg whitespace-nowrap flex items-center gap-1 z-20">
                  <span>🚨</span> Urgence — relogement rapide
                </div>
              )}

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <plan.icon className="text-2xl text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4 min-h-[40px]">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-lg text-gray-500">,{plan.cents}€</span>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <FaCheck className={`mt-0.5 flex-shrink-0 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppLink(`Bonjour, je suis intéressé par la formule ${plan.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 ${
                  plan.popular
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white"
                    : plan.urgent
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : `bg-gradient-to-r ${plan.gradient} text-white`
                }`}
              >
                <FaWhatsapp />
                {plan.urgent ? "Je veux être relogé rapidement" : plan.popular ? "Je veux ce suivi" : "Commencer l'analyse"}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-gray-400 flex flex-wrap items-center justify-center gap-4 bg-gray-50 rounded-2xl py-4 px-6 max-w-2xl mx-auto">
          <span>💳 Paiement sécurisé</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>🔒 Données protégées</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>Aucun paiement avant validation</span>
          <span className="hidden sm:inline">&middot;</span>
          <span>✅ Remboursé sous 30j</span>
        </div>
      </div>
    </section>
  );
}
