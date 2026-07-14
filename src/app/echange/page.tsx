"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaExchangeAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { getWhatsAppLink } from "@/lib/utils";
import Link from "next/link";

export default function EchangePage() {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ville: "",
    departement: "",
    adresse: "",
    nomPrenom: "",
    numeroUnique: "",
    criteres: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.ville || !form.departement || !form.adresse || !form.nomPrenom || !form.numeroUnique || !form.criteres) return;

    const details = [
      `Ville : ${form.ville}`,
      `Département : ${form.departement}`,
      `Adresse du logement actuel : ${form.adresse}`,
      `Nom et prénom : ${form.nomPrenom}`,
      `Numéro unique : ${form.numeroUnique}`,
      `Critères de recherche : ${form.criteres}`,
    ].filter(Boolean).join("\n");

    const message = `Bonjour, je souhaite proposer un échange de logement HLM.\n\n---\n${details}`;
    window.open(getWhatsAppLink(message), "_blank");
    setSubmitted(true);
  }

  function handleClose() {
    setShowModal(false);
    setSubmitted(false);
    setForm({ ville: "", departement: "", adresse: "", nomPrenom: "", numeroUnique: "", criteres: "" });
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 text-sm font-medium mb-6 transition-colors">
            <FaArrowLeft /> Retour à l&apos;accueil
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
              <FaExchangeAlt className="text-red-500 text-2xl" />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              Trouvez un échange de HLM en quelques clics
            </h1>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6">
              Vous êtes locataire HLM et votre logement ne correspond plus à votre situation ?
            </p>

            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Grâce à l&apos;échange de logements sociaux, vous pouvez entrer en contact avec un
              autre locataire souhaitant faire une mutation dans le sens inverse. Si vos profils
              sont compatibles et que vous trouvez un accord, chacun prend ensuite contact avec
              son bailleur pour étudier et, le cas échéant, finaliser la mutation selon les
              conditions du bailleur.
            </p>

            <div className="bg-blue-50 rounded-xl p-4 md:p-6 mb-8">
              <div className="flex items-start gap-3">
                <FaCheck className="text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Une solution simple</strong> pour trouver un logement plus adapté à vos besoins.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer"
            >
              Commencer
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative bg-white w-full sm:max-w-lg max-h-screen sm:max-h-[85vh] sm:rounded-2xl rounded-none shadow-2xl flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-start justify-between z-10 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-900">Proposer un échange</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">Remplissez le formulaire ci-dessous</p>
              </div>
              <button type="button" onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><HiX size={20} /></button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Message envoyé !</h3>
                <p className="text-sm text-gray-500 mb-6">Redirection vers WhatsApp...</p>
                <button onClick={handleClose} className="text-blue-600 font-semibold text-sm hover:underline cursor-pointer">Fermer</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
                <FInput label="Ville" value={form.ville} onChange={(v) => update("ville", v)} required />
                <FInput label="Département" value={form.departement} onChange={(v) => update("departement", v)} required />
                <FInput label="Adresse du logement actuel" value={form.adresse} onChange={(v) => update("adresse", v)} required />
                <FInput label="Nom et prénom" value={form.nomPrenom} onChange={(v) => update("nomPrenom", v)} required />
                <FInput label="Numéro unique" value={form.numeroUnique} onChange={(v) => update("numeroUnique", v)} required />

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Critère de recherche pour le logement souhaité <span className="text-red-400">*</span></label>
                  <textarea value={form.criteres} onChange={(e) => update("criteres", e.target.value)} rows={3} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none resize-none" placeholder="Décrivez le logement recherché (ville, surface, pièces, étage, etc.)" required />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer">
                  Envoyer ma demande →
                </button>
                <p className="text-[10px] text-gray-400 text-center">En cliquant, vous acceptez d&apos;être contacté par nos services.</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function FInput({ label, value, onChange, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label} <span className="text-red-400">*</span></label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none" />
    </div>
  );
}