"use client";

import { HiHome, HiOfficeBuilding, HiDocumentText, HiUserGroup, HiLocationMarker } from "react-icons/hi";

const services = [
  { icon: HiOfficeBuilding, label: "HLM / Logement social", desc: "Accompagnement pour les logements sociaux et HLM" },
  { icon: HiHome, label: "Location privée", desc: "Optimisation pour le marché locatif privé" },
  { icon: HiDocumentText, label: "Dossier locataire", desc: "Montage et structuration de votre candidature" },
  { icon: HiUserGroup, label: "Garant & caution", desc: "Stratégies pour sécuriser vos garants" },
  { icon: HiLocationMarker, label: "Toute la France", desc: "Intervention sur l'ensemble du territoire" },
];

export default function ServicesSection() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-50 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-4">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              Notre accompagnement
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Un service pour
              <span className="gradient-text"> tous les profils </span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Que vous soyez salarié, indépendant, étudiant ou en situation complexe, nous adaptons notre analyse à votre profil unique.
            </p>
            <div className="space-y-4">
              {services.map((s) => (
                <div key={s.label} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                    <s.icon className="text-xl text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{s.label}</div>
                    <div className="text-sm text-gray-500">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image with geometric frame */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-indigo-200 to-purple-200 clip-octagon animate-float-slow" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-dots-indigo rounded-2xl" />
            <div className="absolute top-1/2 -left-4 w-16 h-16 border-2 border-indigo-200 rounded-xl rotate-45 animate-float" />

            {/* Main image */}
            <div className="relative clip-rounded-hex overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&q=80"
                alt="Accompagnement personnalisé"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="text-2xl">📋</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Analyse complète</div>
                  <div className="text-xs text-gray-500">Rapport 5-8 pages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
