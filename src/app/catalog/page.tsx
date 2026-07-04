"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { HiSearch, HiFilter, HiX } from "react-icons/hi";

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
  offreDuMoment: boolean;
  premium: boolean;
}

type SortKey = "price-asc" | "price-desc" | "surface-asc" | "surface-desc" | "rooms-asc" | "rooms-desc";

function CatalogContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");
  const [minRooms, setMinRooms] = useState("");
  const [dpe, setDpe] = useState("");
  const [furnished, setFurnished] = useState("");
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "");
  const [sort, setSort] = useState<SortKey>("price-asc");

  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    else params.set("status", "Disponible");
    fetch(`/api/properties?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [statusFilter]);

  useEffect(() => {
    setFilter(searchParams.get("filter") || "");
    setStatusFilter(searchParams.get("status") || "");
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (city) result = result.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
    if (maxPrice) result = result.filter((p) => p.price <= parseFloat(maxPrice));
    if (type) result = result.filter((p) => p.type === type);
    if (minRooms) result = result.filter((p) => p.rooms >= parseInt(minRooms));
    if (dpe) result = result.filter((p) => p.dpe === dpe);
    if (furnished === "oui") result = result.filter((p) => p.furnished === true);
    else if (furnished === "non") result = result.filter((p) => p.furnished === false);
    if (filter === "offreDuMoment") result = result.filter((p) => p.offreDuMoment);
    if (filter === "premium") result = result.filter((p) => p.premium);

    result.sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "surface-asc": return a.surface - b.surface;
        case "surface-desc": return b.surface - a.surface;
        case "rooms-asc": return a.rooms - b.rooms;
        case "rooms-desc": return b.rooms - a.rooms;
        default: return 0;
      }
    });

    return result;
  }, [city, maxPrice, type, minRooms, dpe, furnished, sort, filter, properties]);

  const cities = useMemo(() => [...new Set(properties.map((p) => p.city))].sort(), [properties]);
  const activeFilters = [city, maxPrice, type, minRooms, dpe, furnished, filter, statusFilter].filter(Boolean).length;

  function resetFilters() {
    setCity("");
    setMaxPrice("");
    setType("");
    setMinRooms("");
    setDpe("");
    setFurnished("");
    setFilter("");
    setStatusFilter("");
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex md:hidden items-center gap-2 text-sm font-medium text-gray-700 mb-2 cursor-pointer"
            >
              <HiFilter /> Filtres
              {activeFilters > 0 && (
                <span className="bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {activeFilters}
                </span>
              )}
              <span className="text-gray-400 ml-1">{showFilters ? "▲" : "▼"}</span>
            </button>

            <div className={`${showFilters || "hidden"} md:flex flex-col md:flex-row gap-2.5`}>
              <div className="flex-1 relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Rechercher par ville..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2.5">
                <select value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Budget max</option>
                  <option value="500">500 €</option>
                  <option value="800">800 €</option>
                  <option value="1000">1 000 €</option>
                  <option value="1500">1 500 €</option>
                  <option value="2000">2 000 €</option>
                  <option value="3000">3 000 €</option>
                </select>
                <select value={type} onChange={(e) => setType(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Type</option>
                  <option value="Prive">Prive</option>
                  <option value="HLM">HLM</option>
                </select>
                <select value={minRooms} onChange={(e) => setMinRooms(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Pieces min</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
                <select value={dpe} onChange={(e) => setDpe(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">DPE</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
                <select value={furnished} onChange={(e) => setFurnished(e.target.value)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Meuble</option>
                  <option value="oui">Oui</option>
                  <option value="non">Non</option>
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix decroissant</option>
                  <option value="surface-asc">Surface croissante</option>
                  <option value="surface-desc">Surface decroissante</option>
                  <option value="rooms-asc">Pieces croissant</option>
                  <option value="rooms-desc">Pieces decroissant</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-hide">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(city === c ? "" : c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    city === c
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
              {activeFilters > 0 && (
                <button onClick={resetFilters} className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors whitespace-nowrap cursor-pointer">
                  <HiX size={12} /> Tout effacer
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              {filter === "offreDuMoment" ? "Offres du moment" : filter === "premium" ? "Locations premium" : statusFilter === "Disponible" || !statusFilter ? "Logements disponibles" : "Tous les logements"}
              <span className="text-sm font-normal text-gray-500 ml-2">({filtered.length})</span>
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4 text-gray-300">[ ]</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun logement trouve</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres</p>
              <button onClick={resetFilters} className="mt-4 text-blue-600 font-semibold text-sm hover:underline cursor-pointer">
                Reinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <main className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </main>
    }>
      <CatalogContent />
    </Suspense>
  );
}
