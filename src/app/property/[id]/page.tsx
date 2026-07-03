"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { formatPrice, formatSurface } from "@/lib/utils";
import { useModal } from "@/lib/ModalContext";
import { FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import { HiHome, HiViewGrid, HiLightningBolt, HiOfficeBuilding, HiCalendar, HiCurrencyDollar, HiTag, HiCheck, HiX as HiXIcon } from "react-icons/hi";
import { GiElevator, GiCarDoor, GiFlowers, GiSunflower } from "react-icons/gi";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  surface: number;
  rooms: number;
  bedrooms: number | null;
  bathrooms: number | null;
  floor: number | null;
  furnished: boolean | null;
  heating: string | null;
  elevator: boolean | null;
  parking: boolean | null;
  balcony: boolean | null;
  terrace: boolean | null;
  city: string;
  district: string | null;
  address: string | null;
  type: string;
  dpe: string | null;
  status: string;
  images: string[];
  mapLink: string | null;
  latitude: number | null;
  longitude: number | null;
  reference: string;
  availabilityDate: string | null;
  fees: number | null;
  deposit: number | null;
  yearBuilt: number | null;
  offreDuMoment: boolean;
  premium: boolean;
}

export default function PropertyDetailPage() {
  const params = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const { openModal } = useModal();
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetch(`/api/properties/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (!property) return;
    fetch(`/api/properties?status=Disponible`)
      .then((r) => r.json())
      .then((all: Property[]) => {
        const same = all.filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type));
        setSimilar(same.slice(0, 6));
      })
      .catch(() => {});
  }, [property]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header />
        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <div className="text-4xl mb-4 text-gray-300">[ ]</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Logement non trouvé</h2>
            <Link href="/catalog" className="text-indigo-600 font-semibold hover:underline">
              Voir tous les logements
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const images = property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"];

  const whatsappMsg = `Bonjour, je suis intéressé par le logement ${property.title} - Réf: ${property.reference}. Comment faire pour mon dossier ?`;

  const locationStr = [
    property.address,
    property.district,
    property.city,
  ].filter(Boolean).join(", ");

  const detailItems: { label: string; value: string | null; icon?: React.ReactNode }[] = [
    { label: "Pièces", value: `${property.rooms}`, icon: <HiHome className="text-indigo-500" /> },
    { label: "Surface", value: formatSurface(property.surface), icon: <HiViewGrid className="text-indigo-500" /> },
    { label: "Chambres", value: property.bedrooms ? `${property.bedrooms}` : null, icon: <HiOfficeBuilding className="text-indigo-500" /> },
    { label: "Salles de bain", value: property.bathrooms ? `${property.bathrooms}` : null, icon: <HiTag className="text-indigo-500" /> },
    { label: "Étage", value: property.floor ? `${property.floor}e` : null, icon: <HiOfficeBuilding className="text-indigo-500" /> },
    { label: "DPE", value: property.dpe || null, icon: <HiLightningBolt className="text-indigo-500" /> },
    { label: "Chauffage", value: property.heating || null, icon: <HiLightningBolt className="text-indigo-500" /> },
    { label: "Année", value: property.yearBuilt ? `${property.yearBuilt}` : null, icon: <HiCalendar className="text-indigo-500" /> },
  ].filter((d) => d.value !== null);

  const amenityItems: { label: string; value: boolean | null }[] = [
    { label: "Ascenseur", value: property.elevator },
    { label: "Parking", value: property.parking },
    { label: "Balcon", value: property.balcony },
    { label: "Terrasse", value: property.terrace },
    { label: "Meublé", value: property.furnished },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-4 md:py-6">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 text-sm font-medium mb-4 md:mb-6 transition-colors">
            <FaArrowLeft /> Retour au catalogue
          </Link>

          {/* Image gallery */}
          <div className="relative rounded-2xl overflow-hidden bg-white mb-4 md:mb-6">
            <div className="relative aspect-[4/3] md:aspect-[16/9]">
              <img src={images[currentImage]} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${
                  property.status === "Disponible" ? "bg-green-500" : "bg-red-500"
                }`}>
                  {property.status}
                </span>
                {property.offreDuMoment && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-orange-500 text-white shadow-lg animate-pulse">
                    Offre du moment
                  </span>
                )}
                {property.premium && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-lg">
                    Premium
                  </span>
                )}
                {property.furnished && (
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-500 text-white shadow-lg">
                    Meublé
                  </span>
                )}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 shadow-lg">
                {property.type}
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentImage ? "border-indigo-500 opacity-100 ring-1 ring-indigo-300" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Main info card */}
          <div className="bg-white rounded-2xl p-4 md:p-6 mb-4 md:mb-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-1">{property.title}</h1>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <FaMapMarkerAlt className="text-indigo-500 flex-shrink-0" />
                  <span className="truncate">{locationStr}</span>
                </div>
              </div>
              <div className="text-left sm:text-right flex-shrink-0">
                <div className="text-xs text-gray-400">Loyer CC</div>
                <div className="text-2xl md:text-3xl font-extrabold text-indigo-600">{formatPrice(property.price)}</div>
                {property.fees && <div className="text-xs text-gray-400">+ {formatPrice(property.fees)} de charges</div>}
              </div>
            </div>

            {/* Detail grid - responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 py-4 border-t border-b border-gray-100 mb-4">
              {detailItems.map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-2.5 md:p-3 text-center">
                  <div className="flex justify-center mb-1">{item.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm md:text-base">{item.value}</div>
                  <div className="text-[10px] md:text-xs text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Amenities */}
            {amenityItems.some((a) => a.value !== null) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {amenityItems.filter((a) => a.value !== null).map((a) => (
                  <span key={a.label} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${
                    a.value ? "bg-green-50 text-green-700" : "bg-red-50 text-red-500 line-through"
                  }`}>
                    {a.value ? <HiCheck className="text-sm" /> : <HiXIcon className="text-sm" />}
                    {a.label}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            )}

            {/* Additional info */}
            {(property.deposit || property.availabilityDate) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                {property.deposit && (
                  <div className="text-sm">
                    <span className="text-gray-400">Dépôt de garantie :</span>
                    <span className="font-semibold text-gray-900 ml-1">{formatPrice(property.deposit)}</span>
                  </div>
                )}
                {property.availabilityDate && (
                  <div className="text-sm">
                    <span className="text-gray-400">Disponible le :</span>
                    <span className="font-semibold text-gray-900 ml-1">
                      {new Date(property.availabilityDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs text-gray-400">Référence : {property.reference}</div>
          </div>

          {/* Annonces similaires */}
          {similar.length > 0 && (
            <div className="mt-4 md:mt-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Annonces similaires</h3>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {similar.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
