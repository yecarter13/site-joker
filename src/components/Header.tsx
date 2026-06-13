"use client";

import Link from "next/link";
import { getWhatsAppLink } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import { HiMenu, HiX, HiDocumentText } from "react-icons/hi";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg flex items-center justify-center">
            <HiDocumentText className="text-white text-sm" />
          </div>
          <span className="font-bold text-xl text-gray-900">Logement<span className="text-indigo-600">Dossier</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#method" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Comment ça marche</Link>
          <Link href="/#tarifs" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">Tarifs</Link>
          <Link href="/#faq" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">FAQ</Link>
          <a
            href={getWhatsAppLink("Bonjour, je souhaite optimiser mon dossier de location.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-200"
          >
            <FaWhatsapp className="text-lg" />
            Analyser mon dossier
          </a>
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/#method" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setOpen(false)}>Comment ça marche</Link>
          <Link href="/#tarifs" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setOpen(false)}>Tarifs</Link>
          <Link href="/#faq" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setOpen(false)}>FAQ</Link>
          <a
            href={getWhatsAppLink("Bonjour, je souhaite optimiser mon dossier de location.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-3 rounded-full text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            <FaWhatsapp className="text-lg" />
            Analyser mon dossier
          </a>
        </div>
      )}
    </header>
  );
}
