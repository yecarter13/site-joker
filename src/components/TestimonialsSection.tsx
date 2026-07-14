"use client";

import { HiCheckCircle } from "react-icons/hi";

const testimonials = [
  {
    name: "Marie T.",
    role: "CDI — Lyon · T2 trouvé en 3 semaines",
    badge: "Standard",
    text: "Mon dossier était refusé partout depuis presque 8 mois. J'avais perdu espoir. Après l'analyse de Espace Habitat, j'ai compris exactement ce qui ne fonctionnait pas. J'ai suivi les conseils à la lettre et en moins de 3 semaines, j'avais signé un bail pour un T2 à Lyon.",
    image: "/icone.jpeg",
  },
  {
    name: "Clara B.",
    role: "Auto-entrepreneuse — Paris · T3",
    badge: "Prioritaire",
    text: "En tant qu'auto-entrepreneur, impossible de convaincre les propriétaires. Le rapport m'a appris à présenter mes revenus et à choisir les bons justificatifs. Accepté au 2e dossier !",
    image: "/icone1.jpeg",
  },
  {
    name: "Sophie L.",
    role: "Logement social — Marseille",
    badge: "Standard",
    text: "Je cherchais un HLM depuis 2 ans. L'équipe m'a expliqué comment reformuler ma demande et quels documents prioritaires joindre. Ma demande est remontée en priorité en quelques semaines.",
    image: "/icone2.jpeg",
  },
  {
    name: "Amina D.",
    role: "CDD — Bordeaux · T2",
    badge: "Prioritaire",
    text: "Service vraiment sérieux. Un vrai regard humain sur notre situation. La conseillère a identifié des erreurs dans mon dossier que je n'aurais jamais trouvées seule.",
    image: "/icone3.jpeg",
  },
  {
    name: "Lucie M.",
    role: "Situation complexe — Nantes · T3",
    badge: "Premium",
    text: "Impeccable. Dossier très compliqué (divorce récent, revenus irréguliers). Le rapport a tout clairement expliqué. Trouvé un appartement en 5 semaines.",
    image: "/icone4.jpeg",
  },
  {
    name: "Emma R.",
    role: "Étudiante — Lille · Studio",
    badge: "Standard",
    text: "Rapport de 8 pages ultra-détaillé avec points forts, faiblesses, liste de documents et stratégie par type de bailleur. Le prix est très raisonnable pour ce niveau de service.",
    image: "/icone5.jpeg",
  },
];

const badgeColors: Record<string, string> = {
  Standard: "bg-gray-100 text-gray-600",
  Prioritaire: "bg-red-100 text-red-700",
  Premium: "bg-red-50 text-red-500",
};

export default function TestimonialsSection() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-red-50/50 to-transparent" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-50 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-red-50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 rounded-full px-4 py-1.5 text-sm font-medium text-red-500 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            Avis vérifiés
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Ils ont trouvé <span className="gradient-text">leur logement</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des centaines de familles et personnes seules accompagnées chaque année. Voici ce qu&apos;elles en disent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="group relative bg-white rounded-3xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Decorative gradient dot */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-bl-3xl -z-10" />

              {/* Quote mark */}
              <div className="text-4xl leading-none text-red-200 mb-2">&ldquo;</div>

              <p className="text-sm text-gray-700 leading-relaxed mb-5 line-clamp-4">
                {t.text}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-gray-200 flex-shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500 truncate">{t.role}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <HiCheckCircle className="text-red-500 text-sm" />
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColors[t.badge] || badgeColors.Standard}`}>
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
