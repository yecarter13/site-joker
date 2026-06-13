"use client";

import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

const faqs = [
  {
    q: "Comment fonctionne l'analyse de dossier ?",
    a: "Vous remplissez notre formulaire en ligne (5 min), un conseiller humain analyse votre profil et vous recevez un rapport personnalisé sous 24h avec vos points forts, faiblesses et les documents à fournir pour maximiser vos chances.",
  },
  {
    q: "Quels types de logements puis-je viser ?",
    a: "Nous couvrons tous les types de logements : HLM / logement social, location privée, partout en France. Notre analyse est adaptée à chaque type de bailleur et leurs attentes spécifiques.",
  },
  {
    q: "Combien de temps avant d'obtenir un logement ?",
    a: "Avec la formule Standard, vous recevez votre rapport sous 24h. La formule Prioritaire inclut un accompagnement jusqu'à l'obtention de votre logement. La formule Premium vise un relogement sous 30 jours.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas satisfait ?",
    a: "Nous remboursons intégralement votre paiement sous 30 jours si vous n'êtes pas satisfait de notre accompagnement. Sans condition, sans discussion.",
  },
  {
    q: "Mes données sont-elles protégées ?",
    a: "Absolument. Vos informations sont confidentielles, jamais revendues à des tiers et supprimées sur simple demande. Nous sommes conformes RGPD.",
  },
  {
    q: "Puis-je payer après validation de mon éligibilité ?",
    a: "Oui ! Vous ne payez qu'après la validation de votre éligibilité. Aucun paiement n'est demandé avant que nous ayons confirmé que nous pouvons vous aider.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-50 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="text-lg text-gray-600">
            Tout ce que vous voulez savoir
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 border ${
                openIndex === i ? "border-indigo-200 shadow-lg shadow-indigo-50" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-4 md:p-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                <HiChevronDown
                  className={`text-gray-400 transition-transform duration-300 text-lg flex-shrink-0 ${
                    openIndex === i ? "rotate-180 text-indigo-500" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
