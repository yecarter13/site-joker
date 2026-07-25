"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getWhatsAppLink } from "@/lib/utils";
import {
  HiX, HiCheck, HiHome, HiLocationMarker, HiChartBar, HiStar,
  HiPhotograph, HiUser, HiPlus, HiChevronLeft, HiChevronRight,
} from "react-icons/hi";
import {
  FaExchangeAlt, FaArrowRight, FaUsers, FaBuilding,
  FaMapMarkerAlt, FaShieldAlt, FaComments, FaHandshake,
  FaPlus, FaBed, FaRulerCombined, FaEuroSign, FaHome,
} from "react-icons/fa";

interface ExchangeListing {
  id: string;
  username: string;
  avatar: string;
  title: string;
  description: string;
  city: string;
  surface: number;
  rooms: number;
  price: number;
  images: string[];
  createdAt: string;
}

const defaultForm = {
  username: "", title: "", description: "", city: "",
  surface: "", rooms: "", price: "", phone: "",
};

export default function EchangePage() {
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [listings, setListings] = useState<ExchangeListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [posting, setPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [form, setForm] = useState({
    ville: "", departement: "", adresse: "", nomPrenom: "",
    numeroUnique: "", email: "", departementRecherche: "", criteres: "",
  });
  const [postForm, setPostForm] = useState(defaultForm);
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const res = await fetch("/api/exchange");
      if (res.ok) {
        const data = await res.json();
        setListings(data);
      }
    } catch (e) {
      console.error("Failed to fetch listings", e);
    } finally {
      setLoading(false);
    }
  }

  function openLightbox(images: string[], index: number) {
    setLightboxImages(images);
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(-1);
    setLightboxImages([]);
  }

  function prevImage() {
    setLightboxIndex((prev) =>
      prev <= 0 ? lightboxImages.length - 1 : prev - 1
    );
  }

  function nextImage() {
    setLightboxIndex((prev) =>
      prev >= lightboxImages.length - 1 ? 0 : prev + 1
    );
  }

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

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImages((prev) => [...prev, event.target!.result as string]);
      }
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handlePostSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!postForm.username || !postForm.title || !postForm.city || !postForm.surface || !postForm.rooms || !postForm.price) return;
    setPosting(true);

    fetch("/api/exchange", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...postForm, images }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setPostSuccess(true);
        setPostForm(defaultForm);
        setImages([]);
        fetchListings();
        setTimeout(() => { setShowPostForm(false); setPostSuccess(false); }, 2000);
      })
      .catch((err) => {
        console.error("Failed to post listing", err);
        alert("Erreur lors de la publication");
      })
      .finally(() => setPosting(false));
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
        </section>



        {/* ─── LIGHTBOX ─── */}
        {lightboxIndex >= 0 && lightboxImages.length > 0 && (
          <div
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10 cursor-pointer"
            >
              <HiX size={28} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <HiChevronLeft size={40} />
            </button>

            <img
              src={lightboxImages[lightboxIndex]}
              alt=""
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <HiChevronRight size={40} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          </div>
        )}

        {/* ─── POST FORM MODAL ─── */}
        {showPostForm && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPostForm(false)} />
            <div className="relative bg-white w-full sm:max-w-lg max-h-screen sm:max-h-[85vh] sm:rounded-2xl rounded-none shadow-2xl flex flex-col">
              <div className="sticky top-0 bg-white border-b border-gray-100 px-4 py-3 flex items-start justify-between z-10 flex-shrink-0">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Poster mon logement</h2>
                  <p className="text-[11px] text-gray-500 mt-0.5">Proposez votre logement à l&apos;échange</p>
                </div>
                <button type="button" onClick={() => setShowPostForm(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><HiX size={20} /></button>
              </div>

              {postSuccess ? (
                <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Annonce publiée !</h3>
                  <p className="text-sm text-gray-500 mb-6">Votre logement est maintenant visible.</p>
                  <button onClick={() => setShowPostForm(false)} className="text-emerald-600 font-semibold text-sm hover:underline cursor-pointer">Fermer</button>
                </div>
              ) : (
                <form onSubmit={handlePostSubmit} className="overflow-y-auto flex-1 px-4 py-4 space-y-3">
                  <div className="bg-emerald-50 rounded-xl p-3 flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center flex-shrink-0">
                      <HiUser className="text-emerald-600" />
                    </div>
                    <p className="text-xs text-emerald-800">
                      Un avatar unique sera généré automatiquement à partir de votre nom d&apos;utilisateur.
                    </p>
                  </div>
                  <FInput label="Nom d'utilisateur" value={postForm.username} onChange={(v) => setPostForm((p) => ({ ...p, username: v }))} required placeholder="Ex: JeanDupont" />
                  <FInput label="Titre de l'annonce" value={postForm.title} onChange={(v) => setPostForm((p) => ({ ...p, title: v }))} required placeholder="Ex: T3 calme et lumineux" />
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={postForm.description} onChange={(e) => setPostForm((p) => ({ ...p, description: e.target.value }))} rows={2} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none resize-none" placeholder="Décrivez votre logement..." />
                  </div>
                  <FInput label="Ville" value={postForm.city} onChange={(v) => setPostForm((p) => ({ ...p, city: v }))} required placeholder="Ex: Paris" />
                  <div className="grid grid-cols-2 gap-3">
                    <FInput label="Surface (m²)" type="number" value={postForm.surface} onChange={(v) => setPostForm((p) => ({ ...p, surface: v }))} required placeholder="Ex: 65" />
                    <FInput label="Nombre de pièces" type="number" value={postForm.rooms} onChange={(v) => setPostForm((p) => ({ ...p, rooms: v }))} required placeholder="Ex: 3" />
                  </div>
                  <FInput label="Loyer (€)" type="number" value={postForm.price} onChange={(v) => setPostForm((p) => ({ ...p, price: v }))} required placeholder="Ex: 450" />

                  <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold text-sm">📱</span>
                    </div>
                    <p className="text-xs text-amber-800">
                      Votre numéro sera visible uniquement par l&apos;administrateur pour valider votre annonce. Il n&apos;apparaîtra pas sur la carte.
                    </p>
                  </div>
                  <FInput label="Téléphone (pour validation)" type="tel" value={postForm.phone} onChange={(v) => setPostForm((p) => ({ ...p, phone: v }))} required placeholder="Ex: 0612345678" />

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Photos</label>
                    <div className="flex flex-wrap gap-2">
                      {images.map((img, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <HiX size={12} />
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => fileRef.current?.click()} disabled={uploadingImage} className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 hover:text-emerald-500 hover:border-emerald-500 transition-colors bg-gray-50 cursor-pointer">
                        {uploadingImage ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500" /> : <HiPlus size={20} />}
                      </button>
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <p className="text-[10px] text-gray-400 mt-1">La première photo sera affichée sur la carte.</p>
                  </div>

                  <button type="submit" disabled={posting} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg disabled:opacity-50 cursor-pointer">
                    {posting ? "Publication..." : "Publier mon annonce →"}
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">En cliquant, votre annonce sera visible par tous les visiteurs.</p>
                </form>
              )}
            </div>
          </div>
        )}

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

        {/* ─── LISTINGS ─── */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                  Annonces d&apos;échange
                </h2>
                <p className="text-gray-500 mt-1">
                  {listings.length} logement{listings.length > 1 ? "s" : ""} disponible{listings.length > 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => { setShowPostForm(true); setPostSuccess(false); setImages([]); }}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg cursor-pointer"
              >
                <FaPlus /> Poster mon logement
              </button>
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full" />
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                <FaHome className="text-5xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucune annonce pour le moment</p>
                <p className="text-gray-400 text-sm mt-1">Soyez le premier à publier votre logement !</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all overflow-hidden group">
                    {listing.images && listing.images.length > 0 ? (
                      <div
                        className="h-44 bg-gray-100 overflow-hidden cursor-pointer"
                        onClick={() => openLightbox(listing.images, 0)}
                      >
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {listing.images.length > 1 && (
                          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
                            1/{listing.images.length}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        className="h-44 bg-gray-100 flex items-center justify-center cursor-pointer"
                        onClick={() => openLightbox(listing.images, 0)}
                      >
                        <HiPhotograph className="text-gray-300 text-4xl" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={listing.avatar}
                          alt={listing.username}
                          className="w-12 h-12 rounded-full bg-gray-100"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{listing.username}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(listing.createdAt).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-2">{listing.title}</h3>
                      {listing.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{listing.description}</p>
                      )}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                          <FaMapMarkerAlt className="text-emerald-500" /> {listing.city}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                          <FaRulerCombined className="text-emerald-500" /> {listing.surface} m²
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                          <FaBed className="text-emerald-500" /> {listing.rooms} pièce{listing.rooms > 1 ? "s" : ""}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1">
                          <FaEuroSign className="text-emerald-500" /> {listing.price} €
                        </span>
                      </div>
                      <a
                        href={getWhatsAppLink(`Bonjour, je suis intéressé(e) par le logement de ${listing.username} : "${listing.title}" à ${listing.city}. Pouvez-vous me mettre en relation ?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
                      >
                        <FaComments /> Contacter pour un échange
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

function FInput({ label, value, onChange, type = "text", required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-400">*</span>}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} placeholder={placeholder} className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-400 outline-none" />
    </div>
  );
}
