"use client";

import Link from "next/link";
import { HiHome, HiStar, HiSwitchHorizontal } from "react-icons/hi";

const categories = [
  {
    href: "/echange",
    label: "Échange de logement",
    description: "Trouvez un échange de HLM en quelques clics",
    icon: HiSwitchHorizontal,
    bg: "bg-blue-600",
    shadow: "shadow-blue-600/30",
  },
  {
    href: "/catalog",
    label: "Logement disponible",
    description: "Consultez tous nos logements disponibles immédiatement",
    icon: HiHome,
    bg: "bg-blue-600",
    shadow: "shadow-blue-600/30",
  },
  {
    href: "/catalog?filter=premium",
    label: "Location appartement premium",
    description: "Des logements haut de gamme",
    icon: HiStar,
    bg: "bg-blue-600",
    shadow: "shadow-blue-600/30",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={`group relative overflow-hidden rounded-2xl ${cat.bg} p-5 md:p-6 text-white shadow-lg ${cat.shadow} hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]`}
            >
              <div className="relative z-10">
                <cat.icon className="text-2xl md:text-3xl mb-3 opacity-90" />
                <h3 className="text-lg md:text-xl font-bold mb-1.5">{cat.label}</h3>
                <p className="text-sm text-white/80">{cat.description}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
