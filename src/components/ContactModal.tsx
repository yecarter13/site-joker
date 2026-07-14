"use client";

import { useState } from "react";
import { useModal } from "@/lib/ModalContext";
import { getWhatsAppLink } from "@/lib/utils";
import { SITE_NAME, ADDRESS, POSTAL_CODE, CITY, COUNTRY, SIRET } from "@/lib/constants";
import { HiX, HiCheck } from "react-icons/hi";
import { FaArrowLeft } from "react-icons/fa";

const plans = [
  { id: "standard", name: "Standard", price: "700 €", gradient: "from-red-600 to-red-800", features: ["Analyse complete du profil", "Rapport personnalise detaille", "Points forts & faiblesses", "Liste des documents", "Garantie satisfait 30j"] },
  { id: "premium", name: "Premium", price: "900 €", gradient: "from-red-700 to-red-900", popular: true, features: ["Tout le Standard", "Verification du dossier", "Suivi jusqu a l attribution", "Assistance caution & 1er loyer", "Accompagnement complet"] },
];

const selectOptions = {
  typeLogement: ["Choisir", "Appartement", "Maison", "Studio", "HLM", "Chambre"],
  pieces: ["Choisir", "1", "2", "3", "4", "5+"],
  situation: ["Choisir", "CDI", "CDD", "Independant", "Etudiant", "Chomage", "Retraite", "Autre"],
  revenus: ["Choisir", "Moins de 1 500 €", "1 500 € - 2 500 €", "2 500 € - 4 000 €", "Plus de 4 000 €"],
  garant: ["Choisir", "Oui", "Non", "En cours"],
  budget: ["Choisir", "Moins de 300 €", "300 € - 500 €", "500 € - 700 €", "700 € - 900 €", "900 € - 1 200 €", "Plus de 1 200 €"],
};

export default function ContactModal() {
  const { isOpen, closeModal, propertyInfo, preselectedPlan } = useModal();
  const [step, setStep] = useState<"form" | "plan" | "success">("form");
  const [form, setForm] = useState({
    prenom: "", nom: "", email: "", telephone: "", budget: "",
    typeLogement: "", pieces: "", ville: "", situation: "",
    revenus: "", garant: "", message: "", numeroUnique: "",
    departementRecherche: "",
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(preselectedPlan || null);

  if (!isOpen) return null;

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (preselectedPlan) {
      sendToWhatsApp();
    } else {
      setStep("plan");
    }
  }

  function handlePlanSubmit() {
    if (!selectedPlan) return;
    sendToWhatsApp();
  }

  function sendToWhatsApp() {
    const planId = preselectedPlan || selectedPlan;
    const plan = plans.find((p) => p.id === planId);
    const intro = propertyInfo
      ? `Bonjour, je suis interesse par le logement : ${propertyInfo}\n\n`
      : "Bonjour, je souhaite faire analyser mon dossier de location.\n\n";
    const details = [
      plan ? `Formule choisie : ${plan.name} (${plan.price})` : "",
      propertyInfo ? "" : `Budget loyer : ${form.budget}`,
      `Prenom : ${form.prenom}`, `Nom : ${form.nom}`,
      `Email : ${form.email}`, `Tel : ${form.telephone}`,
      propertyInfo ? `Numéro unique : ${form.numeroUnique}` : "",
      propertyInfo ? `Département de recherche : ${form.departementRecherche}` : "",
      propertyInfo ? "" : `Type : ${form.typeLogement}`,
      propertyInfo ? "" : `Pieces : ${form.pieces}`,
      propertyInfo ? "" : `Ville : ${form.ville}`,
      propertyInfo ? "" : `Situation : ${form.situation}`,
      propertyInfo ? "" : `Revenus : ${form.revenus}`,
      propertyInfo ? "" : `Garant : ${form.garant}`,
      propertyInfo ? `Critères de recherche : ${form.message}` : (form.message ? `\nMessage : ${form.message}` : ""),
    ].filter(Boolean).join("\n");
    window.open(getWhatsAppLink(`${intro}---\n${details}`), "_blank");
    setStep("success");
  }

  function handleClose() {
    closeModal();
    setStep("form");
    setSelectedPlan(preselectedPlan || null);
    setForm({ prenom: "", nom: "", email: "", telephone: "", budget: "", typeLogement: "", pieces: "", ville: "", situation: "", revenus: "", garant: "", message: "", numeroUnique: "", departementRecherche: "" });
  }

  function goBack() {
    setStep("form");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white w-full sm:max-w-lg max-h-screen sm:max-h-[85vh] sm:rounded-2xl rounded-none shadow-2xl animate-slide-up flex flex-col">

        {step === "form" && (
          <>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-start justify-between z-10 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-900">Analyser mon dossier</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Reponse sous 24h · Sans engagement · Confidentiel</p>
              </div>
              <button type="button" onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><HiX size={20} /></button>
            </div>
            <form onSubmit={handleFormSubmit} className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FInput label="Prenom" value={form.prenom} onChange={(v) => update("prenom", v)} required />
                <FInput label="Nom" value={form.nom} onChange={(v) => update("nom", v)} required />
              </div>
              <FInput label="Email" type="email" value={form.email} onChange={(v) => update("email", v)} required />
              <FInput label="Telephone" type="tel" value={form.telephone} onChange={(v) => update("telephone", v)} required />
              {propertyInfo && (
                <>
                  <FInput label="Numéro unique" value={form.numeroUnique} onChange={(v) => update("numeroUnique", v)} required />
                  <FInput label="Département de recherche" value={form.departementRecherche} onChange={(v) => update("departementRecherche", v)} required />
                </>
              )}
              {!propertyInfo && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <FSelect label="Type logement" value={form.typeLogement} onChange={(v) => update("typeLogement", v)} options={selectOptions.typeLogement} required />
                    <FSelect label="Pieces" value={form.pieces} onChange={(v) => update("pieces", v)} options={selectOptions.pieces} required />
                  </div>
                  <FInput label="Ville souhaitee" value={form.ville} onChange={(v) => update("ville", v)} required />
                  <FSelect label="Budget mensuel loyer" value={form.budget} onChange={(v) => update("budget", v)} options={selectOptions.budget} required />
                  <div className="grid grid-cols-2 gap-3">
                    <FSelect label="Situation" value={form.situation} onChange={(v) => update("situation", v)} options={selectOptions.situation} required />
                    <FSelect label="Revenus mensuels" value={form.revenus} onChange={(v) => update("revenus", v)} options={selectOptions.revenus} required />
                  </div>
                  <FSelect label="Avez-vous un garant ?" value={form.garant} onChange={(v) => update("garant", v)} options={selectOptions.garant} required />
                </>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">{propertyInfo ? "Critères de recherche de logement actuel" : "Message (optionnel)"} {propertyInfo ? <span className="text-red-400">*</span> : ""}</label>
                <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={2} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder={propertyInfo ? "Décrivez votre logement actuel..." : "Votre message..."} required={!!propertyInfo} />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg">
                {preselectedPlan ? "Envoyer ma demande →" : "Continuer →"}
              </button>
              <p className="text-[10px] text-gray-400 text-center">En cliquant, vous acceptez d&apos;etre contacte par nos services.</p>
              <div className="border-t border-gray-100 pt-3 pb-1 text-[10px] text-gray-400 text-center leading-relaxed">
                {SITE_NAME} · {ADDRESS}, {POSTAL_CODE} {CITY}, {COUNTRY}<br />
                SIRET : {SIRET}
              </div>
            </form>
          </>
        )}

        {step === "plan" && (
          <>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 z-10 flex-shrink-0">
              <button type="button" onClick={goBack} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><FaArrowLeft size={16} className="text-gray-600" /></button>
              <div>
                <h2 className="text-base font-bold text-gray-900">Choisissez votre formule</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Paiement unique · Sans abonnement</p>
              </div>
              <div className="ml-auto">
                <button type="button" onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><HiX size={20} /></button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition-all cursor-pointer ${
                    selectedPlan === plan.id
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{plan.name}</span>
                        {plan.popular && <span className="text-[10px] bg-gradient-to-r from-red-700 to-red-900 text-white px-2 py-0.5 rounded-full font-semibold">Recommande</span>}
                      </div>
                      <div className={`text-lg font-extrabold mt-1 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>{plan.price}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      selectedPlan === plan.id ? "border-red-500 bg-red-500" : "border-gray-300"
                    }`}>
                      {selectedPlan === plan.id && <HiCheck className="text-white text-[10px]" />}
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-gray-600">
                        <HiCheck className="text-[10px] flex-shrink-0 text-red-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
              <button
                type="button"
                onClick={handlePlanSubmit}
                disabled={!selectedPlan}
                className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {selectedPlan ? `Choisir ${plans.find((p) => p.id === selectedPlan)?.name} →` : "Selectionnez une formule"}
              </button>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Message envoye !</h3>
            <p className="text-sm text-gray-500 mb-6">Redirection vers WhatsApp...</p>
            <button onClick={handleClose} className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">Fermer</button>
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
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
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
