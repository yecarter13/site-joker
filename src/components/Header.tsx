"use client";

import Link from "next/link";
import Image from "next/image";
import { useModal } from "@/lib/ModalContext";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Header() {
  const { openModal } = useModal();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="JokerImmo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain"
          />
          <span className="font-bold text-xl text-white">Joker<span className="text-blue-400">Immo</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/catalog" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Logements</Link>
          <Link href="/#tarifs" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Tarifs</Link>
          <Link href="/#faq" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">FAQ</Link>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg cursor-pointer"
          >
            Nous contacter
          </button>
        </nav>

        <button className="md:hidden p-2 text-white" onClick={() => setOpen(!open)}>
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900 px-4 py-4 space-y-3">
          <Link href="/catalog" className="block text-sm font-medium text-gray-300 py-2 hover:text-white" onClick={() => setOpen(false)}>Logements</Link>
          <Link href="/#tarifs" className="block text-sm font-medium text-gray-300 py-2 hover:text-white" onClick={() => setOpen(false)}>Tarifs</Link>
          <Link href="/#faq" className="block text-sm font-medium text-gray-300 py-2 hover:text-white" onClick={() => setOpen(false)}>FAQ</Link>
          <button
            onClick={() => { openModal(); setOpen(false); }}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-full text-sm font-semibold cursor-pointer w-full"
          >
            Nous contacter
          </button>
        </div>
      )}
    </header>
  );
}
