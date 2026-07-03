"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import PropertyForm from "@/components/PropertyForm";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

interface PropertyData {
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
  district: string;
  address: string;
  type: string;
  dpe: string;
  status: string;
  images: string[];
  mapLink: string;
  latitude: number | null;
  longitude: number | null;
  availabilityDate: string | null;
  fees: number | null;
  deposit: number | null;
  yearBuilt: number | null;
  offreDuMoment: boolean;
  premium: boolean;
}

function EditPropertyPage() {
  const params = useParams();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-bold">Logement non trouvé</h2>
          <Link href="/admin" className="text-blue-600 hover:underline">Retour</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 text-sm font-medium">
            <HiArrowLeft /> Retour
          </Link>
          <span className="font-bold text-lg text-gray-900">Modifier: {property.title}</span>
          <div />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <PropertyForm initial={property} />
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <AdminGuard>
      <EditPropertyPage />
    </AdminGuard>
  );
}
