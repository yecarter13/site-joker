import AdminGuard from "@/components/AdminGuard";
import PropertyForm from "@/components/PropertyForm";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

function NewPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 text-sm font-medium">
            <HiArrowLeft /> Retour
          </Link>
          <span className="font-bold text-lg text-gray-900">Nouveau logement</span>
          <div />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
          <PropertyForm />
        </div>
      </main>
    </div>
  );
}

export default function Page() {
  return (
    <AdminGuard>
      <NewPropertyPage />
    </AdminGuard>
  );
}
