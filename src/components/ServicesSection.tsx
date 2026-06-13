"use client";

import { HiHome, HiOfficeBuilding, HiDocumentText, HiUserGroup, HiLocationMarker } from "react-icons/hi";

const services = [
  { icon: HiOfficeBuilding, label: "HLM / Logement social" },
  { icon: HiHome, label: "Location privée" },
  { icon: HiDocumentText, label: "Dossier locataire" },
  { icon: HiUserGroup, label: "Garant & caution" },
  { icon: HiLocationMarker, label: "Toute la France" },
];

export default function ServicesSection() {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
          Nous accompagnons :
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {services.map((s) => (
            <div key={s.label} className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-100 hover:border-indigo-200 hover:text-indigo-600 transition-all">
              <s.icon className="text-lg text-indigo-500" />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
