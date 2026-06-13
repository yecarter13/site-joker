"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { HiArrowRight, HiChevronLeft, HiChevronRight } from "react-icons/hi";

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

const PER_PAGE = 10;

export default function AvailableListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/properties?status=Disponible")
      .then((r) => r.json())
      .then(setProperties)
      .catch(() => {});
  }, []);

  if (properties.length === 0) return null;

  const totalPages = Math.ceil(properties.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = properties.slice(start, start + PER_PAGE);

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-3">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              Sélection
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Nos logements <span className="gradient-text">disponibles</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm">{properties.length} logement{properties.length > 1 ? "s" : ""} à louer</p>
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
          {visible.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <HiChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`min-w-[40px] h-10 rounded-xl text-sm font-semibold transition-all ${
                  page === i + 1
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                    : "border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <HiChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Mobile link to catalog */}
        {properties.length > PER_PAGE && (
          <div className="text-center mt-6 md:hidden">
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm group"
            >
              Voir tous les logements
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
