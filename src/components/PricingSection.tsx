"use client";

import { useModal } from "@/lib/ModalContext";
import { HiCheck, HiStar, HiFire } from "react-icons/hi";

  const plans = [
  { id: "standard",
    name: "Standard",
    price: "700",
    desc: "Pour comprendre ce qui bloque votre dossier et recevoir un rapport personnalisé complet.",
    icon: HiStar,
    gradient: "from-red-500 to-red-600",
    features: [
      "Paiement unique — sans abonnement",
      "Analyse complète de votre profil locataire",
      "Rapport personnalisé détaillé",
      "Points forts & faiblesses identifiés",
      "Liste des documents essentiels à fournir",
      "Orientation vers les dispositifs adaptés",
      "Garantie satisfait ou remboursé 30j",
    ],
  },
  { id: "premium",
    name: "Premium",
    price: "900",
    desc: "Accompagnement complet jusqu'à l'attribution de votre logement.",
    icon: HiFire,
    gradient: "from-red-700 to-red-900",
    popular: true,
    features: [
      "Paiement unique — sans abonnement",
      "Tout le Standard inclus",
      "Vérification et régularisation du dossier",
      "Suivi personnalisé jusqu'à l'attribution",
      "Assistance pour la caution et le premier loyer",
      "Accompagnement administratif complet",
      "Objectif : logement sous 1 mois",
    ],
  },
];

export default function PricingSection() {
  const { openModal } = useModal();
  return (
    <section id="tarifs" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-1.5 text-sm font-medium text-red-500 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            Tarifs
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Choisissez votre            <span className="text-red-500">accompagnement</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Paiement unique. Aucun abonnement. Aucun frais caché.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl flex flex-col ${
                plan.popular
                  ? "border-red-400 shadow-lg shadow-red-100 scale-105 z-10"
                  : "border-gray-100 hover:border-red-200"
              }`}
            >
              {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-700 to-red-900 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  Recommandé
                </div>
              )}

              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                <plan.icon className="text-xl text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>

              <div className="mb-6">
                <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                <span className="text-lg text-gray-500"> €</span>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <HiCheck className={`mt-0.5 flex-shrink-0 ${
                      "text-red-500"
                    }`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => openModal(`Formule ${plan.name}`, plan.id)}
                className={`w-full py-3 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer text-white ${
                  `bg-gradient-to-r ${plan.gradient}`
                }`}
              >
                {plan.popular ? "Choisir Premium" : "Choisir Standard"}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Sous réserve de l&apos;acceptation du dossier par l&apos;organisme bailleur.
        </p>
      </div>
    </section>
  );
}
