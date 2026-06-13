"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { HiSearch, HiFilter } from "react-icons/hi";

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

export default function CatalogPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filtered, setFiltered] = useState<Property[]>([]);
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [type, setType] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties?status=Disponible")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = [...properties];
    if (city) result = result.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
    if (maxPrice) result = result.filter((p) => p.price <= parseFloat(maxPrice));
    if (type) result = result.filter((p) => p.type === type);
    setFiltered(result);
  }, [city, maxPrice, type, properties]);

  const cities = [...new Set(properties.map((p) => p.city))];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex md:hidden items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <HiFilter /> Filtres {showFilters ? "▲" : "▼"}
            </button>
            <div className={`${showFilters ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-3`}>
              <div className="flex-1 relative">
                <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ville..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 md:flex-none">
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="appearance-none w-full md:w-auto border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="">Budget max</option>
                    <option value="500">500 €</option>
                    <option value="800">800 €</option>
                    <option value="1000">1 000 €</option>
                    <option value="1500">1 500 €</option>
                    <option value="2000">2 000 €</option>
                    <option value="3000">3 000 €</option>
                  </select>
                </div>
                <div className="relative flex-1 md:flex-none">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="appearance-none w-full md:w-auto border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                  >
                    <option value="">Type</option>
                    <option value="Privé">Privé</option>
                    <option value="HLM">HLM</option>
                  </select>
                </div>
              </div>
            </div>

            {cities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 overflow-x-auto scrollbar-hide">
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCity(city === c ? "" : c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                      city === c
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Logements disponibles
              <span className="text-sm font-normal text-gray-500 ml-2">({filtered.length})</span>
            </h1>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4 text-gray-300">[ ]</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun logement trouvé</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres</p>
              <button
                onClick={() => { setCity(""); setMaxPrice(""); setType(""); }}
                className="mt-4 text-indigo-600 font-semibold text-sm hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
