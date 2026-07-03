"use client";

import Link from "next/link";
import { FaArrowRight, FaFire, FaHome, FaStar } from "react-icons/fa";

const items = [
  {
    icon: FaFire,
    title: "L'offre du moment",
    desc: "Profitez de nos offres exclusives sur les logements disponibles.",
    link: "/catalog?filter=offreDuMoment",
    label: "Voir l'offre",
  },
  {
    icon: FaHome,
    title: "Logement disponible",
    desc: "Consultez la liste des logements disponibles à la location.",
    link: "/catalog",
    label: "Voir les logements",
  },
  {
    icon: FaStar,
    title: "Location appartement premium",
    desc: "Découvrez nos appartements haut de gamme meublés ou non.",
    link: "/catalog?filter=premium",
    label: "Voir les appartements",
  },
];

export default function LouerSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Louer avec <span className="text-blue-600">Espace Habitat</span>
          </h2>
          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Trouvez le logement qui vous correspond parmi nos offres.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-200 transition-colors">
                  <Icon className="text-blue-600 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group/btn hover:text-blue-700 transition-colors"
                >
                  {item.label}
                  <FaArrowRight className="text-[10px] group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
