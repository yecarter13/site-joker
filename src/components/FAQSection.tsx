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
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-600">
            Tout ce que vous voulez savoir
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden transition-all bg-white"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span>{faq.q}</span>
                <HiChevronDown
                  className={`text-gray-400 transition-transform text-lg flex-shrink-0 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
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
