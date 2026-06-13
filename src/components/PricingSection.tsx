"use client";

import { getWhatsAppLink } from "@/lib/utils";
import { HiCheck } from "react-icons/hi";
import { HiStar, HiLightningBolt, HiFire } from "react-icons/hi";

const plans = [
  {
    name: "Standard",
    price: "24",
    cents: "99",
    desc: "Pour comprendre ce qui bloque votre dossier et recevoir un rapport personnalisé complet.",
    icon: HiStar,
    color: "indigo",
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
    color: "amber",
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
    desc: "Pour être relogé dans les 30 jours — expulsion, fin de bail, hébergement précaire, situation d'urgence.",
    icon: HiFire,
    color: "purple",
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
    <section id="tarifs" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Tarifs clairs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez votre accompagnement. Paiement unique · Aucun abonnement · Aucun frais caché.
            Vous ne payez qu&apos;après la validation de votre éligibilité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl flex flex-col ${
                plan.popular
                  ? "border-amber-400 shadow-lg shadow-amber-100 scale-105 md:scale-110"
                  : "border-gray-100 hover:border-indigo-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  Le plus choisi
                </div>
              )}
              {plan.urgent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                  Urgence — relogement rapide
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                plan.color === "indigo" ? "bg-indigo-100 text-indigo-600" :
                plan.color === "amber" ? "bg-amber-100 text-amber-600" :
                "bg-purple-100 text-purple-600"
              }`}>
                <plan.icon className="text-2xl" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-lg text-gray-500">,{plan.cents}€</span>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <HiCheck className={`mt-0.5 flex-shrink-0 ${
                      plan.color === "indigo" ? "text-indigo-500" :
                      plan.color === "amber" ? "text-amber-500" :
                      "text-purple-500"
                    }`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={getWhatsAppLink(`Bonjour, je suis intéressé par la formule ${plan.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-amber-400 to-orange-500 text-white hover:shadow-lg"
                    : plan.urgent
                    ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:shadow-lg"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {plan.urgent ? "Je veux être relogé rapidement →" : plan.popular ? "Je veux ce suivi →" : "Commencer l'analyse →"}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-gray-400 flex flex-wrap items-center justify-center gap-4">
          <span>Paiement sécurisé</span>
          <span>·</span>
          <span>Données protégées</span>
          <span>·</span>
          <span>Aucun paiement avant validation</span>
          <span>·</span>
          <span>Remboursé sous 30j</span>
        </div>
      </div>
    </section>
  );
}
