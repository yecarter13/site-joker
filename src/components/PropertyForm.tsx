"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { HiPlus, HiX, HiPhotograph, HiLocationMarker, HiChevronDown, HiChevronUp, HiMap } from "react-icons/hi";

interface PropertyFormProps {
  initial?: {
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
  };
}

export default function PropertyForm({ initial }: PropertyFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(initial?.images || []);
  const [saving, setSaving] = useState(false);
  const [showExtra, setShowExtra] = useState(!!initial);
  const [lat, setLat] = useState(initial?.latitude?.toString() || "");
  const [lng, setLng] = useState(initial?.longitude?.toString() || "");
  const [offreDuMoment, setOffreDuMoment] = useState(initial?.offreDuMoment || false);
  const [premium, setPremium] = useState(initial?.premium || false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setImages((prev) => [...prev, data.url]);
    setUploading(false);
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((i) => i !== url));
  }

  function moveImage(index: number, direction: -1 | 1) {
    const newImages = [...images];
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    [newImages[index], newImages[target]] = [newImages[target], newImages[index]];
    setImages(newImages);
  }

  function boolVal(name: string): boolean | null {
    const el = document.querySelector(`[name="${name}"]`) as HTMLSelectElement;
    if (!el?.value) return null;
    return el.value === "true";
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    const form = new FormData(e.currentTarget);

    const price = parseFloat(form.get("price") as string);
    const surface = parseFloat(form.get("surface") as string);
    const rooms = parseInt(form.get("rooms") as string);

    if (price <= 0) { setError("Le prix doit être supérieur à 0."); setSaving(false); return; }
    if (surface <= 0) { setError("La surface doit être supérieure à 0."); setSaving(false); return; }
    if (rooms <= 0) { setError("Le nombre de pièces doit être supérieur à 0."); setSaving(false); return; }

    const data: Record<string, unknown> = {
      title: form.get("title"),
      description: form.get("description"),
      price,
      surface,
      rooms,
      bedrooms: form.get("bedrooms") ? parseInt(form.get("bedrooms") as string) : null,
      bathrooms: form.get("bathrooms") ? parseInt(form.get("bathrooms") as string) : null,
      floor: form.get("floor") ? parseInt(form.get("floor") as string) : null,
      furnished: boolVal("furnished"),
      heating: form.get("heating") || null,
      elevator: boolVal("elevator"),
      parking: boolVal("parking"),
      balcony: boolVal("balcony"),
      terrace: boolVal("terrace"),
      city: form.get("city"),
      district: form.get("district") || null,
      address: form.get("address") || null,
      type: form.get("type"),
      dpe: form.get("dpe") || null,
      status: form.get("status"),
      images,
      offreDuMoment,
      premium,
      mapLink: form.get("mapLink") || null,
      latitude: lat ? parseFloat(lat) : null,
      longitude: lng ? parseFloat(lng) : null,
      availabilityDate: form.get("availabilityDate") || null,
      fees: form.get("fees") ? parseFloat(form.get("fees") as string) : null,
      deposit: form.get("deposit") ? parseFloat(form.get("deposit") as string) : null,
      yearBuilt: form.get("yearBuilt") ? parseInt(form.get("yearBuilt") as string) : null,
    };

    try {
      const url = initial ? `/api/properties/${initial.id}` : "/api/properties";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Erreur lors de l'enregistrement.");
      }

      setSuccess(initial ? "Logement mis à jour avec succès !" : "Logement créé avec succès !");
      setTimeout(() => { router.push("/admin"); router.refresh(); }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setSaving(false);
    }
  }

  const mapSrc = lat && lng
    ? `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`
    : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <span>✓</span> {success}
        </div>
      )}
      {/* Informations principales */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          Informations principales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Titre du bien *</label>
            <input name="title" defaultValue={initial?.title} required className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" placeholder="Ex: Appartement moderne F2" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Prix (loyer CC) *</label>
            <div className="relative">
              <input name="price" type="number" step="0.01" defaultValue={initial?.price} required className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-8 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 950" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">€</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Surface (m²) *</label>
            <input name="surface" type="number" step="0.1" defaultValue={initial?.surface} required className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 65" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Nombre de pieces *</label>
            <input name="rooms" type="number" defaultValue={initial?.rooms} required className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 3" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select name="type" defaultValue={initial?.type || "Prive"} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
              <option value="Prive">Prive</option>
              <option value="HLM">HLM</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 cursor-pointer">
            <button type="button" onClick={() => setOffreDuMoment(!offreDuMoment)} className={`relative w-10 h-5 rounded-full transition-colors ${offreDuMoment ? "bg-orange-500" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${offreDuMoment ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-sm font-medium text-gray-700">L'offre du moment</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <button type="button" onClick={() => setPremium(!premium)} className={`relative w-10 h-5 rounded-full transition-colors ${premium ? "bg-indigo-600" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${premium ? "translate-x-5" : ""}`} />
            </button>
            <span className="text-sm font-medium text-gray-700">Location appartement premium</span>
          </label>
        </div>
      </div>

      {/* Localisation - mise en avant */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HiLocationMarker className="text-indigo-500" />
          Localisation du bien
          <span className="text-xs font-normal text-gray-400 ml-1">(obligatoire)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Ville *</label>
            <input name="city" defaultValue={initial?.city} required className="w-full border border-indigo-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white" placeholder="Ex: Paris" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Quartier</label>
            <input name="district" defaultValue={initial?.district || ""} className="w-full border border-indigo-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white" placeholder="Ex: 11e arrondissement" />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Adresse complete *</label>
            <input name="address" defaultValue={initial?.address || ""} required className="w-full border border-indigo-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white" placeholder="Ex: 123 Rue de la Paix, 75011 Paris" />
          </div>
        </div>

        {/* Coordonnees + mini carte */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Coordonnees GPS</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-xs text-gray-500">Latitude</label>
                <input value={lat} onChange={(e) => setLat(e.target.value)} type="number" step="any" className="w-full border border-indigo-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white" placeholder="48.8566" />
              </div>
              <div className="space-y-1">
                <label className="block text-xs text-gray-500">Longitude</label>
                <input value={lng} onChange={(e) => setLng(e.target.value)} type="number" step="any" className="w-full border border-indigo-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white" placeholder="2.3522" />
              </div>
            </div>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
            >
              <HiMap /> Ouvrir Google Maps
            </a>
          </div>
          {mapSrc && (
            <div className="rounded-xl overflow-hidden border border-indigo-200 h-32 md:h-auto">
              <iframe src={mapSrc} className="w-full h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
          Description
        </h3>
        <div className="space-y-1">
          <textarea name="description" defaultValue={initial?.description} required rows={5} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Description detaillee du logement..." />
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <HiPhotograph className="text-indigo-500" />
          Photos
        </h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            {images.map((url, i) => (
              <div key={url} className="relative w-28 h-28 rounded-xl overflow-hidden group border border-gray-200">
                <img src={url} alt="" className="w-full h-full object-cover" />
                {i > 0 && (
                  <button type="button" onClick={() => moveImage(i, -1)} className="absolute top-1 left-1 bg-white/80 text-gray-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-xs cursor-pointer">
                    &larr;
                  </button>
                )}
                {i < images.length - 1 && (
                  <button type="button" onClick={() => moveImage(i, 1)} className="absolute top-1 left-7 bg-white/80 text-gray-600 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity text-xs cursor-pointer">
                    &rarr;
                  </button>
                )}
                <button type="button" onClick={() => removeImage(url)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <HiX size={14} />
                </button>
                {i === 0 && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Principale</div>}
              </div>
            ))}
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:border-indigo-500 transition-colors bg-gray-50 hover:bg-indigo-50 cursor-pointer">
              {uploading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-500" /> : <HiPlus size={24} />}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <p className="text-xs text-gray-400">La premiere photo sera utilisee comme image principale sur les cartes.</p>
        </div>
      </div>

      {/* Details supplementaires (toggle) */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <button type="button" onClick={() => setShowExtra(!showExtra)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
          {showExtra ? <HiChevronUp /> : <HiChevronDown />}
          Details supplementaires
        </button>

        {showExtra && (
          <div className="mt-4 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Chambres</label>
                <input name="bedrooms" type="number" defaultValue={initial?.bedrooms ?? ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="2" />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Salles de bain</label>
                <input name="bathrooms" type="number" defaultValue={initial?.bathrooms ?? ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="1" />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Etage</label>
                <input name="floor" type="number" defaultValue={initial?.floor ?? ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="3" />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Annee construction</label>
                <input name="yearBuilt" type="number" defaultValue={initial?.yearBuilt ?? ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="2020" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">DPE</label>
                <select name="dpe" defaultValue={initial?.dpe || ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">Non specifie</option>
                  <option value="A">A</option><option value="B">B</option><option value="C">C</option>
                  <option value="D">D</option><option value="E">E</option><option value="F">F</option>
                  <option value="G">G</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Chauffage</label>
                <select name="heating" defaultValue={initial?.heating || ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">Non specifie</option>
                  <option value="Individuel electrique">Individuel electrique</option>
                  <option value="Individuel gaz">Individuel gaz</option>
                  <option value="Collectif">Collectif</option>
                  <option value="Pompe a chaleur">Pompe a chaleur</option>
                  <option value="Solaire">Solaire</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Meuble</label>
                <select name="furnished" defaultValue={initial?.furnished === true ? "true" : initial?.furnished === false ? "false" : ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                  <option value="">Non specifie</option>
                  <option value="true">Oui</option>
                  <option value="false">Non</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Disponible le</label>
                <input name="availabilityDate" type="date" defaultValue={initial?.availabilityDate || ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Equipements et services</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { name: "elevator", label: "Ascenseur" },
                  { name: "parking", label: "Parking" },
                  { name: "balcony", label: "Balcon" },
                  { name: "terrace", label: "Terrasse" },
                ].map(({ name, label }) => (
                  <label key={name} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <select name={name} defaultValue={initial?.[name as keyof typeof initial] === true ? "true" : initial?.[name as keyof typeof initial] === false ? "false" : ""} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                      <option value="">{label}</option>
                      <option value="true">Oui</option>
                      <option value="false">Non</option>
                    </select>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Charges (€)</label>
                <input name="fees" type="number" step="0.01" defaultValue={initial?.fees ?? ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 100" />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Depot de garantie (€)</label>
                <input name="deposit" type="number" step="0.01" defaultValue={initial?.deposit ?? ""} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ex: 950" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">Statut</label>
              <select name="status" defaultValue={initial?.status || "Disponible"} className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                <option value="Disponible">Disponible</option>
                <option value="Loue">Loue</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button type="submit" disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 shadow-lg cursor-pointer">
          {saving ? "Enregistrement..." : initial ? "Mettre a jour" : "Ajouter le logement"}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer">
          Annuler
        </button>
      </div>
    </form>
  );
}
