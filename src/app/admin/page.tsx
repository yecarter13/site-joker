"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/AdminGuard";
import { formatPrice } from "@/lib/utils";
import { HiPlus, HiPencil, HiTrash, HiLogout, HiHome, HiDocumentText, HiSwitchHorizontal } from "react-icons/hi";

interface Property {
  id: string;
  title: string;
  price: number;
  city: string;
  status: string;
  reference: string;
  images: string[];
}

interface ExchangeItem {
  id: string;
  username: string;
  avatar: string;
  title: string;
  city: string;
  surface: number;
  rooms: number;
  price: number;
  createdAt: string;
}

function AdminDashboard() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState<ExchangeItem[]>([]);
  const [loadingExchanges, setLoadingExchanges] = useState(true);

  function load() {
    fetch("/api/properties")
      .then((r) => r.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(load, []);

  function loadExchanges() {
    fetch("/api/exchange")
      .then((r) => r.json())
      .then((data) => {
        setExchanges(data);
        setLoadingExchanges(false);
      })
      .catch(() => setLoadingExchanges(false));
  }

  useEffect(loadExchanges, []);

  async function deleteExchange(id: string) {
    if (!confirm("Supprimer cette annonce d'échange ?")) return;
    await fetch(`/api/exchange/${id}`, { method: "DELETE" });
    loadExchanges();
  }

  async function deleteProperty(id: string) {
    if (!confirm("Supprimer ce logement ?")) return;
    await fetch(`/api/properties/${id}`, { method: "DELETE" });
    load();
  }

  async function toggleStatus(property: Property) {
    const newStatus = property.status === "Disponible" ? "Loué" : "Disponible";
    await fetch(`/api/properties/${property.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    load();
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center">
              <HiDocumentText className="text-white text-sm" />
            </div>
            <span className="font-bold text-lg text-gray-900">Admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1 transition-colors">
              <HiHome /> Site
            </Link>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors">
              <HiLogout /> Déconnexion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Gestion des logements</h1>
            <p className="text-sm text-gray-500">{properties.length} logement(s)</p>
          </div>
          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 md:px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg"
          >
            <HiPlus /> <span className="hidden sm:inline">Ajouter un logement</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-16 md:py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-4xl mb-4 text-gray-300">[ ]</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun logement</h3>
            <p className="text-gray-500 mb-6">Commencez par ajouter votre premier logement</p>
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm"
            >
              <HiPlus /> Ajouter un logement
            </Link>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="block md:hidden space-y-3">
              {properties.map((p) => (
                <div key={p.id} className="bg-white rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={p.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-sm truncate">{p.title}</div>
                      <div className="text-xs text-gray-500">{p.city}</div>
                      <div className="font-bold text-indigo-600 text-sm mt-0.5">{formatPrice(p.price)}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleStatus(p)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        p.status === "Disponible"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {p.status}
                    </button>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/properties/${p.id}/edit`}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <HiPencil size={16} />
                      </Link>
                      <button
                        onClick={() => deleteProperty(p.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Photo</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Titre</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Ville</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Prix</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-600">Statut</th>
                      <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {properties.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={p.images?.[0] || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100"}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">{p.title}</td>
                        <td className="px-4 py-3 text-gray-500">{p.city}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{formatPrice(p.price)}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleStatus(p)}
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              p.status === "Disponible"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {p.status}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/properties/${p.id}/edit`}
                              className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                            >
                              <HiPencil size={16} />
                            </Link>
                            <button
                              onClick={() => deleteProperty(p.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <HiTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {/* ─── EXCHANGE LISTINGS ─── */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">Annonces d&apos;échange</h2>
              <p className="text-sm text-gray-500">{exchanges.length} annonce(s)</p>
            </div>
          </div>

          {loadingExchanges ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
            </div>
          ) : exchanges.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <HiSwitchHorizontal className="text-4xl text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Aucune annonce d&apos;échange</h3>
              <p className="text-gray-500 text-sm">Les annonces postées sur la page échange apparaîtront ici.</p>
            </div>
          ) : (
            <>
              {/* Mobile cards */}
              <div className="block md:hidden space-y-3">
                {exchanges.map((e) => (
                  <div key={e.id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={e.avatar} alt="" className="w-10 h-10 rounded-full bg-gray-100" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 text-sm truncate">{e.title}</div>
                        <div className="text-xs text-gray-500">{e.city} • {e.surface}m² • {e.rooms} pièces</div>
                        <div className="font-bold text-emerald-600 text-sm mt-0.5">{e.price} €</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{e.username}</span>
                      <button
                        onClick={() => deleteExchange(e.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop table */}
              <div className="hidden md:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Utilisateur</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Titre</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Ville</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Surface</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Pièces</th>
                        <th className="text-left px-4 py-3 font-semibold text-gray-600">Prix</th>
                        <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {exchanges.map((e) => (
                        <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <img src={e.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-100" />
                              <span className="text-gray-900 font-medium">{e.username}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900">{e.title}</td>
                          <td className="px-4 py-3 text-gray-500">{e.city}</td>
                          <td className="px-4 py-3 text-gray-500">{e.surface} m²</td>
                          <td className="px-4 py-3 text-gray-500">{e.rooms}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{e.price} €</td>
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => deleteExchange(e.id)}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <HiTrash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminDashboard />
    </AdminGuard>
  );
}
