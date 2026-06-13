"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";

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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Nos logements disponibles
            </h2>
            <p className="text-gray-500 mt-2">
              Découvrez les dernières annonces ajoutées
            </p>
          </div>
            <Link
              href="/catalog"
              className="hidden md:inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
            >
              Voir tous les logements →
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 6).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {properties.length > 6 && (
          <div className="text-center mt-8 md:hidden">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-sm"
            >
              Voir tous les logements disponibles →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
