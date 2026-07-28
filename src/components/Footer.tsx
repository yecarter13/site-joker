"use client";

import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaMapMarkerAlt, FaTiktok, FaFacebook } from "react-icons/fa";
import { useModal } from "@/lib/ModalContext";
import { ADDRESS, POSTAL_CODE, CITY, COUNTRY, SIRET, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="bg-white text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt={SITE_NAME} width={48} height={48} className="w-12 h-12 object-contain" />
              <span className="font-bold text-xl text-gray-900">Espace <span className="text-red-500">Habitat</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Votre partenaire de confiance pour l&apos;optimisation de dossier locatif et l&apos;attribution de logement HLM.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Liens rapides</h3>
            <div className="space-y-2.5 text-sm">
              <Link href="/#method" className="flex items-center gap-1 group hover:text-red-500 transition-colors">
                <FaArrowRight className="text-[10px] text-red-500 group-hover:translate-x-0.5 transition-transform" />
                Comment ça marche
              </Link>
              <Link href="/#tarifs" className="flex items-center gap-1 group hover:text-red-500 transition-colors">
                <FaArrowRight className="text-[10px] text-red-500 group-hover:translate-x-0.5 transition-transform" />
                Nos tarifs
              </Link>
              <Link href="/#faq" className="flex items-center gap-1 group hover:text-red-500 transition-colors">
                <FaArrowRight className="text-[10px] text-red-500 group-hover:translate-x-0.5 transition-transform" />
                FAQ
              </Link>
              <Link href="/catalog" className="flex items-center gap-1 group hover:text-red-500 transition-colors">
                <FaArrowRight className="text-[10px] text-red-500 group-hover:translate-x-0.5 transition-transform" />
                Logements disponibles
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-red-500 mt-0.5 flex-shrink-0" />
                <span>
                  {ADDRESS}<br />
                  {POSTAL_CODE}, {CITY}<br />
                  {COUNTRY}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                SIRET : {SIRET}
              </div>
              <button onClick={() => openModal()} className="flex items-center gap-2 hover:text-green-600 transition-colors group cursor-pointer">
                <span className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <span className="w-4 h-4 bg-green-500 rounded-full" />
                </span>
                Nous contacter
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {SITE_NAME}. Tous droits réservés.
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.tiktok.com/@espace_habitat?_r=1&_t=ZS-97tEIgmfz8r"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-gray-100 hover:bg-black text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all"
              title="TikTok"
            >
              <FaTiktok size={16} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591218195078"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-full flex items-center justify-center transition-all"
              title="Facebook"
            >
              <FaFacebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
