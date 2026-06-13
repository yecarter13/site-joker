"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { HiArrowRight } from "react-icons/hi";

interface Property {
  id: string;
  title: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number | null;
  city: string;
  district: string | null;
  type: string;
  dpe: string | null;
  status: string;
  images: string[];
  reference: string;
  furnished: boolean | null;
  fees: number | null;
}

export default function AvailableListings() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/properties?status=Disponible")
      .then((r) => r.json())
      .then(setProperties)
      .catch(() => {});
  }, []);

  if (properties.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background decor */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-4">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              Sélection
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Nos logements <span className="gradient-text">disponibles</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Découvrez les dernières annonces ajoutées
            </p>
          </div>
          <Link
            href="/catalog"
            className="hidden md:inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm group"
          >
            Voir tous les logements
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {properties.length > 6 && (
          <div className="text-center mt-10">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
            >
              Voir tous les logements disponibles
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
