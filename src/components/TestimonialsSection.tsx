"use client";

import { HiCheckCircle, HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Marie T.",
    role: "CDI — Lyon · T2 trouvé en 3 semaines",
    badge: "Standard",
    text: "Mon dossier était refusé partout depuis presque 8 mois. J'avais perdu espoir. Après l'analyse de Logement Dossier, j'ai compris exactement ce qui ne fonctionnait pas dans ma candidature. J'ai suivi les conseils à la lettre et en moins de 3 semaines, j'avais signé un bail pour un T2 à Lyon. Je recommande à 1000% !",
  },
  {
    name: "Karim B.",
    role: "Auto-entrepreneur — Paris · T3",
    badge: "Prioritaire",
    text: "En tant qu'auto-entrepreneur, impossible de convaincre les propriétaires. Le rapport m'a appris à présenter mes revenus et à choisir les bons justificatifs. Accepté au 2e dossier !",
  },
  {
    name: "Sophie L.",
    role: "Logement social — Marseille",
    badge: "Standard",
    text: "Je cherchais un HLM depuis 2 ans. L'équipe m'a expliqué comment reformuler ma demande et quels documents prioritaires joindre. Ma demande est remontée en priorité en quelques semaines.",
  },
  {
    name: "Amina D.",
    role: "CDD — Bordeaux · T2",
    badge: "Prioritaire",
    text: "Service vraiment sérieux. Un vrai regard humain sur notre situation. La conseillère a identifié des erreurs dans mon dossier que je n'aurais jamais trouvées seule. Excellent !",
  },
  {
    name: "Lucie M.",
    role: "Situation complexe — Nantes · T3",
    badge: "Premium",
    text: "Impeccable. Dossier très compliqué (divorce récent, revenus irréguliers). Le rapport a tout clairement expliqué. Trouvé un appartement en 5 semaines. Merci infiniment !",
  },
  {
    name: "Thomas R.",
    role: "Étudiant — Lille · Studio",
    badge: "Standard",
    text: "Rapport de 8 pages ultra-détaillé avec points forts, faiblesses, liste de documents et stratégie par type de bailleur. Le prix est très raisonnable pour ce niveau de service. Top !",
  },
];

const badgeColors: Record<string, string> = {
  Standard: "bg-gray-100 text-gray-600",
  Prioritaire: "bg-amber-100 text-amber-700",
  Premium: "bg-purple-100 text-purple-700",
};

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Avis vérifiés
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des centaines de familles et personnes seules accompagnées chaque année. Voici ce qu&apos;elles en disent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.role}</div>
                </div>
                <div className="flex items-center gap-2">
                  <HiCheckCircle className="text-green-500 text-sm" />
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[t.badge] || badgeColors.Standard}`}>
                    {t.badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
