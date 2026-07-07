"use client";

import { Suspense, useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { HiLocationMarker, HiRefresh } from "react-icons/hi";

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

type SortKey = "price-asc" | "price-desc" | "surface-asc" | "surface-desc" | "rooms-asc" | "rooms-desc" | "date-asc";

const MIN_PRICE = 0;
const MAX_PRICE = 3000;

function CatalogContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Pending filter state (applied only on "Afficher")
  const [pendingCity, setPendingCity] = useState("");
  const [pendingMinPrice, setPendingMinPrice] = useState(MIN_PRICE);
  const [pendingMaxPrice, setPendingMaxPrice] = useState(MAX_PRICE);
  const [pendingRooms, setPendingRooms] = useState("");
  const [pendingTypeAppart, setPendingTypeAppart] = useState(false);
  const [pendingTypeMaison, setPendingTypeMaison] = useState(false);

  // Active filter state (after clicking "Afficher")
  const [city, setCity] = useState("");
  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [rooms, setRooms] = useState("");
  const [typeAppart, setTypeAppart] = useState(false);
  const [typeMaison, setTypeMaison] = useState(false);
  const [sort, setSort] = useState<SortKey>("price-asc");
  const [filter, setFilter] = useState(searchParams.get("filter") || "");

  useEffect(() => {
    fetch(`/api/properties?status=Disponible`)
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilter(searchParams.get("filter") || "");
  }, [searchParams]);

  // Compute actual min/max from data
  const dataMinPrice = useMemo(() => properties.length ? Math.min(...properties.map((p) => p.price)) : MIN_PRICE, [properties]);
  const dataMaxPrice = useMemo(() => properties.length ? Math.max(...properties.map((p) => p.price)) : MAX_PRICE, [properties]);

  const filtered = useMemo(() => {
    let result = [...properties];
    if (city) result = result.filter((p) => p.city.toLowerCase().includes(city.toLowerCase()));
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    if (rooms) result = result.filter((p) => p.rooms >= parseInt(rooms));
    if (typeAppart && !typeMaison) result = result.filter((p) => p.type?.toLowerCase().includes("appart") || p.rooms <= 4);
    if (typeMaison && !typeAppart) result = result.filter((p) => p.type?.toLowerCase().includes("maison") || p.rooms >= 3);
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
  }, [city, minPrice, maxPrice, rooms, typeAppart, typeMaison, sort, filter, properties]);

  const cities = useMemo(() => [...new Set(properties.map((p) => p.city))].sort(), [properties]);

  function applyFilters() {
    setCity(pendingCity);
    setMinPrice(pendingMinPrice);
    setMaxPrice(pendingMaxPrice);
    setRooms(pendingRooms);
    setTypeAppart(pendingTypeAppart);
    setTypeMaison(pendingTypeMaison);
  }

  function resetFilters() {
    setPendingCity("");
    setPendingMinPrice(dataMinPrice);
    setPendingMaxPrice(dataMaxPrice);
    setPendingRooms("");
    setPendingTypeAppart(false);
    setPendingTypeMaison(false);
    setCity("");
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
    setRooms("");
    setTypeAppart(false);
    setTypeMaison(false);
    setFilter("");
  }

  // Slider percentage helpers
  const priceRange = dataMaxPrice - dataMinPrice || 1;
  const leftPct = ((pendingMinPrice - dataMinPrice) / priceRange) * 100;
  const rightPct = 100 - ((pendingMaxPrice - dataMinPrice) / priceRange) * 100;

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">

        {/* ── FILTER PANEL ── */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

            {/* Nombre de pièces */}
            <div>
              <select
                value={pendingRooms}
                onChange={(e) => setPendingRooms(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 bg-white appearance-none focus:ring-2 focus:ring-red-400 outline-none"
              >
                <option value="">Nombre de pièces</option>
                <option value="1">1+ pièce</option>
                <option value="2">2+ pièces</option>
                <option value="3">3+ pièces</option>
                <option value="4">4+ pièces</option>
                <option value="5">5+ pièces</option>
              </select>
            </div>

            {/* Type : Maison / Appartement */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={pendingTypeMaison}
                  onChange={(e) => setPendingTypeMaison(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-400 accent-red-500 cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-800">Maison</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={pendingTypeAppart}
                  onChange={(e) => setPendingTypeAppart(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-400 accent-red-500 cursor-pointer"
                />
                <span className="text-sm font-semibold text-gray-800">Appartement</span>
              </label>
            </div>

            {/* Slider de prix */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-gray-500">{dataMinPrice} €</span>
                <div className="flex items-center gap-2">
                  <span className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold text-gray-800 min-w-[70px] text-center">
                    {pendingMinPrice}
                  </span>
                  <span className="text-gray-400">-</span>
                  <span className="border border-gray-300 rounded px-2 py-1 text-sm font-semibold text-gray-800 min-w-[70px] text-center">
                    {pendingMaxPrice}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{dataMaxPrice} €</span>
              </div>
              {/* Double range slider */}
              <div className="relative h-6 flex items-center">
                <div className="absolute left-0 right-0 h-1.5 bg-gray-200 rounded-full" />
                <div
                  className="absolute h-1.5 bg-red-500 rounded-full"
                  style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
                />
                <input
                  type="range"
                  min={dataMinPrice}
                  max={dataMaxPrice}
                  value={pendingMinPrice}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), pendingMaxPrice - 50);
                    setPendingMinPrice(val);
                  }}
                  className="absolute w-full h-1.5 opacity-0 cursor-pointer z-20"
                />
                <input
                  type="range"
                  min={dataMinPrice}
                  max={dataMaxPrice}
                  value={pendingMaxPrice}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), pendingMinPrice + 50);
                    setPendingMaxPrice(val);
                  }}
                  className="absolute w-full h-1.5 opacity-0 cursor-pointer z-20"
                />
                {/* Thumbs visual */}
                <div
                  className="absolute w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow z-10 -translate-x-1/2"
                  style={{ left: `${leftPct}%` }}
                />
                <div
                  className="absolute w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow z-10 translate-x-1/2"
                  style={{ right: `${rightPct}%` }}
                />
              </div>
            </div>

            {/* Localisation */}
            <div className="relative">
              <HiLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                value={pendingCity}
                onChange={(e) => setPendingCity(e.target.value)}
                placeholder="Où souhaitez-vous habiter ?"
                className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-3 text-sm text-gray-700 focus:ring-2 focus:ring-red-400 outline-none"
              />
              {cities.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {cities.slice(0, 6).map((c) => (
                    <button
                      key={c}
                      onClick={() => setPendingCity(pendingCity === c ? "" : c)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        pendingCity === c
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={applyFilters}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors cursor-pointer shadow-md"
              >
                Afficher
              </button>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-red-500 font-medium transition-colors cursor-pointer"
              >
                <HiRefresh className="text-base" />
                Réinitialiser tous les critères
              </button>
            </div>
          </div>
        </div>

        {/* ── RESULTS ── */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Tri + compteur */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{filtered.length}</span> logement{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-red-400 outline-none"
            >
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="surface-asc">Surface croissante</option>
              <option value="surface-desc">Surface décroissante</option>
              <option value="rooms-asc">Pièces croissant</option>
              <option value="rooms-desc">Pièces décroissant</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun logement trouvé</h3>
              <p className="text-gray-500 text-sm mb-4">Essayez de modifier vos critères de recherche</p>
              <button
                onClick={resetFilters}
                className="text-red-500 font-semibold text-sm hover:underline cursor-pointer"
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

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <main className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
      </main>
    }>
      <CatalogContent />
    </Suspense>
  );
}
