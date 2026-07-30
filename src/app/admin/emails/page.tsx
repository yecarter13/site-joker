"use client";

import { useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { HiArrowLeft, HiMail, HiCheck, HiX } from "react-icons/hi";

const TEMPLATES = [
  { id: "confirmation", label: "Confirmation de réception", desc: "Accusé de réception standard pour nouveau contact" },
  { id: "relance", label: "Relance client", desc: "Email de suivi pour relancer un prospect" },
  { id: "info", label: "Information", desc: "Message d'information personnalisé" },
  { id: "personnalise", label: "Personnalisé", desc: "Message entièrement personnalisé avec contenu libre" },
];

function EmailPage() {
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("confirmation");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [preview, setPreview] = useState(false);

  function getDefaultSubject(tpl: string, n: string) {
    switch (tpl) {
      case "confirmation": return "Confirmation de réception - Espace Habitat";
      case "relance": return "Suivi de votre projet - Espace Habitat";
      case "info": return "Information - Espace Habitat";
      case "personnalise": return "Message de la part d'Espace Habitat";
      default: return "Espace Habitat";
    }
  }

  function handleTemplateChange(tpl: string) {
    setTemplate(tpl);
    if (!subject || subject === getDefaultSubject(template, name)) {
      setSubject(getDefaultSubject(tpl, name));
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject,
          template,
          name,
          message,
          content: message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setResult({ type: "success", text: "Email envoyé avec succès !" });
        setTo(""); setName(""); setMessage("");
        setSubject(getDefaultSubject(template, ""));
      } else {
        setResult({ type: "error", text: data.error || "Erreur lors de l'envoi" });
      }
    } catch {
      setResult({ type: "error", text: "Erreur réseau" });
    } finally {
      setSending(false);
    }
  }

  function generatePreview() {
    if (!name && !message) return null;
    const tpl = TEMPLATES.find((t) => t.id === template);
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-sm">
        <div className="border-b pb-3 mb-3">
          <div className="font-bold text-gray-900">Espace Habitat</div>
          <div className="text-gray-500 text-xs">Objet : {subject || getDefaultSubject(template, name)}</div>
          <div className="text-gray-500 text-xs">À : {to || "destinataire@email.com"}</div>
        </div>
        <div className="text-gray-700 leading-relaxed">
          <p>Bonjour <strong>{name || "Prénom N."}</strong>,</p>
          {template === "confirmation" && (
            <div className="space-y-2 mt-2">
              <p>Nous vous remercions pour l&apos;intérêt que vous portez à Espace Habitat.</p>
              <p>Votre demande a bien été reçue. Notre équipe l&apos;analyse actuellement et vous recontactera dans les plus brefs délais.</p>
            </div>
          )}
          {template === "relance" && (
            <div className="space-y-2 mt-2">
              <p>Nous souhaitons prendre de vos nouvelles concernant votre recherche de logement.</p>
              <p>Notre service d&apos;analyse de dossier locatif est toujours à votre disposition.</p>
            </div>
          )}
          {template === "info" && (
            <div className="space-y-2 mt-2">
              <p>{message || "Votre message informatif ici..."}</p>
            </div>
          )}
          {template === "personnalise" && (
            <div className="space-y-2 mt-2">
              <div dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, "<br>") }} />
            </div>
          )}
          <p className="mt-4">Cordialement,<br /><strong>L&apos;équipe Espace Habitat</strong></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors">
            <HiArrowLeft /> <span className="text-sm font-medium">Retour</span>
          </Link>
          <div className="flex items-center gap-2">
            <HiMail className="text-indigo-600" />
            <span className="font-bold text-lg text-gray-900">Envoi d&apos;emails</span>
          </div>
          <div />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {result && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            result.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {result.type === "success" ? <HiCheck size={20} /> : <HiX size={20} />}
            {result.text}
            <button onClick={() => setResult(null)} className="ml-auto cursor-pointer"><HiX size={16} /></button>
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Destinataire</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Email du destinataire *</label>
                <input type="email" value={to} onChange={(e) => setTo(e.target.value)} required
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="client@email.com" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Prénom / Nom</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Jean Dupont" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Modèle d&apos;email</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {TEMPLATES.map((tpl) => (
                <button type="button" key={tpl.id} onClick={() => handleTemplateChange(tpl.id)}
                  className={`text-left p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    template === tpl.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <div className="text-xs font-bold text-gray-900">{tpl.label}</div>
                  <div className="text-[10px] text-gray-500 mt-1 leading-tight">{tpl.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Contenu</h3>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Objet *</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Objet de l'email" />
            </div>
            {template !== "confirmation" && template !== "relance" && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  {template === "info" ? "Message *" : "Contenu personnalisé *"}
                </label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  placeholder={template === "personnalise" ? "Écrivez votre message ici...\n\nUtilisez <strong> pour le gras" : "Votre message..."}
                  required={template === "info" || template === "personnalise"} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={sending}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg disabled:opacity-50 cursor-pointer">
              {sending ? (
                <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Envoi en cours...</>
              ) : (
                <><HiMail size={18} /> Envoyer l&apos;email</>
              )}
            </button>
            <button type="button" onClick={() => setPreview(!preview)}
              className="text-sm text-gray-500 hover:text-indigo-600 px-4 py-3 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all cursor-pointer">
              {preview ? "Masquer l'aperçu" : "Aperçu"}
            </button>
          </div>
        </form>

        {preview && (
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Aperçu de l&apos;email</h3>
            {generatePreview()}
          </div>
        )}
      </main>
    </div>
  );
}

export default function EmailsPage() {
  return (
    <AdminGuard>
      <EmailPage />
    </AdminGuard>
  );
}
