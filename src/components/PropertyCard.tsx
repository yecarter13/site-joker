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
    fees?: number | null;
  };
}

// Map rooms count to T-label (T1, T2, T3…)
function getTLabel(rooms: number): string {
  return `T${rooms}`;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl =
    property.images && property.images.length > 0
      ? property.images[0]
      : "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80";

  // Charges estimation (10% of rent if not provided)
  const charges = property.fees ?? Math.round(property.price * 0.1);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border border-gray-100 group flex flex-col">
      {/* Image */}
      <Link href={`/property/${property.id}`} className="relative block aspect-[16/10] overflow-hidden">
        <img
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {property.offreDuMoment && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500 text-white shadow">
              Offre du moment
            </span>
          )}
          {property.premium && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-900 text-white shadow">
              Premium
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 flex flex-col gap-0.5 flex-1">
        {/* Price */}
        <p className="text-sm text-gray-700 font-medium">
          <span className="text-base font-bold text-gray-900">{formatPrice(property.price)}</span>
          {charges > 0 && (
            <span className="text-xs text-gray-500 ml-1">({formatPrice(charges)} Hors charge)</span>
          )}
        </p>

        {/* Surface | Type */}
        <p className="text-sm text-gray-600">
          {formatSurface(property.surface)}{" "}
          <span className="mx-1 text-gray-300">|</span>
          {getTLabel(property.rooms)}
        </p>

        {/* City in red */}
        <p className="text-sm font-semibold text-red-500 mt-0.5">
          {property.city}
          {property.district ? ` (${property.district})` : ""}
        </p>

        {/* CTA */}
        <Link
          href={`/property/${property.id}`}
          className="mt-2 w-full text-center bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
        >
          Voir le détail
        </Link>
      </div>
    </div>
  );
}
