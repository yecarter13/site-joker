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
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    typeLogement: "",
    pieces: "",
    ville: "",
    situation: "",
    revenus: "",
    garant: "",
    message: "",
  });

  if (!isOpen) return null;

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const intro = propertyInfo
      ? `Bonjour, je suis intéressé par le logement : ${propertyInfo}\n\n`
      : "Bonjour, je souhaite faire analyser mon dossier de location.\n\n";

    const details = [
      `Prénom : ${form.prenom}`,
      `Nom : ${form.nom}`,
      `Email : ${form.email}`,
      `Téléphone : ${form.telephone}`,
      `Type de logement : ${form.typeLogement}`,
      `Nombre de pièces : ${form.pieces}`,
      `Ville souhaitée : ${form.ville}`,
      `Situation : ${form.situation}`,
      `Revenus : ${form.revenus}`,
      `Garant : ${form.garant}`,
      form.message ? `\nSituation : ${form.message}` : "",
    ].filter(Boolean).join("\n");

    const message = `${intro}---\n${details}`;
    const url = getWhatsAppLink(message);
    window.open(url, "_blank");
    setStep("success");
  }

  function handleClose() {
    closeModal();
    setStep("form");
    setForm({
      prenom: "", nom: "", email: "", telephone: "",
      typeLogement: "", pieces: "", ville: "", situation: "",
      revenus: "", garant: "", message: "",
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white w-full sm:max-w-lg max-h-[90dvh] sm:rounded-2xl rounded-t-2xl overflow-y-auto shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Analyser mon dossier</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Réponse sous 24h · Sans engagement · Confidentiel
            </p>
          </div>
          <button onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
            <HiX size={20} />
          </button>
        </div>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Input label="Prénom" required value={form.prenom} onChange={(v) => update("prenom", v)} placeholder="Marie" />
              <Input label="Nom" required value={form.nom} onChange={(v) => update("nom", v)} placeholder="Dupont" />
            </div>
            <Input label="Email" type="email" required value={form.email} onChange={(v) => update("email", v)} placeholder="marie@email.com" />
            <Input label="Téléphone" type="tel" required value={form.telephone} onChange={(v) => update("telephone", v)} placeholder="06 XX XX XX XX" />

            <div className="grid grid-cols-2 gap-3">
              <Select label="Type de logement" required value={form.typeLogement} onChange={(v) => update("typeLogement", v)} options={selectOptions.typeLogement} />
              <Select label="Nombre de pièces" required value={form.pieces} onChange={(v) => update("pieces", v)} options={selectOptions.pieces} />
            </div>

            <Input label="Ville souhaitée" required value={form.ville} onChange={(v) => update("ville", v)} placeholder="Ex. Lyon" />

            <div className="grid grid-cols-2 gap-3">
              <Select label="Situation" required value={form.situation} onChange={(v) => update("situation", v)} options={selectOptions.situation} />
              <Select label="Revenus mensuels" required value={form.revenus} onChange={(v) => update("revenus", v)} options={selectOptions.revenus} />
            </div>

            <Select label="Avez-vous un garant ?" required value={form.garant} onChange={(v) => update("garant", v)} options={selectOptions.garant} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Votre situation (optionnel)</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                placeholder="Précisez si besoin votre situation..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Analyser mon dossier →
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              En cliquant, vous acceptez d&apos;être contacté par nos services. Vos données restent confidentielles.
            </p>
          </form>
        ) : (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Message envoyé !</h3>
            <p className="text-sm text-gray-500 mb-6">Vous allez être redirigé vers WhatsApp pour continuer.</p>
            <button onClick={handleClose} className="text-indigo-600 font-semibold text-sm hover:underline">
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
      />
    </div>
  );
}

function Select({ label, value, onChange, options, required }: {
  label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
      >
        {options.map((opt) => (
          <option key={opt} value={opt === "Choisir" ? "" : opt} disabled={opt === "Choisir"}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
