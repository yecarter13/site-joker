import Link from "next/link";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { HiDocumentText } from "react-icons/hi";
import { getWhatsAppLink } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
                <HiDocumentText className="text-white text-sm" />
              </div>
              <span className="font-bold text-xl text-white">Logement<span className="text-indigo-400">Dossier</span></span>
            </div>
            <p className="text-sm text-gray-400">
              Votre partenaire de confiance pour l&apos;optimisation de dossier locatif. Nous analysons et structurons votre candidature pour maximiser vos chances.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Liens rapides</h3>
            <div className="space-y-2 text-sm">
              <Link href="/#method" className="block hover:text-indigo-400 transition-colors">Comment ça marche</Link>
              <Link href="/#tarifs" className="block hover:text-indigo-400 transition-colors">Nos tarifs</Link>
              <Link href="/#faq" className="block hover:text-indigo-400 transition-colors">FAQ</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <a
                href={getWhatsAppLink("Bonjour, j'ai une question.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-green-400 transition-colors"
              >
                WhatsApp
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-pink-400 transition-colors">
                <FaInstagram /> Instagram
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <FaFacebook /> Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Logement Dossier. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
