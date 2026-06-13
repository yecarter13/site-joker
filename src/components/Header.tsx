"use client";

import Link from "next/link";
import { getWhatsAppLink } from "@/lib/utils";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="font-bold text-xl text-gray-900">Joker<span className="text-blue-600">Immo</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/catalog" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Logements</Link>
          <Link href="/#tarifs" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Tarifs</Link>
          <Link href="/#faq" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
          <a
            href={getWhatsAppLink("Bonjour, je souhaite optimiser mon dossier de location.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-200"
          >
            Nous contacter
          </a>
        </nav>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link href="/catalog" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setOpen(false)}>Logements</Link>
          <Link href="/#tarifs" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setOpen(false)}>Tarifs</Link>
          <Link href="/#faq" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setOpen(false)}>FAQ</Link>
          <a
            href={getWhatsAppLink("Bonjour, je souhaite optimiser mon dossier de location.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full text-sm font-semibold"
            onClick={() => setOpen(false)}
          >
            Nous contacter
          </a>
        </div>
      )}
    </header>
  );
}
