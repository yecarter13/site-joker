"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaExchangeAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import Link from "next/link";

export default function EchangePage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm font-medium mb-6 transition-colors">
            <FaArrowLeft /> Retour à l&apos;accueil
          </Link>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
              <FaExchangeAlt className="text-blue-600 text-2xl" />
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
                <FaCheck className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Une solution simple</strong> pour trouver un logement plus adapté à vos besoins.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer"
            >
              Commencer
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white w-full sm:max-w-lg max-h-screen sm:max-h-[85vh] sm:rounded-2xl rounded-none shadow-2xl flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-start justify-between z-10 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-900">Formulaire d&apos;échange</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">À remplir pour proposer un échange</p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><HiX size={20} /></button>
            </div>
            <div className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
              <p className="text-sm text-gray-500 text-center py-8">
                Formulaire en cours de configuration. Les champs seront bientôt disponibles.
              </p>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}