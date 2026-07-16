"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWhatsAppLink } from "@/lib/utils";
import { HiX, HiCheck, HiHome, HiLocationMarker, HiChartBar, HiStar } from "react-icons/hi";
import { FaExchangeAlt, FaArrowRight, FaUsers, FaBuilding, FaMapMarkerAlt, FaShieldAlt, FaComments, FaHandshake } from "react-icons/fa";

export default function EchangePage() {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    ville: "", departement: "", adresse: "", nomPrenom: "",
    numeroUnique: "", email: "", departementRecherche: "", criteres: "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.ville || !form.nomPrenom || !form.numeroUnique || !form.email || !form.criteres) return;

    const details = [
      `Ville : ${form.ville}`,
      form.departement ? `Département : ${form.departement}` : "",
      form.adresse ? `Adresse actuelle : ${form.adresse}` : "",
      `Nom et prénom : ${form.nomPrenom}`,
      `Numéro unique : ${form.numeroUnique}`,
      `E-mail : ${form.email}`,
      form.departementRecherche ? `Département recherché : ${form.departementRecherche}` : "",
      `Description du logement : ${form.criteres}`,
    ].filter(Boolean).join("\n");

    const message = `Bonjour, je souhaite échanger mon logement HLM.\n\n---\n${details}`;
    window.open(getWhatsAppLink(message), "_blank");
    setSubmitted(true);
  }

  function handleClose() {
    setShowModal(false);
    setSubmitted(false);
    setForm({ ville: "", departement: "", adresse: "", nomPrenom: "", numeroUnique: "", email: "", departementRecherche: "", criteres: "" });
  }

  const CTAButton = ({ className = "" }: { className?: string }) => (
    <button
      onClick={() => setShowModal(true)}
      className={`inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-bold transition-all shadow-lg cursor-pointer ${className}`}
    >
      Commencer
      <FaArrowRight className="text-xs" />
    </button>
  );

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen">
        {/* ─── HERO ─── */}
        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent" />
          <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <FaExchangeAlt className="text-emerald-400" />
                <span>Déjà des milliers de logements échangés</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
                Trouvez un échange de HLM en quelques clics
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                La première plateforme de mise en relation entre locataires de logements sociaux. 
                Trouvez un partenaire d&apos;échange compatible, on gère toute la paperasse pour vous.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton className="px-8 py-4 rounded-xl text-base" />
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl text-base font-semibold transition-all cursor-pointer"
                >
                  J&apos;ai déjà un compte
                </button>
              </div>
              <div className="flex flex-wrap gap-6 mt-10 text-sm text-gray-400">
                <span className="flex items-center gap-2"><HiCheck className="text-emerald-400" /> 100% gratuit</span>
                <span className="flex items-center gap-2"><FaUsers className="text-emerald-400" /> +50 000 locataires</span>
                <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-emerald-400" /> Toute la France</span>
              </div>
            </div>
          </div>
          {/* Decorative cards */}
          <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 space-y-4">
            {[
              { city: "Appartement T3, Paris", detail: "Lyon • 65m² • 450€", match: "92% match" },
              { city: "Appartement T2, Marseille", detail: "Paris • 55m² • 380€", match: "88% match" },
              { city: "Appartement T4, Lyon", detail: "Marseille • 78m² • 520€", match: "85% match" },
            ].map((card, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-64 border border-white/10 hover:bg-white/20 transition-all">
                <div className="text-sm font-bold text-white">{card.city}</div>
                <div className="text-xs text-gray-400 mt-1">{card.detail}</div>
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 rounded-full px-2.5 py-0.5">
                  <HiChartBar className="text-[10px]" /> {card.match}
                </div>
              </div>
            ))}
            <div className="text-xs text-gray-400 text-center mt-2">Votre compatibilité est calculée en temps réel</div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "50 000+", label: "Locataires actifs" },
                { value: "3 200+", label: "Échanges réussis" },
                { value: "96+", label: "Départements couverts" },
                { value: "4.8/5", label: "Note moyenne" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-extrabold text-emerald-600">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pas de paperasse, pas d&apos;attente. On s&apos;occupe de tout.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  num: "01", title: "Remplissez le formulaire",
                  desc: "Donnez-nous les infos de votre logement actuel et celui que vous recherchez. On analyse votre profil.",
                  icon: FaExchangeAlt,
                },
                {
                  num: "02", title: "On vous trouve un match",
                  desc: "Notre équipe identifie les échanges compatibles et vous met en relation avec le bon partenaire.",
                  icon: FaUsers,
                },
                {
                  num: "03", title: "On gère toute la paperasse",
                  desc: "Contact avec les bailleurs, constitution des dossiers, suivi de la mutation : on s'occupe de tout.",
                  icon: FaHandshake,
                },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="relative bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-all">
                    <div className="text-3xl font-black text-emerald-200 mb-4">{step.num}</div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-emerald-600 text-xl" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <CTAButton className="px-8 py-4 rounded-xl text-base" />
            </div>
          </div>
        </section>

        {/* ─── CTA MID ─── */}
        <section className="py-12 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-lg md:text-xl font-medium mb-2">Nouveau message</p>
            <p className="text-2xl md:text-3xl font-bold italic">&ldquo;Bonjour, votre T3 m&apos;intéresse beaucoup !&rdquo;</p>
            <div className="mt-6">
              <CTAButton className="px-8 py-4 rounded-xl text-base bg-white text-emerald-700 hover:bg-gray-100" />
            </div>
          </div>
        </section>

        {/* ─── WHY US ─── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Pourquoi nous choisir ?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nous avons conçu le service le plus simple et le plus sûr pour les échanges de logements sociaux.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { icon: HiStar, title: "100% Gratuit", desc: "Inscription, annonce, mise en relation : tout est gratuit. Pas d'abonnement caché." },
                { icon: FaUsers, title: "Accompagnement complet", desc: "On ne se contente pas de vous mettre en relation. On gère toute la paperasse avec les bailleurs." },
                { icon: FaShieldAlt, title: "Profils vérifiés", desc: "Tous les profils sont authentifiés via leur numéro unique. Pas de faux comptes." },
                { icon: FaMapMarkerAlt, title: "Toute la France", desc: "De Paris à Marseille, de Lyon à Lille : couverture nationale complète." },
                { icon: FaComments, title: "Suivi personnalisé", desc: "Un conseiller dédié vous accompagne de A à Z jusqu'à la signature du bail." },
                { icon: FaHandshake, title: "Mise en relation", desc: "On vous met en contact avec votre futur partenaire et on finalise la mutation avec les bailleurs." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="text-emerald-600 text-xl" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <CTAButton className="px-8 py-4 rounded-xl text-base" />
            </div>
          </div>
        </section>

        {/* ─── FINAL CTA ─── */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Prêt à trouver votre nouveau logement ?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de locataires qui ont déjà trouvé leur échange idéal. 
              Ça prend moins de 2 minutes.
            </p>
            <CTAButton className="px-10 py-5 rounded-xl text-lg" />
          </div>
        </section>
      </main>
      <Footer />

      {/* ─── MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative bg-white w-full sm:max-w-lg max-h-screen sm:max-h-[85vh] sm:rounded-2xl rounded-none shadow-2xl flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-start justify-between z-10 flex-shrink-0">
              <div>
                <h2 className="text-base font-bold text-gray-900">Proposer un échange</h2>
                <p className="text-[11px] text-gray-500 mt-0.5">On vous recontacte sous 24h</p>
              </div>
              <button type="button" onClick={handleClose} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><HiX size={20} /></button>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Message envoyé !</h3>
                <p className="text-sm text-gray-500 mb-6">Notre équipe vous recontacte sous 24h.</p>
                <button onClick={handleClose} className="text-emerald-600 font-semibold text-sm hover:underline cursor-pointer">Fermer</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
                <FInput label="Nom et prénom" value={form.nomPrenom} onChange={(v) => update("nomPrenom", v)} required />
                <FInput label="E-mail" type="email" value={form.email} onChange={(v) => update("email", v)} required />
                <FInput label="Numéro unique" value={form.numeroUnique} onChange={(v) => update("numeroUnique", v)} required />
                <FInput label="Ville actuelle" value={form.ville} onChange={(v) => update("ville", v)} required />
                <FInput label="Département actuel" value={form.departement} onChange={(v) => update("departement", v)} />
                <FInput label="Adresse du logement actuel" value={form.adresse} onChange={(v) => update("adresse", v)} />
                <FInput label="Département recherché" value={form.departementRecherche} onChange={(v) => update("departementRecherche", v)} />
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Décrivez votre logement actuel <span className="text-red-400">*</span></label>
                  <textarea value={form.criteres} onChange={(e) => update("criteres", e.target.value)} rows={3} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none resize-none" placeholder="Type, surface, pièces, loyer, étage..." required />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg cursor-pointer">
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
      <label className="block text-xs font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-400">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none" />
    </div>
  );
}