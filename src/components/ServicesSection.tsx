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
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-4">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              Notre accompagnement
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Un service pour
              <span className="text-indigo-600"> tous les profils </span>
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

          <div className="relative">
            <img
              src="/corps.webp"
              alt="Accompagnement personnalisé"
              className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 md:p-4 shadow-xl border border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <HiDocumentText className="text-indigo-600" />
                </div>
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
