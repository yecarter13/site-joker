"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { HiArrowRight, HiChevronLeft, HiChevronRight, HiSearch } from "react-icons/hi";
import { useModal } from "@/lib/ModalContext";

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

const PER_PAGE = 9;

export default function AvailableListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch("/api/properties?status=Disponible")
      .then((r) => r.json())
      .then(setProperties)
      .catch(() => {});
  }, []);

  if (properties.length === 0) return null;

  const filtered = properties.filter((p) => {
    if (city && !p.city.toLowerCase().includes(city.toLowerCase())) return false;
    if (maxPrice && p.price > parseFloat(maxPrice)) return false;
    if (type && p.type !== type) return false;
    return true;
  });

  const cities = [...new Set(properties.map((p) => p.city))].sort();
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  function resetFilters() {
    setCity("");
    setMaxPrice("");
    setType("");
    setPage(1);
  }

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-tr from-indigo-50/50 to-purple-50/50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-indigo-50 rounded-full px-4 py-1.5 text-sm font-medium text-indigo-600 mb-3">
              <span className="w-2 h-2 bg-indigo-500 rounded-full" />
              Selection
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
               logements <span className="gradient-text">disponibles</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm">{filtered.length} logement{filtered.length > 1 ? "s" : ""} a louer</p>
          </div>
          <Link
            href="/catalog"
            className="hidden md:inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm group"
          >
            Voir tous les logements
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              value={city}
              onChange={(e) => { setCity(e.target.value); setPage(1); }}
              placeholder="Ville..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <select
            value={maxPrice}
            onChange={(e) => { setMaxPrice(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          >
            <option value="">Budget max</option>
            <option value="500">500 €</option>
            <option value="800">800 €</option>
            <option value="1000">1 000 €</option>
            <option value="1500">1 500 €</option>
            <option value="2000">2 000 €</option>
            <option value="3000">3 000 €</option>
          </select>
          <select
            value={type}
            onChange={(e) => { setType(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          >
            <option value="">Type</option>
            <option value="Prive">Prive</option>
            <option value="HLM">HLM</option>
          </select>
          {(city || maxPrice || type) && (
            <button onClick={resetFilters} className="text-xs text-gray-500 hover:text-indigo-600 font-medium underline underline-offset-2 cursor-pointer">
              Effacer
            </button>
          )}
        </div>

        {/* Pills villes */}
        {!city && cities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {cities.slice(0, 8).map((c) => (
              <button
                key={c}
                onClick={() => { setCity(c); setPage(1); }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                {c}
              </button>
            ))}
          </div>
        )}

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
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <HiChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`min-w-[40px] h-10 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
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
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <HiChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Mobile link to catalog */}
        {filtered.length > PER_PAGE && (
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
