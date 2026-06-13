"use client";

import Link from "next/link";
import { FaInstagram, FaFacebook, FaArrowRight } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { useModal } from "@/lib/ModalContext";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.03]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <HiDocumentText className="text-white text-lg" />
              </div>
              <span className="font-bold text-xl text-white">Logement<span className="text-indigo-400">Dossier</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Votre partenaire de confiance pour l&apos;optimisation de dossier locatif. Nous analysons et structurons votre candidature pour maximiser vos chances.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Liens rapides</h3>
            <div className="space-y-2.5 text-sm">
              <Link href="/#method" className="flex items-center gap-1 group hover:text-indigo-400 transition-colors">
                <FaArrowRight className="text-[10px] text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
                Comment ça marche
              </Link>
              <Link href="/#tarifs" className="flex items-center gap-1 group hover:text-indigo-400 transition-colors">
                <FaArrowRight className="text-[10px] text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
                Nos tarifs
              </Link>
              <Link href="/#faq" className="flex items-center gap-1 group hover:text-indigo-400 transition-colors">
                <FaArrowRight className="text-[10px] text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
                FAQ
              </Link>
              <Link href="/catalog" className="flex items-center gap-1 group hover:text-indigo-400 transition-colors">
                <FaArrowRight className="text-[10px] text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
                Logements disponibles
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-2.5 text-sm">
              <button onClick={() => openModal()} className="flex items-center gap-2 hover:text-green-400 transition-colors group cursor-pointer w-full text-left">
                <span className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <span className="w-4 h-4 bg-green-400 rounded-full" />
                </span>
                Nous contacter
              </button>
              <a href="#" className="flex items-center gap-2 hover:text-pink-400 transition-colors group">
                <span className="w-8 h-8 bg-pink-500/10 rounded-lg flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                  <FaInstagram className="text-pink-400" />
                </span>
                Instagram
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors group">
                <span className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <FaFacebook className="text-blue-400" />
                </span>
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Logement Dossier. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
