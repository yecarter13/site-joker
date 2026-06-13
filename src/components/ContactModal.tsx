"use client";

import { useState } from "react";
import { useModal } from "@/lib/ModalContext";
import { getWhatsAppLink } from "@/lib/utils";
import { HiX } from "react-icons/hi";

const selectOptions = {
  typeLogement: ["Choisir", "Appartement", "Maison", "Studio", "HLM", "Chambre"],
  pieces: ["Choisir", "1", "2", "3", "4", "5+"],
  situation: ["Choisir", "CDI", "CDD", "Indépendant", "Étudiant", "Chômage", "Retraité", "Autre"],
  revenus: ["Choisir", "Moins de 1 500 €", "1 500 € - 2 500 €", "2 500 € - 4 000 €", "Plus de 4 000 €"],
  garant: ["Choisir", "Oui", "Non", "En cours"],
};

export default function ContactModal() {
  const { isOpen, closeModal, propertyInfo } = useModal();
  const [step, setStep] = useState<"form" | "success">("form");
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "",
    typeLogement: "", pieces: "", ville: "", situation: "",
    revenus: "", garant: "", message: "",
  });

  if (!isOpen) return null;

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const intro = propertyInfo
      ? `Bonjour, je suis interessé par le logement : ${propertyInfo}\n\n`
      : "Bonjour, je souhaite faire analyser mon dossier de location.\n\n";
    const details = [
      `Prenom : ${form.prenom}`, `Nom : ${form.nom}`,
      `Email : ${form.email}`, `Tel : ${form.telephone}`,
      `Type : ${form.typeLogement}`, `Pieces : ${form.pieces}`,
      `Ville : ${form.ville}`, `Situation : ${form.situation}`,
      `Revenus : ${form.revenus}`, `Garant : ${form.garant}`,
      form.message ? `\nSituation : ${form.message}` : "",
    ].filter(Boolean).join("\n");
    window.open(getWhatsAppLink(`${intro}---\n${details}`), "_blank");
    setStep("success");
  }

  function handleClose() {
    closeModal();
    setStep("form");
    setForm({ prenom: "", nom: "", email: "", telephone: "", typeLogement: "", pieces: "", ville: "", situation: "", revenus: "", garant: "", message: "" });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white w-full sm:max-w-lg max-h-screen sm:max-h-[85vh] sm:rounded-2xl rounded-none shadow-2xl animate-slide-up flex flex-col">
        {step === "form" ? (
          <>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-start justify-between z-10 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-900">Analyser mon dossier</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Reponse sous 24h · Sans engagement · Confidentiel</p>
              </div>
              <button type="button" onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <HiX size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FInput label="Prenom" value={form.prenom} onChange={(v) => update("prenom", v)} required />
                <FInput label="Nom" value={form.nom} onChange={(v) => update("nom", v)} required />
              </div>
              <FInput label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
              <FInput label="Telephone" type="tel" value={form.telephone} onChange={(v) => update("telephone", v)} required />
              <div className="grid grid-cols-2 gap-3">
                <FSelect label="Type logement" value={form.typeLogement} onChange={(v) => update("typeLogement", v)} options={selectOptions.typeLogement} required />
                <FSelect label="Pieces" value={form.pieces} onChange={(v) => update("pieces", v)} options={selectOptions.pieces} required />
              </div>
              <FInput label="Ville souhaitee" value={form.ville} onChange={(v) => update("ville", v)} required />
              <div className="grid grid-cols-2 gap-3">
                <FSelect label="Situation" value={form.situation} onChange={(v) => update("situation", v)} options={selectOptions.situation} required />
                <FSelect label="Revenus mensuels" value={form.revenus} onChange={(v) => update("revenus", v)} options={selectOptions.revenus} required />
              </div>
              <FSelect label="Avez-vous un garant ?" value={form.garant} onChange={(v) => update("garant", v)} options={selectOptions.garant} required />
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Votre situation (optionnel)</label>
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={2} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Precisez si besoin..." />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg">
                Analyser mon dossier →
              </button>
              <p className="text-[10px] text-gray-400 text-center pb-2">
                En cliquant, vous acceptez d&apos;etre contacte par nos services.
              </p>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Message envoye !</h3>
            <p className="text-sm text-gray-500 mb-6">Redirection vers WhatsApp...</p>
            <button onClick={handleClose} className="text-indigo-600 font-semibold text-sm hover:underline">Fermer</button>
          </div>
        )}
      </div>
    </div>
  );
}

function FInput({ label, value, onChange, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label} <span className="text-red-400">*</span></label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
    </div>
  );
}

function FSelect({ label, value, onChange, options, required }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label} <span className="text-red-400">*</span></label>
      <select value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
        {options.map((opt) => (
          <option key={opt} value={opt === "Choisir" ? "" : opt} disabled={opt === "Choisir"}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
