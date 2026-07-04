"use client";

import Link from "next/link";
import { formatPrice, formatSurface } from "@/lib/utils";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    surface: number;
    rooms: number;
    city: string;
    district: string | null;
    type: string;
    images: string[];
    status: string;
    offreDuMoment: boolean;
    premium: boolean;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.images && property.images.length > 0
    ? property.images[0]
    : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
      <Link href={`/property/${property.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img src={imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {property.offreDuMoment && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-lg animate-pulse">Offre du moment</span>}
          {property.premium && <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-800 text-white shadow-lg">Premium</span>}
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-lg">{property.type}</div>
      </Link>

      <div className="p-4">
        <h3 className="font-bold text-base md:text-lg text-gray-900 leading-tight mb-2">
          <Link href={`/property/${property.id}`} className="hover:text-blue-600 transition-colors line-clamp-1">{property.title}</Link>
        </h3>

        <div className="text-sm text-gray-500 mb-2">{property.city}{property.district ? ` / ${property.district}` : ""}</div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span>{property.rooms} pi&egrave;ce{property.rooms > 1 ? "s" : ""}</span>
          <span>{formatSurface(property.surface)}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="font-bold text-xl text-blue-600">{formatPrice(property.price)}</div>
          <Link
            href={`/property/${property.id}`}
            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-md hover:shadow-lg"
          >
            Voir le détail
          </Link>
        </div>
      </div>
    </div>
  );
}
