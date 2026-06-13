"use client";

import { useModal } from "@/lib/ModalContext";
import { FaArrowRight } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";

export default function FinalCTASection() {
  const { openModal } = useModal();

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Votre logement vous attend
        </h2>
        <p className="text-lg text-indigo-100/80 mb-8 max-w-xl mx-auto">
          Rejoignez les centaines de personnes qui ont boosté leurs chances avec Logement HLM. C&apos;est gratuit pour commencer.
        </p>

        <button
          onClick={() => openModal()}
          className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white px-10 py-4 rounded-full text-lg font-bold transition-all shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 cursor-pointer"
        >
          Suivre mon dossier
          <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-indigo-200/80">
          <span className="flex items-center gap-1.5"><HiCheck className="text-green-400" /> Réponse sous 24h</span>
          <span className="flex items-center gap-1.5"><HiCheck className="text-green-400" /> Aucun paiement avant validation</span>
          <span className="flex items-center gap-1.5"><HiCheck className="text-green-400" /> Accompagnement jusqu&apos;à l&apos;obtention</span>
        </div>
      </div>
    </section>
  );
}
