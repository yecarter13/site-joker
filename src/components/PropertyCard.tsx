"use client";

import Link from "next/link";
import { formatPrice, formatSurface } from "@/lib/utils";
import { FaMapMarkerAlt } from "react-icons/fa";
import { HiHome, HiViewGrid } from "react-icons/hi";

interface PropertyCardProps {
  property: {
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
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.images && property.images.length > 0
    ? property.images[0]
    : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
      <Link href={`/property/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
            property.status === "Disponible" ? "bg-green-500" : "bg-red-500"
          }`}>
            {property.status}
          </span>
          {property.furnished && (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-500 text-white shadow-lg">
              Meublé
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-lg">
          {property.type}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-base md:text-lg text-gray-900 leading-tight flex-1 min-w-0">
            <Link href={`/property/${property.id}`} className="hover:text-indigo-600 transition-colors line-clamp-1">
              {property.title}
            </Link>
          </h3>
          {property.dpe && (
            <span className="flex-shrink-0 ml-2 w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
              style={{
                backgroundColor:
                  ["A","B"].includes(property.dpe) ? "#22c55e" :
                  ["C","D"].includes(property.dpe) ? "#eab308" :
                  "#ef4444"
              }}
            >
              {property.dpe}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <FaMapMarkerAlt className="text-indigo-500 flex-shrink-0" />
          <span className="truncate">{property.city}{property.district ? ` / ${property.district}` : ""}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-4 flex-wrap">
          <span className="flex items-center gap-1">
            <HiHome className="text-indigo-500" />
            {property.rooms} pièce{property.rooms > 1 ? "s" : ""}
          </span>
          {property.bedrooms && (
            <span className="flex items-center gap-1">
              <HiViewGrid className="text-indigo-500" />
              {property.bedrooms} chambre{property.bedrooms > 1 ? "s" : ""}
            </span>
          )}
          <span>{formatSurface(property.surface)}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Loyer CC</span>
            <div className="font-bold text-xl text-indigo-600">{formatPrice(property.price)}</div>
          </div>

        </div>
      </div>
    </div>
  );
}
